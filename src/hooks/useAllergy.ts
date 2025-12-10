import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ALLERGY_STORAGE_KEY = '@baemin_allergies';

export function useAllergy() {
  const [allergies, setAllergies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAllergies = async () => {
    try {
      const saved = await AsyncStorage.getItem(ALLERGY_STORAGE_KEY);
      if (saved) {
        setAllergies(JSON.parse(saved));
      }
    } catch (error) {
      console.error('알레르기 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllergies();
  }, []);

  // 특정 알레르기가 설정되어 있는지 확인
  const hasAllergy = (allergyId: string): boolean => {
    return allergies.includes(allergyId);
  };

  // 메뉴의 알레르기 성분 중 사용자가 설정한 알레르기가 있는지 확인
  const checkMenuAllergens = (menuAllergens: string[]): string[] => {
    return menuAllergens.filter(allergen => allergies.includes(allergen));
  };

  // 알레르기 경고가 필요한지 확인
  const shouldWarn = (menuAllergens: string[]): boolean => {
    return menuAllergens.some(allergen => allergies.includes(allergen));
  };

  return {
    allergies,
    isLoading,
    hasAllergy,
    checkMenuAllergens,
    shouldWarn,
    reload: loadAllergies,
  };
}

// 알레르기 목록 (한글 ID 사용)
export const ALLERGEN_LIST = [
  '계란', '우유', '밀', '대두', '땅콩', '견과류',
  '갑각류', '생선', '조개류', '메밀', '돼지고기',
  '쇠고기', '닭고기', '복숭아', '토마토', '아황산류',
];
