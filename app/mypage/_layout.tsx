import { Stack } from 'expo-router';

export default function MypageLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2AC1BC' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="support" options={{ title: '고객센터' }} />
    </Stack>
  );
}
