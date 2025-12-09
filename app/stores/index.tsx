import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Link } from 'expo-router';

const MOCK_STORES = [
  { id: '1', name: '맛있는 치킨집', category: '치킨' },
  { id: '2', name: '행복한 피자', category: '피자' },
  { id: '3', name: '엄마손 분식', category: '분식' },
];

export default function StoresListScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_STORES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/store/${item.id}`} asChild>
            <Pressable style={styles.storeItem}>
              <Text style={styles.storeName}>{item.name}</Text>
              <Text style={styles.storeCategory}>{item.category}</Text>
            </Pressable>
          </Link>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
  },
  storeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
  },
  storeCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
