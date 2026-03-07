# Hero Component

A responsive hero section for the TaskEarn micro-task platform with multiple content variations.

## Structure

```
Hero/
├── Hero.jsx         # Main hero component with variations
├── index.js         # Barrel export
└── README.md        # This file
```

## Features

- **Multiple Variations**: 2 different headline/subheadline combinations
- **Dual CTAs**: Primary and secondary call-to-action buttons
- **Trust Indicators**: Stats cards showing platform metrics
- **Feature Highlights**: Quick feature list with icons
- **Responsive Design**: Mobile-first, adapts to all screen sizes
- **Brand Styling**: Uses TaskEarn colors (indigo primary, purple secondary)
- **Visual Elements**: Gradient background with decorative blurs

## Usage

### Basic Usage (Variation 1 - Worker-focused)
```jsx
import Hero from '@/components/Hero';

<Hero variant={1} />
```

### Variation 2 (Buyer-focused)
```jsx
import Hero from '@/components/Hero';

<Hero variant={2} />
```

## Content Variations

### Variation 1: Worker-Focused
**Headline**: "Turn Your Skills Into Income"
**Subheadline**: "Connect with clients who need your expertise. Complete tasks, earn money, and build your reputation on TaskEarn's trusted marketplace."

**CTAs**:
- Primary: "Start Earning Today" → `/register?role=worker`
- Secondary: "Post a Task" → `/register?role=buyer`

### Variation 2: Buyer-Focused
**Headline**: "Get Things Done, Fast"
**Subheadline**: "Find skilled workers ready to tackle your tasks. From quick jobs to complex projects, TaskEarn connects you with the right talent instantly."

**CTAs**:
- Primary: "Find Workers Now" → `/register?role=buyer`
- Secondary: "Browse Tasks" → `/tasks`

## Components

### Stats Cards
Displays platform metrics:
- 10K+ Active Users
- 50K+ Tasks Completed
- 4.8/5 Average Rating
- $2M+ Earned by Workers

### Feature List
Quick highlights:
- Secure payments
- Verified workers
- 24/7 support
- Money-back guarantee

## Styling

- Uses DaisyUI button components (`btn-primary`, `btn-outline`)
- Gradient background with decorative blur elements
- Shadow effects on hover for interactive elements
- Responsive grid layout (1 column mobile, 2 columns desktop)
- Brand colors from globals.css

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | number | 1 | Content variation (1 or 2) |

## Dependencies

- Next.js (Link component)
- Lucide React (icons)
- DaisyUI (button styling)
- Tailwind CSS (utility classes)
