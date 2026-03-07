/**
 * Swiper.js Configuration for Testimonials Carousel
 * Optimized for responsive design with breakpoints
 */

export const swiperConfig = {
  // Slides per view configuration
  slidesPerView: 1,
  spaceBetween: 24,
  
  // Responsive breakpoints
  breakpoints: {
    // Mobile (>= 640px)
    640: {
      slidesPerView: 1,
      spaceBetween: 24
    },
    // Tablet (>= 768px)
    768: {
      slidesPerView: 2,
      spaceBetween: 24
    },
    // Desktop (>= 1024px)
    1024: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  },

  // Navigation arrows
  navigation: {
    enabled: true,
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },

  // Pagination dots
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 3
  },

  // Autoplay configuration (optional - can be enabled/disabled)
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },

  // Loop mode
  loop: true,

  // Smooth transitions
  speed: 600,
  effect: 'slide',

  // Grab cursor
  grabCursor: true,

  // Keyboard control
  keyboard: {
    enabled: true,
    onlyInViewport: true
  },

  // Accessibility
  a11y: {
    enabled: true,
    prevSlideMessage: 'Previous testimonial',
    nextSlideMessage: 'Next testimonial',
    firstSlideMessage: 'This is the first testimonial',
    lastSlideMessage: 'This is the last testimonial',
    paginationBulletMessage: 'Go to testimonial {{index}}'
  },

  // Lazy loading for images
  lazy: {
    loadPrevNext: true,
    loadPrevNextAmount: 2
  },

  // Watch for DOM changes
  observer: true,
  observeParents: true,
  observeSlideChildren: true
};

/**
 * Alternative configuration without autoplay
 * Use this if you want manual control only
 */
export const swiperConfigManual = {
  ...swiperConfig,
  autoplay: false
};

/**
 * Configuration for mobile-only autoplay
 * Autoplay disabled on desktop for better UX
 */
export const swiperConfigMobileAutoplay = {
  ...swiperConfig,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  on: {
    init: function() {
      if (window.innerWidth >= 1024) {
        this.autoplay.stop();
      }
    },
    resize: function() {
      if (window.innerWidth >= 1024) {
        this.autoplay.stop();
      } else {
        this.autoplay.start();
      }
    }
  }
};
