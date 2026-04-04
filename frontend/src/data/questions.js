/**
 * questions.js — Central questions data store.
 *
 * Schema for each question:
 * {
 *   id:          number   — unique identifier
 *   course:      string   — "UPSC" | "Aptitude" | "GATE" | "IPS"
 *   topic:       string   — lowercase slug, e.g. "percentages", "polity"
 *   difficulty:  number   — 1 (easy) to 5 (hard)
 *   question:    string   — the question text
 *   options:     string[] — exactly 4 choices
 *   answer:      string   — must match one of the options exactly
 *   explanation: string   — shown after answering
 * }
 *
 * Compatible with: PYQModule, QuestionCard, UPSCMockTest, MockExam
 */

export const questions = [

  // ── UPSC · Polity ────────────────────────────────────────────────────────────
  {
    id: 1,
    course: "UPSC",
    topic: "polity",
    difficulty: 2,
    question: "Who is the constitutional head of the Indian Republic?",
    options: ["Prime Minister", "Chief Justice of India", "President", "Speaker of Lok Sabha"],
    answer: "President",
    explanation: "The President of India is the constitutional head of state under Article 52. The PM is the head of government."
  },
  {
    id: 2,
    course: "UPSC",
    topic: "polity",
    difficulty: 3,
    question: "Which of the following is NOT a Fundamental Right in the Constitution of India?",
    options: ["Right to Equality", "Right to Property", "Right to Freedom", "Right against Exploitation"],
    answer: "Right to Property",
    explanation: "Right to Property was removed from Fundamental Rights by the 44th Amendment (1978) and is now a legal right under Article 300A."
  },
  {
    id: 3,
    course: "UPSC",
    topic: "polity",
    difficulty: 3,
    question: "The power to promulgate ordinances during recess of Parliament is vested with:",
    options: ["The Prime Minister", "The Chief Justice of India", "The President", "The Speaker of Lok Sabha"],
    answer: "The President",
    explanation: "Under Article 123, the President can promulgate ordinances when Parliament is not in session. These must be laid before Parliament when it reassembles."
  },
  {
    id: 4,
    course: "UPSC",
    topic: "polity",
    difficulty: 4,
    question: "The concept of 'Concurrent List' in the Indian Constitution was borrowed from which country?",
    options: ["USA", "Canada", "Australia", "South Africa"],
    answer: "Australia",
    explanation: "The Concurrent List was borrowed from the Australian Constitution. Both Union and State governments can legislate on these subjects."
  },

  // ── UPSC · History ────────────────────────────────────────────────────────────
  {
    id: 5,
    course: "UPSC",
    topic: "history",
    difficulty: 2,
    question: "Who was the founder of the Indian National Army (Azad Hind Fauj)?",
    options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Subhas Chandra Bose", "Bhagat Singh"],
    answer: "Subhas Chandra Bose",
    explanation: "Subhas Chandra Bose reorganized and led the Indian National Army (INA) in 1943 under the motto 'Jai Hind'."
  },
  {
    id: 6,
    course: "UPSC",
    topic: "history",
    difficulty: 2,
    question: "The Dandi March of 1930 was started from which location?",
    options: ["Dandi Beach", "Ahmedabad City", "Sabarmati Ashram", "Surat"],
    answer: "Sabarmati Ashram",
    explanation: "Gandhi started the 241-mile Dandi March on March 12, 1930 from Sabarmati Ashram, Ahmedabad, to protest the British salt tax."
  },
  {
    id: 7,
    course: "UPSC",
    topic: "history",
    difficulty: 3,
    question: "Who was the first woman President of the Indian National Congress?",
    options: ["Sarojini Naidu", "Annie Besant", "Nellie Sengupta", "Indira Gandhi"],
    answer: "Annie Besant",
    explanation: "Annie Besant presided over the Calcutta session in 1917, becoming the first woman to serve as INC President."
  },

  // ── UPSC · Economy ────────────────────────────────────────────────────────────
  {
    id: 8,
    course: "UPSC",
    topic: "economy",
    difficulty: 2,
    question: "Which Article of the Indian Constitution mandates the President to present the Annual Financial Statement?",
    options: ["Article 108", "Article 110", "Article 112", "Article 117"],
    answer: "Article 112",
    explanation: "Article 112 requires the President to cause an Annual Financial Statement (Union Budget) to be laid before Parliament each year."
  },
  {
    id: 9,
    course: "UPSC",
    topic: "economy",
    difficulty: 3,
    question: "What does the Gini Coefficient primarily measure?",
    options: ["Rate of inflation", "Unemployment rate", "Income inequality", "Economic growth rate"],
    answer: "Income inequality",
    explanation: "The Gini Coefficient measures the distribution of income/wealth within a population. A value of 0 means perfect equality; 1 means total inequality."
  },

  // ── UPSC · Environment ────────────────────────────────────────────────────────
  {
    id: 10,
    course: "UPSC",
    topic: "environment",
    difficulty: 3,
    question: "The 'Deepor Beel' important bird area is located in which Indian state?",
    options: ["Manipur", "Assam", "Odisha", "Gujarat"],
    answer: "Assam",
    explanation: "Deepor Beel is a freshwater lake and important bird area in Kamrup district, Assam. It is also a Ramsar wetland site."
  },
  {
    id: 11,
    course: "UPSC",
    topic: "environment",
    difficulty: 2,
    question: "India has how many Biodiversity Hotspots recognized globally?",
    options: ["2", "3", "4", "5"],
    answer: "4",
    explanation: "India's 4 biodiversity hotspots are: the Himalayas, Indo-Burma, Sundaland, and the Western Ghats & Sri Lanka."
  },

  // ── Aptitude · Percentages ────────────────────────────────────────────────────
  {
    id: 12,
    course: "Aptitude",
    topic: "percentages",
    difficulty: 1,
    question: "What is 20% of 150?",
    options: ["20", "25", "30", "35"],
    answer: "30",
    explanation: "20% of 150 = (20/100) × 150 = 0.20 × 150 = 30."
  },
  {
    id: 13,
    course: "Aptitude",
    topic: "percentages",
    difficulty: 2,
    question: "If A's salary is 25% more than B's salary, then B's salary is how much percent less than A's salary?",
    options: ["20%", "25%", "33.33%", "15%"],
    answer: "20%",
    explanation: "Let B = 100 → A = 125. Difference = 25. % less = (25/125) × 100 = 20%."
  },
  {
    id: 14,
    course: "Aptitude",
    topic: "percentages",
    difficulty: 2,
    question: "A town's population increases by 10% annually. Starting at 1000, what is the population after 2 years?",
    options: ["1200", "1210", "1100", "1250"],
    answer: "1210",
    explanation: "P × (1 + r)^t = 1000 × (1.1)² = 1000 × 1.21 = 1210."
  },

  // ── Aptitude · Profit & Loss ──────────────────────────────────────────────────
  {
    id: 15,
    course: "Aptitude",
    topic: "profit-and-loss",
    difficulty: 1,
    question: "A man buys an article for ₹300 and sells it at a 20% profit. What is the selling price?",
    options: ["₹320", "₹350", "₹360", "₹380"],
    answer: "₹360",
    explanation: "SP = CP + Profit = 300 + (20% of 300) = 300 + 60 = ₹360."
  },
  {
    id: 16,
    course: "Aptitude",
    topic: "profit-and-loss",
    difficulty: 2,
    question: "An item costs ₹500. It is sold at a 10% loss. What is the selling price?",
    options: ["₹400", "₹440", "₹450", "₹460"],
    answer: "₹450",
    explanation: "Loss = 10% of 500 = ₹50. SP = 500 − 50 = ₹450."
  },

  // ── Aptitude · Time & Work ────────────────────────────────────────────────────
  {
    id: 17,
    course: "Aptitude",
    topic: "time-and-work",
    difficulty: 2,
    question: "A can complete a job in 10 days; B in 15 days. How many days do they take working together?",
    options: ["5 days", "6 days", "8 days", "12 days"],
    answer: "6 days",
    explanation: "Combined rate = 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6 per day → 6 days together."
  },
  {
    id: 18,
    course: "Aptitude",
    topic: "time-and-work",
    difficulty: 3,
    question: "A tap fills a tank in 6 hours; a leak empties it in 8 hours. How long does it take to fill the full tank?",
    options: ["14 hours", "24 hours", "10 hours", "18 hours"],
    answer: "24 hours",
    explanation: "Net fill rate = 1/6 − 1/8 = 4/24 − 3/24 = 1/24 per hour → 24 hours to fill."
  },

  // ── Aptitude · Ratio ──────────────────────────────────────────────────────────
  {
    id: 19,
    course: "Aptitude",
    topic: "ratio",
    difficulty: 2,
    question: "Divide ₹1200 between A and B in ratio 3:5. How much does A get?",
    options: ["₹300", "₹400", "₹450", "₹500"],
    answer: "₹450",
    explanation: "Total parts = 3+5 = 8. A's share = (3/8) × 1200 = ₹450."
  },

  // ── GATE · OS ─────────────────────────────────────────────────────────────────
  {
    id: 20,
    course: "GATE",
    topic: "operating-systems",
    difficulty: 3,
    question: "Which scheduling algorithm can lead to starvation?",
    options: ["Round Robin", "FCFS", "Priority Scheduling", "SJF (Non-preemptive)"],
    answer: "Priority Scheduling",
    explanation: "Priority Scheduling can starve low-priority processes indefinitely if high-priority processes keep arriving. The fix is 'aging'."
  },
  {
    id: 21,
    course: "GATE",
    topic: "operating-systems",
    difficulty: 2,
    question: "Which data structure is used to implement a process scheduling queue (FIFO)?",
    options: ["Stack", "Tree", "Queue", "Graph"],
    answer: "Queue",
    explanation: "A Queue uses FIFO (First In First Out) order — the same principle used in FCFS CPU scheduling."
  },

  // ── IPS · Law ─────────────────────────────────────────────────────────────────
  {
    id: 22,
    course: "IPS",
    topic: "criminal-law",
    difficulty: 3,
    question: "Under which Article can the President declare a National Emergency in India?",
    options: ["Article 352", "Article 356", "Article 360", "Article 370"],
    answer: "Article 352",
    explanation: "Article 352 empowers the President to proclaim a National Emergency when the security of India is threatened by war, external aggression, or armed rebellion."
  },
  {
    id: 23,
    course: "IPS",
    topic: "criminal-law",
    difficulty: 2,
    question: "Which schedule of the Indian Constitution contains anti-defection provisions?",
    options: ["Eighth Schedule", "Ninth Schedule", "Tenth Schedule", "Eleventh Schedule"],
    answer: "Tenth Schedule",
    explanation: "The Tenth Schedule (added by the 52nd Amendment, 1985) deals with the disqualification of members on grounds of defection."
  },
];

// ─── Helper Utilities ──────────────────────────────────────────────────────────

/** Get all questions for a given course (case-insensitive). */
export const getByCategory = (course) =>
  questions.filter(q => q.course.toLowerCase() === course.toLowerCase());

/** Get questions for a specific topic within a course. */
export const getByTopic = (course, topic) =>
  questions.filter(
    q =>
      q.course.toLowerCase() === course.toLowerCase() &&
      q.topic.toLowerCase() === topic.toLowerCase()
  );

/** Get a random subset of N questions (optionally filtered by course). */
export const getRandom = (count, course = null) => {
  const pool = course ? getByCategory(course) : [...questions];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/** Get all unique courses present in the dataset. */
export const getCourses = () => [...new Set(questions.map(q => q.course))];

/** Get all unique topics for a given course. */
export const getTopics = (course) => [
  ...new Set(getByCategory(course).map(q => q.topic))
];
