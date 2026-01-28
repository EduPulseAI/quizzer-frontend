'use client';

import { useCallback, useEffect, useRef } from 'react';
import { sendSessionEvent } from '../lib/actions/send-session-event-api';
import {
  type SessionEventPayload,
  SessionEventType,
} from '../lib/types/session-event';
import { useSessionStore } from '../stores/session-store';

export function useSessionEvents() {
  const { session, currentQuestion, getDwellTime } = useSessionStore();
  const hasStartedRef = useRef(false);
  const previousQuestionIdRef = useRef<string | null>(null);

  const publishEvent = useCallback(
    async (
      eventType: SessionEventType,
      additionalData?: Partial<SessionEventPayload>
    ) => {
      if (!session) return;

      const payload: SessionEventPayload = {
        sessionId: session.id,
        eventType,
        pageId: currentQuestion?.id,
        timestamp: Date.now(),
        ...additionalData,
      };

      try {
        await sendSessionEvent(payload);
      } catch (error) {
        console.error(`Failed to publish ${eventType} event:`, error);
      }
    },
    [session, currentQuestion?.id]
  );

  // Publish STARTED event on mount
  useEffect(() => {
    if (session && !hasStartedRef.current) {
      hasStartedRef.current = true;
      publishEvent(SessionEventType.STARTED);
    }
  }, [session, publishEvent]);

  // Track question navigation and dwell time
  useEffect(() => {
    const currentQuestionId = currentQuestion?.id;

    if (
      previousQuestionIdRef.current !== null &&
      previousQuestionIdRef.current !== currentQuestionId
    ) {
      // Publish DWELL event for previous question
      const dwellTime = getDwellTime();
      publishEvent(SessionEventType.DWELL, {
        pageId: previousQuestionIdRef.current,
        dwellTimeMs: dwellTime,
      });

      // Publish NAVIGATION event for new question
      publishEvent(SessionEventType.NAVIGATION, {
        pageId: currentQuestionId,
      });
    }

    previousQuestionIdRef.current = currentQuestionId ?? null;
  }, [currentQuestion?.id, getDwellTime, publishEvent]);

  // Handle visibility change (PAUSED/RESUMED)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        publishEvent(SessionEventType.PAUSED);
      } else {
        publishEvent(SessionEventType.RESUMED);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [publishEvent]);

  // Publish DWELL on unmount
  useEffect(() => {
    return () => {
      if (session && currentQuestion) {
        const dwellTime = getDwellTime();
        sendSessionEvent({
          sessionId: session.id,
          eventType: SessionEventType.DWELL,
          pageId: currentQuestion.id,
          dwellTimeMs: dwellTime,
          timestamp: Date.now(),
        });
      }
    };
    // Only run cleanup on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const publishCompleted = useCallback(() => {
    publishEvent(SessionEventType.COMPLETED);
  }, [publishEvent]);

  return {
    publishEvent,
    publishCompleted,
  };
}
