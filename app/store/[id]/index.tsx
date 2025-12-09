import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';

const MOCK_MENUS = [
  { id: '1', name: '후라이드 치킨', price: 18000, allergens: ['밀', '대두'] },
  { id: '2', name: '양념 치킨', price: 19000, allergens: ['밀', '대두', '땅콩'] },
  { id: '3', name: '간장 치킨', price: 19000, allergens: ['밀', '대두'] },
];

export default function StoreMenuScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_MENUS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/store/${id}/menu/${item.id}`} asChild>
            <Pressable style={styles.menuItem}>
              <View>
                <Text style={styles.menuName}>{item.name}</Text>
                <Text style={styles.menuPrice}>{item.price.toLocaleString()}원</Text>
              </View>
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
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuName: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuPrice: {
    fontSize: 14,
    color: '#2AC1BC',
    marginTop: 4,
  },
});
