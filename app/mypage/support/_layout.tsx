import { Stack } from 'expo-router';

export default function SupportLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="chatbot"
        options={{
          title: 'AI 챗봇 상담',
          headerStyle: { backgroundColor: '#2AC1BC' },
          headerTintColor: '#fff',
        }}
      />
    </Stack>
  );
}
