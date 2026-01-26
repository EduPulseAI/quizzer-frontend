'use client';

import { create, StoreApi, UseBoundStore } from 'zustand';
import type { Profile } from '../lib/types/profile';
import { GET_PROFILE } from '../lib/constants/profile';

interface ProfileState {
  profile: Profile;
  isLoading: boolean;
}

interface ProfileActions {
  initializeProfile: (profile: Profile) => void;
  setProfile: (profile: Profile) => void;
  toggleLoading: () => void;
  reset: () => void;
}

export type ProfileStore = ProfileState & ProfileActions;

const initialState: ProfileState = {
  profile: GET_PROFILE,
  isLoading: true,
};

export const useProfileStore: UseBoundStore<StoreApi<ProfileState>> = create<ProfileState>((set, get) => ({
  ...initialState,

  initializeProfile: (profile: Profile) => {
    set({
      profile,
      isLoading: false
    });
  },

  setProfile: (profile: Profile) => {
    set({ profile });
  },

  toggleLoading: () => {
    set(({ isLoading }) => ({ isLoading: !isLoading }));
  },

  reset: () => {
    set(initialState);
  },
}));
