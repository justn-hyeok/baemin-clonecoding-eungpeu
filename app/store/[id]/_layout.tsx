import { Stack } from 'expo-router';

export default function StoreLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="info" />
      <Stack.Screen name="reviews" />
      <Stack.Screen name="menu/[menuId]" />
    </Stack>
  );
}
