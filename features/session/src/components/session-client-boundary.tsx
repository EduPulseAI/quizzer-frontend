'use client';

import { type ReactNode, useEffect } from 'react';
import { useSessionEvents } from '../hooks/use-session-events';
import type { Session } from '../lib/types/session';
import { useSessionStore } from '../stores/session-store';

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
