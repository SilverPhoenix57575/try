# Harvey Legal Platform - Premium UI Components

This document provides an overview of the premium UI components and styling enhancements added to the Harvey Legal Platform.

## Table of Contents

1. [Core Components](#core-components)
2. [CSS Enhancements](#css-enhancements)
3. [Animation Effects](#animation-effects)
4. [Usage Examples](#usage-examples)
5. [Best Practices](#best-practices)

## Core Components

### Button Component

A versatile button component with multiple variants, loading states, and premium animations.

```jsx
import Button from '../components/Button';

// Usage examples
<Button variant="primary">Primary Button</Button>
<Button variant="secondary" size="lg">Secondary Button</Button>
<Button variant="glass" loading={true}>Loading Button</Button>
<Button variant="primary" icon={<ArrowRight />}>Button with Icon</Button>
```

### Card Component

A premium card component with hover effects and animation options.

```jsx
import Card from '../components/Card';

// Usage examples
<Card variant="default">Default Card</Card>
<Card variant="glass" hover="lift">Glass Card with Lift Effect</Card>
<Card variant="gradient" hover="glow">Gradient Card with Glow</Card>
<Card variant="highlight" hover="3d">3D Hover Effect</Card>
```

### Input Component

Enhanced input fields with validation states, icons, and animations.

```jsx
import Input from '../components/Input';
import { Mail } from 'lucide-react';

// Usage examples
<Input
  label="Email Address"
  type="email"
  placeholder="Enter your email"
  icon={<Mail className="h-5 w-5" />}
/>

<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

<Input
  label="Username"
  value="johndoe"
  success={true}
/>
```

### Modal Component

A premium modal component with smooth animations and backdrop blur.

```jsx
import Modal from '../components/Modal';
import Button from '../components/Button';

// Usage example
const [isOpen, setIsOpen] = useState(false);

<Button onClick={() => setIsOpen(true)}>Open Modal</Button>

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Premium Modal"
  size="md"
>
  <p>This is a premium modal with smooth animations.</p>
  <div className="mt-6 flex justify-end">
    <Button onClick={() => setIsOpen(false)}>Close</Button>
  </div>
</Modal>
```

### LoadingSpinner Component

A customizable loading spinner with various sizes and colors.

```jsx
import LoadingSpinner from '../components/LoadingSpinner';

// Usage examples
<LoadingSpinner /> {/* Default */}
<LoadingSpinner size="lg" color="secondary" />
<LoadingSpinner size="xl" color="primary" fullScreen={true} />
```

### AnimatedBackground Component

Creates dynamic, animated backgrounds with various effects.

```jsx
import AnimatedBackground from '../components/AnimatedBackground';

// Usage examples
<AnimatedBackground variant="gradient" intensity="medium">
  <div>Your content here</div>
</AnimatedBackground>

<AnimatedBackground variant="particles" intensity="high">
  <div>Content with particle effect background</div>
</AnimatedBackground>

<AnimatedBackground variant="matrix" intensity="low">
  <div>Content with matrix effect background</div>
</AnimatedBackground>
```

## CSS Enhancements

### Premium CSS Variables

We've added a comprehensive set of CSS variables for consistent styling:

```css
/* Colors */
--color-bg-primary: #0a0a0a;
--color-bg-secondary: #111111;
--color-accent-primary: #6366f1;
--color-accent-secondary: #8b5cf6;

/* Shadows */
--shadow-sm: 0 4px 6px rgba(0, 0, 0, 0.3);
--shadow-glow: 0 0 20px rgba(99, 102, 241, 0.3);

/* Gradients */
--gradient-primary: linear-gradient(
  135deg,
  var(--color-accent-primary) 0%,
  var(--color-accent-secondary) 100%
);

/* Transitions */
--transition-spring: 0.6s cubic-bezier(0.22, 1, 0.36, 1);

/* Border Radius */
--radius-md: 12px;
--radius-lg: 16px;
```

### Premium CSS Classes

We've added several premium utility classes:

- `.premium-gradient-text`: Creates text with gradient and glow effect
- `.premium-card`: Enhanced card styling with hover effects
- `.premium-glass`: Glass morphism effect with backdrop blur
- `.premium-border`: Animated gradient border
- `.premium-shadow-glow`: Adds a colored glow shadow
- `.premium-backdrop-blur`: Adds backdrop blur effect

## Animation Effects

### Page Transitions

Smooth transitions between pages using Framer Motion:

```jsx
// In App.js
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    <Route
      path="/"
      element={
        <PageTransition>
          <Home />
        </PageTransition>
      }
    />
    {/* Other routes */}
  </Routes>
</AnimatePresence>
```

### Micro-interactions

Small animations that provide feedback on user interactions:

- Button hover and tap animations
- Input focus animations
- Card hover effects
- Menu open/close animations

### Scroll Animations

Elements that animate as they come into view:

```jsx
// Using Framer Motion's useInView hook
const ref = useRef(null);
const isInView = useInView(ref, { once: false, amount: 0.2 });
const controls = useAnimation();

useEffect(() => {
  if (isInView) controls.start("visible");
}, [isInView, controls]);

<motion.div ref={ref} variants={variants} initial="hidden" animate={controls}>
  Content that animates when scrolled into view
</motion.div>;
```

## Usage Examples

### Premium Login Form

```jsx
<AnimatedBackground variant="gradient">
  <Card variant="glass">
    <h2 className="premium-gradient-text">Welcome Back</h2>

    <Input label="Email" icon={<Mail />} placeholder="Enter your email" />

    <Input
      label="Password"
      type="password"
      icon={<Lock />}
      placeholder="Enter your password"
    />

    <Button variant="primary" fullWidth>
      Sign In
      <ArrowRight />
    </Button>
  </Card>
</AnimatedBackground>
```

### Premium Feature Card

```jsx
<Card variant="highlight" hover="lift" className="premium-shadow-glow">
  <div className="p-6">
    <div className="mb-4 text-indigo-400">
      <FileText className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-semibold mb-2">Document Generation</h3>
    <p className="text-gray-400">
      Create professional legal documents with our AI-powered system.
    </p>
  </div>
</Card>
```

## Best Practices

1. **Consistent Component Usage**

   - Use the provided components instead of creating new ones
   - Maintain consistent props and styling

2. **Performance Considerations**

   - Use `whileInView` for scroll animations to improve performance
   - Add `viewport={{ once: true }}` for one-time animations
   - Use `layoutId` for shared element transitions

3. **Responsive Design**

   - All components are responsive by default
   - Use the size props to adjust for different screen sizes
   - Test on multiple device sizes

4. **Accessibility**

   - All components maintain proper focus states
   - Animations respect user preferences via `prefers-reduced-motion`
   - Maintain proper contrast ratios for text

5. **Code Organization**
   - Import components from their respective files
   - Group related animations and states together
   - Use consistent naming conventions

---

By following these guidelines and utilizing the premium components, you can maintain a consistent, high-quality user experience throughout the Harvey Legal Platform.
