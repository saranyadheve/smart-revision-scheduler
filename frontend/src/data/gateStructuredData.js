import { Cpu, Binary, Layout, Code2, Globe, Shield, Terminal, BookOpen, Layers, Zap } from 'lucide-react';

export const gateData = {
  main: {
    title: "GATE Computer Science & IT",
    description: "Master the core engineering subjects for GATE CS. Track your syllabus coverage through technical drills.",
    subjects: [
      {
        id: 'os',
        title: 'Operating Systems',
        icon: Layout,
        topics: [
          { name: 'Process Management', subtopics: ["Process States", "Scheduling Algorithms", "Context Switching", "Threads"] },
          { name: 'Synchronization & Deadlocks', subtopics: ["Semaphores", "Critical Section", "Banker's Algorithm", "Deadlock Prevention"] },
          { name: 'Memory Management', subtopics: ["Paging", "Segmentation", "Virtual Memory", "Page Replacement"] },
          { name: 'File Systems', subtopics: ["Disk Scheduling", "File Allocation", "I/O Management"] }
        ]
      },
      {
        id: 'ds',
        title: 'Data Structures',
        icon: Binary,
        topics: [
          { name: 'Linear Structures', subtopics: ["Arrays & Matrices", "Linked Lists", "Stacks", "Queues"] },
          { name: 'Non-Linear Structures', subtopics: ["Binary Trees", "Heaps", "Hashing", "Graphs"] }
        ]
      },
      {
        id: 'algo',
        title: 'Algorithms',
        icon: Terminal,
        topics: [
          { name: 'Analysis & Sorting', subtopics: ["Complexity Analysis", "Sorting (Quick, Merge, Heap)", "Searching"] },
          { name: 'Design Techniques', subtopics: ["Greedy Algorithms", "Dynamic Programming", "Backtracking", "Divide & Conquer"] },
          { name: 'Graph Algorithms', subtopics: ["BFS & DFS", "Shortest Path (Dijkstra, Bellman-Ford)", "MST (Prim, Kruskal)"] }
        ]
      },
      {
        id: 'dbms',
        title: 'Databases',
        icon: Layers,
        topics: [
          { name: 'Modeling & Design', subtopics: ["ER Model", "Relational Model", "Relational Algebra"] },
          { name: 'Normalization', subtopics: ["Functional Dependencies", "1NF, 2NF, 3NF", "BCNF"] },
          { name: 'Transactions', subtopics: ["ACID Properties", "Concurrency Control", "SQL Queries", "Indexing"] }
        ]
      },
      {
        id: 'networks',
        title: 'Computer Networks',
        icon: Globe,
        topics: [
          { name: 'Fundamentals', subtopics: ["OSI Model", "TCP/IP Layers", "Protocols"] },
          { name: 'Routing & Transport', subtopics: ["Routing (RIP, OSPF, BGP)", "TCP vs UDP", "Congestion Control", "Sockets"] }
        ]
      },
      {
        id: 'theory',
        title: 'TOC & Compilers',
        icon: Code2,
        topics: [
          { name: 'Theory of Computation', subtopics: ["Finite Automata", "Context Free Grammar", "Turing Machines", "Decidability"] },
          { name: 'Compiler Design', subtopics: ["Lexical Analysis", "Parsing (LL/LR)", "Intermediate Code", "Code Optimization"] }
        ]
      },
      {
        id: 'coa',
        title: 'Digital & Arch (COA)',
        icon: Cpu,
        topics: [
          { name: 'Digital Logic', subtopics: ["Boolean Algebra", "Combinational Circuits", "Sequential Circuits"] },
          { name: 'Organization', subtopics: ["Instruction Pipeline", "Cache Memory", "IO Organization", "Addressing Modes"] }
        ]
      },
      {
        id: 'math',
        title: 'Engg Mathematics',
        icon: Zap,
        topics: [
          { name: 'Calculus', subtopics: ["Limits & Continuity", "Partial Derivatives", "Integration", "Differential Equations"] },
          { name: 'Logic & Discrete', subtopics: ["Propositional Logic", "Set Theory", "Combinatorics", "Graph Theory Concepts"] }
        ]
      }
    ]
  }
};
