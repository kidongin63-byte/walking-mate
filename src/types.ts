export type AgeGroup = '1020' | '3040' | '5060' | '70+';
export type Theme = 'nature' | 'culture' | 'city' | 'healing';
export type Companion = 'alone' | 'couple' | 'family' | 'friends';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  region: string;
  ageGroups: AgeGroup[];
  themes: Theme[];
  companions: Companion[];
  difficulty: Difficulty;
  duration: number; // minutes
  distance: number; // km
  coordinates: [number, number]; // [lat, lng]
  facilities: string[];
}

export interface UserProfile {
  ageGroup: AgeGroup | null;
  theme: Theme | null;
  companion: Companion | null;
}
