import React, { useState, useEffect } from 'react';
import { ScrollView, View, StatusBar, Switch, Alert } from 'react-native';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ALLERGY_STORAGE_KEY = '@baemin_allergies';

const ALLERGENS = [
  { id: '계란', name: '난류(가금류)', emoji: '🥚', description: '계란, 메추리알 등' },
  { id: '우유', name: '우유', emoji: '🥛', description: '우유, 유제품' },
  { id: '밀', name: '밀', emoji: '🌾', description: '밀가루, 빵, 면류' },
  { id: '대두', name: '대두', emoji: '🫘', description: '콩, 두부, 된장' },
  { id: '땅콩', name: '땅콩', emoji: '🥜', description: '땅콩, 땅콩버터' },
  { id: '견과류', name: '견과류', emoji: '🌰', description: '호두, 아몬드, 캐슈넛 등' },
  { id: '갑각류', name: '갑각류', emoji: '🦐', description: '새우, 게, 랍스터' },
  { id: '생선', name: '생선', emoji: '🐟', description: '고등어, 연어, 참치 등' },
  { id: '조개류', name: '조개류', emoji: '🦪', description: '굴, 홍합, 전복' },
  { id: '메밀', name: '메밀', emoji: '🍜', description: '메밀국수, 메밀전' },
  { id: '돼지고기', name: '돼지고기', emoji: '🐷', description: '돼지고기, 햄, 베이컨' },
  { id: '쇠고기', name: '쇠고기', emoji: '🐄', description: '소고기' },
  { id: '닭고기', name: '닭고기', emoji: '🐔', description: '닭고기, 오리고기' },
  { id: '복숭아', name: '복숭아', emoji: '🍑', description: '복숭아' },
  { id: '토마토', name: '토마토', emoji: '🍅', description: '토마토, 토마토소스' },
  { id: '아황산류', name: '아황산류', emoji: '⚗️', description: '와인, 건조과일' },
];

export default function AllergyScreen() {
  const router = useRouter();
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 저장된 알레르기 불러오기
  useEffect(() => {
    loadAllergens();
  }, []);

  const loadAllergens = async () => {
    try {
      const saved = await AsyncStorage.getItem(ALLERGY_STORAGE_KEY);
      if (saved) {
        setSelectedAllergens(JSON.parse(saved));
      }
    } catch (error) {
      console.error('알레르기 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAllergen = (id: string) => {
    setSelectedAllergens(prev =>
      prev.includes(id)
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(ALLERGY_STORAGE_KEY, JSON.stringify(selectedAllergens));
      Alert.alert(
        '저장 완료',
        `${selectedAllergens.length}개의 알레르기가 설정되었습니다.\n메뉴에서 해당 알레르기 성분이 포함된 음식은 빨간색으로 표시됩니다.`,
        [{ text: '확인', onPress: () => router.back() }]
      );
    } catch (error) {
      Alert.alert('오류', '저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* Header */}
        <Header>
          <BackButton onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </BackButton>
          <HeaderTitle>알레르기 설정</HeaderTitle>
          <SaveButton onPress={handleSave}>
            <SaveButtonText>저장</SaveButtonText>
          </SaveButton>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Info Banner */}
          <InfoBanner>
            <Ionicons name="information-circle" size={20} color="#2AC1BC" />
            <InfoText>
              알레르기를 설정하면 메뉴에서 해당 성분이 포함된 음식에 경고가 표시됩니다.
            </InfoText>
          </InfoBanner>

          {/* Selected Count */}
          <SelectedCountContainer>
            <SelectedCountText>
              {selectedAllergens.length > 0
                ? `${selectedAllergens.length}개 선택됨`
                : '알레르기를 선택해주세요'
              }
            </SelectedCountText>
          </SelectedCountContainer>

          {/* Allergen List */}
          <AllergenList>
            {ALLERGENS.map((allergen) => (
              <AllergenItem key={allergen.id}>
                <AllergenInfo>
                  <AllergenEmoji>{allergen.emoji}</AllergenEmoji>
                  <AllergenTextContainer>
                    <AllergenName>{allergen.name}</AllergenName>
                    <AllergenDesc>{allergen.description}</AllergenDesc>
                  </AllergenTextContainer>
                </AllergenInfo>
                <Switch
                  value={selectedAllergens.includes(allergen.id)}
                  onValueChange={() => toggleAllergen(allergen.id)}
                  trackColor={{ false: '#e0e0e0', true: '#2AC1BC' }}
                  thumbColor="#fff"
                />
              </AllergenItem>
            ))}
          </AllergenList>

          {/* Warning Notice */}
          <WarningNotice>
            <Ionicons name="warning" size={16} color="#ff6b6b" />
            <WarningText>
              알레르기 정보는 참고용이며, 정확한 성분은 가게에 직접 문의해주세요.
            </WarningText>
          </WarningNotice>

          <BottomSpacer />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// Styled Components
const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const BackButton = styled.Pressable`
  padding: 4px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

const SaveButton = styled.Pressable`
  padding: 8px 16px;
  background-color: #2AC1BC;
  border-radius: 20px;
`;

const SaveButtonText = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: #fff;
`;

const InfoBanner = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  margin: 16px;
  background-color: #f0faf9;
  border-radius: 12px;
  gap: 10px;
`;

const InfoText = styled.Text`
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: 20px;
`;

const SelectedCountContainer = styled.View`
  padding: 0 16px 12px;
`;

const SelectedCountText = styled.Text`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const AllergenList = styled.View`
  padding: 0 16px;
`;

const AllergenItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f5f5f5;
`;

const AllergenInfo = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const AllergenEmoji = styled.Text`
  font-size: 28px;
  margin-right: 14px;
`;

const AllergenTextContainer = styled.View`
  flex: 1;
`;

const AllergenName = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #111;
  margin-bottom: 2px;
`;

const AllergenDesc = styled.Text`
  font-size: 13px;
  color: #888;
`;

const WarningNotice = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  margin: 20px 16px;
  background-color: #fff5f5;
  border-radius: 12px;
  gap: 8px;
`;

const WarningText = styled.Text`
  flex: 1;
  font-size: 13px;
  color: #666;
  line-height: 18px;
`;

const BottomSpacer = styled.View`
  height: 40px;
`;
