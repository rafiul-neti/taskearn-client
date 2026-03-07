import Link from "next/link";
import { ArrowRight, LogIn, Briefcase, DollarSign, Users, CheckCircle, Zap, TrendingUp } from "lucide-react";

/**
 * Hero Section Component for TaskEarn Platform
 * Features multiple headline/subheadline variations
 * Includes authentication-aware primary and secondary CTAs
 * Responsive design with Tailwind CSS and DaisyUI
 * Server Component - receives session from parent
 */
const Hero = ({ variant = "default", session = null }) => {

  // Headline and subheadline variations
  const headlineVariations = {
    default: {
      headline: "Earn Money Completing Simple Tasks",
      subheadline: "Join thousands of workers earning extra income by completing micro-tasks from anywhere in the world."
    },
    alternative: {
      headline: "Get Tasks Done or Make Money on Your Schedule",
      subheadline: "A marketplace connecting task creators with skilled workers. Post tasks or complete them—you choose."
    }
  };

  const selectedContent = headlineVariations[variant] || headlineVariations.default;

  // Role-based dashboard routing
  const getDashboardRoute = (role) => {
    const dashboardRoutes = {
      BUYER: "/dashboard/buyer",
      WORKER: "/dashboard/worker",
      ADMIN: "/dashboard/admin"
    };
    return dashboardRoutes[role] || "/dashboard";
  };

  // Authentication-aware CTA configuration
  const getCTAConfig = () => {
    if (session?.user) {
      return {
        primary: {
          text: "Go to Dashboard",
          href: getDashboardRoute(session.user.role),
          disabled: false
        },
        secondary: {
          text: "Browse Tasks",
          href: "/tasks",
          disabled: false
        }
      };
    }

    // Logged-out state
    return {
      primary: {
        text: "Get Started Free",
        href: "/register",
        disabled: false
      },
      secondary: {
        text: "How It Works",
        href: "/#how-it-works",
        disabled: false
      }
    };
  };

  const ctaConfig = getCTAConfig();
  const isAuthenticated = !!session?.user;

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 overflow-hidden min-h-[600px] flex items-center">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/30 to-orange-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        
        {/* Floating icons */}
        <div className="absolute top-20 left-10 opacity-20 animate-bounce">
          <Briefcase size={40} className="text-blue-600" />
        </div>
        <div className="absolute top-40 right-20 opacity-20 animate-bounce delay-300">
          <DollarSign size={48} className="text-green-600" />
        </div>
        <div className="absolute bottom-32 left-1/4 opacity-20 animate-bounce delay-500">
          <Users size={36} className="text-purple-600" />
        </div>
        <div className="absolute bottom-20 right-1/3 opacity-20 animate-bounce delay-700">
          <Zap size={44} className="text-yellow-600" />
        </div>
        <div className="absolute top-1/3 right-10 opacity-20 animate-bounce delay-1000">
          <TrendingUp size={38} className="text-pink-600" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <CheckCircle size={16} className="text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                Trusted by 10,000+ users worldwide
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent mb-6 leading-tight">
              {selectedContent.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              {selectedContent.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              {/* Primary CTA */}
              <Link
                href={ctaConfig.primary.href}
                className={`btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
                  ctaConfig.primary.disabled ? "btn-disabled" : ""
                }`}
                aria-label={ctaConfig.primary.text}
              >
                {isAuthenticated ? <ArrowRight size={20} /> : <LogIn size={20} />}
                {ctaConfig.primary.text}
              </Link>

              {/* Secondary CTA */}
              <Link
                href={ctaConfig.secondary.href}
                className={`btn btn-outline btn-lg gap-2 hover:scale-105 transition-all ${
                  ctaConfig.secondary.disabled ? "btn-disabled" : ""
                }`}
                aria-label={ctaConfig.secondary.text}
              >
                {ctaConfig.secondary.text}
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle size={16} className="text-green-600" />
                <span>Secure payments</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle size={16} className="text-green-600" />
                <span>Verified workers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <CheckCircle size={16} className="text-green-600" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Stats */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {/* Stat Card 1 */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Users size={24} className="text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  10K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Active Users
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                  50K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Tasks Completed
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <TrendingUp size={24} className="text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  4.8/5
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average Rating
                </div>
              </div>

              {/* Stat Card 4 */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 transition-transform">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <DollarSign size={24} className="text-yellow-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-1">
                  $2M+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Earned by Workers
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg rotate-12 animate-pulse">
              <div className="text-sm font-semibold flex items-center gap-2">
                <Zap size={16} />
                <span>Trending Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
