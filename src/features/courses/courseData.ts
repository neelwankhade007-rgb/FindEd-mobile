export interface Course {
  id: string;
  category: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  totalLessons: number;
  learners: string;
  image: any;
  isEnrolled?: boolean;
  progress?: number; // 0-100
  ctaText?: string;
}

// ── Journey / gamification types ────────────────────────────

export type LessonType = "lesson" | "quiz" | "challenge";
export type LessonStatus = "completed" | "current" | "locked";

export interface Lesson {
  id: string;
  title: string;
  subtitle?: string;
  type: LessonType;
  durationMins: number;
  xpReward: number;
  status: LessonStatus;
}

export interface CourseJourney {
  courseId: string;
  title: string;
  description: string;
  category: string;
  progress: number; // 0-100
  completedLessons: number;
  totalLessons: number;
  lessons: Lesson[];
}

// ── Static data ─────────────────────────────────────────────

export const COURSE_CATEGORIES = [
  "All",
  "Basics",
  "Investing",
  "Taxation",
  "Personal Finance",
  "Retirement",
];

export const LIBRARY_COURSES: Course[] = [
  {
    id: "l1",
    category: "Basics",
    title: "Money Basics: Building Financial Confidence",
    description:
      "Master the core concepts of money management and start your journey towards financial freedom.",
    duration: "25 mins",
    lessons: 15,
    totalLessons: 23,
    learners: "1.2k",
    image: require("../../../assets/images/money_basics.png"),
    isEnrolled: true,
    progress: 65,
  },
  {
    id: "l2",
    category: "Investing",
    title: "Stock Market 101: The Basics",
    description:
      "Learn how stocks work, how to read charts, and how to make your first investment with confidence.",
    duration: "45 mins",
    lessons: 18,
    totalLessons: 18,
    learners: "2.5k",
    image: require("../../../assets/images/stock_market_101.png"),
    isEnrolled: false,
    ctaText: "Start Now",
  },
  {
    id: "l3",
    category: "Basics",
    title: "Budgeting 101: Rule Your Wealth",
    description:
      "The ultimate guide to creating a sustainable budget that fits your lifestyle and helps you save more.",
    duration: "20 mins",
    lessons: 12,
    totalLessons: 12,
    learners: "1.8k",
    image: require("../../../assets/images/budgetting_101.png"),
    isEnrolled: false,
    ctaText: "Start Now",
  },
];

// ── Journey data (mock) ─────────────────────────────────────

export const COURSE_JOURNEYS: CourseJourney[] = [
  {
    courseId: "l1",
    title: "Money Basics",
    description: "The importance of financial literacy and building confidence.",
    category: "Basics",
    progress: 65,
    completedLessons: 5,
    totalLessons: 8,
    lessons: [
      {
        id: "l1-1",
        title: "Say Hi to FinEd",
        subtitle: "Welcome aboard",
        type: "lesson",
        durationMins: 3,
        xpReward: 10,
        status: "completed",
      },
      {
        id: "l1-2",
        title: "What is Financial Literacy?",
        type: "lesson",
        durationMins: 5,
        xpReward: 15,
        status: "completed",
      },
      {
        id: "l1-3",
        title: "Money Mindset Quiz",
        subtitle: "Test your knowledge",
        type: "quiz",
        durationMins: 4,
        xpReward: 20,
        status: "completed",
      },
      {
        id: "l1-4",
        title: "Budgeting 101",
        subtitle: "5 min lesson",
        type: "lesson",
        durationMins: 5,
        xpReward: 15,
        status: "completed",
      },
      {
        id: "l1-5",
        title: "Taxation Basics",
        type: "lesson",
        durationMins: 6,
        xpReward: 15,
        status: "completed",
      },
      {
        id: "l1-6",
        title: "Same Salary, Different Drama",
        subtitle: "Real-world scenario",
        type: "challenge",
        durationMins: 8,
        xpReward: 30,
        status: "current",
      },
      {
        id: "l1-7",
        title: "Fun Now, Freedom Later?",
        subtitle: "Complete the path to unlock",
        type: "lesson",
        durationMins: 5,
        xpReward: 15,
        status: "locked",
      },
      {
        id: "l1-8",
        title: "Money Basics Mastery",
        subtitle: "Final challenge",
        type: "challenge",
        durationMins: 10,
        xpReward: 50,
        status: "locked",
      },
    ],
  },
  {
    courseId: "l2",
    title: "Stock Market 101",
    description:
      "Master the world of stocks, one module at a time.",
    category: "Investing",
    progress: 0,
    completedLessons: 0,
    totalLessons: 7,
    lessons: [
      {
        id: "l2-1",
        title: "What is a Stock?",
        subtitle: "The very basics",
        type: "lesson",
        durationMins: 4,
        xpReward: 10,
        status: "current",
      },
      {
        id: "l2-2",
        title: "Bulls vs Bears",
        type: "lesson",
        durationMins: 5,
        xpReward: 15,
        status: "locked",
      },
      {
        id: "l2-3",
        title: "Reading Stock Charts",
        subtitle: "Candles & trends",
        type: "lesson",
        durationMins: 7,
        xpReward: 20,
        status: "locked",
      },
      {
        id: "l2-4",
        title: "Stock Quiz",
        subtitle: "Quick knowledge check",
        type: "quiz",
        durationMins: 4,
        xpReward: 25,
        status: "locked",
      },
      {
        id: "l2-5",
        title: "Build Your Portfolio",
        subtitle: "Hands-on challenge",
        type: "challenge",
        durationMins: 10,
        xpReward: 35,
        status: "locked",
      },
      {
        id: "l2-6",
        title: "Risk & Diversification",
        type: "lesson",
        durationMins: 6,
        xpReward: 15,
        status: "locked",
      },
      {
        id: "l2-7",
        title: "Investor Mindset",
        subtitle: "Final assessment",
        type: "challenge",
        durationMins: 8,
        xpReward: 50,
        status: "locked",
      },
    ],
  },
  {
    courseId: "l3",
    title: "Budgeting 101",
    description:
      "The ultimate guide to creating a sustainable budget.",
    category: "Basics",
    progress: 0,
    completedLessons: 0,
    totalLessons: 6,
    lessons: [
      {
        id: "l3-1",
        title: "Why Budget?",
        subtitle: "Understanding the basics",
        type: "lesson",
        durationMins: 3,
        xpReward: 10,
        status: "current",
      },
      {
        id: "l3-2",
        title: "The 50/30/20 Rule",
        type: "lesson",
        durationMins: 5,
        xpReward: 15,
        status: "locked",
      },
      {
        id: "l3-3",
        title: "Tracking Expenses",
        subtitle: "Hands-on exercise",
        type: "challenge",
        durationMins: 8,
        xpReward: 25,
        status: "locked",
      },
      {
        id: "l3-4",
        title: "Budget Quiz",
        subtitle: "Test your skills",
        type: "quiz",
        durationMins: 4,
        xpReward: 20,
        status: "locked",
      },
      {
        id: "l3-5",
        title: "Emergency Fund Basics",
        type: "lesson",
        durationMins: 5,
        xpReward: 15,
        status: "locked",
      },
      {
        id: "l3-6",
        title: "Budget Master Challenge",
        subtitle: "Final boss!",
        type: "challenge",
        durationMins: 10,
        xpReward: 50,
        status: "locked",
      },
    ],
  },
];

/**
 * Look up journey data for a given courseId.
 * Returns undefined if no journey exists for that course.
 */
export function getCourseJourney(courseId: string): CourseJourney | undefined {
  return COURSE_JOURNEYS.find((j) => j.courseId === courseId);
}

