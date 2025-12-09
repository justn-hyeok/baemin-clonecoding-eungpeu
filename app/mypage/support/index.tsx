import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function SupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>무엇을 도와드릴까요?</Text>

      <View style={styles.options}>
        <Link href="/mypage/support/chatbot" asChild>
          <Pressable style={styles.option}>
            <Text style={styles.optionIcon}>🤖</Text>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>AI 챗봇 상담</Text>
              <Text style={styles.optionDesc}>24시간 빠른 답변을 받아보세요</Text>
            </View>
          </Pressable>
        </Link>

        <Pressable style={styles.option}>
          <Text style={styles.optionIcon}>📞</Text>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>전화 상담</Text>
            <Text style={styles.optionDesc}>상담원과 직접 통화하기</Text>
          </View>
        </Pressable>

        <Pressable style={styles.option}>
          <Text style={styles.optionIcon}>❓</Text>
          <View style={styles.optionContent}>
            <Text style={styles.optionTitle}>자주 묻는 질문</Text>
            <Text style={styles.optionDesc}>FAQ 확인하기</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  options: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  optionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
