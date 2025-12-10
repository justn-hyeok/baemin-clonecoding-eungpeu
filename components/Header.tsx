import React from 'react';
import { Pressable } from 'react-native';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, fontSize, fontWeight } from '../constants/theme';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightElement?: React.ReactNode;
  backgroundColor?: string;
  titleColor?: string;
  iconColor?: string;
}

export default function Header({
  title,
  showBack = true,
  onBackPress,
  rightElement,
  backgroundColor = colors.background,
  titleColor = colors.textPrimary,
  iconColor = colors.textPrimary,
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <HeaderContainer style={{ backgroundColor }}>
      <LeftSection>
        {showBack && (
          <BackButton onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color={iconColor} />
          </BackButton>
        )}
      </LeftSection>

      <CenterSection>
        {title && <Title style={{ color: titleColor }}>{title}</Title>}
      </CenterSection>

      <RightSection>
        {rightElement}
      </RightSection>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 56px;
  padding-horizontal: ${spacing.lg}px;
`;

const LeftSection = styled.View`
  width: 40px;
  align-items: flex-start;
`;

const CenterSection = styled.View`
  flex: 1;
  align-items: center;
`;

const RightSection = styled.View`
  width: 40px;
  align-items: flex-end;
`;

const BackButton = styled.Pressable`
  padding: ${spacing.xs}px;
  margin-left: -${spacing.xs}px;
`;

const Title = styled.Text`
  font-size: ${fontSize.lg}px;
  font-weight: ${fontWeight.bold};
`;
