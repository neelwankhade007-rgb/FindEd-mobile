export interface Article {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  summary: string;
  body: string;
  readTime: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  isFeatured?: boolean;
}

export const CATEGORIES = [
  "All",
  "Budgeting",
  "Investing",
  "Saving",
  "Credit",
  "Taxes",
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: "1",
    category: "Investing",
    date: "June 12, 2026",
    title: "The Beginners Guide to Compound Interest",
    excerpt: "Understand how compound interest works and how it can help grow your wealth over time with minimal effort.",
    summary: "Compound interest is the 8th wonder of the world. Learn how starting early and staying consistent multiplies your savings exponentially.",
    body: `Compound interest is the interest you earn on interest. It is one of the most powerful concepts in personal finance and investing.

### How Compound Interest Works
Unlike simple interest, which only pays interest on the principal amount you originally deposited, compound interest calculates interest on your principal plus all of the interest accumulated over previous periods. 

For example, if you invest $1,000 at a 10% annual interest rate:
- Year 1: You earn 10% of $1,000, which is $100. Your balance is now $1,100.
- Year 2: You earn 10% of $1,100, which is $110. Your balance is now $1,210.
- Year 3: You earn 10% of $1,210, which is $121. Your balance is now $1,331.

Over time, this snowball effect accelerates, turning modest initial contributions into substantial wealth.

### The Rule of 72
A quick way to estimate how long it will take for your money to double through compound interest is the Rule of 72. Divide 72 by your expected annual interest rate. For example, at an 8% return, your money will double in approximately 9 years (72 / 8 = 9).`,
    readTime: "5 min read",
    level: "Beginner",
    isFeatured: true,
  },
  {
    id: "2",
    category: "Budgeting",
    date: "June 10, 2026",
    title: "Mastering the 50/30/20 Budgeting Rule",
    excerpt: "Learn how to divide your income into needs, wants, and savings to achieve financial freedom without feeling deprived.",
    summary: "A simple, flexible framework to manage your monthly income, cover your essentials, enjoy life, and secure your financial future.",
    body: `If you find budget tracking apps tedious, the 50/30/20 rule offers a simple, intuitive alternative. Coined by Senator Elizabeth Warren in her book *All Your Worth*, it splits your after-tax income into three distinct categories.

### 1. 50% for Needs
Needs are expenses that you absolutely must pay to survive. This includes:
- Housing/rent or mortgage
- Utilities and groceries
- Insurance (health, auto, home)
- Minimum debt payments

### 2. 30% for Wants
Wants are non-essential expenses that enhance your lifestyle. These are choices, not necessities:
- Dining out and hobbies
- Subscriptions (Netflix, Spotify, gym)
- Travel and entertainment

### 3. 20% for Savings
This category is dedicated to building your financial foundation. Allocate this to:
- Building an emergency fund
- Investing for retirement
- Extra payments to pay off high-interest debt faster`,
    readTime: "4 min read",
    level: "Beginner",
  },
  {
    id: "3",
    category: "Saving",
    date: "June 08, 2026",
    title: "Why You Need an Emergency Fund Right Now",
    excerpt: "An emergency fund is your financial safety net. Find out how much you should save and where to keep it.",
    summary: "Life is full of unexpected events. A dedicated emergency fund protects you from going into debt when things go wrong.",
    body: `An emergency fund is money set aside specifically to cover unexpected financial events. It is your defense mechanism against job loss, medical emergencies, car breakdowns, or urgent home repairs.

### How Much Do You Need?
Most financial advisors recommend saving three to six months' worth of living expenses. If your monthly expenses are $3,000, your target should be between $9,000 and $18,000. 

If you are self-employed or have a single income source, aiming for six to nine months is safer.

### Where to Keep It
Your emergency fund must be liquid, meaning you can access it quickly without penalty. Avoid locking it in long-term investments or stocks that could lose value. Instead, use a High-Yield Savings Account (HYSA) to earn interest while keeping it safe and accessible.`,
    readTime: "6 min read",
    level: "Beginner",
  },
  {
    id: "4",
    category: "Credit",
    date: "June 05, 2026",
    title: "Demystifying Your FICO Credit Score",
    excerpt: "Discover the five key factors that determine your credit score and how you can start improving it today.",
    summary: "Your credit score affects your ability to borrow, rent an apartment, or get a job. Here is exactly how it is calculated.",
    body: `Your credit score is a three-digit number that represents your creditworthiness. Lenders use it to decide whether to approve you for credit cards, auto loans, or mortgages, and what interest rate to charge you.

### The Five Factors
Your FICO score is calculated using these five components:
1. **Payment History (35%)**: Do you pay your bills on time? Late payments hurt your score.
2. **Amounts Owed / Credit Utilization (30%)**: How much of your available credit limit are you using? Keep this below 30% for a healthy score.
3. **Length of Credit History (15%)**: How long have you had credit accounts open?
4. **New Credit (10%)**: How many new accounts have you opened recently? Too many hard inquiries can lower your score.
5. **Credit Mix (10%)**: Do you have a healthy mix of cards, installment loans, and mortgages?`,
    readTime: "8 min read",
    level: "Intermediate",
  },
  {
    id: "5",
    category: "Taxes",
    date: "May 28, 2026",
    title: "Understanding Tax Brackets and Taxable Income",
    excerpt: "Marginal tax brackets can be confusing. Learn how tax rates apply to your income and how deductions work.",
    summary: "Getting a raise won't lower your take-home pay due to a higher tax bracket. Learn how marginal taxes actually work.",
    body: `A common myth is that moving into a higher tax bracket means all your income is taxed at that higher rate. In reality, the U.S. federal income tax system is progressive and uses marginal tax brackets.

### What is a Marginal Tax Rate?
A marginal tax rate is the tax rate you pay on an additional dollar of income. Tax rates only apply to the income within that specific bracket.

For example, if you are single in 2026 and your taxable income is in the 22% bracket:
- Only the portion of your income that falls within the 22% boundaries is taxed at 22%.
- The income below that boundary is taxed at 10% and 12% respectively.

### Standard vs. Itemized Deductions
Deductions reduce your taxable income. The standard deduction is a fixed dollar amount that reduces the income you're taxed on. Itemized deductions allow you to list individual deductible expenses (like mortgage interest, charitable donations, state/local taxes) if their total is larger than the standard deduction.`,
    readTime: "7 min read",
    level: "Intermediate",
  },
];
