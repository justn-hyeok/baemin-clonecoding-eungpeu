import React from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { colors, fontSize, fontWeight } from '../../constants/theme';

export default function FavoritesScreen() {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <CenterContent>
          <Emoji>❤️</Emoji>
          <Title>찜</Title>
          <Subtitle>찜한 가게와 메뉴를 확인하세요</Subtitle>
        </CenterContent>
      </SafeAreaView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

const CenterContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Emoji = styled.Text`
  font-size: 64px;
  margin-bottom: 16px;
`;

const Title = styled.Text`
  font-size: ${fontSize.xxl}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
  margin-bottom: 8px;
`;

const Subtitle = styled.Text`
  font-size: ${fontSize.md}px;
  color: ${colors.textTertiary};
`;
