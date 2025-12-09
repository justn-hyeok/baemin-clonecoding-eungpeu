import { create } from 'zustand';

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
  setAllergies: (allergies: string[]) => void;
  toggleAllergy: (allergyName: string) => void;
  hasAllergy: (allergyName: string) => boolean;
  getAllergyMatches: (menuAllergies: string[]) => string[];
}

export const useUserStore = create<UserState>((set, get) => ({
  allergies: [],

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
