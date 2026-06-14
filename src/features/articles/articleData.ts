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
  image?: any;
  focalPoint?: string;
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
    id: "6",
    category: "Investing",
    date: "Feb 19, 2026",
    title: "The Biggest Sportswear Company You’ve Never Heard Of",
    excerpt: "Anta Sports has quietly grown into the world's third-largest sportswear giant, sitting just behind Nike and Adidas. Here is how they did it.",
    summary: "Over the past three decades, Anta Sports has quietly evolved into a $9 billion global sportswear giant through strategic acquisitions and smart execution.",
    body: `Every industry has its obvious giants - the brands everyone knows and talks about. But sometimes the most interesting story belongs to the company quietly growing in the background, far from the spotlight.

In the world of sportswear, that company is Anta Sports.

Over the past three decades, Anta Sports has quietly evolved into the world’s third-largest sportswear company by revenue, generating over $9 billion annually and sitting just behind Nike and Adidas. And chances are - you probably haven't heard a lot about it.

### The Origins of a Giant
Founded in 1991 in Jinjiang - a coastal city often referred to as the “shoe capital” of China, Anta emerged at a time when the country’s sportswear market looked very different from today. Back then, the industry was highly fragmented, dominated by small domestic manufacturers focused on low-cost production, while international brands were only beginning to enter major cities and were largely seen as aspirational and expensive. Most local companies used to compete on price rather than brand, and organized retail was still in its early stages.

Anta started out as a simple footwear maker catering to this domestic demand, positioning itself as a reliable value-for-money option for everyday consumers. But while it looked like just another local challenger on the surface, the company was quietly building something more durable - investing in branding, distribution, and product development at a time when few domestic players were thinking beyond manufacturing.

A clear example of this thinking came in the early 2000s when Anta began sponsoring China’s national sports teams and investing heavily in branded retail stores across the country - a costly move at a time when most local competitors were still operating as contract manufacturers. By prioritizing brand recognition and distribution instead of just production volume, Anta laid the groundwork to evolve from a low-cost producer into a consumer-facing brand.

### A Sportswear Conglomerate
Today, Anta isn’t just Anta anymore. The company has quietly transformed itself into something closer to a sportswear conglomerate than a traditional apparel brand. Over the past 20 years, it has been on an acquisition spree that completely reshaped its business.

One of its earliest big moves was buying the China rights to Fila in 2009, a brand that was struggling globally at the time. Anta repositioned Fila as a premium fashion sportswear label in China, and it became one of the company’s biggest growth engines. That success gave Anta confidence to go bigger.

Then came the real turning point in 2019, when Anta led a consortium to acquire Amer Sports, the parent company behind brands like Arc’teryx, Salomon, and Wilson. Suddenly, Anta wasn’t just a domestic player - it owned some of the most respected technical and outdoor brands in the world. Instead of building global credibility from scratch, it simply bought it.

### Cultural Tailwinds
Just as important as strategy was timing. Over the past decade, China saw the rise of what’s often called the “guochao” wave - a shift where younger consumers began embracing domestic brands with a sense of cultural pride. Local companies were no longer seen as cheaper alternatives but as symbols of innovation and identity. Anta was perfectly positioned for this moment. With deep roots, strong distribution, and a brand that already resonated locally, it rode this wave of national preference just as it was scaling up its portfolio. Although the cultural tailwind didn’t create Anta’s success, it definitely accelerated it, helping the company strengthen its home market dominance and build the financial muscle needed for global expansion.

And the expansion hasn’t slowed. In early February 2026, Anta acquired roughly a 29% stake in Puma for around €1.5 billion, becoming its largest shareholder and signaling a clear ambition to play a bigger role on the global stage. The deal reflects a broader strategy. Anta isn’t just trying to grow bigger, it’s trying to build a sportswear ecosystem spanning multiple price points, geographies, and consumer segments.

### House of Brands
Today, its core Anta brand caters to mass consumers, Fila targets the premium lifestyle segment, Arc’teryx sits in the high-end outdoor category, and Wilson dominates sports equipment. Instead of relying on a single identity, Anta operates more like a house of brands, similar to how large consumer conglomerates manage diverse portfolios to capture different parts of the market.

This approach has given Anta a unique advantage. While competitors often depend heavily on one flagship brand, Anta spreads its risk across multiple growth engines. If one segment slows, another can pick up momentum. It also allows the company to cater to a wide spectrum of consumers, from value-conscious buyers in smaller cities to premium outdoor enthusiasts globally.

### Execution Over Storytelling
But despite its scale, Anta remains relatively unknown to many consumers outside industry circles. Part of the reason is that people interact with its brands without realizing who owns them. Another is that Anta historically focused more on execution than storytelling, letting its portfolio grow quietly while competitors dominated the global marketing spotlight.

Of course, the path ahead isn’t without challenges. Managing a complex portfolio of global brands comes with integration risks, and competing head-to-head with companies that spend billions annually on marketing won’t be easy. There are also geopolitical perceptions and brand recognition gaps to navigate as it expands further into international markets.

### Steady Long-Term Allocation
But if the past three decades are any indication, Anta has shown a remarkable ability to scale patiently and execute consistently - turning steady domestic growth into global ambition.

And there’s a broader lesson here that goes beyond sportswear. The biggest business winners, and often the strongest long-term investments - aren’t always the most visible companies. They’re often the ones quietly building strong fundamentals, aligning with long-term consumer trends, and allocating capital wisely over time. Whether it’s a shift toward local brands, rising disposable incomes, or changing consumer preferences, understanding the forces shaping demand can matter just as much as analyzing products or quarterly results.

Anta’s story is a reminder that industries aren’t just shaped by the brands we recognize the most, but by the companies making smart moves behind the scenes. Because sometimes, the real story isn't about who has the loudest voice - it’s about who is quietly building the strongest foundation.

And in the global sportswear race, Anta shows that playing the long game can sometimes be the most powerful strategy of all.`,
    readTime: "6 min read",
    level: "Intermediate",
    isFeatured: true,
    image: require("../../../assets/images/anta_sports.png"),
    focalPoint: "top center",
  },
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
    image: require("../../../assets/images/featured.png"),
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
    image: require("../../../assets/images/course_1.png"),
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
    image: require("../../../assets/images/course_1.png"),
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
    image: require("../../../assets/images/course_1.png"),
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
    image: require("../../../assets/images/course_1.png"),
  },
  {
    id: "7",
    category: "Taxes",
    date: "Feb 4, 2026",
    title: "The 18% Truce: Did India Just Score a Win or a Trap?",
    excerpt: "After months of tariff tension, PM Modi and President Trump announced a trade deal. Is it a relief for Indian exports or a threat to farmers?",
    summary: "US and India struck a deal dropping taxes to 18%, but India made concessions on agricultural imports and Russian oil in return.",
    body: `On 2nd February 2026, the world woke up to a bit of a shock. After months of bickering over trade and taxes, US President Donald Trump and Indian PM Narendra Modi announced they’d finally struck a deal. For about a year, things had been pretty tense. The US had slapped a massive 50% tax on many Indian products, which was basically a "stay out" sign for Indian businesses. This new "truce" was supposed to fix all that.

### A Relieving Drop
On the surface, it sounds like a big win for India. The US agreed to drop those scary 50% taxes down to 18%. For an Indian business selling clothes or car parts to America, this is a huge relief. It actually makes Indian goods a bit cheaper than stuff coming from places like Vietnam or Bangladesh. But as the saying goes, there’s no such thing as a free lunch. To get this discount, India had to make some pretty massive promises.

### The Oil Shift
One of the biggest chips on the table was oil. For a while now, India has been buying a lot of cheap oil from Russia. The US wasn't a fan of that and actually used those high taxes to pressure India to stop. Under this new deal, India is essentially agreeing to swipe left on Russian oil and start buying more from the US and Venezuela. While this makes the US happy, it might make things more expensive at the gas pump for everyday people in India, since that cheap Russian oil was a great deal while it lasted.

### Agriculture and Farmers
But the real drama is happening in the farming sector. India has always been very protective of its farmers and there are millions of them. Usually, India puts high taxes on imported food so that cheap foreign products don't put local farmers out of business. Now, there are rumors that this deal opens the door for American farmers to sell their crops in India with zero taxes. Since US farming is heavily supported by their government, they can sell things like corn and dairy at prices Indian farmers just can't match.

### Sealed Behind Closed Doors
The weirdest part of all this? There isn’t actually a signed contract that the public can read yet. Most of what we know comes from President Trump’s social media posts and "hush-hush" briefings. This has left a lot of people in India wondering if the government was "blackmailed" into a deal that helps the US more than India. While the US is celebrating a "victory," the Indian government has been surprisingly quiet about the details.

### A Massive Gamble
In the end, it’s a massive gamble. India saved its exporters from being crushed by US taxes, but it might have paid for it by risking the livelihoods of its farmers and losing its access to cheap oil. Only time will tell if this was a genius move or if India gave up too much just to get back in America's good graces.`,
    readTime: "5 min read",
    level: "Intermediate",
    image: require("../../../assets/images/trade_deal.png"),
    focalPoint: "center",
  },
  {
    id: "8",
    category: "Investing",
    date: "Jan 22, 2026",
    title: "IPO Decode #2: The Shadowfax Technologies IPO Explained",
    excerpt: "Bengaluru-based last-mile delivery platform Shadowfax has launched its ₹1,907 crore IPO. Is it a long-term compounder or listing gain hype?",
    summary: "Shadowfax Technologies launched its ₹1,907.27 crore IPO, showing a path toward operating profitability and rising institutional interest.",
    body: `Every time you order groceries in 10 minutes, receive a parcel the next day, or return a product bought online, there’s a good chance a logistics company is working quietly in the background to make it happen.

Shadowfax Technologies Ltd., a Bengaluru-based technology-led logistics and last-mile delivery platform is one such company, and it has officially launched its much-anticipated Initial Public Offering (IPO) - marking one of the year’s biggest public market events in India’s logistics and e-commerce ecosystem.

### Hyperlocal Operations at Scale
Founded in 2015, Shadowfax has grown into a large third-party logistics (3PL) player offering express parcel delivery, hyperlocal and quick-commerce logistics, reverse logistics and return management, and on-demand courier and enterprise logistics solutions. Unlike traditional courier companies that rely heavily on owned fleets and fixed infrastructure, Shadowfax operates an asset-light, technology-driven model. It uses a nationwide digital platform, dynamic routing algorithms, and a large crowdsourced delivery partner network to optimize deliveries across urban centres as well as emerging tier-2 and tier-3 markets. Today, the company’s network spans more than 14,700 pincodes across India, supported by thousands of permanent employees and a vast gig-based delivery ecosystem.

### IPO Pricing & Key Figures
The company’s IPO opened on 20 January 2026 and closed on 22 January 2026, with shares priced in the ₹118–₹124 range and a lot size of 120 shares. The issue consists of a fresh issue of approximately ₹1,000 crore and an offer for sale worth ₹907.27 crore, taking the total issue size to ₹1,907.27 crore. At the upper end of the price band, Shadowfax is valued at roughly ₹7,168–7,169 crore. Ahead of the public issue, the company raised around ₹850–856 crore from 39 anchor investors at ₹124 per share, indicating healthy institutional interest, though not aggressive overexuberance.

### Bid Subscription Metrics
By the close of bidding on 22 January, the IPO was subscribed about 2.7 times overall, reflecting steady but not euphoric demand. Qualified Institutional Buyers led the subscription with bids of nearly 3.8 times their allotted portion, while Retail Individual Investors subscribed around 2.2–2.3 times. Demand from Non-Institutional Investors was relatively muted at under one time subscription.

### Transitioning to Profitability
Financially, Shadowfax’s numbers reflect a company transitioning from growth-at-all-costs to a more disciplined growth-with-profitability phase. Revenue from operations has grown consistently, while losses have narrowed sharply over time. In FY23, the company reported revenue of ₹1,422.89 crore with a net loss of ₹142.64 crore. By FY24, revenue increased to ₹1,896.48 crore and losses reduced significantly to ₹11.88 crore. FY25 marked a key inflection point, with revenue rising to ₹2,514.66 crore and the company turning marginally profitable with a net profit of ₹6.06 crore. In the first half of FY26, up to September 2025, Shadowfax reported a net profit of around ₹21 crore, more than doubling year-on-year, while assets expanded to over ₹1,453 crore. These numbers point to improving operating efficiency, though margins remain thin, which is a structural reality of the logistics industry.

### Deployment of Capital
From the fresh issue proceeds, the company plans to invest in expanding logistics infrastructure and network coverage, funding leased first-mile and last-mile operations and sorting centres, strengthening its technology and brand presence, and pursuing potential inorganic acquisitions along with general corporate purposes. Strategically, this capital deployment is aimed at deepening penetration in tier-2 and tier-3 markets and strengthening its competitive position in a crowded but fast-growing logistics landscape.

### A Gamble for Long-Term Holders
Overall, the Shadowfax IPO offers investors exposure to India’s expanding logistics and e-commerce backbone through a company that has demonstrated scale, improving financial discipline, and a technology-led operating model. However, the final-day subscription data, subdued grey market sentiment, and structural industry risks suggest that this IPO may be better suited for long-term, growth-oriented investors who are comfortable with volatility and execution challenges, rather than those seeking quick listing-day gains.`,
    readTime: "6 min read",
    level: "Advanced",
    image: require("../../../assets/images/ipo_2.png"),
    focalPoint: "center",
  },
];
