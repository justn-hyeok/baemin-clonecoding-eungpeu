import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>배민 클론코딩</Text>
      <View style={styles.links}>
        <Link href="/settings" style={styles.link}>
          <Text>알레르기 설정</Text>
        </Link>
        <Link href="/chatbot" style={styles.link}>
          <Text>챗봇</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  links: {
    gap: 12,
  },
  link: {
    padding: 12,
    backgroundColor: '#2AC1BC',
    borderRadius: 8,
  },
});
