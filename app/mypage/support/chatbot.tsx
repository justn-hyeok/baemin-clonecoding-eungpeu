import React, { useRef, useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, View, ActivityIndicator } from 'react-native';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useChatbot } from '../../../src/hooks/useChatbot';

interface DisplayMessage {
  id: string;
  text: string;
  isUser: boolean;
}

export default function ChatbotScreen() {
  const { messages, loading, sendMessage: sendChatMessage } = useChatbot();
  const [input, setInput] = React.useState('');
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  // Convert hook messages to display format
  const displayMessages: DisplayMessage[] = [
    { id: 'welcome', text: '안녕하세요! 무엇을 도와드릴까요? 😊', isUser: false },
    ...messages.map((msg, index) => ({
      id: `msg-${index}`,
      text: msg.content,
      isUser: msg.role === 'user',
    })),
  ];

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const messageText = input.trim();
    setInput('');

    await sendChatMessage(messageText);
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <MessageList
        ref={flatListRef}
        data={displayMessages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BubbleWrapper isUser={item.isUser}>
            <Bubble isUser={item.isUser}>
              <MessageText isUser={item.isUser}>{item.text}</MessageText>
            </Bubble>
          </BubbleWrapper>
        )}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 16 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {loading && (
        <LoadingWrapper>
          <ActivityIndicator size="small" color="#2AC1BC" />
          <LoadingText>답변을 생성하고 있습니다...</LoadingText>
        </LoadingWrapper>
      )}

      <InputContainer style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 16 }}>
        <InputWrapper>
          <StyledInput
            value={input}
            onChangeText={setInput}
            placeholder="메시지를 입력하세요"
            placeholderTextColor="#999"
            multiline
            maxLength={200}
            editable={!loading}
          />
          <SendButton onPress={handleSendMessage} disabled={!input.trim() || loading}>
            <Ionicons name="send" size={20} color={input.trim() && !loading ? '#2AC1BC' : '#ddd'} />
          </SendButton>
        </InputWrapper>
      </InputContainer>
    </Container>
  );
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: #fff;
`;

const MessageList = styled.FlatList`
  flex: 1;
  padding: 0 16px;
` as unknown as typeof FlatList;

const BubbleWrapper = styled.View<{ isUser: boolean }>`
  flex-direction: row;
  justify-content: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 12px;
`;

const Bubble = styled.View<{ isUser: boolean }>`
  background-color: ${(props) => (props.isUser ? '#2AC1BC' : '#F2F3F6')};
  padding: 12px 16px;
  border-radius: 20px;
  border-top-left-radius: ${(props) => (!props.isUser ? '4px' : '20px')};
  border-top-right-radius: ${(props) => (props.isUser ? '4px' : '20px')};
  max-width: 80%;
`;

const MessageText = styled.Text<{ isUser: boolean }>`
  color: ${(props) => (props.isUser ? '#fff' : '#000')};
  font-size: 16px;
  line-height: 22px;
`;

const LoadingWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  background-color: #f8f9fa;
`;

const LoadingText = styled.Text`
  margin-left: 8px;
  color: #666;
  font-size: 14px;
`;

const InputContainer = styled.View`
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #f0f0f0;
  padding: 12px 16px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #F8F9FA;
  border-radius: 24px;
  padding: 8px 16px;
  min-height: 48px;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #333;
  padding-top: 0;
  padding-bottom: 0;
  max-height: 100px;
`;

const SendButton = styled.Pressable`
  margin-left: 8px;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;
