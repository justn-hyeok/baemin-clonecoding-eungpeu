import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import styled from '@emotion/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../constants/theme';
import { useStores } from '../../src/hooks/useStores';
import type { Store as SupabaseStore } from '../../src/types/database';

// --- Types ---
type MenuItem = {
  name: string;
  price: string;
  image?: any;
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

// --- Mock Data ---
const CATEGORIES = ['홈', '치킨', '분식', '패스트푸드', '피자', '중식', '한식', '일식', '족발·보쌈', '야식'];

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
      { name: '한우 대창 떡볶이', price: '15,900원', image: require('../../assets/tteokbokki.png') },
      { name: '떡볶이 + 순대 세트', price: '17,800원', image: require('../../assets/soondae.png') },
      { name: '로제 떡볶이', price: '14,900원', image: require('../../assets/rose-tteokboki.jpg') },
    ],
    isAd: true,
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
    { name: '한우 대창 떡볶이', price: '15,900원' },
    { name: '떡볶이 + 순대 세트', price: '18,900원' },
    { name: '로제 떡볶이', price: '14,000원' },
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
      <MenuImageWrapper>
        <MenuImageRow horizontal showsHorizontalScrollIndicator={false}>
          {item.menuItems.map((menu, idx) => (
            <MenuImageBox key={idx}>
              {menu.image ? (
                <ImageBackground
                  source={menu.image}
                  style={{ width: 140, height: 140 }}
                  imageStyle={{ borderRadius: 8 }}
                  resizeMode="cover"
                >
                  <MenuOverlay>
                    <MenuOverlayName numberOfLines={1}>{menu.name}</MenuOverlayName>
                    <MenuOverlayPrice>{menu.price}</MenuOverlayPrice>
                  </MenuOverlay>
                </ImageBackground>
              ) : (
                <View style={{ width: 140, height: 140, backgroundColor: item.imageColor, borderRadius: 8 }}>
                  <MenuOverlay>
                    <MenuOverlayName numberOfLines={1}>{menu.name}</MenuOverlayName>
                    <MenuOverlayPrice>{menu.price}</MenuOverlayPrice>
                  </MenuOverlay>
                </View>
              )}
            </MenuImageBox>
          ))}
        </MenuImageRow>

        {item.discountBadge && (
          <DiscountBadge>
            <Ionicons name="flash" size={12} color="#fff" />
            <DiscountText>{item.discountBadge}</DiscountText>
          </DiscountBadge>
        )}
      </MenuImageWrapper>

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
  const { stores: supabaseStores, loading } = useStores();

  const displayStores: StoreDisplay[] = supabaseStores.length > 0
    ? supabaseStores.map(toDisplayStore)
    : MOCK_STORES;

  const renderHeader = () => (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }}>경남 김해시 주촌면 천곡로 26</Text>
        <Ionicons name="caret-down" size={14} color="#000" style={{ marginLeft: 4 }} />
      </View>

      <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
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
                <Text style={{ fontSize: 15, fontWeight: isSelected ? '700' : '400', color: isSelected ? '#000' : '#999' }}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 32, paddingHorizontal: 12, borderRadius: 16, backgroundColor: '#000' }}>
          <Ionicons name="swap-vertical" size={14} color="#fff" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 13, color: '#fff', fontWeight: '500' }}>기본순</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', height: 32, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' }}>
          <Ionicons name="flash" size={14} color="#333" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 13, color: '#333', fontWeight: '500' }}>즉시할인·쿠폰</Text>
        </TouchableOpacity>
      </ScrollView>

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
  margin-right: 6px;
`;

const MenuOverlay = styled.View`
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.35);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
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
