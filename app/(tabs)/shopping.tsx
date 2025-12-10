import React from 'react';
import styled from '@emotion/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { colors, fontSize, fontWeight } from '../../constants/theme';

export default function ShoppingScreen() {
  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <CenterContent>
          <Emoji>🛒</Emoji>
          <Title>장보기·쇼핑</Title>
          <Subtitle>B마트, 편의점, 마트 등</Subtitle>
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
