'use server';

import api, { ApiError, type ApiResponse } from '../config/client';
import { GET_TOPICS } from '../constants/topic';
import { Topic } from "../types/topic";

interface GetTopicsRequest {}

interface GetTopicsResponse {
  content: Topic[]
}

export async function getTopics(
  options?: GetTopicsRequest
): Promise<ApiResponse<Topic[]>> {
  try {
    const params: URLSearchParams = new URLSearchParams();
    const endpoint = '/api/quiz/topics?' + params.toString();
    const response = await api.get<GetTopicsResponse>(endpoint);

    return {
      success: true,
      message: 'getTopics successful',
      data: response.content,
    };
  } catch (error) {
    const apiError = ApiError.of(error);
    return {
      data: GET_TOPICS,
      error: apiError.problemDetail,
      message: apiError.message,
      success: false,
    };
  }
}
