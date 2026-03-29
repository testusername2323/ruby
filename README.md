# Ruby Music Services (RMS) - Premium Music Label Website

A modern, dark-themed, luxury music record label website with premium animations and interactive features.

## Features

✨ **Premium Design**
- Full black (#000000) background with white (#FFFFFF) typography
- Minimal, futuristic, Spotify/Apple Music inspired aesthetic
- Film grain noise overlay for texture

🎬 **Hero Section**
- Full-screen cinematic video background
- Animated logo with glow effects
- Parallax mouse movement
- Smooth entrance animations

🎚️ **Interactive Slider**
- Swiper.js powered carousel
- Center-focused with blur effects on sides
- Autoplay with smooth transitions
- Hover overlays with artist/track info

🎨 **Advanced Effects**
- 3D tilt effect on cards (cursor-based)
- Glassmorphism (backdrop blur)
- Glow effects on hover
- Ripple effect on button clicks
- Custom cursor with "PLAY" indicator
- GSAP scroll animations

🎧 **Interactive Elements**
- Artist cards with hover overlays
- Release grid with masonry layout
- Smooth scroll navigation
- Responsive design (mobile/tablet/desktop)

## Tech Stack

- HTML5, CSS3, JavaScript
- GSAP (animations & ScrollTrigger)
- Swiper.js (slider)
- Custom cursor system
- Responsive grid layouts

## Setup

1. Open `index.html` in a modern browser
2. Ensure internet connection for CDN resources (GSAP, Swiper)
3. For best experience, use Chrome/Firefox/Safari

## Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --black: #000000;
    --white: #FFFFFF;
    --gray: #333333;
}
```

### Replace Video
Update the video source in `index.html`:
```html
<source src="your-video.mp4" type="video/mp4">
```

### Add Artists/Releases
Duplicate card elements in the HTML and update images/text.

## Performance

- Optimized animations (GPU-accelerated)
- Lazy loading ready
- Minimal dependencies
- Smooth 60fps scrolling

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

© 2024 Ruby Music Services. All rights reserved.
