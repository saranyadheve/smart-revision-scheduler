/**
 * AptitudeGenerator.js
 * Intelligent content generation for Quantitative Aptitude, Logical Reasoning, Verbal Ability, and DI.
 */

const difficulties = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3
};

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const generateQuantQuestions = (subtopic, count) => {
  const questions = [];
  const easyCount = Math.floor(count * 0.4);
  const mediumCount = Math.floor(count * 0.4);
  const hardCount = count - easyCount - mediumCount;

  for (let i = 1; i <= count; i++) {
    let difficulty = i <= easyCount ? 'Easy' : i <= (easyCount + mediumCount) ? 'Medium' : 'Hard';
    let q;

    switch (subtopic.toLowerCase()) {
      case 'percentages':
        q = generatePercentageQuestion(i, difficulty);
        break;
      case 'profit-&-loss':
      case 'profit-and-loss':
        q = generateProfitLossQuestion(i, difficulty);
        break;
      case 'time-&-work':
      case 'time-and-work':
        q = generateTimeWorkQuestion(i, difficulty);
        break;
      case 'ratio':
        q = generateRatioQuestion(i, difficulty);
        break;
      default:
        q = generateFallBackQuestion(i, subtopic, difficulty);
    }
    questions.push(q);
  }
  return shuffleArray(questions);
};

// --- Quantitative Generators ---

const generatePercentageQuestion = (id, diff) => {
  const base = diff === 'Easy' ? 100 : diff === 'Medium' ? Math.floor(Math.random() * 500) + 100 : Math.floor(Math.random() * 2000) + 500;
  const perc = diff === 'Easy' ? 10 * (Math.floor(Math.random() * 5) + 1) : Math.floor(Math.random() * 45) + 5;
  
  const type = Math.floor(Math.random() * 3);
  if (type === 0) {
    const val = (perc / 100) * base;
    return {
      id,
      question: `What is ${perc}% of ${base}?`,
      options: shuffleArray([val.toString(), (val + 5).toString(), (val - 5).toString(), (val * 1.1).toFixed(0)]),
      correctAnswer: val.toString(),
      solution: `${perc}% of ${base} = (${perc}/100) × ${base} = ${val}`,
      difficulty: diff
    };
  } else if (type === 1) {
    const result = base * (1 + perc / 100);
    return {
      id,
      question: `A number increased by ${perc}% becomes ${result.toFixed(0)}. What is the original number?`,
      options: shuffleArray([base.toString(), (base - 20).toString(), (base + 20).toString(), (base * 0.9).toFixed(0)]),
      correctAnswer: base.toString(),
      solution: `Let original number be x. x + ${perc}% of x = ${result.toFixed(0)} → (1 + ${perc/100})x = ${result.toFixed(0)} → x = ${result.toFixed(0)} / ${1 + perc/100} = ${base}`,
      difficulty: diff
    };
  } else {
    const result = base * (1 - perc / 100);
    return {
      id,
      question: `The population of a town decreased by ${perc}% and is now ${result.toFixed(0)}. What was the original population?`,
      options: shuffleArray([base.toString(), (base - 50).toString(), (base + 50).toString(), (base * 1.2).toFixed(0)]),
      correctAnswer: base.toString(),
      solution: `Original × (1 - ${perc}/100) = ${result.toFixed(0)} → Original = ${result.toFixed(0)} / ${1 - perc/100} = ${base}`,
      difficulty: diff
    };
  }
};

const generateProfitLossQuestion = (id, diff) => {
  const cp = diff === 'Easy' ? 200 : Math.floor(Math.random() * 1000) + 500;
  const profitPerc = Math.floor(Math.random() * 20) + 5;
  const sp = Math.round(cp * (1 + profitPerc / 100));

  return {
    id,
    question: `A trader buys a gadget for ₹${cp} and sells it at a profit of ${profitPerc}%. Find the selling price.`,
    options: shuffleArray([`₹${sp}`, `₹${sp + 10}`, `₹${sp - 10}`, `₹${Math.round(sp * 1.05)}`]),
    correctAnswer: `₹${sp}`,
    solution: `SP = CP + Profit = ${cp} + (${profitPerc}% of ${cp}) = ${cp} + ${Math.round(cp * profitPerc / 100)} = ₹${sp}`,
    difficulty: diff
  };
};

const generateTimeWorkQuestion = (id, diff) => {
  const aSteps = diff === 'Easy' ? 10 : Math.floor(Math.random() * 20) + 10;
  const bSteps = diff === 'Easy' ? 15 : Math.floor(Math.random() * 30) + 10;
  const combined = (aSteps * bSteps) / (aSteps + bSteps);

  return {
    id,
    question: `A can finish a task in ${aSteps} days and B can finish the same task in ${bSteps} days. How many days will they take if they work together?`,
    options: shuffleArray([combined.toFixed(1), (combined + 1).toFixed(1), (combined - 1).toFixed(1), (combined * 1.2).toFixed(1)]),
    correctAnswer: combined.toFixed(1),
    solution: `A's 1-day work = 1/${aSteps}. B's 1-day work = 1/${bSteps}. Combined 1-day work = 1/${aSteps} + 1/${bSteps} = (${aSteps}+${bSteps})/(${aSteps}×${bSteps}). Days taken = (${aSteps}×${bSteps})/(${aSteps}+${bSteps}) = ${combined.toFixed(1)} days.`,
    difficulty: diff
  };
};

const generateRatioQuestion = (id, diff) => {
  const total = diff === 'Easy' ? 1000 : Math.floor(Math.random() * 5000) + 1000;
  const r1 = Math.floor(Math.random() * 4) + 2;
  const r2 = Math.floor(Math.random() * 4) + 3;
  // Adjust total to be divisible by (r1+r2)
  const finalTotal = Math.round(total / (r1 + r2)) * (r1 + r2);
  const share1 = (r1 / (r1 + r2)) * finalTotal;

  return {
    id,
    question: `Divide ₹${finalTotal} between X and Y in the ratio ${r1}:${r2}. What is X's share?`,
    options: shuffleArray([`₹${share1}`, `₹${share1 + 100}`, `₹${share1 - 100}`, `₹${Math.round(share1 * 1.1)}`]),
    correctAnswer: `₹${share1}`,
    solution: `Total parts = ${r1} + ${r2} = ${r1 + r2}. X's share = (${r1}/${r1 + r2}) × ${finalTotal} = ₹${share1}.`,
    difficulty: diff
  };
};

// --- Logical Generators ---

const generateLogicalQuestions = (subtopic, count) => {
  const questions = [];
  for (let i = 1; i <= count; i++) {
    let diff = i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy';
    let q;
    switch (subtopic.toLowerCase()) {
      case 'number-series':
        q = generateNumberSeriesQuestion(i, diff);
        break;
      case 'blood-relations':
        q = generateBloodRelationQuestion(i, diff);
        break;
      case 'coding-decoding':
        q = generateCodingDecodingQuestion(i, diff);
        break;
      default:
        q = generateFallBackQuestion(i, subtopic, diff);
    }
    questions.push(q);
  }
  return shuffleArray(questions);
};

const generateNumberSeriesQuestion = (id, diff) => {
  const start = Math.floor(Math.random() * 20) + 1;
  const step = diff === 'Easy' ? 5 : diff === 'Medium' ? 12 : 23;
  const series = [start, start + step, start + 2 * step, start + 3 * step];
  const next = start + 4 * step;

  return {
    id,
    question: `Find the missing number in the series: ${series.join(', ')} , ?`,
    options: shuffleArray([next.toString(), (next + step).toString(), (next - 2).toString(), (next * 2).toString()]),
    correctAnswer: next.toString(),
    solution: `The series follows an addition pattern where each term increases by ${step}. Therefore, ${series[3]} + ${step} = ${next}.`,
    difficulty: diff
  };
};

const generateBloodRelationQuestion = (id, diff) => {
  return {
    id,
    question: "Pointing to a photograph, a man said, 'I have no brother or sister but that man's father is my father's son.' Whose photograph was it?",
    options: shuffleArray(["His son's", "His own", "His father's", "His nephew's"]),
    correctAnswer: "His son's",
    solution: "Since the narrator has no brother or sister, 'his father's son' is the narrator himself. So, the man's father is the narrator. Thus, the photograph is of his son.",
    difficulty: diff
  };
};

const generateCodingDecodingQuestion = (id, diff) => {
  return {
    id,
    question: "If in a certain language, 'COMPUTER' is coded as 'RFUVQNPC', how is 'MEDICINE' coded in that language?",
    options: shuffleArray(["EOJDJEFM", "EOJDEJFM", "MFEJDJOE", "MFEDJDOE"]),
    correctAnswer: "EOJDJEFM",
    solution: "The first and last letters are swapped, and the middle letters are replaced by their immediate next letter in reverse order.",
    difficulty: diff
  };
};

// --- Verbal Generators ---

const generateVerbalQuestions = (subtopic, count) => {
  const staticPool = {
    'synonyms': [
      { q: "Choose the synonym of 'ABANDON'", o: ["Leave", "Keep", "Hold", "Support"], a: "Leave", s: "Abandon means to leave completely and finally." },
      { q: "Choose the synonym of 'BRIEF'", o: ["Short", "Long", "Grand", "Vivid"], a: "Short", s: "Brief means of short duration." },
      { q: "Choose the synonym of 'CANDID'", o: ["Frank", "Hidden", "Polite", "Cruel"], a: "Frank", s: "Candid means truthful and straightforward; frank." }
    ],
    'antonyms': [
      { q: "Choose the antonym of 'GIANT'", o: ["Dwarf", "Huge", "Big", "Strong"], a: "Dwarf", s: "Giant means very large; Dwarf means very small." },
      { q: "Choose the antonym of 'OPTIMIST'", o: ["Pessimist", "Happy", "Positive", "Hopeful"], a: "Pessimist", s: "An optimist expects the best; a pessimist expects the worst." }
    ]
  };

  const pool = staticPool[subtopic.toLowerCase()] || [];
  const questions = [];
  for (let i = 1; i <= count; i++) {
    const template = pool[i % pool.length] || { q: `Sample Verbal Question for ${subtopic} #${i}`, o: ["A", "B", "C", "D"], a: "A", s: "Sample Solution" };
    questions.push({
      id: i,
      question: template.q,
      options: shuffleArray(template.o),
      correctAnswer: template.a,
      solution: template.s,
      difficulty: 'Medium'
    });
  }
  return questions;
};

// --- Data Interpretation Generators ---

const generateDIQuestions = (subtopic, count) => {
  const questions = [];
  for (let i = 1; i <= count; i++) {
    questions.push({
      id: i,
      question: `In a ${subtopic.replace('-', ' ')} showing sales of 4 companies (A: 20%, B: 30%, C: 25%, D: 25%), if total sales are ₹10,000, what are the sales of company B?`,
      options: shuffleArray(["₹3,000", "₹2,000", "₹2,500", "₹3,500"]),
      correctAnswer: "₹3,000",
      solution: "Sales of B = 30% of ₹10,000 = (30/100) × 10,000 = ₹3,000.",
      difficulty: 'Medium'
    });
  }
  return questions;
};

const generateFallBackQuestion = (id, subtopic, diff) => ({
  id,
  question: `Placeholder question for ${subtopic} difficulty ${diff}.`,
  options: ["Option A", "Option B", "Option C", "Option D"],
  correctAnswer: "Option A",
  solution: "Step-by-step solution placeholder.",
  difficulty: diff
});

export const generateQuestions = (module, subtopic, count = 35) => {
  console.log(`Generating ${count} questions for ${module} -> ${subtopic}`);
  
  switch (module.toLowerCase()) {
    case 'quantitative-aptitude':
      return generateQuantQuestions(subtopic, count);
    case 'logical-reasoning':
      return generateLogicalQuestions(subtopic, count);
    case 'verbal-ability':
      return generateVerbalQuestions(subtopic, count);
    case 'data-interpretation':
      return generateDIQuestions(subtopic, count);
    default:
      return [];
  }
};
