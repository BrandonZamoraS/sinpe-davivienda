# 📋 TODO List - SINPE Davivienda

**Proyecto:** App móvil SINPE para Banco Davivienda  
**Hackathon:** 2025  
**Objetivo:** Plataforma de transferencias moderna para jóvenes (~25 años)

---

## ✅ Paso 1: Estructura Base del Proyecto - COMPLETADO

- [x] Inicializar proyecto Expo con TypeScript
- [x] Configurar Expo Router
- [x] Instalar React Native Paper y dependencias
- [x] Crear sistema de colores corporativos de Davivienda
- [x] Configurar constantes de diseño (Typography, Spacing, Theme)
- [x] Definir tipos TypeScript (User, Transaction, Contact, Charge)
- [x] Crear mock data y utilidades
- [x] Configurar variables de entorno (.env)
- [x] Crear repositorio GitHub
- [x] Documentar instalación (macOS y Windows)
- [x] Crear guía de contribución
- [x] Documentar decisiones arquitectónicas (ADR 001, 002)
- [x] Resolver conflictos de dependencias
- [x] Verificar compilación sin errores

**Estado:** ✅ 100% Completado

---

## 🎨 Paso 2: Sistema de Diseño y Componentes Base

### 2.1 Componentes de Botones
- [ ] **PrimaryButton** - Botón principal rojo Davivienda
  - Estados: normal, pressed, disabled, loading
  - Variantes: large, medium, small
  - Con icono opcional
  
- [ ] **SecondaryButton** - Botón secundario azul
  - Mismos estados que PrimaryButton
  
- [ ] **OutlinedButton** - Botón con borde
  - Para acciones secundarias
  
### 2.2 Componentes de Input
- [ ] **CustomInput** - Input con validación
  - Soporte para números de teléfono (formato 8888-8888)
  - Soporte para montos (₡ formato)
  - Estados: normal, error, success, disabled
  - Con icono opcional
  
- [ ] **PinInput** - Input para PIN de 4-6 dígitos
  - Campos individuales
  - Ocultar/mostrar dígitos

### 2.3 Componentes de Tarjetas
- [ ] **TransactionCard** - Card para mostrar transacciones
  - Variantes: sent, received, charge, recharge
  - Mostrar monto, destinatario, fecha, estado
  - Icono según tipo de transacción
  
- [ ] **BalanceCard** - Card para mostrar saldo actual
  - Animación de fade-in
  - Botón para ocultar/mostrar saldo
  
- [ ] **ContactCard** - Card para contactos frecuentes
  - Avatar con iniciales
  - Nombre y teléfono
  - Indicador de favorito

### 2.4 Componentes de Navegación
- [ ] **AppHeader** - Header personalizado
  - Con logo de Davivienda
  - Botón de menú hamburger
  - Título dinámico
  
- [ ] **TabBar** personalizado (Bottom Navbar)
  - 5 tabs con iconos
  - Indicador animado
  - Badges para notificaciones

### 2.5 Componentes de Feedback
- [ ] **LoadingOverlay** - Overlay de carga
  - Spinner con colores corporativos
  - Mensaje opcional
  
- [ ] **SuccessModal** - Modal de éxito
  - Animación de checkmark
  - Mensaje personalizable
  
- [ ] **ErrorModal** - Modal de error
  - Icono de error
  - Mensaje y botón de reintentar
  
- [ ] **ConfirmBottomSheet** - Bottom sheet para confirmaciones
  - Usado antes de transferencias
  - Mostrar resumen de operación

### 2.6 Componentes Adicionales
- [ ] **Avatar** - Avatar de usuario
  - Con iniciales o imagen
  - Variantes de tamaño
  
- [ ] **StatusBadge** - Badge de estado
  - Colores según estado (success, pending, error)
  
- [ ] **EmptyState** - Estado vacío
  - Para listas sin contenido
  - Con ilustración y mensaje

**Estado:** ⏳ 0% - Pendiente

---

## 🔐 Paso 3: Autenticación y Onboarding

### 3.1 Pantallas de Autenticación
- [ ] **app/(auth)/_layout.tsx** - Layout para auth
  
- [ ] **app/(auth)/welcome.tsx** - Pantalla de bienvenida
  - Logo de Davivienda animado
  - Botones: Iniciar sesión / Registrarse
  
- [ ] **app/(auth)/login.tsx** - Pantalla de login
  - Input de usuario/email
  - Botón de Face ID / Touch ID
  - Link a recuperar contraseña
  
- [ ] **app/(auth)/biometric.tsx** - Autenticación biométrica
  - Integrar expo-local-authentication
  - Fallback a PIN si falla
  
- [ ] **app/(auth)/pin.tsx** - Pantalla de PIN
  - Crear PIN (primera vez)
  - Ingresar PIN (subsecuentes)
  - Validación de PIN

### 3.2 Lógica de Autenticación
- [ ] **utils/auth.ts** - Utilidades de autenticación
  - Guardar/obtener token con expo-secure-store
  - Verificar si usuario está autenticado
  - Logout
  
- [ ] **utils/biometric.ts** - Utilidades biométricas
  - Verificar disponibilidad de Face ID/Touch ID
  - Autenticar con biométricos
  - Manejar errores

### 3.3 Guards y Navegación
- [ ] **Proteger rutas principales** - Solo accesibles si autenticado
- [ ] **Redireccionar** después de login exitoso
- [ ] **Persistir sesión** - Mantener usuario logueado

**Estado:** ⏳ 0% - Pendiente

---

## 📱 Paso 4: Navegación y 5 Pantallas Principales

### 4.1 Estructura de Navegación
- [ ] **app/(tabs)/_layout.tsx** - Layout con Bottom Tabs
  - 5 tabs: Home, Transfer, Charges, History, Services
  - Iconos personalizados
  - Tab bar personalizado
  
- [ ] **app/(drawer)/_layout.tsx** - Drawer menu (Hamburger)
  - Perfil de usuario
  - Configuración
  - Ayuda
  - Cerrar sesión

### 4.2 Pantalla 1: Home/Dashboard
- [ ] **app/(tabs)/index.tsx** - Pantalla principal
  - BalanceCard con saldo actual
  - Accesos rápidos (Enviar, Cobrar, Recargar)
  - Últimas 5 transacciones
  - Pull to refresh
  - Animación de entrada

### 4.3 Pantalla 2: Transferir
- [ ] **app/(tabs)/transfer.tsx** - Realizar transferencias
  - Input de número de teléfono o IBAN
  - Autocompletado de contactos frecuentes
  - Input de monto con validación
  - Input de descripción (opcional)
  - Preview antes de confirmar
  - ConfirmBottomSheet
  - SuccessModal después de enviar

### 4.4 Pantalla 3: Cobros
- [ ] **app/(tabs)/charges.tsx** - Generar y enviar cobros
  - Formulario para crear cobro:
    - Monto
    - Descripción
    - Fecha de expiración
  - Generar código QR (react-native-qrcode-svg)
  - Compartir cobro (WhatsApp, SMS, Email)
  - Lista de cobros activos
  - Lista de cobros expirados/pagados

### 4.5 Pantalla 4: Historial ✅ (Parcial)
- [x] **app/(tabs)/history.tsx** - Historial de transacciones (Refactorizado 2025-11-06)
  - [x] Lista de todas las transacciones con FlatList
  - [x] Filtros:
    - [x] Por tipo (Créditos/Débitos)
    - [x] Por fecha (con DatePicker)
    - [ ] Por estado (pendiente)
  - [ ] Búsqueda por nombre o monto
  - [ ] Pull to refresh
  - [ ] Paginación infinita
  - [x] Tap en transacción → Expandir detalles
  - [x] Botón descargar comprobante (placeholder)
  
  **Componentes extraídos:**
  - [x] `/components/history/TransactionCard.tsx`
  - [x] `/components/history/FilterBar.tsx`
  - [x] `/components/history/HistoryHeader.tsx`
  
  **Documentación:**
  - [x] ADR 003: Componentes de filtrado
  - [x] REFACTORIZACION_HISTORIAL.md
  
  **Pendiente:**
  - [ ] Loading states (skeleton screens)
  - [ ] Pull to refresh
  - [ ] Implementación real de descarga PDF
  - [ ] Búsqueda avanzada
  - [ ] Paginación infinita

### 4.6 Pantalla 5: Servicios
- [ ] **app/(tabs)/services.tsx** - Recargas telefónicas
  - Selector de operadora (Kolbi, Claro, Movistar)
  - Input de número de teléfono
  - Selector de monto (5000, 10000, 15000, custom)
  - Confirmación antes de recargar
  - SuccessModal después de recargar

### 4.7 Pantallas Adicionales
- [ ] **app/transaction-detail.tsx** - Detalle de transacción
  - Información completa
  - Comprobante visual
  - Botones: Compartir, Descargar PDF
  
- [ ] **app/contact-select.tsx** - Selector de contactos
  - Lista de contactos frecuentes
  - Búsqueda
  - Añadir a favoritos

**Estado:** ⏳ 0% - Pendiente

---

## 🔧 Paso 5: Implementar Funcionalidades con Mock Data

### 5.1 Lógica de Transferencias
- [ ] **utils/transfers.ts**
  - Validar número de teléfono CR (8 dígitos)
  - Validar IBAN CR
  - Validar monto (límites)
  - Simular envío con mock data
  - Guardar en historial local

### 5.2 Lógica de Cobros
- [ ] **utils/charges.ts**
  - Generar cobro
  - Crear QR code
  - Compartir cobro
  - Validar expiración
  - Marcar como pagado

### 5.3 Lógica de Recargas
- [ ] **utils/recharges.ts**
  - Validar número según operadora
  - Validar monto
  - Simular recarga
  - Guardar en historial

### 5.4 Generación de PDFs
- [ ] **utils/pdf.ts**
  - Generar comprobante en PDF
  - Incluir logo de Davivienda
  - Información de transacción
  - QR code de verificación
  - Compartir/descargar (expo-sharing)

### 5.5 Formateo y Validaciones
- [ ] **utils/formatters.ts**
  - Formatear moneda (₡25,000.00)
  - Formatear teléfono (8888-8888)
  - Formatear fechas (español)
  - Formatear IBAN
  
- [ ] **utils/validators.ts**
  - Validar teléfono CR
  - Validar IBAN CR
  - Validar montos
  - Validar PIN

**Estado:** ⏳ 0% - Pendiente

---

## ✨ Paso 6: Pulir UI/UX con Animaciones

### 6.1 Animaciones de Pantalla
- [ ] **Transiciones entre pantallas** - Slide/Fade suaves
- [ ] **Pull to refresh** - Animación custom con logo
- [ ] **Scroll animations** - Parallax en headers

### 6.2 Micro-interacciones
- [ ] **Botones** - Scale down on press (Animated.spring)
- [ ] **Cards** - Fade in con stagger
- [ ] **Inputs** - Animación de focus
- [ ] **Tabs** - Indicador animado que se desliza
- [ ] **Checkmark** - Animación de éxito (scale + rotate)

### 6.3 Loading States
- [ ] **Skeleton screens** - Para carga de transacciones
- [ ] **Shimmer effect** - En placeholders
- [ ] **Progress indicators** - Para procesos largos

### 6.4 Gestures
- [ ] **Swipe to delete** - En lista de contactos
- [ ] **Pull down to refresh** - En todas las listas
- [ ] **Long press** - Menú contextual en transacciones

### 6.5 Feedback Visual
- [ ] **Haptic feedback** - En acciones importantes
- [ ] **Toast notifications** - Para mensajes rápidos
- [ ] **Success animations** - Confetti o celebración

### 6.6 Optimizaciones UX
- [ ] **Teclado** - Dismiss on scroll
- [ ] **Safe area** - Respetar notch y home indicator
- [ ] **Accesibilidad** - Tamaños de texto, contraste
- [ ] **Dark mode** - (Opcional) Tema oscuro

**Estado:** ⏳ 0% - Pendiente

---

## 📚 Paso 7: Documentación y Pulido Final

### 7.1 Documentación Técnica
- [ ] **README.md** - Actualizar con features implementados
- [ ] **API.md** - Documentar estructura de datos mock
- [ ] **TESTING.md** - Guía para testing manual
- [ ] **DEPLOYMENT.md** - Guía para build y deployment

### 7.2 ADRs Adicionales
- [ ] **ADR 003** - Decisiones sobre navegación
- [ ] **ADR 004** - Estrategia de manejo de estado
- [ ] **ADR 005** - Estrategia de validaciones

### 7.3 Assets y Recursos
- [ ] **assets/images/** - Añadir logos y assets finales
- [ ] **assets/fonts/** - (Opcional) Fuentes custom
- [ ] **assets/icons/** - Iconos personalizados

### 7.4 Testing
- [ ] **Testing manual** - Flujo completo de usuario
- [ ] **Testing en dispositivos** - iOS y Android real
- [ ] **Performance** - Verificar animaciones a 60fps
- [ ] **Edge cases** - Errores, offline, etc.

### 7.5 Pulido Final
- [ ] **Revisar colores** - Consistencia con brand
- [ ] **Revisar tipografía** - Tamaños y weights
- [ ] **Revisar espaciado** - Consistencia visual
- [ ] **Screenshots** - Para README y presentación
- [ ] **Video demo** - Screen recording de flujo principal

**Estado:** ⏳ 0% - Pendiente

---

## 📊 Resumen de Progreso

| Paso | Descripción | Estado | Progreso |
|------|-------------|--------|----------|
| 1️⃣ | Estructura Base | ✅ Completado | 100% |
| 2️⃣ | Componentes Base | ⏳ Pendiente | 0% |
| 3️⃣ | Autenticación | ⏳ Pendiente | 0% |
| 4️⃣ | Navegación y Pantallas | ⏳ Pendiente | 0% |
| 5️⃣ | Funcionalidades Mock | ⏳ Pendiente | 0% |
| 6️⃣ | Animaciones y UX | ⏳ Pendiente | 0% |
| 7️⃣ | Documentación Final | ⏳ Pendiente | 0% |

**Progreso Total:** 14% (1/7 pasos completados)

---

## 🎯 Prioridades Sugeridas

### Alta Prioridad (Para MVP funcional)
1. **Paso 2** - Componentes base (botones, inputs, cards)
2. **Paso 4** - Pantallas principales (Home, Transfer, History mínimo)
3. **Paso 5** - Lógica básica con mock data

### Media Prioridad (Para hackathon)
4. **Paso 3** - Autenticación (puede ser simplificada)
5. **Paso 6** - Animaciones básicas

### Baja Prioridad (Nice to have)
6. **Paso 6** - Micro-interacciones avanzadas
7. **Paso 7** - Documentación exhaustiva

---

## 📝 Notas

- **Objetivo:** App funcional y presentable para hackathon
- **Tiempo estimado:** 2-3 días de desarrollo intensivo
- **Enfoque:** UI/UX moderno para jóvenes (~25 años)
- **Stack:** React Native + Expo + TypeScript + Paper
- **Animaciones:** Usar Animated API nativa (según ADR 002)

---

## 🚀 Próximo Paso Recomendado

**Comenzar con Paso 2: Componentes Base**

Específicamente:
1. PrimaryButton
2. CustomInput  
3. TransactionCard
4. BalanceCard

Estos 4 componentes son la base para todas las pantallas.

---

**Última actualización:** 2025-11-05  
**GitHub:** https://github.com/GreetyCr/sinpe-davivienda

