import { Cpu, Binary, Layout, Code2, Globe, Shield, Terminal, BookOpen, Layers, Zap, Brain, MessageSquare, Terminal as Term, Server } from 'lucide-react';

export const interviewData = {
  main: {
    title: "IT Interview Preparation Track",
    description: "Prepare for top-tier technical placements. Focus on DSA, Core Subjects, and System Design.",
    subjects: [
      {
        id: 'dsa',
        title: 'Data Structures & Algorithms',
        icon: Code2,
        topics: [
          { name: 'Foundations', subtopics: ["Time & Space Complexity", "Recursion", "Backtracking", "Divide & Conquer"] },
          { name: 'Linear Items', subtopics: ["Arrays (Two Pointers, Sliding Window)", "Strings (Anagrams, Palindromes)", "Linked List (Reversal, Fast & Slow)"] },
          { name: 'Complex Items', subtopics: ["Trees (DFS, BFS, Traversals)", "Graphs (Matrix, List representation)", "Dynamic Programming (Top-down, Bottom-up)"] }
        ]
      },
      {
        id: 'core',
        title: 'Core Computer Science',
        icon: Layers,
        topics: [
          { name: 'Operating Systems', subtopics: ["Process & Thread", "Context Switching", "Virtual Memory", "Deadlocks"] },
          { name: 'DBMS', subtopics: ["SQL Queries", "Indexing", "Normalization", "Transactions (ACID)"] },
          { name: 'Networks', subtopics: ["TCP/IP vs OSI", "HTTP/HTTPS", "IP Addressing", "Sockets"] }
        ]
      },
      {
        id: 'programming',
        title: 'Programming Proficiency',
        icon: Term,
        topics: [
          { name: 'OOP Concepts', subtopics: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"] },
          { name: 'Language Specific', subtopics: ["Java (JVM, Collections)", "Python (decorators, generators)", "JS (Closures, Promises, Async)"] }
        ]
      },
      {
        id: 'sysdesign',
        title: 'System Design Basics',
        icon: Server,
        topics: [
          { name: 'High Level Design', subtopics: ["Scalability (Vertical vs Horizontal)", "Load Balancers", "Caching (Redis, Memcached)", "Message Queues"] },
          { name: 'Database Selection', subtopics: ["SQL vs NoSQL", "Sharding & Replication", "CAP Theorem", "Consistency Models"] }
        ]
      },
      {
        id: 'web',
        title: 'Web Development',
        icon: Globe,
        topics: [
          { name: 'Frontend', subtopics: ["HTML5 & Semantic tags", "CSS Grid & Flexbox", "React Basics (Hooks, State)", "Context API"] },
          { name: 'Backend', subtopics: ["RESTful APIs", "Authentication (JWT, OAuth)", "Environment Variables", "Middlewares"] }
        ]
      },
      {
        id: 'hr',
        title: 'HR & Behavioral',
        icon: Brain,
        topics: [
          { name: 'Introductory', subtopics: ["Self Introduction", "Strengths & Weaknesses", "Why this company?"] },
          { name: 'Behavioral', subtopics: ["Conflict Resolution", "Project Explanation", "Failure & Learning", "Leadership scenarios"] }
        ]
      }
    ]
  }
};
