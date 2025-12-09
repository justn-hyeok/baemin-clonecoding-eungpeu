import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ReviewsScreen() {
  const { storeId } = useLocalSearchParams<{ storeId: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>리뷰</Text>
      <Text>Store ID: {storeId}</Text>
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
    marginBottom: 12,
  },
});
