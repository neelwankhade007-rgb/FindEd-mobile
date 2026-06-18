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
