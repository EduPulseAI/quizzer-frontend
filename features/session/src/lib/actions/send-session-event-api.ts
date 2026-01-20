'use server';

import { type ApiResponse, ApiError } from '../config/client';
import { z } from 'zod';

import api from '../config/client';
import { SEND_SESSION_EVENT } from '../constants/session-event';

const schema = z.object({});
export type SendSessionEventRequest = z.infer<typeof schema>;

export interface SendSessionEventResponse {}

export async function sendSessionEvent(
  options: SendSessionEventRequest
): Promise<ApiResponse<SendSessionEventResponse>> {
  try {
    const body: SendSessionEventRequest = {
      ...options,
    };

    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      const apiError = ApiError.of(parsed.error);

      return {
        success: false,
        message: apiError.message,
        data: SEND_SESSION_EVENT,
        error: apiError.body,
      };
    }

    const params: URLSearchParams = new URLSearchParams();
    const endpoint = '/sessions/events?' + params.toString();
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
      data: SEND_SESSION_EVENT,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
