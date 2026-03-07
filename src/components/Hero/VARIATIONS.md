# Hero Section - Content Variations

## Overview
The Hero component supports multiple content variations to target different user personas (workers vs buyers). Each variation includes unique headlines, subheadlines, and CTAs optimized for conversion.

---

## Variation 1: Worker-Focused 🎯

**Target Audience**: Freelancers, gig workers, people looking to earn money

### Content

**Headline**
```
Turn Your Skills Into Income
```

**Subheadline**
```
Connect with clients who need your expertise. Complete tasks, earn money, 
and build your reputation on TaskEarn's trusted marketplace.
```

### Call-to-Actions

**Primary CTA**
- Text: "Start Earning Today"
- Icon: DollarSign (💵)
- Destination: `/register?role=worker`
- Style: Primary button (indigo)
- Purpose: Direct conversion to worker registration

**Secondary CTA**
- Text: "Post a Task"
- Icon: Briefcase (💼)
- Destination: `/register?role=buyer`
- Style: Outline button
- Purpose: Alternative path for users who want to hire

### Usage
```jsx
<Hero variant={1} />
```

---

## Variation 2: Buyer-Focused 🎯

**Target Audience**: Businesses, individuals needing tasks completed, project managers

### Content

**Headline**
```
Get Things Done, Fast
```

**Subheadline**
```
Find skilled workers ready to tackle your tasks. From quick jobs to complex 
projects, TaskEarn connects you with the right talent instantly.
```

### Call-to-Actions

**Primary CTA**
- Text: "Find Workers Now"
- Icon: Users (👥)
- Destination: `/register?role=buyer`
- Style: Primary button (indigo)
- Purpose: Direct conversion to buyer registration

**Secondary CTA**
- Text: "Browse Tasks"
- Icon: ArrowRight (→)
- Destination: `/tasks`
- Style: Outline button
- Purpose: Exploration path to see available tasks

### Usage
```jsx
<Hero variant={2} />
```

---

## Common Elements (Both Variations)

### Trust Badge
```
✓ Trusted by thousands
```
- Positioned above headline
- Primary color background with opacity
- Includes checkmark icon

### Feature List
All variations include these trust indicators:
- ✓ Secure payments
- ✓ Verified workers
- ✓ 24/7 support
- ✓ Money-back guarantee

### Stats Cards
Platform metrics displayed in grid:
- **10K+** Active Users
- **50K+** Tasks Completed
- **4.8/5** Average Rating
- **$2M+** Earned by Workers

### Visual Elements
- Gradient background (base-200 → base-100 → base-200)
- Decorative blur circles (primary and secondary colors)
- Floating "🔥 Trending" badge (desktop only)
- Shadow effects on hover

---

## A/B Testing Recommendations

### Test Scenarios

1. **Worker Landing Page**
   - Use Variation 1 as default
   - Test headline variations focusing on "income" vs "earnings"
   - Test CTA text: "Start Earning" vs "Join Now" vs "Get Started"

2. **Buyer Landing Page**
   - Use Variation 2 as default
   - Test headline variations focusing on "speed" vs "quality"
   - Test CTA text: "Find Workers" vs "Post a Task" vs "Get Started"

3. **Homepage (Mixed Audience)**
   - A/B test between Variation 1 and 2
   - Consider creating a neutral Variation 3 that appeals to both
   - Track conversion rates by user type

### Metrics to Track
- Click-through rate on primary CTA
- Click-through rate on secondary CTA
- Time on page
- Scroll depth
- Registration completion rate by source

---

## Customization Guide

### Adding New Variations

To add a new variation, update the `content` object in `Hero.jsx`:

```jsx
const content = {
  1: { /* Variation 1 */ },
  2: { /* Variation 2 */ },
  3: {
    headline: "Your New Headline",
    subheadline: "Your new subheadline text...",
    primaryCTA: {
      text: "Primary Action",
      destination: "/path",
      icon: IconComponent
    },
    secondaryCTA: {
      text: "Secondary Action",
      destination: "/path",
      icon: IconComponent
    }
  }
};
```

### Modifying Stats
Update the `stats` array in `Hero.jsx`:

```jsx
const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Tasks Completed" },
  // Add or modify stats here
];
```

### Changing Features
Update the `features` array in `Hero.jsx`:

```jsx
const features = [
  "Secure payments",
  "Verified workers",
  // Add or modify features here
];
```

---

## Best Practices

### Headlines
- Keep under 10 words
- Focus on primary benefit
- Use action-oriented language
- Make it scannable

### Subheadlines
- Expand on the headline
- Address pain points
- Keep under 30 words
- Include social proof when possible

### CTAs
- Use action verbs
- Create urgency when appropriate
- Make the value clear
- Ensure high contrast for visibility

### Icons
- Use icons that reinforce the action
- Keep icon size consistent (18-20px)
- Ensure icons are recognizable
- Don't overuse icons

---

## Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Centered text alignment
- Stacked CTAs (full width)
- 2x2 stats grid
- Reduced padding

### Tablet (640px - 1024px)
- Single column layout
- Left-aligned text
- Side-by-side CTAs
- 2x2 stats grid
- Standard padding

### Desktop (> 1024px)
- Two column layout
- Left: Content
- Right: Stats cards
- Floating badge visible
- Maximum width container (7xl)

---

## Accessibility

- All CTAs are keyboard accessible
- Proper heading hierarchy (h1 for headline)
- Sufficient color contrast (WCAG AA)
- Icons have semantic meaning
- Responsive text sizing
- Focus indicators on interactive elements
