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
  // todo: backend returns null values for missing fields, we should fix this to not return nulls and just omit the fields instead, but in the meantime we can filter out null values here
  return Object.entries(response).reduce((p, [k,v]) => {
    if (v) p[k as keyof typeof p] = v;
    return p;
  }, GET_PROFILE);
}, { fallbackData: GET_PROFILE });
