import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const MOCK_MENU_DETAIL = {
  id: '1',
  name: '후라이드 치킨',
  price: 18000,
  description: '바삭바삭한 후라이드 치킨입니다.',
  allergens: ['밀', '대두', '계란'],
};

// TODO: 사용자 알레르기 정보와 비교
const USER_ALLERGIES = ['땅콩', '대두'];

export default function MenuDetailScreen() {
  const { id, menuId } = useLocalSearchParams<{ id: string; menuId: string }>();

  const hasAllergenWarning = MOCK_MENU_DETAIL.allergens.some((a) =>
    USER_ALLERGIES.includes(a)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{MOCK_MENU_DETAIL.name}</Text>
      <Text style={styles.price}>{MOCK_MENU_DETAIL.price.toLocaleString()}원</Text>
      <Text style={styles.description}>{MOCK_MENU_DETAIL.description}</Text>

      <View style={styles.allergenSection}>
        <Text style={styles.allergenTitle}>알레르기 정보</Text>
        <View style={styles.allergenList}>
          {MOCK_MENU_DETAIL.allergens.map((allergen) => {
            const isWarning = USER_ALLERGIES.includes(allergen);
            return (
              <View
                key={allergen}
                style={[styles.allergenTag, isWarning && styles.allergenWarning]}
              >
                <Text style={[styles.allergenText, isWarning && styles.allergenWarningText]}>
                  {isWarning && '⚠️ '}{allergen}
                </Text>
              </View>
            );
          })}
        </View>
        {hasAllergenWarning && (
          <Text style={styles.warningMessage}>
            ⚠️ 이 메뉴에는 회원님의 알레르기 유발 성분이 포함되어 있습니다.
          </Text>
        )}
      </View>

      <Pressable style={styles.addButton}>
        <Text style={styles.addButtonText}>장바구니에 담기</Text>
      </Pressable>
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
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#2AC1BC',
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 24,
  },
  allergenSection: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 24,
  },
  allergenTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  allergenList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergenTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
  },
  allergenWarning: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#f44336',
  },
  allergenText: {
    fontSize: 14,
    color: '#333',
  },
  allergenWarningText: {
    color: '#c62828',
    fontWeight: '600',
  },
  warningMessage: {
    marginTop: 12,
    color: '#c62828',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#2AC1BC',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
