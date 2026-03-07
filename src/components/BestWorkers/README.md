# Best Workers Section - UI Specification

## Overview
Showcases top-performing workers on the platform to build trust and encourage task posting. Features worker profiles with ratings, completion stats, and specializations.

## Design Specifications

### Layout
- Full-width section with max-width container (max-w-7xl)
- Responsive grid: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Card-based design with hover effects
- Gradient background matching Hero section aesthetic

### Visual Elements
- **Section Header**: Centered title + subtitle
- **Worker Cards**: Profile image, name, rating, stats, skills
- **CTA Button**: "View All Workers" link at bottom

### Card Components
Each worker card includes:
1. Profile avatar (circular, 80px)
2. Worker name + verification badge
3. Star rating (out of 5) + review count
4. Key statistics (tasks completed, success rate, earnings)
5. Skill tags (max 3 visible)
6. "View Profile" button

### Color Scheme
- Primary: Indigo/Purple gradient (brand colors)
- Background: Light gradient (blue-50 → purple-50 → pink-50)
- Cards: White with subtle shadow and border
- Accent: Green for success metrics, gold for ratings

### Responsive Breakpoints
- Mobile: < 640px (1 column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: > 1024px (3 columns)

## Accessibility
- Semantic HTML (section, article tags)
- ARIA labels for interactive elements
- Keyboard navigation support
- Alt text for profile images
- Sufficient color contrast ratios

## Animation
- Hover: Scale transform (1.02x) + shadow enhancement
- Entrance: Stagger fade-in (optional)
- Smooth transitions (200-300ms)
