# Testimonials Section - Documentation

## Overview
Interactive testimonials carousel built with Swiper.js showcasing real user feedback from both workers and buyers on the TaskEarn platform.

## Features
- Responsive carousel with breakpoints (1 → 2 → 3 slides)
- Navigation arrows (desktop only)
- Pagination dots with dynamic bullets
- Optional autoplay with pause on hover
- Keyboard navigation support
- Full accessibility (ARIA labels)
- Smooth transitions and animations
- Dark mode support

## Installation

### Install Swiper.js
```bash
npm install swiper
```

## Usage

### Basic Usage
```javascript
import Testimonials from "@/components/Testimonials";

export default function Page() {
  return <Testimonials />;
}
```

### With Custom Data
```javascript
import Testimonials from "@/components/Testimonials";

const customTestimonials = [
  {
    id: "test_001",
    name: "John Doe",
    role: "Developer",
    userType: "worker",
    avatar: "https://example.com/avatar.jpg",
    rating: 5,
    text: "Great platform!",
    tasksCompleted: 100,
    location: "New York, USA"
  }
];

export default function Page() {
  return <Testimonials testimonials={customTestimonials} />;
}
```

### Disable Autoplay
```javascript
<Testimonials enableAutoplay={false} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `testimonials` | Array | `mockTestimonials` | Array of testimonial objects |
| `enableAutoplay` | Boolean | `true` | Enable/disable autoplay |

## Testimonial Object Structure

```javascript
{
  id: "string",              // Unique identifier
  name: "string",            // User's full name
  role: "string",            // Job title or role
  userType: "string",        // "worker" or "buyer"
  avatar: "string",          // Profile image URL
  rating: number,            // 1-5 stars
  text: "string",            // Testimonial content
  tasksCompleted: number,    // For workers
  tasksPosted: number,       // For buyers
  joinedDate: "string",      // ISO date
  location: "string"         // City, Country
}
```

## Swiper Configuration

### Breakpoints
- Mobile (< 640px): 1 slide per view
- Tablet (640px - 1024px): 2 slides per view
- Desktop (> 1024px): 3 slides per view

### Navigation
- Arrow buttons (hidden on mobile)
- Keyboard support (arrow keys)
- Pagination dots (always visible)

### Autoplay Settings
- Delay: 5000ms (5 seconds)
- Pauses on hover
- Continues after interaction
- Can be disabled via prop

## Customization

### Modify Swiper Config
Edit `swiperConfig.js` to customize:
- Slides per view
- Spacing between slides
- Autoplay timing
- Transition effects
- Navigation behavior

### Alternative Configurations
```javascript
import { swiperConfigManual } from "./swiperConfig";
// Manual control only (no autoplay)

import { swiperConfigMobileAutoplay } from "./swiperConfig";
// Autoplay on mobile only
```

### Styling
The component uses Tailwind CSS and DaisyUI. Custom Swiper styles are included inline for:
- Pagination bullet colors
- Navigation button styling
- Hover effects
- Responsive visibility

## Accessibility
- Semantic HTML (`<article>`, `<section>`)
- ARIA labels for navigation
- Keyboard navigation enabled
- Screen reader friendly
- Alt text for images
- Focus indicators

## Performance
- Dynamic import of Swiper (code splitting)
- Lazy loading for images
- Optimized for SSR (Next.js)
- Cleanup on unmount

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Swiper not initializing
- Ensure Swiper is installed: `npm install swiper`
- Check that component is client-side: `"use client"` directive

### Styles not loading
- Verify Swiper CSS imports in component
- Check Tailwind configuration

### Autoplay not working
- Ensure `enableAutoplay={true}` prop is set
- Check browser autoplay policies
- Verify Autoplay module is imported

## Examples

### With API Data
```javascript
async function TestimonialsSection() {
  const testimonials = await fetch('/api/testimonials').then(r => r.json());
  return <Testimonials testimonials={testimonials} />;
}
```

### Custom Styling
```javascript
<div className="bg-gray-100 py-20">
  <Testimonials />
</div>
```
