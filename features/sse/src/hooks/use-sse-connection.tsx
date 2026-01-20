'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { SSEClient, SSEClientConfig } from '../lib/sse-client';
import type { SSEEventHandlers, ConnectionStatus } from '../lib/types';

export interface UseSSEConnectionOptions {
  baseUrl: string;
  studentId: string;
  sessionId: string;
  autoConnect?: boolean;
  onEngagement?: SSEEventHandlers['onEngagement'];
  onAdaptAction?: SSEEventHandlers['onAdaptAction'];
  onHeartbeat?: SSEEventHandlers['onHeartbeat'];
  onError?: SSEEventHandlers['onError'];
  onConnected?: SSEEventHandlers['onConnected'];
}

export function useSSEConnection(options: UseSSEConnectionOptions) {
  const {
    baseUrl,
    studentId,
    sessionId,
    autoConnect = true,
    ...handlers
  } = options;

  const clientRef = useRef<SSEClient | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>({
    state: 'disconnected',
    reconnectAttempts: 0,
  });

  // Initialize client
  useEffect(() => {
    const config: SSEClientConfig = {
      baseUrl,
      studentId,
      sessionId,
      reconnectDelay: 3000,
      maxReconnectAttempts: 10,
      heartbeatTimeout: 60000,
    };

    clientRef.current = new SSEClient(config);

    // Register handlers
    clientRef.current.on({
      ...handlers,
      onConnectionStateChange: setStatus,
    });

    // Auto-connect if enabled
    if (autoConnect) {
      clientRef.current.connect();
    }

    // Cleanup on unmount
    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
        clientRef.current = null;
      }
    };
  }, [baseUrl, studentId, sessionId, autoConnect]);

  // Update handlers when they change
  useEffect(() => {
    if (clientRef.current) {
      clientRef.current.on(handlers);
    }
  }, [handlers]);

  const connect = useCallback(() => {
    clientRef.current?.connect();
  }, []);

  const disconnect = useCallback(() => {
    clientRef.current?.disconnect();
  }, []);

  return {
    status,
    connect,
    disconnect,
    isConnected: status.state === 'connected',
    isConnecting: status.state === 'connecting',
    isReconnecting: status.state === 'reconnecting',
    hasError: status.state === 'error',
  };
}