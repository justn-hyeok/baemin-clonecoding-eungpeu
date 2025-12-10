import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, Platform, ActivityIndicator, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import styled from '@emotion/native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../constants/theme';
import { useStores } from '../../src/hooks/useStores';
import type { Store as SupabaseStore } from '../../src/types/database';

// --- Types ---
type MenuItem = {
  name: string;
  price: string;
  image?: string;
};

type StoreDisplay = {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryTip: string;
  distance: string;
  minOrder: string;
  discountBadge?: string;
  tags: string[];
  imageColor: string;
  menuItems: MenuItem[];
  isAd?: boolean;
  storeIcon?: string;
};

// --- Mock Data (Fallback) ---
const CATEGORIES = ['홈', '치킨', '분식', '패스트푸드', '피자', '중식', '한식', '일식', '족발·보쌈', '야식'];
const FILTERS = ['기본순', '무료배달', '즉시할인·쿠폰', '배달·픽업 선택'];

const MOCK_STORES: StoreDisplay[] = [
  {
    id: '1',
    name: '대창을품은떡볶이 김해점',
    rating: 4.9,
    reviewCount: 211,
    deliveryTime: '40~55분',
    deliveryTip: '4,800원',
    distance: '3.1km',
    minOrder: '5,000원',
    discountBadge: '1,000원 즉시할인',
    tags: ['배민클럽', '예약가능'],
    imageColor: '#FF6B6B',
    menuItems: [
      { name: '한우 대창 떡볶이', price: '15,900원' },
      { name: '떡볶이 + 순대 세트', price: '17,800원' },
      { name: '김치볶음밥', price: '5,900원' },
    ],
    isAd: true,
  },
  {
    id: '2',
    name: '역전할머니맥주 김해주촌점',
    rating: 4.7,
    reviewCount: 41,
    deliveryTime: '22~37분',
    deliveryTip: '0~3,000원',
    distance: '869m',
    minOrder: '11,000원',
    discountBadge: '2,000원 즉시할인',
    tags: ['배민클럽', '픽업가능'],
    imageColor: '#4ECDC4',
    menuItems: [
      { name: '짜파구리', price: '10,000원' },
      { name: '염통꼬치', price: '9,000원' },
      { name: '반건조 오징어', price: '11,000원' },
    ],
    storeIcon: '🍺',
  },
  {
    id: '3',
    name: '신전떡볶이 김해점',
    rating: 4.6,
    reviewCount: 89,
    deliveryTime: '25~40분',
    deliveryTip: '2,000원',
    distance: '1.5km',
    minOrder: '10,000원',
    discountBadge: '1,000원 즉시할인',
    tags: ['배민클럽'],
    imageColor: '#FFD93D',
    menuItems: [
      { name: '쀼욱~늘어나는 모짜렐라...', price: '9,900원' },
      { name: '1인세트', price: '11,900원' },
      { name: '꾸~덕 로제떡볶이', price: '8,900원' },
    ],
  },
];

// Convert Supabase store to display format
const toDisplayStore = (store: SupabaseStore, index: number): StoreDisplay => ({
  id: store.id,
  name: store.name,
  rating: store.rating || 0,
  reviewCount: 0,
  deliveryTime: store.delivery_time || '30~45분',
  deliveryTip: '3,000원',
  distance: '1.0km',
  minOrder: store.min_order ? `${store.min_order.toLocaleString()}원` : '10,000원',
  tags: ['배민클럽'],
  imageColor: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6C5CE7', '#A29BFE'][index % 5],
  menuItems: [
    { name: '대표메뉴 1', price: '10,000원' },
    { name: '대표메뉴 2', price: '12,000원' },
    { name: '대표메뉴 3', price: '8,000원' },
  ],
});

// --- Components ---

const Header = () => {
  const router = useRouter();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#fff' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#000' }}>음식배달</Text>
          <Text style={{ fontSize: 20, marginLeft: 2 }}>🍴</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity style={{ padding: 8 }}>
          <MaterialCommunityIcons name="percent-circle-outline" size={26} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 8 }}>
          <Ionicons name="search-outline" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 8 }}>
          <Ionicons name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const StoreCard = ({ item }: { item: StoreDisplay }) => {
  const router = useRouter();

  return (
    <CardContainer onPress={() => router.push(`/store/${item.id}`)}>
      {/* 메뉴 이미지 가로 스크롤 */}
      <MenuImageWrapper>
        <MenuImageRow horizontal showsHorizontalScrollIndicator={false}>
          {item.menuItems.map((menu, idx) => (
            <MenuImageBox key={idx}>
              <MenuImagePlaceholder style={{ backgroundColor: item.imageColor }} />
              <MenuOverlay>
                <MenuOverlayName numberOfLines={1}>{menu.name}</MenuOverlayName>
                <MenuOverlayPrice>{menu.price}</MenuOverlayPrice>
              </MenuOverlay>
            </MenuImageBox>
          ))}
        </MenuImageRow>

        {/* 할인 배지 - 이미지 위에 겹치게 */}
        {item.discountBadge && (
          <DiscountBadge>
            <Ionicons name="flash" size={12} color="#fff" />
            <DiscountText>{item.discountBadge}</DiscountText>
          </DiscountBadge>
        )}
      </MenuImageWrapper>

      {/* 가게 정보 */}
      <StoreInfoRow>
        {item.storeIcon && (
          <StoreIconBadge>
            <Text style={{ fontSize: 14 }}>{item.storeIcon}</Text>
          </StoreIconBadge>
        )}
        <StoreName numberOfLines={1}>{item.name}</StoreName>
        <Ionicons name="star" size={14} color="#FFC107" style={{ marginLeft: 6 }} />
        <RatingText>{item.rating}</RatingText>
        <ReviewCount>({item.reviewCount})</ReviewCount>
        {item.isAd && (
          <AdBadge>
            <AdText>광고</AdText>
            <Ionicons name="information-circle-outline" size={12} color="#999" />
          </AdBadge>
        )}
      </StoreInfoRow>

      <DeliveryInfoRow>
        <MaterialCommunityIcons name="bike-fast" size={14} color="#666" />
        <DetailsText>{item.deliveryTime}</DetailsText>
        <DetailsText style={{ marginLeft: 4 }}>{item.deliveryTip}</DetailsText>
        <Ionicons name="location-outline" size={13} color="#666" style={{ marginLeft: 6 }} />
        <DetailsText>{item.distance}</DetailsText>
        <DetailsText style={{ marginLeft: 6 }}>최소주문 {item.minOrder}</DetailsText>
      </DeliveryInfoRow>

      {/* 태그 */}
      <TagsRow>
        {item.tags.map((tag, index) => (
          <TagBadge key={index}>
            {tag === '배민클럽' && <MaterialCommunityIcons name="truck-fast" size={12} color={colors.primary} style={{ marginRight: 3 }} />}
            <TagText>{tag}</TagText>
          </TagBadge>
        ))}
      </TagsRow>
    </CardContainer>
  );
};

export default function StoresListScreen() {
  const { stores: supabaseStores, loading, error } = useStores();

  // Use Supabase data if available, otherwise fallback to mock data
  const displayStores: StoreDisplay[] = supabaseStores.length > 0
    ? supabaseStores.map(toDisplayStore)
    : MOCK_STORES;

  const renderHeader = () => (
    <View>
      {/* 주소 */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>경남 김해시 주촌면 천곡로 26</Text>
        <Ionicons name="caret-down" size={14} color="#000" style={{ marginLeft: 4 }} />
      </View>

      {/* 카테고리 탭 */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 8 }}
        >
          {CATEGORIES.map((cat, index) => {
            const isSelected = index === 2;
            return (
              <TouchableOpacity
                key={index}
                style={{
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  borderBottomWidth: 2,
                  borderBottomColor: isSelected ? '#000' : 'transparent',
                }}
              >
                <Text style={{
                  fontSize: 15,
                  fontWeight: isSelected ? '700' : '400',
                  color: isSelected ? '#000' : '#999',
                }}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={{ paddingVertical: 14, paddingHorizontal: 8, justifyContent: 'center' }}>
            <Ionicons name="chevron-down" size={16} color="#999" />
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 필터 칩 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}
      >
        {/* 기본순 */}
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 32,
          paddingHorizontal: 12,
          borderRadius: 16,
          backgroundColor: '#000',
        }}>
          <Ionicons name="swap-vertical" size={14} color="#fff" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 13, color: '#fff', fontWeight: '500' }}>기본순</Text>
        </TouchableOpacity>

        {/* 무료배달 */}
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 32,
          paddingHorizontal: 12,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#fff',
        }}>
          <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: '#6F2B96', marginRight: 6, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>%</Text>
          </View>
          <Text style={{ fontSize: 13, color: '#333', fontWeight: '500' }}>무료배달</Text>
        </TouchableOpacity>

        {/* 즉시할인·쿠폰 */}
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 32,
          paddingHorizontal: 12,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#fff',
        }}>
          <Ionicons name="flash" size={14} color="#333" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 13, color: '#333', fontWeight: '500' }}>즉시할인·쿠폰</Text>
        </TouchableOpacity>

        {/* 배달·픽업 선택 */}
        <TouchableOpacity style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 32,
          paddingHorizontal: 12,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#fff',
        }}>
          <Text style={{ fontSize: 13, color: '#333', fontWeight: '500' }}>배달·픽업 선택</Text>
          <Ionicons name="chevron-down" size={12} color="#333" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </ScrollView>

      {/* 기본순 */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 }}>
        <Text style={{ fontSize: 13, color: '#666' }}>기본순</Text>
        <Ionicons name="help-circle-outline" size={14} color="#ccc" style={{ marginLeft: 4 }} />
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeArea edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <Header />
        <LoadingContainer>
          <ActivityIndicator size="large" color={colors.primary} />
        </LoadingContainer>
      </SafeArea>
    );
  }

  return (
    <SafeArea edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <Header />
      <FlatList
        data={displayStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StoreCard item={item} />}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeArea>
  );
}

// --- Styles ---

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #fff;
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #000;
`;

const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconButton = styled.TouchableOpacity`
  padding: 6px;
`;

const AddressBar = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${spacing.xs}px ${spacing.lg}px ${spacing.md}px ${spacing.lg}px;
  background-color: ${colors.background};
`;

const AddressText = styled.Text`
  font-size: ${fontSize.lg}px;
  font-weight: ${fontWeight.bold};
  color: ${colors.textPrimary};
`;

const CategoryScrollView = styled.ScrollView`
  padding: 0 ${spacing.sm}px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.backgroundTertiary};
  max-height: 50px;
`;

const CategoryTab = styled.TouchableOpacity<{ isSelected?: boolean }>`
  padding: ${spacing.md}px 14px;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => (props.isSelected ? colors.textSecondary : 'transparent')};
  margin-right: ${spacing.xs}px;
`;

const CategoryText = styled.Text<{ isSelected?: boolean }>`
  font-size: 15px;
  color: ${(props) => (props.isSelected ? colors.textPrimary : colors.textDisabled)};
  font-weight: ${(props) => (props.isSelected ? fontWeight.bold : fontWeight.medium)};
`;

const MoreButton = styled.TouchableOpacity`
  padding: ${spacing.md}px 14px;
  justify-content: center;
  align-items: center;
`;

const FilterScrollView = styled.ScrollView`
  padding: ${spacing.md}px ${spacing.lg}px;
`;

const FilterChip = styled.TouchableOpacity<{ isSelected?: boolean }>`
  flex-direction: row;
  align-items: center;
  height: 32px;
  padding: 0 ${spacing.md}px;
  border-radius: ${borderRadius.xl}px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? colors.textSecondary : colors.border)};
  background-color: ${(props) => (props.isSelected ? colors.textSecondary : colors.background)};
  margin-right: ${spacing.sm}px;
`;

const FilterText = styled.Text<{ isSelected?: boolean }>`
  font-size: 13px;
  color: ${(props) => (props.isSelected ? colors.textInverse : colors.textSecondary)};
  font-weight: ${fontWeight.medium};
`;

const SortBar = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${spacing.sm}px ${spacing.lg}px;
  margin-bottom: ${spacing.sm}px;
`;

const SortTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SortText = styled.Text`
  font-size: ${fontSize.sm}px;
  color: ${colors.textSecondary};
`;

// --- Store Card Styles ---

const CardContainer = styled.TouchableOpacity`
  padding: 16px;
  border-bottom-width: 8px;
  border-bottom-color: #f5f5f5;
`;

const MenuImageWrapper = styled.View`
  position: relative;
  margin-bottom: 12px;
`;

const MenuImageRow = styled.ScrollView``;

const MenuImageBox = styled.View`
  width: 140px;
  height: 140px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 6px;
  position: relative;
`;

const MenuImagePlaceholder = styled.View`
  width: 100%;
  height: 100%;
  background-color: #ddd;
`;

const MenuOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.35);
`;

const MenuOverlayName = styled.Text`
  font-size: 12px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 2px;
`;

const MenuOverlayPrice = styled.Text`
  font-size: 14px;
  color: #fff;
  font-weight: 700;
`;

const DiscountBadge = styled.View`
  position: absolute;
  bottom: 8px;
  left: 0;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.primary};
  padding: 6px 12px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const DiscountText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  margin-left: 4px;
`;

const StoreInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

const StoreIconBadge = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
`;

const StoreName = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  flex-shrink: 1;
`;

const RatingText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #000;
  margin-left: 3px;
`;

const ReviewCount = styled.Text`
  font-size: 14px;
  color: #999;
  margin-left: 1px;
`;

const AdBadge = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: auto;
`;

const AdText = styled.Text`
  font-size: 12px;
  color: #999;
  margin-right: 2px;
`;

const DeliveryInfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
`;

const DetailsText = styled.Text`
  font-size: 13px;
  color: #666;
`;

const TagsRow = styled.View`
  flex-direction: row;
  margin-top: 4px;
`;

const TagBadge = styled.View`
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 6px;
  flex-direction: row;
  align-items: center;
`;

const TagText = styled.Text`
  font-size: 12px;
  color: #666;
  font-weight: 500;
`;
