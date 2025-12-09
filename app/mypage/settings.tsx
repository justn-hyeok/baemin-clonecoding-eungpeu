import React, { useState } from 'react';
import { ScrollView, Animated, StatusBar as RNStatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUserStore, ALLERGY_LIST } from '../../store/userStore';

export default function AllergySettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const allergies = useUserStore((state) => state.allergies);
  const setAllergies = useUserStore((state) => state.setAllergies);

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(allergies);
  const [showToast, setShowToast] = useState(false);
  const [toastAnim] = useState(new Animated.Value(0));

  const toggleAllergy = (allergyName: string) => {
    if (selectedAllergies.includes(allergyName)) {
      setSelectedAllergies(selectedAllergies.filter((a) => a !== allergyName));
    } else {
      setSelectedAllergies([...selectedAllergies, allergyName]);
    }
  };

  const showToastMessage = () => {
    setShowToast(true);
    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowToast(false);
      router.back();
    });
  };

  const handleSave = () => {
    setAllergies(selectedAllergies);
    showToastMessage();
  };

  return (
    <Container>
      <RNStatusBar barStyle="dark-content" backgroundColor="#fff" />

      <Header style={{ paddingTop: insets.top }}>
        <BackBtn onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </BackBtn>
        <HeaderTitle>알레르기 설정</HeaderTitle>
        <Spacer />
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        <GuideSection>
          <GuideText>
            알레르기 성분을 설정하면 메뉴에서 경고를 표시해드려요.
          </GuideText>
        </GuideSection>

        <AllergySection>
          <SectionTitle>알레르기 유발 성분</SectionTitle>
          <AllergyGrid>
            {ALLERGY_LIST.map((item) => (
              <AllergyItem
                key={item.id}
                onPress={() => toggleAllergy(item.name)}
                isSelected={selectedAllergies.includes(item.name)}
              >
                <Checkbox isSelected={selectedAllergies.includes(item.name)}>
                  {selectedAllergies.includes(item.name) && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  )}
                </Checkbox>
                <AllergyEmoji>{item.emoji}</AllergyEmoji>
                <AllergyName>{item.name}</AllergyName>
              </AllergyItem>
            ))}
          </AllergyGrid>
        </AllergySection>

        <BottomSpacer />
      </ScrollView>

      <BottomBar style={{ paddingBottom: insets.bottom || 16 }}>
        <SaveButton onPress={handleSave}>
          <SaveButtonText>저장하기</SaveButtonText>
        </SaveButton>
      </BottomBar>

      {showToast && (
        <ToastBox
          style={{
            opacity: toastAnim,
            transform: [
              {
                translateY: toastAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          }}
        >
          <Ionicons name="checkmark-circle" size={20} color="#2AC1BC" />
          <ToastText>알레르기 설정이 저장되었어요</ToastText>
        </ToastBox>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  background-color: #fff;
`;

const BackBtn = styled.TouchableOpacity`
  padding: 4px;
`;

const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  color: #333;
`;

const Spacer = styled.View`
  width: 32px;
`;

const GuideSection = styled.View`
  padding: 20px 16px;
  background-color: #f9f9f9;
`;

const GuideText = styled.Text`
  font-size: 14px;
  color: #888;
  line-height: 20px;
`;

const AllergySection = styled.View`
  padding: 20px 16px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
`;

const AllergyGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`;

const AllergyItem = styled.TouchableOpacity<{ isSelected: boolean }>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  padding: 14px 12px;
  border-radius: 10px;
  border: 1.5px solid ${(props) => (props.isSelected ? '#2AC1BC' : '#e0e0e0')};
  background-color: ${(props) => (props.isSelected ? '#f0fafa' : '#fff')};
`;

const Checkbox = styled.View<{ isSelected: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 2px solid ${(props) => (props.isSelected ? '#2AC1BC' : '#ccc')};
  background-color: ${(props) => (props.isSelected ? '#2AC1BC' : '#fff')};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const AllergyEmoji = styled.Text`
  font-size: 20px;
  margin-right: 8px;
`;

const AllergyName = styled.Text`
  font-size: 15px;
  color: #333;
  font-weight: 500;
`;

const BottomSpacer = styled.View`
  height: 100px;
`;

const BottomBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #f0f0f0;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: #2ac1bc;
  padding: 16px;
  border-radius: 10px;
  align-items: center;
`;

const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: bold;
`;

const ToastBox = styled(Animated.View)`
  position: absolute;
  bottom: 100px;
  left: 16px;
  right: 16px;
  flex-direction: row;
  align-items: center;
  background-color: #333;
  padding: 14px 16px;
  border-radius: 8px;
  gap: 10px;
`;

const ToastText = styled.Text`
  color: #fff;
  font-size: 14px;
`;
