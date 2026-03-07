import Link from "next/link";
import { Star, CheckCircle, TrendingUp, Award, Clock } from "lucide-react";
import { mockWorkers } from "./mockData";

/**
 * Best Workers Section Component
 * Showcases top-performing workers with ratings, stats, and skills
 * Uses mock data by default, can be replaced with API data
 */
const BestWorkers = ({ workers = mockWorkers, limit = 6 }) => {
  const displayWorkers = workers.slice(0, limit);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-16 lg:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-tr from-pink-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            <Award size={16} className="text-purple-600" />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
              Top Rated Professionals
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 dark:from-white dark:via-purple-200 dark:to-blue-200 bg-clip-text text-transparent mb-4">
            Meet Our Best Workers
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Trusted professionals with proven track records. Get your tasks done by the best in the business.
          </p>
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href="/workers"
            className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            aria-label="View all workers"
          >
            View All Workers
            <TrendingUp size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

/**
 * Individual Worker Card Component
 */
const WorkerCard = ({ worker }) => {
  const {
    id,
    name,
    avatar,
    isVerified,
    rating,
    reviewCount,
    stats,
    skills,
    responseTime
  } = worker;

  return (
    <article className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:scale-102 hover:shadow-xl transition-all duration-300">
      {/* Profile Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={avatar}
            alt={`${name}'s profile`}
            className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-700 shadow-md"
          />
          {isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
              <CheckCircle size={16} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
            {name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-gray-900 dark:text-white">
                {rating.toFixed(1)}
              </span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({reviewCount} reviews)
            </span>
          </div>

          {/* Response Time */}
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
            <Clock size={14} />
            <span>Responds in {responseTime}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {stats.tasksCompleted}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Tasks
          </div>
        </div>
        
        <div className="text-center border-x border-gray-200 dark:border-gray-700">
          <div className="text-lg font-bold text-green-600">
            {stats.successRate}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Success
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            ${(stats.totalEarnings / 1000).toFixed(1)}k
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Earned
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* View Profile Button */}
      <Link
        href={`/workers/${id}`}
        className="btn btn-outline btn-sm w-full"
        aria-label={`View ${name}'s profile`}
      >
        View Profile
      </Link>
    </article>
  );
};

export default BestWorkers;
