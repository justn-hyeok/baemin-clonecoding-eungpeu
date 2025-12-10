import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ALLERGY_STORAGE_KEY = '@baemin_allergies';

export interface AllergyItem {
  id: string;
  name: string;
  emoji: string;
}

export const ALLERGY_LIST: AllergyItem[] = [
  { id: 'egg', name: '계란', emoji: '🥚' },
  { id: 'milk', name: '우유', emoji: '🥛' },
  { id: 'shrimp', name: '새우', emoji: '🦐' },
  { id: 'crab', name: '게', emoji: '🦀' },
  { id: 'peanut', name: '땅콩', emoji: '🥜' },
  { id: 'nuts', name: '견과류', emoji: '🌰' },
  { id: 'wheat', name: '밀', emoji: '🌾' },
  { id: 'soybean', name: '대두', emoji: '🫘' },
  { id: 'mackerel', name: '고등어', emoji: '🐟' },
  { id: 'peach', name: '복숭아', emoji: '🍑' },
  { id: 'tomato', name: '토마토', emoji: '🍅' },
  { id: 'pork', name: '돼지고기', emoji: '🐷' },
  { id: 'chicken', name: '닭고기', emoji: '🐔' },
  { id: 'beef', name: '쇠고기', emoji: '🐄' },
  { id: 'squid', name: '오징어', emoji: '🦑' },
  { id: 'shellfish', name: '조개류', emoji: '🐚' },
];

interface UserState {
  allergies: string[];
  isLoaded: boolean;
  loadAllergies: () => Promise<void>;
  setAllergies: (allergies: string[]) => void;
  toggleAllergy: (allergyName: string) => void;
  hasAllergy: (allergyName: string) => boolean;
  getAllergyMatches: (menuAllergies: string[]) => string[];
}

export const useUserStore = create<UserState>((set, get) => ({
  allergies: [],
  isLoaded: false,

  loadAllergies: async () => {
    try {
      const saved = await AsyncStorage.getItem(ALLERGY_STORAGE_KEY);
      if (saved) {
        set({ allergies: JSON.parse(saved), isLoaded: true });
      } else {
        set({ isLoaded: true });
      }
    } catch (error) {
      console.error('알레르기 로드 실패:', error);
      set({ isLoaded: true });
    }
  },

  setAllergies: (allergies) => {
    set({ allergies });
  },

  toggleAllergy: (allergyName) => {
    const { allergies } = get();
    if (allergies.includes(allergyName)) {
      set({ allergies: allergies.filter((a) => a !== allergyName) });
    } else {
      set({ allergies: [...allergies, allergyName] });
    }
  },

  hasAllergy: (allergyName) => {
    return get().allergies.includes(allergyName);
  },

  getAllergyMatches: (menuAllergies) => {
    const { allergies } = get();
    return menuAllergies.filter((a) => allergies.includes(a));
  },
}));

// 앱 시작 시 자동 로드
useUserStore.getState().loadAllergies();
