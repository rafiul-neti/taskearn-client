# Navbar Component

A responsive navigation bar component with authentication-aware navigation and mobile drawer support.

## Structure

```
Navbar/
├── Navbar.jsx       # Main navbar component with desktop and mobile layouts
├── NavLink.jsx      # Reusable navigation link with active state highlighting
├── index.js         # Barrel export for clean imports
└── README.md        # This file
```

## Components

### Navbar.jsx
Main navigation component that:
- Shows different navigation based on authentication state
- Provides responsive desktop and mobile (drawer) layouts
- Integrates with NextAuth.js for session management
- Implements accessibility features (ARIA labels, keyboard navigation, focus trap)
- Uses TaskEarn brand colors from globals.css

### NavLink.jsx
Reusable navigation link component that:
- Automatically highlights the active route
- Supports DaisyUI button variants (ghost, primary, etc.)
- Works with Lucide React icons
- Adapts styling for mobile drawer layout
- Provides consistent active state indication

## Usage

### Basic Import
```jsx
import Navbar from '@/components/Navbar';
```

### Using NavLink Separately
```jsx
import { NavLink } from '@/components/Navbar';

<NavLink href="/about" variant="ghost" icon={InfoIcon}>
  About
</NavLink>
```

## Features

- **Authentication-aware**: Shows different links for logged-in/logged-out users
- **Role-based routing**: Dashboard link routes to role-specific pages (BUYER, WORKER, ADMIN)
- **Responsive**: Desktop horizontal layout, mobile drawer menu
- **Accessible**: ARIA labels, keyboard navigation, focus management
- **Active state**: Current page is visually highlighted
- **Brand styling**: Uses TaskEarn colors (indigo primary, purple secondary)

## Dependencies

- Next.js (App Router)
- NextAuth.js (session management)
- Lucide React (icons)
- DaisyUI (component styling)
- Tailwind CSS (utility classes)
