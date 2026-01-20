import type {
  SSEEventHandlers,
  ConnectionState,
  ConnectionStatus
} from './types';

export interface SSEClientConfig {
  baseUrl: string;
  studentId: string;
  sessionId: string;
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
  heartbeatTimeout?: number;
}

export class SSEClient {
  private eventSource: EventSource | null = null;
  private config: Required<SSEClientConfig>;
  private handlers: SSEEventHandlers = {};
  private status: ConnectionStatus;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;

  constructor(config: SSEClientConfig) {
    this.config = {
      ...config,
      reconnectDelay: config.reconnectDelay ?? 3000,
      maxReconnectAttempts: config.maxReconnectAttempts ?? 10,
      heartbeatTimeout: config.heartbeatTimeout ?? 60000, // 60 seconds
    };

    this.status = {
      state: 'disconnected',
      reconnectAttempts: 0,
    };
  }

  /**
   * Connect to SSE stream
   */
  connect(): void {
    if (this.eventSource) {
      console.warn('Already connected or connecting');
      return;
    }

    this.updateStatus({ state: 'connecting' });

    const url = this.buildUrl();
    console.log('Connecting to SSE:', url);

    this.eventSource = new EventSource(url);

    // Setup event listeners
    this.setupEventListeners();
  }

  /**
   * Disconnect from SSE stream
   */
  disconnect(): void {
    this.clearTimers();

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    this.updateStatus({
      state: 'disconnected',
      reconnectAttempts: 0
    });
  }

  /**
   * Register event handlers
   */
  on(handlers: SSEEventHandlers): void {
    this.handlers = { ...this.handlers, ...handlers };
  }

  /**
   * Get current connection status
   */
  getStatus(): ConnectionStatus {
    return { ...this.status };
  }

  /**
   * Build SSE endpoint URL
   */
  private buildUrl(): string {
    const { baseUrl, studentId, sessionId } = this.config;
    return `${baseUrl}/sse/student/${studentId}/session/${sessionId}`;
  }

  /**
   * Setup EventSource listeners
   */
  private setupEventListeners(): void {
    if (!this.eventSource) return;

    // Connection opened
    this.eventSource.onopen = () => {
      console.log('SSE connection established');
      this.updateStatus({
        state: 'connected',
        reconnectAttempts: 0
      });
      this.startHeartbeatMonitor();
    };

    // Generic message (fallback)
    this.eventSource.onmessage = (event) => {
      console.log('SSE message:', event);
      this.handleEvent(event);
    };

    // Connection error
    this.eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      this.handleError(error);
    };

    // Engagement events
    this.eventSource.addEventListener('engagement', (event) => {
      this.handleEvent(event as MessageEvent);
    });

    // Adaptive action events
    this.eventSource.addEventListener('adapt-action', (event) => {
      this.handleEvent(event as MessageEvent);
    });

    // Heartbeat events
    this.eventSource.addEventListener('heartbeat', (event) => {
      this.handleHeartbeat(event as MessageEvent);
    });

    // Error events
    this.eventSource.addEventListener('error', (event) => {
      this.handleErrorEvent(event as MessageEvent);
    });

    // Connected event
    this.eventSource.addEventListener('connected', (event) => {
      this.handleConnected(event as MessageEvent);
    });
  }

  /**
   * Handle incoming SSE event
   */
  private handleEvent(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      const eventType = (event as any).type || 'message';

      // Update last event tracking
      this.updateStatus({
        lastEventId: event.lastEventId,
        lastEventTime: Date.now(),
      });

      // Reset heartbeat timer
      this.resetHeartbeatMonitor();

      // Route to appropriate handler
      switch (eventType) {
        case 'engagement':
          this.handlers.onEngagement?.(data);
          break;
        case 'adapt-action':
          this.handlers.onAdaptAction?.(data);
          break;
        default:
          console.log('Unhandled event type:', eventType, data);
      }
    } catch (error) {
      console.error('Failed to parse SSE event:', error);
    }
  }

  /**
   * Handle heartbeat event
   */
  private handleHeartbeat(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      this.resetHeartbeatMonitor();
      this.handlers.onHeartbeat?.(data);
    } catch (error) {
      console.error('Failed to parse heartbeat:', error);
    }
  }

  /**
   * Handle error event from server
   */
  private handleErrorEvent(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      this.handlers.onError?.(data);
    } catch (error) {
      console.error('Failed to parse error event:', error);
    }
  }

  /**
   * Handle connected event
   */
  private handleConnected(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      this.handlers.onConnected?.(data);
    } catch (error) {
      console.error('Failed to parse connected event:', error);
    }
  }

  /**
   * Handle connection error
   */
  private handleError(error: Event): void {
    const readyState = this.eventSource?.readyState;

    if (readyState === EventSource.CLOSED) {
      console.log('SSE connection closed, attempting reconnect...');
      this.attemptReconnect();
    } else {
      this.updateStatus({
        state: 'error',
        error: 'Connection error occurred',
      });
    }
  }

  /**
   * Attempt to reconnect
   */
  private attemptReconnect(): void {
    if (this.status.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.error('Max reconnect attempts reached');
      this.updateStatus({
        state: 'error',
        error: 'Max reconnection attempts exceeded',
      });
      return;
    }

    this.updateStatus({
      state: 'reconnecting',
      reconnectAttempts: this.status.reconnectAttempts + 1,
    });

    // Close existing connection
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    // Schedule reconnection
    const delay = this.config.reconnectDelay *
      Math.pow(1.5, this.status.reconnectAttempts); // Exponential backoff

    console.log(`Reconnecting in ${delay}ms (attempt ${this.status.reconnectAttempts})`);

    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  }

  /**
   * Start heartbeat monitor
   */
  private startHeartbeatMonitor(): void {
    this.resetHeartbeatMonitor();
  }

  /**
   * Reset heartbeat timer
   */
  private resetHeartbeatMonitor(): void {
    if (this.heartbeatTimer) {
      clearTimeout(this.heartbeatTimer);
    }

    this.heartbeatTimer = setTimeout(() => {
      console.warn('Heartbeat timeout - connection may be stale');
      this.handleError(new Event('heartbeat-timeout'));
    }, this.config.heartbeatTimeout);
  }

  /**
   * Clear all timers
   */
  private clearTimers(): void {
    if (this.heartbeatTimer) {
      clearTimeout(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  /**
   * Update connection status
   */
  private updateStatus(updates: Partial<ConnectionStatus>): void {
    this.status = { ...this.status, ...updates };
    this.handlers.onConnectionStateChange?.(this.status);
  }
}