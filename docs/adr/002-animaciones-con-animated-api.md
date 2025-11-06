# ADR 002: Usar Animated API en lugar de React Native Reanimated

## Estado
Aceptado

## Fecha
2025-11-05

## Contexto
Durante la configuración inicial del proyecto, `react-native-reanimated` estaba causando errores de dependencias con `react-native-worklets/plugin` que impedían que el proyecto compilara correctamente.

El error específico era:
```
Cannot find module 'react-native-worklets/plugin'
```

Este problema surgió porque:
1. React Native Reanimated v4 tiene dependencias complejas con worklets
2. La configuración de Babel requiere plugins adicionales
3. Para un MVP de hackathon, necesitamos velocidad de desarrollo

## Decisión
Hemos decidido **remover React Native Reanimated** del proyecto y usar la **Animated API nativa** de React Native para animaciones.

### Alternativa Elegida: React Native Animated API

```typescript
import { Animated } from 'react-native';

// Ejemplo de uso
const fadeAnim = useRef(new Animated.Value(0)).current;

Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,
}).start();
```

## Consecuencias

### Positivas
✅ **Proyecto compila sin errores** - Solución inmediata al problema de dependencias  
✅ **Cero configuración adicional** - Animated API viene incluida en React Native  
✅ **Suficiente para MVP** - Animated API puede crear todas las animaciones necesarias para el hackathon  
✅ **Bien documentada** - Documentación oficial extensa y ejemplos abundantes  
✅ **Rendimiento aceptable** - Con `useNativeDriver: true` las animaciones son fluidas  

### Negativas
⚠️ **Sintaxis más verbosa** - Compared to Reanimated, el código puede ser más largo  
⚠️ **Limitaciones en animaciones complejas** - Gestos avanzados son más difíciles  
⚠️ **Menos "magic"** - Requiere más código manual que Reanimated  

### Neutral
- Podemos **agregar Reanimated más tarde** si es necesario después del hackathon
- Para animaciones simples (fade, slide, scale), Animated API es perfecta

## Animaciones Planificadas con Animated API

Para el MVP de SINPE Davivienda, necesitamos:

1. **Transiciones de pantalla** ✅ - Soportado con Expo Router
2. **Fade in/out** ✅ - Animated.timing con opacity
3. **Slide animations** ✅ - Animated.timing con translateY/translateX
4. **Scale effects** ✅ - Animated.timing con scale
5. **Button press effects** ✅ - Animated.spring
6. **Loading indicators** ✅ - Animated.loop

Todas estas son perfectamente alcanzables con Animated API.

## Alternativas Consideradas

### 1. Resolver el problema de Reanimated
**Rechazado** porque:
- Requiere tiempo de debugging que no tenemos en un hackathon
- Complejidad innecesaria para el alcance actual
- Riesgo de más problemas de configuración

### 2. Usar Moti (wrapper de Reanimated)
**Rechazado** porque:
- Tiene las mismas dependencias problemáticas
- Añade otra capa de abstracción

### 3. React Spring
**Rechazado** porque:
- Librería adicional a instalar
- Animated API es suficiente y nativa

## Migración Futura

Si después del hackathon decidimos agregar Reanimated:

```bash
# Reinstalar cuando sea necesario
npm install react-native-reanimated
npx expo install react-native-reanimated
```

Y actualizar `babel.config.js`:
```javascript
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'], // Añadir al final
};
```

## Ejemplos de Uso

### Fade Animation
```typescript
const fadeIn = () => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }).start();
};
```

### Slide Animation
```typescript
const slideUp = () => {
  Animated.timing(slideAnim, {
    toValue: 0,
    duration: 400,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true,
  }).start();
};
```

### Button Press
```typescript
const handlePressIn = () => {
  Animated.spring(scaleAnim, {
    toValue: 0.95,
    useNativeDriver: true,
  }).start();
};
```

## Referencias

- [React Native Animated API Docs](https://reactnative.dev/docs/animated)
- [Animated API Guide](https://reactnative.dev/docs/animations)
- [Performance considerations](https://reactnative.dev/docs/performance#using-nativedriver)

## Notas

- **Siempre usar `useNativeDriver: true`** cuando sea posible para mejor performance
- Las animaciones de layout (width, height, padding) NO soportan nativeDriver
- Para gestos complejos, considerar `react-native-gesture-handler` (ya incluido con Expo Router)

