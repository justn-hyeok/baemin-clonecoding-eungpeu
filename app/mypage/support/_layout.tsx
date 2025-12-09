import { Stack } from 'expo-router';

export default function SupportLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: '고객센터',
          headerTitleStyle: { color: 'black', fontWeight: '700' },
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: 'black',
        }}
      />
      <Stack.Screen
        name="chatbot"
        options={{
          title: 'AI 챗봇 상담',
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: 'black',
          headerTitleStyle: { fontWeight: '700' },
        }}
      />
    </Stack>
  );
}
