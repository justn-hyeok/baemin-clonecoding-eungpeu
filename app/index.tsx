import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>배민 클론코딩</Text>
      <View style={styles.links}>
        <Link href="/stores" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>가게 목록</Text>
          </Pressable>
        </Link>
        <Link href="/cart" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>장바구니</Text>
          </Pressable>
        </Link>
        <Link href="/mypage" asChild>
          <Pressable style={styles.link}>
            <Text style={styles.linkText}>마이 배민</Text>
          </Pressable>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#2AC1BC',
  },
  links: {
    gap: 12,
  },
  link: {
    padding: 16,
    backgroundColor: '#2AC1BC',
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
