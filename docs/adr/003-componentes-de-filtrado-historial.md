# ADR 003: Componentes de Filtrado y Vista de Historial

## Estado
Aceptado

## Fecha
2025-11-06

## Contexto
El Pull Request #1 implementó la vista de historial de transacciones con funcionalidad de filtrado por tipo y fecha. El código inicial funcionaba pero tenía problemas de mantenibilidad:

1. **Código monolítico**: Todo en un solo archivo de 306 líneas
2. **Estilos hardcodeados**: No usaba las constantes del proyecto (`Colors`, `Spacing`, `Typography`)
3. **Componentes no reutilizables**: Lógica y UI mezcladas
4. **Nueva dependencia**: Requería `@react-native-community/datetimepicker`

## Decisión

### 1. Modularización de Componentes
Hemos decidido **extraer la vista de historial en 3 componentes independientes**:

#### `TransactionCard`
Componente reutilizable para mostrar transacciones individuales.

**Responsabilidades:**
- Mostrar información resumida de transacción (monto, fecha, teléfono)
- Modo expandible para ver detalles completos
- Botón de descarga de comprobante PDF
- Indicador visual de tipo (Crédito/Débito)

**Props:**
```typescript
interface TransactionCardProps {
  transaction: Transaction;
  isExpanded: boolean;
  onToggle: () => void;
  onDownload?: () => void;
}
```

**Ubicación:** `/components/history/TransactionCard.tsx`

#### `FilterBar`
Componente para filtrado de transacciones por tipo y fecha.

**Responsabilidades:**
- Filtros de tipo (Crédito/Débito) con toggle
- Selector de fecha con DateTimePicker
- Botón para limpiar filtros
- UI responsive y accesible

**Props:**
```typescript
interface FilterBarProps {
  filterType: 'credit' | 'debit' | null;
  filterDate: Date | null;
  showDatePicker: boolean;
  onFilterTypeChange: (type: FilterType) => void;
  onFilterDateChange: (date: Date | null) => void;
  onShowDatePicker: (show: boolean) => void;
  onClearFilters: () => void;
}
```

**Ubicación:** `/components/history/FilterBar.tsx`

#### `HistoryHeader`
Header simple que muestra información del usuario.

**Responsabilidades:**
- Mostrar título de la sección
- Mostrar nombre y teléfono del usuario

**Props:**
```typescript
interface HistoryHeaderProps {
  user: User;
}
```

**Ubicación:** `/components/history/HistoryHeader.tsx`

### 2. Uso de DateTimePicker

**Librería:** `@react-native-community/datetimepicker@8.4.4`

**Razones para adoptar:**
- Componente nativo de React Native Community
- Mantiene consistencia con iOS/Android native date pickers
- Bien mantenido y compatible con Expo
- Ligero y sin dependencias complejas

**Alternativas consideradas:**
| Alternativa | Razón de rechazo |
|------------|------------------|
| React Native Paper DatePicker | No incluido en Paper 5.x por defecto |
| Custom DatePicker | Requiere desarrollo desde cero, complejo |
| react-native-modal-datetime-picker | Dependencia adicional innecesaria |

**Instalación:**
```bash
npm install @react-native-community/datetimepicker@8.4.4 --legacy-peer-deps
```

**Nota:** Se usó `--legacy-peer-deps` para resolver conflictos de peer dependencies con React 19.1.0.

### 3. Refactorización de Estilos

**Antes (Hardcodeado):**
```typescript
{
  backgroundColor: "#f5f5f5",
  padding: 10,
  borderRadius: 6,
  fontSize: 12,
  color: "#dd141d",
}
```

**Después (Con Constantes):**
```typescript
{
  backgroundColor: Colors.background.secondary,
  padding: Spacing.sm,
  borderRadius: BorderRadius.sm,
  fontSize: Typography.sizes.sm,
  color: Colors.primary.red,
}
```

**Beneficios:**
- ✅ Consistencia visual en toda la app
- ✅ Cambios de tema centralizados
- ✅ Type-safety con TypeScript
- ✅ Fácil mantenimiento

### 4. Estructura Final

**Reducción de complejidad:**
- `history.tsx`: **306 líneas → 110 líneas** (64% reducción)
- Separación de responsabilidades clara
- Componentes reutilizables en otras pantallas

**Estructura de archivos:**
```
components/
└── history/
    ├── index.ts                 # Barrel export
    ├── TransactionCard.tsx      # 186 líneas
    ├── FilterBar.tsx            # 119 líneas
    └── HistoryHeader.tsx        # 36 líneas
app/
└── (tabs)/
    └── history.tsx              # 110 líneas (orquestación)
```

## Consecuencias

### Positivas
✅ **Mantenibilidad mejorada** - Componentes pequeños y enfocados  
✅ **Reutilización** - TransactionCard puede usarse en otras pantallas  
✅ **Consistencia visual** - Usa constantes del proyecto  
✅ **Type-safety** - Interfaces TypeScript explícitas  
✅ **Testing más fácil** - Componentes aislados son más fáciles de testear  
✅ **Legibilidad** - Código más limpio y organizado  

### Negativas
⚠️ **Dependencia adicional** - `@react-native-community/datetimepicker` añade ~200KB  
⚠️ **Más archivos** - 4 archivos en lugar de 1 (pero mejor organizado)  
⚠️ **Legacy peer deps** - Necesario para resolver conflictos de React  

### Neutral
- Estructura más compleja para nuevos desarrolladores (pero más estándar)
- Requiere actualizar ADRs cuando se modifiquen componentes

## Métricas de Impacto

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Líneas en history.tsx | 306 | 110 | 64% ↓ |
| Componentes reutilizables | 0 | 3 | +3 |
| Colores hardcodeados | ~20 | 0 | 100% ↓ |
| Espaciados hardcodeados | ~15 | 0 | 100% ↓ |
| Tamaños de fuente hardcodeados | ~8 | 0 | 100% ↓ |

## Próximos Pasos

### Inmediatos
- [x] Extraer componentes
- [x] Refactorizar estilos con constantes
- [x] Instalar y configurar DateTimePicker
- [x] Verificar funcionamiento

### Futuro
- [ ] Agregar estados de loading (skeleton screens)
- [ ] Implementar descarga real de PDFs
- [ ] Agregar pull-to-refresh
- [ ] Agregar paginación infinita
- [ ] Animaciones de entrada para cards
- [ ] Tests unitarios para componentes

## Referencias

- [PR #1 - Implementation of History View](https://github.com/GreetyCr/sinpe-davivienda/pull/1)
- [DateTimePicker Docs](https://github.com/react-native-datetimepicker/datetimepicker)
- [React Native Community](https://reactnative.directory/)

## Notas

- El componente `FilterBar` usa `Platform.OS` para adaptar el display del DateTimePicker ('spinner' en iOS, 'calendar' en Android)
- Los filtros son inclusivos: si no hay filtro activo, muestra todas las transacciones
- El estado expandido de las cards se maneja en el componente padre para permitir colapsar otras cards cuando se expande una nueva
- El botón de descarga es placeholder, la implementación real requiere ADR separado para manejo de PDFs

## Aprobadores

- @randallbonilla (Desarrollador Principal)
- Revisado en base a feedback del PR #1 de @BrandonZamoraS

---

**Última actualización:** 2025-11-06  
**Versión:** 1.0.0

