"use client";

import { useEffect, useRef } from "react";
import { Star, Quote, Briefcase, ShoppingBag } from "lucide-react";
import { mockTestimonials } from "./mockData";
import { swiperConfig } from "./swiperConfig";

/**
 * Testimonials Section Component with Swiper.js
 * Features responsive carousel with navigation, pagination, and autoplay
 * Displays user testimonials from both workers and buyers
 */
const Testimonials = ({ testimonials = mockTestimonials, enableAutoplay = true }) => {
  const swiperRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    // Dynamically import Swiper to avoid SSR issues
    const initSwiper = async () => {
      const Swiper = (await import("swiper")).default;
      const { Navigation, Pagination, Autoplay, Keyboard, A11y } = await import("swiper/modules");
      
      // Import Swiper styles
      await import("swiper/css");
      await import("swiper/css/navigation");
      await import("swiper/css/pagination");

      if (swiperRef.current && !swiperInstanceRef.current) {
        const config = {
          ...swiperConfig,
          modules: [Navigation, Pagination, Autoplay, Keyboard, A11y]
        };

        // Disable autoplay if prop is false
        if (!enableAutoplay) {
          config.autoplay = false;
        }

        swiperInstanceRef.current = new Swiper(swiperRef.current, config);
      }
    };

    initSwiper();

    // Cleanup
    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [enableAutoplay]);

  return (
    <section className="relative bg-white dark:bg-gray-900 py-16 lg:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-pink-400/10 to-orange-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            <Quote size={16} className="text-blue-600" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Trusted by Thousands
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent mb-4">
            What Our Users Say
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real stories from workers earning income and businesses getting tasks done efficiently.
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative">
          <div ref={swiperRef} className="swiper testimonials-swiper">
            <div className="swiper-wrapper pb-12">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="swiper-slide">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="swiper-button-prev !w-10 !h-10 !bg-white dark:!bg-gray-800 !rounded-full !shadow-lg after:!text-sm after:!font-bold after:!text-blue-600"></div>
            <div className="swiper-button-next !w-10 !h-10 !bg-white dark:!bg-gray-800 !rounded-full !shadow-lg after:!text-sm after:!font-bold after:!text-blue-600"></div>

            {/* Pagination */}
            <div className="swiper-pagination !bottom-0"></div>
          </div>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: #6366f1;
          opacity: 0.3;
          width: 10px;
          height: 10px;
        }
        
        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 5px;
        }

        .testimonials-swiper .swiper-button-prev,
        .testimonials-swiper .swiper-button-next {
          transition: all 0.3s ease;
        }

        .testimonials-swiper .swiper-button-prev:hover,
        .testimonials-swiper .swiper-button-next:hover {
          transform: scale(1.1);
        }

        .testimonials-swiper .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .testimonials-swiper .swiper-button-prev,
          .testimonials-swiper .swiper-button-next {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

/**
 * Individual Testimonial Card Component
 */
const TestimonialCard = ({ testimonial }) => {
  const {
    name,
    role,
    userType,
    avatar,
    rating,
    text,
    tasksCompleted,
    tasksPosted,
    location
  } = testimonial;

  return (
    <article className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 h-full flex flex-col">
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote size={40} className="text-blue-600/20" />
      </div>

      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className={`${
              index < rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-300 dark:text-gray-600"
            }`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 dark:text-gray-300 text-base lg:text-lg leading-relaxed mb-6 flex-grow">
        "{text}"
      </p>

      {/* User Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-14 h-14 rounded-full border-2 border-white dark:border-gray-700 shadow-md"
        />
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 dark:text-white text-lg truncate">
            {name}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {role}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {location}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              {userType === "worker" ? (
                <>
                  <Briefcase size={12} />
                  <span>{tasksCompleted} tasks</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={12} />
                  <span>{tasksPosted} posted</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* User Type Badge */}
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          userType === "worker"
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
            : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
        }`}>
          {userType === "worker" ? "Worker" : "Buyer"}
        </div>
      </div>
    </article>
  );
};

export default Testimonials;
