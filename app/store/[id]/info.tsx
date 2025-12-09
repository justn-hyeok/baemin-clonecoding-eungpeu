import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function StoreInfoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>가게 정보</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>영업시간</Text>
        <Text style={styles.value}>11:00 - 22:00</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>전화번호</Text>
        <Text style={styles.value}>02-1234-5678</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>주소</Text>
        <Text style={styles.value}>서울시 강남구 테헤란로 123</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>배달팁</Text>
        <Text style={styles.value}>2,000원 ~ 3,000원</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    width: 80,
    color: '#666',
  },
  value: {
    flex: 1,
  },
});
