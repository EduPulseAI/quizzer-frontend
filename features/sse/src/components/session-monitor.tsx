'use client';

import { useSSEConnection } from '../hooks/use-sse-connection';
import { useEngagementScore } from '../hooks/use-engagement-score';
import { useAdaptiveActions } from '../hooks/use-adaptive-actions';
import { ConnectionStatus } from './connection-status';
import { EngagementScoreDisplay } from './engagement-score';
import { AdaptiveActionDisplay } from './adaptive-action';
import { BACKEND_API_URL } from "../lib/config";

interface SessionMonitorProps {
  studentId: string;
  sessionId: string;
  baseUrl?: string;
}

export function SessionMonitor({
 studentId,
 sessionId,
 baseUrl = BACKEND_API_URL
}: SessionMonitorProps) {
  const engagement = useEngagementScore();
  const adaptiveActions = useAdaptiveActions();

  const { status, isConnected } = useSSEConnection({
    baseUrl,
    studentId,
    sessionId,
    autoConnect: true,
    onEngagement: (data) => {
      console.log('Engagement received:', data);
      engagement.addScore(data);
    },
    onAdaptAction: (data) => {
      console.log('Adaptive action received:', data);
      adaptiveActions.addAction(data);
    },
    onHeartbeat: (data) => {
      console.log('Heartbeat:', data);
    },
    onError: (data) => {
      console.error('SSE Error:', data);
    },
    onConnected: (data) => {
      console.log('Connected:', data);
    },
  });

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Learning Session Monitor</h1>
          <p className="text-gray-600">
            Student: {studentId} • Session: {sessionId}
          </p>
        </div>
        <ConnectionStatus status={status} />
      </div>

      {/* Latest Adaptive Action */}
      {adaptiveActions.latest && (
        <AdaptiveActionDisplay
          action={adaptiveActions.latest}
          onDismiss={adaptiveActions.dismissLatest}
        />
      )}

      {/* Engagement Score */}
      {engagement.current ? (
        <EngagementScoreDisplay score={engagement.current} />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
          {isConnected ? 'Waiting for engagement data...' : 'Not connected'}
        </div>
      )}

      {/* History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Engagement History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Engagement History</h3>
          {engagement.history.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {engagement.history.slice().reverse().map((score, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{new Date(score.envelope.timestamp).toLocaleTimeString()}</span>
                  <span className="font-medium">{(score.score * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No history yet</p>
          )}
        </div>

        {/* Action History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Action History</h3>
          {adaptiveActions.actions.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {adaptiveActions.actions.slice().reverse().map((action, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{new Date(action.envelope.timestamp).toLocaleTimeString()}</span>
                  <span className="font-medium">{action.actionType}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No actions yet</p>
          )}
        </div>
      </div>
    </div>
  );
}