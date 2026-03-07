/**
 * Mock data structure for Best Workers section
 * Represents the expected shape of data from the API
 */

export const mockWorkers = [
  {
    id: "worker_001",
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isVerified: true,
    rating: 4.9,
    reviewCount: 247,
    stats: {
      tasksCompleted: 1250,
      successRate: 98,
      totalEarnings: 15420
    },
    skills: ["Data Entry", "Research", "Translation"],
    joinedDate: "2024-01-15",
    responseTime: "< 2 hours"
  },
  {
    id: "worker_002",
    name: "Marcus Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    isVerified: true,
    rating: 4.8,
    reviewCount: 189,
    stats: {
      tasksCompleted: 980,
      successRate: 96,
      totalEarnings: 12350
    },
    skills: ["Content Writing", "SEO", "Copywriting"],
    joinedDate: "2024-02-20",
    responseTime: "< 3 hours"
  },
  {
    id: "worker_003",
    name: "Priya Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    isVerified: true,
    rating: 5.0,
    reviewCount: 156,
    stats: {
      tasksCompleted: 845,
      successRate: 100,
      totalEarnings: 18900
    },
    skills: ["Graphic Design", "UI/UX", "Illustration"],
    joinedDate: "2024-03-10",
    responseTime: "< 1 hour"
  },
  {
    id: "worker_004",
    name: "Alex Rivera",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    isVerified: true,
    rating: 4.7,
    reviewCount: 203,
    stats: {
      tasksCompleted: 1100,
      successRate: 95,
      totalEarnings: 14200
    },
    skills: ["Video Editing", "Animation", "Audio"],
    joinedDate: "2024-01-05",
    responseTime: "< 4 hours"
  },
  {
    id: "worker_005",
    name: "Emma Schmidt",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    isVerified: true,
    rating: 4.9,
    reviewCount: 178,
    stats: {
      tasksCompleted: 920,
      successRate: 97,
      totalEarnings: 16800
    },
    skills: ["Web Development", "JavaScript", "React"],
    joinedDate: "2024-02-01",
    responseTime: "< 2 hours"
  },
  {
    id: "worker_006",
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    isVerified: true,
    rating: 4.8,
    reviewCount: 221,
    stats: {
      tasksCompleted: 1350,
      successRate: 96,
      totalEarnings: 13500
    },
    skills: ["Customer Support", "Chat", "Email"],
    joinedDate: "2023-12-10",
    responseTime: "< 1 hour"
  }
];

/**
 * Data structure documentation for API integration
 */
export const workerDataShape = {
  id: "string (unique identifier)",
  name: "string (full name)",
  avatar: "string (URL to profile image)",
  isVerified: "boolean (verification status)",
  rating: "number (0-5, decimal)",
  reviewCount: "number (total reviews)",
  stats: {
    tasksCompleted: "number (lifetime tasks)",
    successRate: "number (0-100 percentage)",
    totalEarnings: "number (USD cents or dollars)"
  },
  skills: "array of strings (top skills)",
  joinedDate: "string (ISO date)",
  responseTime: "string (average response time)"
};
