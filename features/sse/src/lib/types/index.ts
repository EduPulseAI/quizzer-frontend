/**
 * [event-envelope]
 * next-feature@0.1.1-beta.6
 * January 19th 2026, 10:19:32 pm
 */
// Event envelope (CloudEvents)
export interface EventEnvelope {
  id: string;
  source: string;
  type: string;
  specversion: string;
  timestamp: number;
  studentId: string;
  sessionId: string;
  correlationId?: string;
}

// Engagement Score Types
export type EngagementTrend = 'RISING' | 'STABLE' | 'DECLINING' | 'CRITICAL';

export interface ScoreComponents {
  dwellScore: number;
  accuracyScore: number;
  pacingScore: number;
  attentionScore?: number;
}

export interface EngagementScore {
  envelope: EventEnvelope;
  score: number;
  scoreComponents: ScoreComponents;
  trend: EngagementTrend;
  alertThresholdCrossed: boolean;
}

// Adaptive Action Types
export type AdaptActionType =
  | 'DIFFICULTY_ADJUST'
  | 'HINT_PROVIDED'
  | 'CONTENT_SWITCH'
  | 'BREAK_SUGGESTED';

export interface DifficultyAdjustment {
  fromLevel: number;
  toLevel: number;
  reason: string;
  banditArmSelected: number;
  expectedReward: number;
}

export interface ModelMetadata {
  modelName: string;
  modelVersion: string;
  inferenceLatencyMs: number;
  confidence?: number;
}

export interface AdaptAction {
  envelope: EventEnvelope;
  actionType: AdaptActionType;
  difficultyAdjustment?: DifficultyAdjustment;
  hintContent?: string;
  modelMetadata: ModelMetadata;
}

// SSE Event Types
export interface SSEEvent<T = any> {
  eventType: string;
  eventId: string;
  timestamp: number;
  data: T;
}

export interface HeartbeatEvent {
  timestamp: number;
  message: string;
  activeConnections?: number;
}

export interface ErrorEvent {
  errorCode: string;
  errorMessage: string;
  timestamp: number;
  details?: string;
}

export interface ConnectionInfo {
  connectionId: string;
  studentId: string;
  sessionId: string;
  connectedAt: number;
}

// Connection State
export type ConnectionState =
  | 'disconnected'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'error';

export interface ConnectionStatus {
  state: ConnectionState;
  lastEventId?: string;
  lastEventTime?: number;
  reconnectAttempts: number;
  error?: string;
}

// Event Handlers
export interface SSEEventHandlers {
  onEngagement?: (data: EngagementScore) => void;
  onAdaptAction?: (data: AdaptAction) => void;
  onHeartbeat?: (data: HeartbeatEvent) => void;
  onError?: (data: ErrorEvent) => void;
  onConnected?: (data: ConnectionInfo) => void;
  onConnectionStateChange?: (status: ConnectionStatus) => void;
}