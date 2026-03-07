# Testimonials Section - Installation Guide

## Quick Start

### 1. Install Swiper.js
Run this command in the `frontend` directory:

```bash
npm install swiper
```

Or if using yarn:
```bash
yarn add swiper
```

### 2. Verify Installation
The component is already integrated into your home page. After installing Swiper, run:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the Testimonials section in action.

## What's Included

### Files Created
```
frontend/src/components/Testimonials/
├── Testimonials.jsx          # Main component with Swiper integration
├── mockData.js               # 6 realistic testimonial objects
├── swiperConfig.js           # Swiper configuration with breakpoints
├── index.js                  # Barrel export
├── README.md                 # Component documentation
└── INSTALLATION.md           # This file
```

### Features Implemented
✅ Responsive carousel (1 → 2 → 3 slides)
✅ Navigation arrows (desktop only)
✅ Pagination dots with dynamic bullets
✅ Autoplay with pause on hover (5s delay)
✅ Keyboard navigation (arrow keys)
✅ Touch/swipe support (mobile)
✅ Accessibility (ARIA labels)
✅ Dark mode support
✅ 6 realistic testimonials (workers + buyers)

## Configuration Options

### Swiper Settings (swiperConfig.js)

#### Current Configuration
- **Slides per view**: 1 (mobile) → 2 (tablet) → 3 (desktop)
- **Space between**: 24px (mobile/tablet) → 30px (desktop)
- **Autoplay delay**: 5000ms (5 seconds)
- **Loop**: Enabled
- **Speed**: 600ms
- **Grab cursor**: Enabled

#### Customization Examples

**Disable Autoplay**
```javascript
// In page.jsx
<Testimonials enableAutoplay={false} />
```

**Change Slides Per View**
```javascript
// In swiperConfig.js
breakpoints: {
  1024: {
    slidesPerView: 4,  // Show 4 slides on desktop
    spaceBetween: 30
  }
}
```

**Adjust Autoplay Speed**
```javascript
// In swiperConfig.js
autoplay: {
  delay: 3000,  // 3 seconds instead of 5
  disableOnInteraction: false,
  pauseOnMouseEnter: true
}
```

## Usage Examples

### Basic Usage (Already Implemented)
```javascript
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return <Testimonials />;
}
```

### With Custom Data
```javascript
import Testimonials from "@/components/Testimonials";

const myTestimonials = [
  {
    id: "custom_001",
    name: "Jane Smith",
    role: "Content Creator",
    userType: "worker",
    avatar: "https://example.com/avatar.jpg",
    rating: 5,
    text: "Amazing platform for freelancers!",
    tasksCompleted: 500,
    location: "Toronto, Canada"
  }
];

export default function Page() {
  return <Testimonials testimonials={myTestimonials} />;
}
```

### Fetch from API
```javascript
// Server Component
async function TestimonialsSection() {
  const response = await fetch('https://api.example.com/testimonials');
  const testimonials = await response.json();
  
  return <Testimonials testimonials={testimonials} />;
}
```

## Troubleshooting

### Issue: "Cannot find module 'swiper'"
**Solution**: Install Swiper
```bash
cd frontend
npm install swiper
```

### Issue: Carousel not sliding
**Solution**: Ensure you're using the component as a Client Component. The `"use client"` directive is already included.

### Issue: Navigation buttons not showing
**Solution**: Navigation buttons are hidden on mobile by design. Test on desktop or tablet viewport (>768px).

### Issue: Styles not applying
**Solution**: 
1. Verify Swiper CSS imports in component
2. Clear Next.js cache: `rm -rf .next`
3. Restart dev server: `npm run dev`

### Issue: Autoplay not working
**Solution**: 
- Check that `enableAutoplay={true}` (default)
- Some browsers block autoplay - interact with page first
- Verify Autoplay module is imported in component

## Browser Compatibility

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ iOS Safari 14+
✅ Chrome Mobile 90+

## Performance Notes

- Swiper is dynamically imported (code splitting)
- Only loads when component mounts
- Lazy loading enabled for images
- Optimized for Next.js SSR

## Next Steps

1. **Install Swiper**: `npm install swiper`
2. **Start dev server**: `npm run dev`
3. **View testimonials**: Navigate to homepage
4. **Customize**: Edit `swiperConfig.js` or `mockData.js`
5. **Connect API**: Replace mock data with real testimonials

## Support

For Swiper.js documentation: https://swiperjs.com/
For issues: Check component README.md
