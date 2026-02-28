'use server';

import { withApi } from '@next-feature/client/server';
import { z } from 'zod';
import api from '../config/client';
import type { Profile } from '../types/profile';
import { GET_PROFILE } from '../constants/profile';

/**
 * [get-profile]
 * next-feature@0.1.2-10
 * February 27th 2026, 3:03:31 am
 */

export const getProfile = withApi(async () => {
  const endpoint = '/api/profiles/me';
  const response = await api.get<Profile>(endpoint);
  return response;
}, { fallbackData: GET_PROFILE });
