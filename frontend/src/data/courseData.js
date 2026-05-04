export const courseData = {
  tnpsc: {
    groups: ["Group 1", "Group 2 & 2A", "Group 4"],
    subjects: [
      { 
        id: "history", title: "History", 
        visual: "history_ai_visual",
        summary: "Trace the evolution of Tamil society and Indian freedom struggle through cinematic timelines and archaeological analysis.",
        notes: "/notes/tnpsc/history.pdf", practice: "/practice/tnpsc/history" 
      },
      { 
        id: "polity", title: "Polity", 
        visual: "history_ai_visual",
        summary: "Master the Indian Constitution, Governance structures, and public policies with a focus on administrative excellence.",
        notes: "/notes/tnpsc/polity.pdf", practice: "/practice/tnpsc/polity" 
      },
      { id: "geography", title: "Geography", visual: "science_ai_visual", summary: "Explore physical and human geography of India and Tamil Nadu through spatial data and environmental mapping.", notes: "/notes/tnpsc/geography.pdf", practice: "/practice/tnpsc/geography" },
      { id: "economy", title: "Economy", visual: "gate_ai_visual", summary: "Analyze fiscal policy, monetary trends, and rural development frameworks in a data-driven economic roadmap.", notes: "/notes/tnpsc/economy.pdf", practice: "/practice/tnpsc/economy" },
      { id: "science", title: "Science", visual: "science_ai_visual", summary: "Deep-dive into Physics, Biology, and Chemistry concepts mapped specifically for TNPSC scientific standard.", notes: "/notes/tnpsc/science.pdf", practice: "/practice/tnpsc/science" },
      { id: "ca", title: "Current Affairs", visual: "history_ai_visual", summary: "Daily intelligence briefings and analytical reports on national and international developments.", notes: "/notes/tnpsc/ca.pdf", practice: "/practice/tnpsc/ca" },
      { id: "aptitude", title: "Aptitude", visual: "gate_ai_visual", summary: "Master logical reasoning and quantitative math with mental-drills and pattern recognition.", notes: "/notes/tnpsc/aptitude.pdf", practice: "/practice/tnpsc/aptitude" },
      { id: "language", title: "Tamil / English", visual: "history_ai_visual", summary: "Linguistic and literary excellence with structured grammar and poetry analysis.", notes: "/notes/tnpsc/language.pdf", practice: "/practice/tnpsc/language" }
    ]
  },
  gate: {
    subjects: [
      { id: "os", title: "Operating Systems", visual: "gate_ai_visual", summary: "Master Process Management, Scheduling, and Memory Allocation with engineering-grade visualizations.", notes: "https://www.geeksforgeeks.org/operating-systems/", practice: "/practice/gate/os" },
      { id: "dbms", title: "DBMS", visual: "gate_ai_visual", summary: "SQL, Normalization, and Indexing strategies for high-performance database management systems.", notes: "https://www.geeksforgeeks.org/dbms/", practice: "/practice/gate/dbms" },
      { id: "cn", title: "Computer Networks", visual: "gate_ai_visual", summary: "Deep dive into OSI layers, TCP/UDP protocols, and network architecture for scalable systems.", notes: "/notes/gate/cn.pdf", practice: "/practice/gate/cn" },
      { id: "dsa", title: "Data Structures", visual: "gate_ai_visual", summary: "Visualize Arrays, Stacks, Queues, and Graphs to master algorithmic efficiency.", notes: "/notes/gate/dsa.pdf", practice: "/practice/gate/dsa" },
      { id: "algorithms", title: "Algorithms", visual: "gate_ai_visual", summary: "Greedy, Dynamic Programming, and Divide & Conquer strategies for complex problem solving.", notes: "/notes/gate/algorithms.pdf", practice: "/practice/gate/algorithms" }
    ]
  },
  interview: {
    categories: [
      { id: "dsa", title: "DSA", visual: "gate_ai_visual", summary: "LeetCode patterns and high-performance data manipulation for technical interviews.", notes: "/notes/interview/dsa.pdf", practice: "/practice/interview/dsa" },
      { id: "core", title: "Core Subjects", visual: "gate_ai_visual", summary: "Revision of OS, DBMS, and CN fundamentals with a focus on 'Explain like I'm five' techniques.", notes: "/notes/interview/core.pdf", practice: "/practice/interview/core" },
      { id: "programming", title: "Programming", visual: "gate_ai_visual", summary: "Language-specific deep dives (Java/C++/Python/JS) and advanced features analysis.", notes: "/notes/interview/programming.pdf", practice: "/practice/interview/programming" },
      { id: "webdev", title: "Web Development", visual: "science_ai_visual", summary: "Frontend/Backend architecture, React hooks, and lifecycle management for modern apps.", notes: "/notes/interview/webdev.pdf", practice: "/practice/interview/webdev" },
      { id: "sysdesign", title: "System Design", visual: "gate_ai_visual", summary: "Master Load Balancers, Caching, Sharding, and Distributed Systems for senior engineering roles.", notes: "/notes/interview/sysdesign.pdf", practice: "/practice/interview/sysdesign" },
      { id: "hr", title: "HR Preparation", visual: "history_ai_visual", summary: "Behavioural analysis, STAR method responses, and soft-skill mastery for final rounds.", notes: "/notes/interview/hr.pdf", practice: "/practice/interview/hr" }
    ]
  }
};
