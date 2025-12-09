import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const MOCK_REVIEWS = [
  {
    id: '1',
    author: '맛있게먹었어요',
    rating: 5,
    content: '치킨이 정말 바삭바삭해요!',
    replies: [{ id: 'r1', author: '사장님', content: '감사합니다! 또 방문해주세요~' }],
  },
  {
    id: '2',
    author: '배달왕',
    rating: 4,
    content: '양도 많고 맛있어요. 다만 배달이 좀 늦었어요.',
    replies: [],
  },
];

export default function StoreReviewsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_REVIEWS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.rating}>{'⭐'.repeat(item.rating)}</Text>
            </View>
            <Text style={styles.content}>{item.content}</Text>
            {item.replies.map((reply) => (
              <View key={reply.id} style={styles.reply}>
                <Text style={styles.replyAuthor}>{reply.author}</Text>
                <Text style={styles.replyContent}>{reply.content}</Text>
              </View>
            ))}
          </View>
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
  reviewItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  author: {
    fontWeight: '600',
  },
  rating: {
    fontSize: 12,
  },
  content: {
    color: '#333',
    lineHeight: 20,
  },
  reply: {
    marginTop: 12,
    marginLeft: 16,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  replyAuthor: {
    fontWeight: '600',
    color: '#2AC1BC',
    marginBottom: 4,
  },
  replyContent: {
    color: '#333',
  },
});
