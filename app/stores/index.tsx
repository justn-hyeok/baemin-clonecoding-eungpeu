import React from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StatusBar, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import styled from '@emotion/native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';

// --- Types ---
type Store = {
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
};

// --- Mock Data ---
const CATEGORIES = ['홈', '치킨', '분식', '패스트푸드', '피자', '중식', '한식', '일식', '족발·보쌈', '야식'];
const FILTERS = ['기본순', '무료배달', '즉시할인·쿠폰', '배달·픽업 선택'];

const STORES: Store[] = [
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
  },
  {
    id: '3',
    name: 'BBQ치킨 김해점',
    rating: 4.8,
    reviewCount: 1542,
    deliveryTime: '30~45분',
    deliveryTip: '3,000원',
    distance: '1.2km',
    minOrder: '18,000원',
    discountBadge: '3,000원 할인쿠폰',
    tags: ['배민클럽'],
    imageColor: '#FFD93D',
  },
];

// --- Components ---

const Header = () => {
  const router = useRouter();
  return (
    <HeaderContainer>
      <HeaderLeft>
        <IconButton onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </IconButton>
        <HeaderTitleContainer>
          <HeaderTitle>음식배달</HeaderTitle>
          <MaterialCommunityIcons name="silverware-fork-knife" size={18} color="#2AC1BC" style={{ marginLeft: 4 }} />
        </HeaderTitleContainer>
      </HeaderLeft>
      <HeaderRight>
        <IconGroup>
          <IconButton>
            <MaterialCommunityIcons name="ticket-percent-outline" size={26} color="#333" />
          </IconButton>
          <IconButton>
            <Ionicons name="search" size={26} color="#333" />
          </IconButton>
          <IconButton>
            <Ionicons name="cart-outline" size={26} color="#333" />
          </IconButton>
        </IconGroup>
      </HeaderRight>
    </HeaderContainer>
  );
};

const StoreCard = ({ item }: { item: Store }) => {
  const router = useRouter();

  const menuItems = [
    { name: '대표 메뉴', price: '15,000원' },
    { name: '인기 메뉴', price: '12,000원' },
    { name: '세트 메뉴', price: '20,000원' },
    { name: '매운맛', price: '16,000원' },
    { name: '로제 소스', price: '17,000원' },
    { name: '모둠 튀김', price: '9,000원' },
    { name: '순대', price: '4,500원' },
    { name: '어묵탕', price: '10,000원' },
  ];

  return (
    <CardContainer onPress={() => router.push(`/store/${item.id}`)}>
      <ImageScrollView horizontal showsHorizontalScrollIndicator={false}>
        {menuItems.map((menu, index) => (
          <MenuImage key={index} style={{ backgroundColor: item.imageColor, opacity: 1 - index * 0.05 }}>
            <ImageOverlay>
              <OverlayText>{menu.name}</OverlayText>
              <OverlayPrice>{menu.price}</OverlayPrice>
            </ImageOverlay>
          </MenuImage>
        ))}
      </ImageScrollView>

      {item.discountBadge && (
        <DiscountBadge>
          <Ionicons name="flash" size={12} color="white" style={{ marginRight: 4 }} />
          <DiscountText>{item.discountBadge}</DiscountText>
        </DiscountBadge>
      )}

      <InfoContainer>
        <StoreNameRow>
          <StoreName>{item.name}</StoreName>
          <Ionicons name="star" size={14} color="#FFC107" style={{ marginLeft: 6, marginRight: 2 }} />
          <RatingText>{item.rating}</RatingText>
          <ReviewCount>({item.reviewCount})</ReviewCount>
        </StoreNameRow>

        <DetailsText>
          <Ionicons name="time-outline" size={13} color="#666" /> {item.deliveryTime}  <Text style={{ color: '#ddd' }}>|</Text>  배달팁 {item.deliveryTip}  <Text style={{ color: '#ddd' }}>|</Text>  {item.distance}
        </DetailsText>
        <DetailsText>최소주문 {item.minOrder}</DetailsText>

        <TagsRow>
          {item.tags.map((tag, index) => (
            <TagBadge key={index}>
              {tag === '배민클럽' && <FontAwesome5 name="shipping-fast" size={10} color="#2AC1BC" style={{ marginRight: 4 }} />}
              <TagText>{tag}</TagText>
            </TagBadge>
          ))}
        </TagsRow>
      </InfoContainer>
    </CardContainer>
  );
};

export default function StoresListScreen() {
  const renderHeader = () => (
    <View>
      <AddressBar>
        <AddressText>경남 김해시 주촌면 천곡로 26</AddressText>
        <Ionicons name="caret-down" size={14} color="black" style={{ marginLeft: 4 }} />
      </AddressBar>

      <CategoryScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((cat, index) => (
          <CategoryTab key={index} isSelected={index === 2}>
            <CategoryText isSelected={index === 2}>{cat}</CategoryText>
          </CategoryTab>
        ))}
        <MoreButton>
          <SimpleLineIcons name="arrow-down" size={12} color="#666" />
        </MoreButton>
      </CategoryScrollView>

      <FilterScrollView horizontal showsHorizontalScrollIndicator={false}>
        {FILTERS.map((filter, index) => (
          <FilterChip key={index} isSelected={index === 0}>
            {index === 1 && <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: '#6F2B96', marginRight: 4, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: 'white', fontSize: 8 }}>%</Text></View>}
            {index === 2 && <Ionicons name="flash" size={12} color="#333" style={{ marginRight: 4 }} />}
            <FilterText isSelected={index === 0}>{filter}</FilterText>
            {index === 3 && <Ionicons name="caret-down" size={10} color="#333" style={{ marginLeft: 4 }} />}
          </FilterChip>
        ))}
      </FilterScrollView>

      <SortBar>
        <SortTextContainer>
          <SortText>기본순</SortText>
          <SimpleLineIcons name="question" size={11} color="#999" style={{ marginLeft: 4 }} />
        </SortTextContainer>
      </SortBar>
    </View>
  );

  return (
    <SafeArea>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header />
      <FlatList
        data={STORES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StoreCard item={item} />}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeArea>
  );
}

// --- Styles ---

const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0}px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 8px 10px 16px;
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
  font-weight: 800;
  color: #000;
`;

const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconButton = styled.TouchableOpacity`
  padding: 8px;
`;

const AddressBar = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 4px 16px 12px 16px;
  background-color: #fff;
`;

const AddressText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000;
`;

const CategoryScrollView = styled.ScrollView`
  padding: 0 8px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  max-height: 50px;
`;

const CategoryTab = styled.TouchableOpacity<{ isSelected?: boolean }>`
  padding: 12px 14px;
  border-bottom-width: 2px;
  border-bottom-color: ${(props) => (props.isSelected ? '#333' : 'transparent')};
  margin-right: 4px;
`;

const CategoryText = styled.Text<{ isSelected?: boolean }>`
  font-size: 15px;
  color: ${(props) => (props.isSelected ? '#000' : '#888')};
  font-weight: ${(props) => (props.isSelected ? '700' : '500')};
`;

const MoreButton = styled.TouchableOpacity`
  padding: 12px 14px;
  justify-content: center;
  align-items: center;
`;

const FilterScrollView = styled.ScrollView`
  padding: 12px 16px;
`;

const FilterChip = styled.TouchableOpacity<{ isSelected?: boolean }>`
  flex-direction: row;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  border-radius: 16px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? '#333' : '#eee')};
  background-color: ${(props) => (props.isSelected ? '#333' : '#fff')};
  margin-right: 8px;
  elevation: 1;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 1px;
`;

const FilterText = styled.Text<{ isSelected?: boolean }>`
  font-size: 13px;
  color: ${(props) => (props.isSelected ? '#fff' : '#333')};
  font-weight: 500;
`;

const SortBar = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 8px;
`;

const SortTextContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const SortText = styled.Text`
  font-size: 12px;
  color: #333;
`;

// --- Store Card Styles ---

const CardContainer = styled.TouchableOpacity`
  padding: 0 16px;
  margin-bottom: 32px;
`;

const ImageScrollView = styled.ScrollView`
  margin-bottom: 12px;
`;

const MenuImage = styled.View`
  width: 150px;
  height: 160px;
  justify-content: flex-end;
  padding: 10px;
  border-radius: 12px;
  margin-right: 8px;
`;

const ImageOverlay = styled.View`
`;

const OverlayText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-shadow: 0px 1px 4px rgba(0,0,0,0.5);
  margin-bottom: 2px;
`;

const OverlayPrice = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: 700;
  text-shadow: 0px 1px 4px rgba(0,0,0,0.5);
`;

const DiscountBadge = styled.View`
  background-color: #2AC1BC; 
  align-self: flex-start;
  padding: 4px 6px;
  border-radius: 4px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  margin-top: -24px; 
  margin-left: 10px;
  position: relative;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 3;
`;

const DiscountText = styled.Text`
  color: white;
  font-size: 11px;
  font-weight: 700;
`;

const InfoContainer = styled.View`
`;

const StoreNameRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const StoreName = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #000;
`;

const RatingText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #000;
  margin-right: 2px;
`;

const ReviewCount = styled.Text`
  font-size: 14px;
  color: #888;
`;

const DetailsText = styled.Text`
  font-size: 14px;
  color: #555;
  margin-bottom: 2px;
  line-height: 20px;
`;

const TagsRow = styled.View`
  flex-direction: row;
  margin-top: 6px;
`;

const TagBadge = styled.View`
  background-color: #f6f6f6;
  padding: 4px 6px;
  border-radius: 4px;
  margin-right: 6px;
  flex-direction: row;
  align-items: center;
`;

const TagText = styled.Text`
  font-size: 11px;
  color: #666;
  font-weight: 500;
`;
