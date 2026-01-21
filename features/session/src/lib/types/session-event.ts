/**
 * [session-event]
 * next-feature@0.1.1-beta.6
 * January 19th 2026, 11:14:26 pm
 */

export const SessionEventType = {
  STARTED: 'STARTED',
  NAVIGATION: 'NAVIGATION',
  DWELL: 'DWELL',
  PAUSED: 'PAUSED',
  RESUMED: 'RESUMED',
  COMPLETED: 'COMPLETED',
} as const;

// eslint-disable-next-line no-redeclare
export type SessionEventType = typeof SessionEventType[keyof typeof SessionEventType];

export interface SessionEventPayload {
  sessionId: string;
  eventType: SessionEventType;
  pageId?: string;
  dwellTimeMs?: number;
  timestamp?: number;
}

export interface SessionEvent extends SessionEventPayload {
  id?: string;
}
