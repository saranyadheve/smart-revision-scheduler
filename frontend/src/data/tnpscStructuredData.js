import { Book, Shield, Globe, TrendingUp, FlaskConical as Flask, Zap, Calculator, Languages } from 'lucide-react';

export const tnpscData = {
  main: {
    title: "TNPSC General Studies & Languages",
    description: "Comprehensive syllabus coverage for Group 1, 2, 2A, and 4 exams. Track your progress across subjects.",
    subjects: [
      {
        id: 'history',
        title: 'History & Indian National Movement',
        icon: Book,
        topics: [
          { name: 'Ancient India', subtopics: ["Indus Valley Civilization", "Vedic Age (Early & Later)", "Buddhism and Jainism", "Mauryan Empire & Ashoka", "Gupta Dynasty", "Harshavardhana Era"] },
          { name: 'Medieval India', subtopics: ["Pallavas & Early Cholas", "Delhi Sultanate (Slave to Lodi)", "Vijayanagara & Bahmani", "Mughal Empire (Babur to Aurangzeb)", "Maratha Power", "Bhakti & Sufi Movements"] },
          { name: 'Modern India', subtopics: ["Advent of Europeans (Dutch, French, British)", "Revolt of 1857", "British Land Revenue Systems", "Western Education Influence", "Social & Religious Reform Movements"] },
          { name: 'Indian National Movement', subtopics: ["Early Uprisings against British", "Formation of INC (1885)", "Emergence of Leaders (Tilak, Gokhale)", "Gandhian Era (1917-1947)", "Quit India & Independent India", "Different modes of Agitations"] },
          { name: 'Tamil Nadu History', subtopics: ["Sangam Age Literature", "Later Cholas & Pandyas", "Nayak Period", "Justice Party & Self Respect Movement", "Evolution of 19th & 20th Century Socio-Political movements in TN"] }
        ]
      },
      {
        id: 'polity',
        title: 'Indian Polity',
        icon: Shield,
        topics: [
          { name: 'Constitution', subtopics: ["Historical Background", "Making of the Constitution", "Salient Features", "Preamble & Territory", "Citizenship", "Fundamental Rights", "Directive Principles", "Fundamental Duties"] },
          { name: 'Union Government', subtopics: ["President & VP", "Prime Minister & Council", "Parliament (LS & RS)", "Supreme Court of India", "Attorney General"] },
          { name: 'State Government', subtopics: ["Governor", "CM & Cabinet", "State Legislature", "High Courts", "Advocate General"] },
          { name: 'Local Governance', subtopics: ["73rd Constitutional Amendment", "74th Constitutional Amendment", "Panchayati Raj Evolution", "Municipal Administration"] },
          { name: 'Constitutional Bodies', subtopics: ["Election Commission", "UPSC & TNPSC", "Finance Commission", "CAG", "National Commissions for SC/ST"] }
        ]
      },
      {
        id: 'geography',
        title: 'Geography',
        icon: Globe,
        topics: [
          { name: 'Physical Geography', subtopics: ["Universe & Solar System", "Earth's Structure", "Rocks & Soils", "Atmosphere Layers", "Winds & Ocean Currents"] },
          { name: 'Indian Geography', subtopics: ["Location, Relief & Drainage", "Monsoon & Rainfall", "Natural Vegetation", "Water Resources & Irrigation", "Agriculture & Cropping Patterns"] },
          { name: 'Resources', subtopics: ["Mineral Resources", "Industries (Iron, Textile, IT)", "Population & Census 2011", "Transport & Communication"] },
          { name: 'Tamil Nadu Geography', subtopics: ["Physical Map of TN", "Climate & Rainfall in TN", "Agriculture in TN", "Industrial Clusters", "Disaster Management in TN"] }
        ]
      },
      {
        id: 'economy',
        title: 'Economy',
        icon: TrendingUp,
        topics: [
          { name: 'Basic Concepts', subtopics: ["Five Year Plans", "NITI Aayog", "National Income", "Inflation (CPI & WPI)"] },
          { name: 'Public Finance', subtopics: ["Fiscal Policy", "GST & Taxation", "Finance Commission", "Public Debt"] },
          { name: 'Banking & Money', subtopics: ["RBI & Monetary Policy", "Commercial Banks", "Microfinance & NBFCs", "Stock Markets (SEBI)"] },
          { name: 'Social Issues', subtopics: ["Poverty & Unemployment", "Welfare Schemes (Union & TN)", "Rural Development", "Human Development Index"] }
        ]
      },
      {
        id: 'science',
        title: 'Science & Environment',
        icon: Flask,
        topics: [
          { name: 'Physics', subtopics: ["Universe & Nature", "Mechanics", "Electricity", "Light, Sound & Heat", "Space Science"] },
          { name: 'Chemistry', subtopics: ["Elements & Compounds", "Acids, Bases & Salts", "Fertilizers & Pesticides", "Polymers & Plastics"] },
          { name: 'Biology', subtopics: ["Cell Biology", "Classification of Living Organisms", "Human Physiology", "Health & Hygiene", "Communicable Diseases", "Environment & Ecology"] }
        ]
      },
      {
        id: 'aptitude',
        title: 'Aptitude & Mental Ability',
        icon: Calculator,
        topics: [
          { name: 'Quantitative', subtopics: ["Simplification", "HCF & LCM", "Percentage", "Ratio & Proportion", "Simple & Compound Interest", "Area & Volume", "Time & Work"] },
          { name: 'Mental Ability', subtopics: ["Number Series", "Logical Reasoning", "Puzzles", "Visual Reasoning"] }
        ]
      },
      {
        id: 'languages',
        title: 'Tamil / General English',
        icon: Languages,
        topics: [
          { name: 'Grammar', subtopics: ["Types of Sentences", "Active & Passive Voice", "Tenses", "Articles & Prepositions", "Question Tags"] },
          { name: 'Literature', subtopics: ["Figure of Speech", "Famous Poets", "Characters from Stories", "Authors and their Works"] }
        ]
      }
    ]
  }
};
