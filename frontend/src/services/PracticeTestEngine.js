import { questions as existingQuestions } from '../data/questions';

export const TRACKS_CONFIG = {
  UPSC: {
    title: 'UPSC Civil Services',
    subjects: {
      History: ['Ancient India', 'Medieval India', 'Modern India', 'Art & Culture'],
      Polity: ['Preamble', 'Fundamental Rights', 'Parliament', 'Judiciary'],
      Geography: ['Physical Geography', 'Indian Geography', 'World Geography'],
      Economy: ['Macroeconomics', 'Banking & Finance', 'Budget & Taxation'],
      Environment: ['Ecology', 'Biodiversity', 'Climate Change'],
      Science: ['Physics', 'Chemistry', 'Biology', 'Space Tech'],
      'Current Affairs': ['National Events', 'International Relations']
    }
  },
  TNPSC: {
    title: 'TNPSC Group Exams',
    subjects: {
      History: ['Dravidian Movement', 'Indian National Movement', 'Tamil Nadu History'],
      Polity: ['Constitution', 'Panchayat Raj', 'Centre-State Relations'],
      Geography: ['Tamil Nadu Geography', 'Indian Geography'],
      Economy: ['Tamil Nadu Economy', 'Indian Economy', 'Five Year Plans'],
      Science: ['General Science', 'Inventions & Discoveries'],
      'Current Affairs': ['TN Current Affairs', 'National News'],
      Aptitude: ['Logical Reasoning', 'Data Interpretation', 'Mental Ability'],
      'Tamil / English': ['Grammar', 'Literature', 'General English']
    }
  },
  GATE: {
    title: 'GATE (CSE)',
    subjects: {
      'Data Structures': ['Arrays', 'Trees', 'Graphs', 'Hashing'],
      Algorithms: ['Sorting', 'Searching', 'Graph Algos', 'Dynamic Programming'],
      'Operating Systems': ['Process Management', 'Memory Management', 'File Systems'],
      DBMS: ['Relational Model', 'SQL', 'Transactions', 'Concurrency Control'],
      'Computer Networks': ['OSI Model', 'TCP/IP', 'Routing', 'Application Layer']
    }
  },
  'IT INTERVIEW': {
    title: 'IT Industry Interfaces',
    subjects: {
      DSA: ['Arrays & Strings', 'Linked Lists', 'Trees & Graphs', 'Dynamic Programming'],
      'Core Subjects': ['OS', 'DBMS', 'Computer Networks'],
      Programming: ['Java', 'Python', 'C++', 'JavaScript'],
      'Web Development': ['HTML/CSS', 'React', 'Node.js', 'System Architecture'],
      'System Design': ['Scalability', 'Microservices', 'Databases', 'Load Balancing'],
      HR: ['Behavioral', 'Situational', 'Company Fit']
    }
  }
};

/**
 * Generate dummy question to fill missing gaps.
 */
function generateDummyQuestion(id, track, subject, subtopic, difficulty) {
  const diffString = difficulty === 1 || difficulty === 2 ? 'Easy' : difficulty === 3 ? 'Medium' : 'Hard';
  return {
    id: `dummy_${id}`,
    course: track,
    topic: subtopic || subject,
    difficulty,
    question: `[${diffString}] Dummy question for ${track} - ${subject} (${subtopic || 'General'}). What is the correct principle?`,
    options: ['Option A (Correct)', 'Option B (Distractor)', 'Option C (Distractor)', 'Option D (Distractor)'],
    answer: 'Option A (Correct)',
    explanation: 'This is a dynamically generated dummy explanation for demonstration purposes. The correct answer was chosen because it aligns with standard principles of this topic.'
  };
}

/**
 * Generates an array of exactly 30 questions based on Track, Subject, and Subtopic.
 * If Subject/Subtopic is null/empty, it generates a "Common Practice Test" mixing multiple subjects.
 * Target distribution: 10 Easy (diff 1-2), 10 Medium (diff 3), 10 Hard (diff 4-5).
 */
export const generateQuestions = (track, subject = null, subtopic = null) => {
  let selected = [];
  
  // Real questions pool that vaguely matches the track
  let pool = existingQuestions.filter(q => q.course.toLowerCase() === track.toLowerCase());
  if (subject) {
      // In a fully populated DB, we'd filter by subject/topic too. For now fallback to track.
      // We will only use them if we have matches, otherwise rely on dummy generation.
  }

  const buckets = { easy: 10, medium: 10, hard: 10 };
  
  // Function to pull from real DB first, then dummy
  const fillBucket = (bucketSize, difficultyLevel) => {
      let bucketQuestions = [];
      let tempId = Date.now() + Math.floor(Math.random() * 1000000);
      
      // Select real matches if any exist
      let realMatches = pool.filter(q => {
          if (difficultyLevel === 'easy') return q.difficulty <= 2;
          if (difficultyLevel === 'medium') return q.difficulty === 3;
          return q.difficulty >= 4;
      });

      // shuffle real matches
      realMatches = realMatches.sort(() => Math.random() - 0.5);

      for(let i=0; i<bucketSize; i++) {
          if (i < realMatches.length) {
              bucketQuestions.push(realMatches[i]);
          } else {
              // Mix subjects if common test
              let actualSub = subject;
              let actualSubtopic = subtopic;
              if (!subject) {
                  const subs = Object.keys(TRACKS_CONFIG[track].subjects);
                  actualSub = subs[Math.floor(Math.random() * subs.length)];
                  const tops = TRACKS_CONFIG[track].subjects[actualSub];
                  actualSubtopic = tops[Math.floor(Math.random() * tops.length)];
              }
              
              let mapDiff = difficultyLevel === 'easy' ? 2 : difficultyLevel === 'medium' ? 3 : 5;
              bucketQuestions.push(generateDummyQuestion(tempId++, track, actualSub, actualSubtopic, mapDiff));
          }
      }
      return bucketQuestions;
  };

  selected = [
      ...fillBucket(buckets.easy, 'easy'),
      ...fillBucket(buckets.medium, 'medium'),
      ...fillBucket(buckets.hard, 'hard'),
  ];
  
  // Shuffle final 30
  return selected.sort(() => Math.random() - 0.5);
};
