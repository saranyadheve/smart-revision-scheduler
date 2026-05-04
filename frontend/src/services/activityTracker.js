/**
 * Activity Tracker — persists test results and topic coverage to localStorage.
 * All modules write here; Dashboard reads from here.
 */

const STORAGE_KEY = 'sr_activity';

/** Read the entire activity object (with safe defaults). */
export const getActivity = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultActivity();
        const parsed = JSON.parse(raw);
        return { 
            ...defaultActivity(), 
            ...parsed,
            aiInteractionsCount: parsed.aiInteractionsCount || 0 
        };
    } catch {
        return defaultActivity();
    }
};

const defaultActivity = () => ({
    testsTaken: 0,
    totalScore: 0,       // cumulative correct answers
    totalQuestions: 0,   // cumulative total questions
    topicsCovered: [],   // array of unique topic strings
    aiInteractionsCount: 0, // NEW: Counter for AI chat usage
    history: [],         // array of { topic, correct, total, percent, date }
    sessions: []         // array of ISO timestamps for activity tracking
});

/** Log an AI chat interaction. */
export const logAIInteraction = () => {
    const activity = getActivity();
    activity.aiInteractionsCount += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activity));
    logInteraction(); // Also counts as daily activity
};

/** Log a generic user interaction for consistency metrics. */
export const logInteraction = () => {
    const activity = getActivity();
    const today = new Date().toISOString().split('T')[0];
    
    // Only log one unique entry per day for sessions
    if (!activity.sessions.includes(today)) {
        activity.sessions.push(today);
        // Keep last 60 days for a better history map
        if (activity.sessions.length > 60) activity.sessions.shift();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activity));
    }
};

/** Calculate current daily streak. */
export const getStreak = (activity) => {
    if (!activity.sessions || activity.sessions.length === 0) return 0;
    
    // Sort sessions descending
    const sorted = [...new Set(activity.sessions)].sort((a, b) => new Date(b) - new Date(a));
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // If last activity was neither today nor yesterday, streak is broken
    if (sorted[0] !== today && sorted[0] !== yesterdayStr) return 0;

    let streak = 0;
    let checkDate = new Date(sorted[0]);

    for (let i = 0; i < sorted.length; i++) {
        const sessionDate = new Date(sorted[i]);
        const diffTime = Math.abs(checkDate - sessionDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
            streak++;
            checkDate = sessionDate;
        } else {
            break;
        }
    }
    return streak;
};

/** Calculate study regularity over last 7 days (0-100%). */
export const getConsistencyScore = (activity) => {
    if (!activity.sessions || activity.sessions.length === 0) return 0;
    
    const now = new Date();
    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(now.getDate() - i);
        return d.toISOString().split('T')[0];
    });

    const activeDays = last7Days.filter(day => activity.sessions.includes(day)).length;
    return Math.round((activeDays / 7) * 100);
};

/**
 * Save a completed test result.
 * @param {string} topic  - e.g. 'UPSC', 'GATE', 'IPS'
 * @param {number} correct
 * @param {number} total
 */
export const saveTestResult = (topic, correct, total) => {
    const activity = getActivity();

    activity.testsTaken += 1;
    activity.totalScore += correct;
    activity.totalQuestions += total;

    const topicKey = topic.toUpperCase();
    if (!activity.topicsCovered.includes(topicKey)) {
        activity.topicsCovered.push(topicKey);
    }

    activity.history.unshift({
        topic: topicKey,
        correct,
        total,
        percent: total > 0 ? Math.round((correct / total) * 100) : 0,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    });

    // Keep only last 20 entries
    if (activity.history.length > 20) activity.history = activity.history.slice(0, 20);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(activity));
};

/** Overall accuracy across all tests (0-100). */
export const getAccuracy = (activity) => {
    if (!activity.totalQuestions) return 0;
    return Math.round((activity.totalScore / activity.totalQuestions) * 100);
};

/** Clear all tracked data (useful for reset). */
export const clearActivity = () => {
    localStorage.removeItem(STORAGE_KEY);
};
