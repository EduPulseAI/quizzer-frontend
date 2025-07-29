'use server';

import type { GetTopics, Topic, GetTopicsResponse } from '../types';
import { GET_TOPICS } from '../constants';
import api from '@feature/base/lib/axios';
import { handleError } from '@feature/base/lib/axios/error';
import type { BackendResponse } from '@feature/base/lib/axios/types';

interface BackendRequestOptions {}

export async function getTopics(
  options?: BackendRequestOptions
): Promise<BackendResponse<GetTopics>> {
  try {
    const params: URLSearchParams = new URLSearchParams();
    const endpoint = `/api/topics?${params.toString()}`;

    const { data } = await api.get<GetTopicsResponse>(endpoint);

    return { data: data.items };
  } catch (error) {
    return handleError<GetTopics>(error, GET_TOPICS);
  }
}
