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
        return { ...defaultActivity(), ...JSON.parse(raw) };
    } catch {
        return defaultActivity();
    }
};

const defaultActivity = () => ({
    testsTaken: 0,
    totalScore: 0,       // cumulative correct answers
    totalQuestions: 0,   // cumulative total questions
    topicsCovered: [],   // array of unique topic strings
    history: []          // array of { topic, correct, total, percent, date }
});

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
