import { Stack } from 'expo-router';

export default function MypageLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2AC1BC' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="index" options={{ title: '마이 배민' }} />
      <Stack.Screen name="support" options={{ headerShown: false }} />
    </Stack>
  );
}
