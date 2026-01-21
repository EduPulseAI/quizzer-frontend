'use server';

import { type ApiResponse, ApiError } from '../config/client';
import { z } from 'zod';

import api from '../config/client';
import { SessionEventType, type SessionEventPayload } from '../types/session-event';

const schema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
  eventType: z.enum([
    SessionEventType.STARTED,
    SessionEventType.NAVIGATION,
    SessionEventType.DWELL,
    SessionEventType.PAUSED,
    SessionEventType.RESUMED,
    SessionEventType.COMPLETED,
  ]),
  pageId: z.string().optional(),
  dwellTimeMs: z.number().min(0).optional(),
  timestamp: z.number().optional(),
});

export type SendSessionEventRequest = z.infer<typeof schema>;

export interface SendSessionEventResponse {
  eventId: string;
  acknowledged: boolean;
}

export async function sendSessionEvent(
  options: SessionEventPayload
): Promise<ApiResponse<SendSessionEventResponse>> {
  try {
    const body: SendSessionEventRequest = {
      sessionId: options.sessionId,
      eventType: options.eventType,
      pageId: options.pageId,
      dwellTimeMs: options.dwellTimeMs,
      timestamp: options.timestamp ?? Date.now(),
    };

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);

      return {
        success: false,
        message: apiError.message,
        data: null,
        error: apiError.body,
      };
    }

    const endpoint = '/api/quiz/sessions/event';
    const response = await api.post<SendSessionEventResponse>(
      endpoint,
      parsed.data
    );

    return {
      success: true,
      message: 'sendSessionEvent successful',
      data: response,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: null,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
