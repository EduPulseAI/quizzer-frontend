'use server';

import api, { ApiError, type ApiResponse } from '../config/client';
import { GET_PROFILE } from '../constants/profile';
import type { Profile } from '../types/profile';

export async function getProfile(): Promise<ApiResponse<Profile>> {
  try {
    const endpoint = '/api/profiles/me';
    const response = await api.get<Profile>(endpoint);

    return {
      success: true,
      message: 'getProfile successful',
      data: response,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: GET_PROFILE,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
