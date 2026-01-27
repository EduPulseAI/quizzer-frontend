'use client';

import { create, StoreApi, UseBoundStore } from 'zustand';
import type { About, Education, ExperienceItem, Profile } from '../lib/types/profile';
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
  // Optimistic update methods
  updateAbout: (about: About) => void;
  addEducation: (education: Education) => void;
  updateEducation: (index: number, education: Education) => void;
  removeEducation: (index: number) => void;
  addExperience: (experience: ExperienceItem) => void;
  updateExperience: (index: number, experience: ExperienceItem) => void;
  removeExperience: (index: number) => void;
}

export type ProfileStore = ProfileState & ProfileActions;

const initialState: ProfileState = {
  profile: GET_PROFILE,
  isLoading: true,
};

export const useProfileStore: UseBoundStore<StoreApi<ProfileStore>> = create<ProfileStore>((set, get) => ({
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

  // Optimistic about update
  updateAbout: (about: About) => {
    set((state) => ({
      profile: {
        ...state.profile,
        about,
      },
    }));
  },

  // Optimistic education updates
  addEducation: (education: Education) => {
    set((state) => ({
      profile: {
        ...state.profile,
        credentials: {
          ...state.profile.credentials,
          education: [...state.profile.credentials.education, education],
        },
      },
    }));
  },

  updateEducation: (index: number, education: Education) => {
    set((state) => ({
      profile: {
        ...state.profile,
        credentials: {
          ...state.profile.credentials,
          education: state.profile.credentials.education.map((e, i) =>
            i === index ? education : e
          ),
        },
      },
    }));
  },

  removeEducation: (index: number) => {
    set((state) => ({
      profile: {
        ...state.profile,
        credentials: {
          ...state.profile.credentials,
          education: state.profile.credentials.education.filter((_, i) => i !== index),
        },
      },
    }));
  },

  // Optimistic experience updates
  addExperience: (experience: ExperienceItem) => {
    set((state) => ({
      profile: {
        ...state.profile,
        experience: [...state.profile.experience, experience],
      },
    }));
  },

  updateExperience: (index: number, experience: ExperienceItem) => {
    set((state) => ({
      profile: {
        ...state.profile,
        experience: state.profile.experience.map((e, i) =>
          i === index ? experience : e
        ),
      },
    }));
  },

  removeExperience: (index: number) => {
    set((state) => ({
      profile: {
        ...state.profile,
        experience: state.profile.experience.filter((_, i) => i !== index),
      },
    }));
  },
}));
