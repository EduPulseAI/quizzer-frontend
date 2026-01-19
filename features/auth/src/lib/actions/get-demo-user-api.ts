'use server';

import { type ApiResponse, ApiError } from '../config/client';

import api from '../config/client';
import { GET_DEMO_USER } from '../constants/demo-user';

export interface GetDemoUserRequest {}

export interface GetDemoUserResponse {
  id: string;
  email: string;
  name: string;
}

export async function getDemoUser(
  name: string
): Promise<ApiResponse<GetDemoUserResponse>> {
  try {
    const endpoint = '/api/students/' + name;
    const response = await api.get<GetDemoUserResponse>(endpoint);

    return {
      success: true,
      message: 'getDemoUser successful',
      data: response,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: GET_DEMO_USER,
      error: apiError.body,
      message: apiError.message,
      success: false,
    };
  }
}
