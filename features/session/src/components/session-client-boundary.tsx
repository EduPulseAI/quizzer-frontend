'use client';

import { useEffect, type ReactNode } from 'react';
import type { Session } from '../lib/types/session';
import { useSessionStore } from '../stores/session-store';
import { useSessionEvents } from '../hooks/use-session-events';
import SessionHeader from './session-header';
import SessionProgressBar from './session-progress-bar';
import SessionQuestion from './session-question';
import SessionFeedback from './session-feedback';

interface Props {
  session: Session;
  children: ReactNode;
}

export function SessionClientBoundary({ session, children }: Props) {
  const { initializeSession } = useSessionStore();

  // Initialize store with server data
  useEffect(() => {
    initializeSession(session);
  }, [session, initializeSession]);

  // Set up event tracking
  useSessionEvents();

  return (
    <div className="space-y-6">
      {children}
    </div>
  );
}

export default SessionClientBoundary;
