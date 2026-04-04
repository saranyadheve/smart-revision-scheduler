import { Book, Globe, Shield, TrendingUp, Leaf, Newspaper, PenTool, Layout, Users, FileText, CheckCircle2 as CheckCircle, MessageSquare, Award, GraduationCap, Target, BookOpen, Lightbulb, Calendar } from 'lucide-react';

// ─── Syllabus Data ─────────────────────────────────────────────────────────────
export const upscData = {
  prelims: {
    title: "Preliminary Examination",
    description: "Objective MCQ-based screening. Two papers: GS Paper I (General Studies) and CSAT (Paper II). Only GS Paper I marks count for merit.",
    subjects: [
      {
        id: 'history',
        title: 'History of India',
        icon: Book,
        color: 'from-orange-500 to-red-500',
        weightage: '18-22 Questions',
        topics: [
          { name: 'Ancient India', detail: 'Indus Valley, Vedic Period, Mauryan & Gupta Empires, Sangam Literature' },
          { name: 'Medieval India', detail: 'Delhi Sultanate, Mughal Empire, Bhakti & Sufi Movements, Vijayanagara' },
          { name: 'Modern India', detail: 'British Rule, Revolt of 1857, Congress, Gandhi, Quit India, Partition' },
          { name: 'Post-Independence', detail: '1947–1964, States Reorganization, Green Revolution, Emergency' },
        ]
      },
      {
        id: 'geography',
        title: 'Geography',
        icon: Globe,
        color: 'from-emerald-500 to-teal-500',
        weightage: '20-25 Questions',
        topics: [
          { name: 'Physical Geography', detail: 'Plate Tectonics, Climate, Weathering, Landforms, Drainage Systems' },
          { name: 'Indian Geography', detail: 'Himalayas, Rivers, Monsoon, Soils, Natural Vegetation, Minerals' },
          { name: 'World Geography', detail: 'Continents, Oceans, Deserts, Latitudes, Time Zones' },
          { name: 'Human Geography', detail: 'Population, Migration, Urbanization, Agriculture Patterns' },
        ]
      },
      {
        id: 'polity',
        title: 'Indian Polity',
        icon: Shield,
        color: 'from-blue-500 to-indigo-500',
        weightage: '15-18 Questions',
        topics: [
          { name: 'Constitution', detail: 'Preamble, Fundamental Rights (Art 12-35), DPSPs, Fundamental Duties' },
          { name: 'Parliament & Executive', detail: 'Lok Sabha, Rajya Sabha, President, PM, Council of Ministers' },
          { name: 'Judiciary', detail: 'Supreme Court, High Courts, Judicial Review, PIL, Writs' },
          { name: 'Local Governance', detail: '73rd & 74th Amendments, Panchayati Raj, Urban Local Bodies' },
        ]
      },
      {
        id: 'economy',
        title: 'Economy',
        icon: TrendingUp,
        color: 'from-purple-500 to-pink-500',
        weightage: '15-18 Questions',
        topics: [
          { name: 'National Income', detail: 'GDP, GNP, NNP, NDP, Per Capita Income, Real vs Nominal GDP' },
          { name: 'Monetary Policy', detail: 'RBI, Repo Rate, Reverse Repo, CRR, SLR, Inflation Control' },
          { name: 'Fiscal Policy', detail: 'Budget, Fiscal Deficit, Revenue Deficit, FRBM Act, Direct/Indirect Tax' },
          { name: 'Poverty & Development', detail: 'Human Development Index, MGNREGA, PM-KISAN, Gini Coefficient' },
        ]
      },
      {
        id: 'environment',
        title: 'Environment & Ecology',
        icon: Leaf,
        color: 'from-green-500 to-emerald-600',
        weightage: '12-16 Questions',
        topics: [
          { name: 'Biodiversity', detail: '4 Biodiversity Hotspots, Red Data Book, CITES, CBD, Ramsar Sites' },
          { name: 'Climate Change', detail: 'UNFCCC, Paris Agreement, INDCs, Carbon Credits, LiFE Mission' },
          { name: 'Protected Areas', detail: 'National Parks, Wildlife Sanctuaries, Biosphere Reserves, Tiger Reserves' },
          { name: 'Pollution & Acts', detail: 'Air/Water/Soil Pollution, Environment Protection Act, NGT' },
        ]
      },
      {
        id: 'current',
        title: 'Current Affairs & Science',
        icon: Newspaper,
        color: 'from-cyan-500 to-blue-500',
        weightage: '10-15 Questions',
        topics: [
          { name: 'Science & Technology', detail: 'Space (ISRO, Chandrayaan-3), Defence (Agni-V, Tejas), Biotech, AI' },
          { name: 'National Events', detail: 'Government Schemes, Awards, Sports Achievements, Summits' },
          { name: 'International Affairs', detail: 'India-US, BRICS, SCO, G20, UN Bodies, Diplomatic Developments' },
          { name: 'Governance Schemes', detail: 'PMAY, Ayushman Bharat, Digital India, Startup India, Jal Jeevan Mission' },
        ]
      },
    ]
  },

  mains: {
    title: "Main Examination",
    description: "9-paper descriptive exam testing analytical ability, knowledge depth, and ethical compass. Marks from 7 papers count (2 qualifying papers not counted).",
    subjects: [
      {
        id: 'essay',
        title: 'Essay Paper',
        icon: PenTool,
        color: 'from-rose-500 to-red-500',
        marks: '250 Marks',
        topics: [
          { name: 'Philosophical Essays', detail: 'Values, Ethics, Human Nature, Freedom, Justice, Democracy' },
          { name: 'Contemporary Issues', detail: 'Technology, Environment, Globalization, Education, Governance' },
          { name: 'Social & Cultural', detail: 'Religion, Gender, Diversity, Heritage, Identity, Cultural Change' },
          { name: 'Exam Strategy', detail: 'Write 2 essays (~1000 words each). Structure: Intro → Body → Conclusion' },
        ]
      },
      {
        id: 'gs1',
        title: 'General Studies I',
        icon: Globe,
        color: 'from-amber-500 to-orange-500',
        marks: '250 Marks',
        topics: [
          { name: 'Indian Heritage & Culture', detail: 'Art forms, Literature, Architecture, Ancient to Modern Era' },
          { name: 'History', detail: 'World History from 18th Century, Indian Freedom Struggle, Post-independence' },
          { name: 'World Geography', detail: 'Physical, Social, Economic Geography — Resources, Agriculture, Industries' },
          { name: 'Social Issues', detail: 'Population, urbanization, poverty, drought, floods, globalization effects' },
        ]
      },
      {
        id: 'gs2',
        title: 'General Studies II',
        icon: Shield,
        color: 'from-blue-500 to-indigo-500',
        marks: '250 Marks',
        topics: [
          { name: 'Indian Constitution & Polity', detail: 'Functions & Responsibilities of Union & States, Parliament, Judiciary' },
          { name: 'Governance', detail: 'Government Policies, Welfare Schemes, e-Governance, NGOs, RTI' },
          { name: 'Social Justice', detail: 'Welfare schemes for vulnerable sections, Health & Education' },
          { name: 'International Relations', detail: 'India\'s bilateral, regional International relations & policies' },
        ]
      },
      {
        id: 'gs3',
        title: 'General Studies III',
        icon: TrendingUp,
        color: 'from-emerald-500 to-teal-500',
        marks: '250 Marks',
        topics: [
          { name: 'Economic Development', detail: 'Planning, Agriculture, Food processing, Land reforms, Infrastructure' },
          { name: 'Technology & Innovation', detail: 'Science & Technology developments, IPR, Space tech, Biotech' },
          { name: 'Environment', detail: 'Conservation, Environmental pollution, Disaster management' },
          { name: 'Security', detail: 'Internal Security, Extremism, Cyber security, Money laundering' },
        ]
      },
      {
        id: 'gs4',
        title: 'General Studies IV',
        icon: CheckCircle,
        color: 'from-purple-500 to-pink-500',
        marks: '250 Marks',
        topics: [
          { name: 'Ethics & Human Interface', detail: 'Human values, Moral philosophers, Role of family, society, education' },
          { name: 'Attitude & Aptitude', detail: 'Emotional intelligence, moral intuition, Contribution of thinkers' },
          { name: 'Integrity in Public Life', detail: 'Probity, Philosophical basis, Governance, Accountability' },
          { name: 'Case Studies', detail: 'Practical ethical dilemmas in public service scenarios — 4-6 cases' },
        ]
      },
      {
        id: 'optional',
        title: 'Optional Subject',
        icon: Layout,
        color: 'from-slate-500 to-slate-700',
        marks: '500 Marks (2 Papers)',
        topics: [
          { name: 'Paper I', detail: 'Core academic foundations of the chosen optional subject' },
          { name: 'Paper II', detail: 'Applied and advanced topics of the optional subject' },
          { name: 'Popular Choices', detail: 'Public Administration, Geography, History, Sociology, Political Science' },
          { name: 'STEM Choices', detail: 'Mathematics, Physics, Chemistry, Engineering, Agriculture, Medical Science' },
        ]
      },
    ]
  },

  interview: {
    title: "Personality Test",
    description: "The final crucible. A board of distinguished officials assess your suitability for civil services — 275 marks. DAF-based and knowledge-intensive.",
    areas: [
      {
        title: 'DAF Deep Dive',
        icon: FileText,
        desc: 'Questions based on your Detailed Application Form — academics, hobbies, home state, educational background, and work experience.',
        tips: ['Know your graduation subject deeply', 'Research your home state extensively', 'Be ready to explain every hobby listed']
      },
      {
        title: 'Current Affairs',
        icon: Newspaper,
        desc: 'Expect probing questions on national and international events. Board assesses awareness, critical thinking and balanced understanding.',
        tips: ['Follow The Hindu, Indian Express daily', 'Maintain monthly notes on key events', 'Form balanced opinions on controversial topics']
      },
      {
        title: 'Opinion Formation',
        icon: MessageSquare,
        desc: 'Ethics-based situational questions and societal dilemmas where the board evaluates clarity of thought and moral reasoning.',
        tips: ['Practice structured PEEL answers', 'Avoid extremes; show nuance', 'Ground opinions in constitutional values']
      },
      {
        title: 'Leadership & Personality',
        icon: Award,
        desc: 'Assessment of mental alertness, leadership potential, social cohesion ability, and intellectual curiosity.',
        tips: ['Demonstrate calm under pressure', 'Show flexibility with "agree to disagree"', 'Highlight collaborative experiences']
      },
    ]
  },

  books: [
    { title: "Indian Polity", author: "M. Laxmikanth", subject: "Polity", tag: "Must Read", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { title: "A Brief History of Modern India", author: "Spectrum", subject: "Modern History", tag: "Standard", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
    { title: "Indian Economy", author: "Ramesh Singh", subject: "Economy", tag: "Must Read", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { title: "Certificate Physical & Human Geography", author: "G.C. Leong", subject: "Geography", tag: "Standard", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { title: "Environment & Ecology", author: "Shankar IAS", subject: "Environment", tag: "Must Read", color: "text-green-400 bg-green-500/10 border-green-500/20" },
    { title: "Art & Culture", author: "Nitin Singhania", subject: "Culture / GS1", tag: "Standard", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { title: "Ethics, Integrity & Aptitude", author: "G. Subba Rao", subject: "GS4 Ethics", tag: "Recommended", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
    { title: "Current Events (Monthly)", author: "Vision IAS / Insights", subject: "Current Affairs", tag: "Monthly", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
  ],

  pyqs: [
    { year: 2023, stage: "Prelims", question: "Which Article of the Constitution deals with the Annual Financial Statement?" },
    { year: 2022, stage: "Prelims", question: "With reference to Indian Economy, what are advantages of 'Inflation-Indexed Bonds'?" },
    { year: 2023, stage: "Mains GS2", question: "Constitutionally guaranteed judicial independence is a prerequisite of democracy. Comment." },
    { year: 2021, stage: "Mains GS4", question: "Identify five ethical traits on which one can judge the performance of a civil servant." },
    { year: 2020, stage: "Mains GS1", question: "Describe the reasons for the growth of Naxalism in India." },
    { year: 2019, stage: "Prelims", question: "The 'Deepor Beel' important bird area is located in which state?" },
  ]
};
