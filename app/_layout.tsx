import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2AC1BC',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: '홈' }} />
        <Stack.Screen name="store/[id]" options={{ title: '가게 상세' }} />
        <Stack.Screen name="menu/[id]" options={{ title: '메뉴 상세' }} />
        <Stack.Screen name="reviews/[storeId]" options={{ title: '리뷰' }} />
        <Stack.Screen name="settings" options={{ title: '설정' }} />
        <Stack.Screen name="chatbot" options={{ title: '챗봇' }} />
      </Stack>
    </>
  );
}
