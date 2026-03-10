import { create } from 'zustand';
import { UserProfile, Course } from './types';

interface AppState {
  profile: UserProfile;
  courses: Course[];
  savedCourseIds: string[];
  homeStep: 'category' | 'region' | 'result';
  setProfile: (profile: Partial<UserProfile>) => void;
  toggleSavedCourse: (id: string) => void;
  fetchCourses: () => Promise<void>;
  setHomeStep: (step: 'category' | 'region' | 'result') => void;
}

export const useStore = create<AppState>((set) => ({
  profile: {
    ageGroup: null,
    theme: null,
    companion: null,
  },
  courses: [],
  savedCourseIds: [],
  homeStep: 'category',
  setProfile: (newProfile) =>
    set((state) => ({ profile: { ...state.profile, ...newProfile } })),
  toggleSavedCourse: (id) =>
    set((state) => {
      const isSaved = state.savedCourseIds.includes(id);
      return {
        savedCourseIds: isSaved
          ? state.savedCourseIds.filter((savedId) => savedId !== id)
          : [...state.savedCourseIds, id],
      };
    }),
  fetchCourses: async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      set({ courses: data });
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  },
  setHomeStep: (step) => set({ homeStep: step }),
}));
