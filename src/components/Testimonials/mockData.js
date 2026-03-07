/**
 * Mock testimonial data for Testimonials section
 * Represents real user feedback from both workers and buyers
 */

export const mockTestimonials = [
  {
    id: "testimonial_001",
    name: "Jessica Martinez",
    role: "Freelance Writer",
    userType: "worker",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    rating: 5,
    text: "TaskEarn has completely transformed how I work. I've earned over $20,000 in just 6 months doing what I love. The platform is intuitive, payments are always on time, and the support team is incredibly responsive.",
    tasksCompleted: 450,
    joinedDate: "2025-09-15",
    location: "Austin, TX"
  },
  {
    id: "testimonial_002",
    name: "Michael Chen",
    role: "Startup Founder",
    userType: "buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    rating: 5,
    text: "As a startup founder, I needed quick turnaround on various tasks without hiring full-time. TaskEarn connected me with talented professionals who delivered exceptional work. It's been a game-changer for our productivity.",
    tasksPosted: 85,
    joinedDate: "2025-10-20",
    location: "San Francisco, CA"
  },
  {
    id: "testimonial_003",
    name: "Aisha Okonkwo",
    role: "Graphic Designer",
    userType: "worker",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    rating: 5,
    text: "I was skeptical at first, but TaskEarn proved me wrong. The quality of clients is outstanding, and I love having the flexibility to choose projects that match my skills. Best decision I made for my freelance career!",
    tasksCompleted: 320,
    joinedDate: "2025-08-05",
    location: "Lagos, Nigeria"
  },
  {
    id: "testimonial_004",
    name: "Robert Thompson",
    role: "Marketing Manager",
    userType: "buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    rating: 4,
    text: "TaskEarn has streamlined our content creation process. We've found reliable writers, designers, and researchers who consistently deliver quality work. The platform's rating system helps us find the right talent quickly.",
    tasksPosted: 120,
    joinedDate: "2025-07-12",
    location: "London, UK"
  },
  {
    id: "testimonial_005",
    name: "Sofia Rodriguez",
    role: "Virtual Assistant",
    userType: "worker",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
    rating: 5,
    text: "Working from home while raising my kids seemed impossible until I found TaskEarn. The flexible schedule lets me balance family and income perfectly. I'm now earning more than my previous office job!",
    tasksCompleted: 680,
    joinedDate: "2025-06-01",
    location: "Barcelona, Spain"
  },
  {
    id: "testimonial_006",
    name: "David Park",
    role: "E-commerce Owner",
    userType: "buyer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    rating: 5,
    text: "Running an online store requires constant content updates and customer support. TaskEarn's workers handle everything from product descriptions to customer inquiries. It's like having a remote team without the overhead!",
    tasksPosted: 200,
    joinedDate: "2025-05-18",
    location: "Seoul, South Korea"
  }
];

/**
 * Data structure documentation
 */
export const testimonialDataShape = {
  id: "string (unique identifier)",
  name: "string (full name)",
  role: "string (job title or role)",
  userType: "string ('worker' or 'buyer')",
  avatar: "string (URL to profile image)",
  rating: "number (1-5 stars)",
  text: "string (testimonial content)",
  tasksCompleted: "number (for workers)",
  tasksPosted: "number (for buyers)",
  joinedDate: "string (ISO date)",
  location: "string (city, country)"
};
