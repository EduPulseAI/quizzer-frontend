import type { GetSessionResponse } from '../actions/get-session-api';
import type { StartSessionResponse } from '../actions/start-session-api';

/**
 * [start-session]
 * next-feature@0.1.1-beta.5
 * January 11th 2026, 5:19:42 am
 */
export const START_SESSION: StartSessionResponse = null;

/**
 * [get-session]
 * next-feature@0.1.1-beta.6
 * January 19th 2026, 6:30:24 pm
 */
export const GET_SESSION: GetSessionResponse = {
  isComplete: false,
  session: {
    id: "",
    studentId: "",
    currentQuestion: undefined,
    currentDifficulty: "BEGINNER",
    status: "DWELL"
  }

};
