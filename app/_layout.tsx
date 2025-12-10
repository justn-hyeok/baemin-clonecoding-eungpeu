import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.textInverse,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="stores" options={{ headerShown: false }} />
        <Stack.Screen name="store/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ title: '장바구니' }} />
        <Stack.Screen name="mypage" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
