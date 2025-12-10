import React from 'react';
import { StatusBar, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '@emotion/native';
import { colors } from '../constants/theme';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content' | 'default';
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: ViewStyle;
}

export default function SafeAreaWrapper({
  children,
  backgroundColor = colors.background,
  statusBarStyle = 'dark-content',
  edges = ['top', 'left', 'right'],
  style,
}: SafeAreaWrapperProps) {
  return (
    <Container style={[{ backgroundColor }, style]}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
        translucent={false}
      />
      <StyledSafeAreaView edges={edges} style={{ flex: 1 }}>
        {children}
      </StyledSafeAreaView>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;
