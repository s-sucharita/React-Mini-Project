# UI Design System

## Color Palette

### Primary Colors
- **Slate-950**: `#030712` - Main background
- **Slate-900**: `#111827` - Card backgrounds
- **Slate-800**: `#1f2937` - Input/secondary backgrounds
- **Slate-700**: `#374151` - Borders and dividers

### Accent Colors
- **Blue-600**: `#2563eb` - Primary action buttons
- **Blue-700**: `#1d4ed8` - Button hover state
- **Purple-600**: `#9333ea` - Secondary accent
- **Purple-700**: `#7e22ce` - Secondary hover

### Semantic Colors
- **Green-900**: `#064e3b` - Success background
- **Green-200**: `#bbf7d0` - Success text
- **Red-900**: `#7f1d1d` - Error background  
- **Red-200**: `#fecaca` - Error text

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

### Font Sizes
- **Display**: 4xl (36px) - Page title
- **Heading**: 3xl (30px) - Section titles
- **Title**: 2xl (24px) - Card titles
- **Base**: 1lg (18px) - Body text
- **Small**: 1sm (14px) - Captions
- **Tiny**: 1xs (12px) - Footer

## Spacing

### Margin/Padding Units (Tailwind)
- `p-2`: 0.5rem (8px)
- `p-3`: 0.75rem (12px)
- `p-4`: 1rem (16px)
- `p-6`: 1.5rem (24px)
- `p-8`: 2rem (32px)

### Gap/Spacing
- `gap-2`: 0.5rem - Tight spacing
- `gap-3`: 0.75rem - Normal spacing
- `gap-4`: 1rem - Comfortable spacing
- `mb-4`: Bottom margin for sections
- `mb-8`: Large bottom margin

## Border Radius

- `rounded-lg`: 0.5rem (8px) - Standard
- `rounded-xl`: 0.75rem (12px) - Inputs/buttons
- `rounded-2xl`: 1rem (16px) - Cards
- `rounded-full`: 9999px - Circles

## Shadows

- `shadow-lg`: Subtle depth for cards
- `shadow-2xl`: Strong depth for modals
- No shadow on hover elements (cleaner)

## Component Specifications

### Authentication Form
```
Container:
- bg-slate-800
- rounded-2xl
- p-8
- border border-slate-700
- shadow-2xl

Input Fields:
- bg-slate-700/50
- border border-slate-600
- rounded-lg
- px-4 py-2
- focus:border-blue-500
- focus:ring-2 focus:ring-blue-500/20

Buttons:
- bg-blue-600 hover:bg-blue-700
- text-white
- py-2 rounded-lg
- font-semibold
- transition
```

### Task Item
```
Default:
- bg-slate-800
- border border-slate-700
- hover:border-blue-500 hover:bg-slate-700
- p-4 rounded-xl

Completed:
- opacity-60
- line-through
- text-slate-500

Delete Button:
- text-red-400
- hover:bg-red-500/10
- rounded-lg
- p-2
```

### Header/Hero
```
- bg-gradient-to-r from-blue-600 to-purple-600
- rounded-2xl
- p-8
- shadow-lg
- text-white
```

### Progress Bar
```
Background:
- bg-slate-700
- rounded-full
- h-2

Fill:
- bg-gradient-to-r from-blue-500 to-purple-500
- h-2
- rounded-full
- transition-all
```

## Animation Timings

### Transitions
- `transition`: 150ms default
- `duration-200`: 200ms for interactions
- `duration-300`: 300ms for significant changes

### Keyframes
- **fadeIn**: 0.3s ease-out
  - From: opacity 0, translateY 10px
  - To: opacity 1, translateY 0

- **slideIn**: 0.3s ease-out
  - From: opacity 0, translateX -20px
  - To: opacity 1, translateX 0

## Responsive Breakpoints

- Mobile: Default (< 640px)
- Tablet: sm and up (640px+)
- Desktop: md and up (768px+)
- Large: lg and up (1024px+)

## Accessibility

### Focus States
- All interactive elements have visible focus states
- Ring-2 with blue-500 color on focus
- Color contrast meets WCAG AA standards

### Keyboard Navigation
- Tab order is logical
- All buttons/inputs are keyboard accessible
- Disabled states are clearly visible

## Interactive States

### Buttons
- **Default**: bg-blue-600, text-white
- **Hover**: bg-blue-700
- **Focus**: ring-2 ring-blue-500/20
- **Disabled**: opacity-50, cursor-not-allowed
- **Loading**: Spinner animation

### Inputs
- **Default**: border-slate-600, bg-slate-700
- **Focus**: border-blue-500, ring-2 ring-blue-500/20
- **Error**: border-red-500, bg-red-500/10
- **Disabled**: opacity-50

## Code Examples

### Button Component Style
```jsx
<button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
  Action
</button>
```

### Card Component Style
```jsx
<div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 shadow-lg">
  Content
</div>
```

### Gradient Background
```jsx
<div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8">
  Gradient content
</div>
```

---

**Last Updated**: November 12, 2025
**Design System Version**: 1.0
