import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Pressable, StatusBar as RNStatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styled from '@emotion/native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// --- Mock Data ---

const STORE_IMAGES = Array(3).fill(null); // 3 placeholder images

const MENUS = [
  {
    id: '1',
    name: '한우 대창 떡볶이',
    description: '떡+한우대창+사각어묵+봉어묵+비엔나+양배추',
    price: 15900,
    tags: ['인기 1위', '사장님 추천'],
    allergies: ['밀', '대두'],
  },
  {
    id: '2',
    name: '떡볶이 + 순대 세트',
    description: '쫄깃한 떡볶이와 찰순대의 환상적인 조합',
    price: 18900,
    tags: ['인기'],
    allergies: ['밀', '대두', '계란'],
  },
  {
    id: '3',
    name: '로제 떡볶이',
    description: '부드러운 크림과 매콤한 떡볶이의 만남! 꾸덕꾸덕한 소스',
    price: 14000,
    tags: ['NEW', '여성취향저격'],
    allergies: ['밀', '대두', '우유'],
  },
  {
    id: '4',
    name: '마라 떡볶이',
    description: '알싸한 마라맛이 중독적인 떡볶이 (맵기 조절 가능)',
    price: 15000,
    tags: ['화끈한맛'],
    allergies: ['밀', '대두'],
  },
  {
    id: '5',
    name: '김치볶음밥',
    description: '특제 소스로 볶아낸 감칠맛 나는 김치볶음밥',
    price: 8000,
    tags: [],
    allergies: ['계란', '대두'],
  },
  {
    id: '6',
    name: '참치마요 주먹밥',
    description: '매운 떡볶이와 찰떡궁합! 고소한 참치와 마요네즈',
    price: 4500,
    tags: ['추천'],
    allergies: ['계란', '대두'],
  },
  {
    id: '7',
    name: '모듬 튀김',
    description: '바삭바삭한 튀김 모음 (오징어, 김말이, 야채, 고구마, 만두)',
    price: 6000,
    tags: [],
    allergies: ['밀', '대두'],
  },
  {
    id: '8',
    name: '치즈 볼 (5개)',
    description: '쭈욱 늘어나는 모짜렐라 치즈가 가득!',
    price: 5000,
    tags: ['아이들간식'],
    allergies: ['밀', '우유', '계란'],
  },
  {
    id: '9',
    name: '부산 어묵탕',
    description: '진한 국물이 일품인 뜨끈한 어묵탕',
    price: 7000,
    tags: [],
    allergies: ['밀', '대두', '새우'],
  },
  {
    id: '10',
    name: '순살 치킨 (반마리)',
    description: '떡볶이 국물에 찍어먹으면 더 맛있는 바삭 순살 치킨',
    price: 9000,
    tags: [],
    allergies: ['밀', '대두', '땅콩'],
  },
  {
    id: '11',
    name: '쿨피스 (450ml)',
    description: '매운맛 달래주는 달콤한 복숭아맛 음료',
    price: 1500,
    tags: [],
    allergies: [],
  },
];

const REVIEWS = [
  { id: '1', rating: 5, text: '양도 많고 맛도 좋고 사장님도 매우매우 친절합니다. 😍 진짜 처음 먹어봐쓴ㄴ데...' },
  { id: '2', rating: 5, text: '떡이 아주 쫄깃하고 대창이 고소해요! 배달도 빨랐습니다.' },
];

const FILTERS = ['인기 메뉴', '할인 메뉴', '떡볶이 메뉴', '세트메뉴'];

// --- Components ---

export default function StoreDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('인기 메뉴');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentImageIndex(index);
  };

  return (
    <Container>
      <RNStatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[6]} scrollEventThrottle={16}>
        {/* 1. Header Image Area */}
        <HeaderContainer>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {STORE_IMAGES.map((_, index) => (
              <HeaderImage key={index} />
            ))}
          </ScrollView>
          <PageIndicatorContainer>
            {STORE_IMAGES.map((_, index) => (
              <PageDot key={index} active={index === currentImageIndex} />
            ))}
          </PageIndicatorContainer>

          {/* Top Bar Overlay */}
          <TopBar style={{ paddingTop: insets.top }}>
            <IconButton onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </IconButton>
            <TopRightIcons>
              <IconButton>
                <Feather name="share" size={24} color="white" />
              </IconButton>
              <IconButton style={{ marginLeft: 16 }}>
                <Ionicons name="search" size={24} color="white" />
              </IconButton>
              <IconButton style={{ marginLeft: 16 }}>
                <Ionicons name="cart-outline" size={24} color="white" />
              </IconButton>
            </TopRightIcons>
          </TopBar>

          {/* Bottom Overlay Elements */}
          <StoreLogoOverlay>
            <StoreLogoPlaceholder>
              <Text style={{ fontSize: 10, color: '#666', textAlign: 'center' }}>LOGO</Text>
            </StoreLogoPlaceholder>
          </StoreLogoOverlay>

          <OrderTogetherButton>
            <Ionicons name="people-outline" size={16} color="#333" style={{ marginRight: 4 }} />
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#333' }}>함께주문</Text>
          </OrderTogetherButton>
        </HeaderContainer>

        {/* 2. Store Info Section */}
        <StoreInfoSection>
          <Badge>
            <MaterialCommunityIcons name="butterfly" size={12} color="white" style={{ marginRight: 4 }} />
            <BadgeText>배민클럽은 무료배달</BadgeText>
          </Badge>

          <StoreTitleRow>
            <StoreName>대창을품은떡볶이 김해점</StoreName>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={24} color="#333" />
            </TouchableOpacity>
          </StoreTitleRow>

          <RatingRow>
            <Ionicons name="star" size={16} color="#FFD700" />
            <RatingText>4.9<Text style={{ color: '#999', fontWeight: '400' }}>(211)</Text></RatingText>
            <Ionicons name="chevron-forward" size={16} color="#999" />
            <View style={{ flex: 1 }} />
            <InfoButton>
              <InfoButtonText>가게정보·원산지</InfoButtonText>
            </InfoButton>
          </RatingRow>
        </StoreInfoSection>

        {/* 3. Delivery Info Box */}
        <DeliveryInfoContainer>
          <DeliveryBox>
            <DeliveryRow>
              <DeliveryLabel>최소주문</DeliveryLabel>
              <DeliveryValue>5,000원</DeliveryValue>
              <View style={{ flex: 1 }} />
              <DeliveryGuideButton>
                <Text style={{ fontSize: 11, color: '#666' }}>배달 안내</Text>
              </DeliveryGuideButton>
            </DeliveryRow>

            <DeliveryRow style={{ marginTop: 8, alignItems: 'flex-start' }}>
              <DeliveryLabel style={{ marginTop: 2 }}>알뜰배달</DeliveryLabel>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                  <Ionicons name="bicycle" size={14} color="#333" style={{ marginRight: 4 }} />
                  <DeliveryValue>40~55분</DeliveryValue>
                  <CheapestBadge>
                    <Text style={{ fontSize: 10, color: '#2AC1BC', fontWeight: 'bold' }}>가장 저렴해요</Text>
                  </CheapestBadge>
                </View>
                <DeliveryValue>4,800원</DeliveryValue>
              </View>
              <View style={{ flex: 1 }} />
              <TouchableOpacity>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
            </DeliveryRow>
          </DeliveryBox>
        </DeliveryInfoContainer>

        {/* 4. Discount Banner */}
        <DiscountBannerContainer>
          <DiscountBanner>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#6A5ACD' }}>⚡ 1,000원</Text>
            <Text style={{ fontSize: 14, color: '#333', marginLeft: 4 }}>알뜰배달 즉시할인</Text>
            <View style={{ flex: 1 }} />
            <Ionicons name="chevron-forward" size={16} color="#333" />
          </DiscountBanner>
        </DiscountBannerContainer>

        {/* 5. Review Preview */}
        <ReviewPreviewContainer>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id}>
                <ReviewThumbnail />
                <View style={{ flex: 1, paddingLeft: 12, justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'row' }}>
                    {[...Array(5)].map((_, i) => (
                      <Ionicons key={i} name="star" size={12} color="#FFD700" />
                    ))}
                  </View>
                  <Text numberOfLines={2} style={{ fontSize: 13, color: '#333', marginTop: 4, lineHeight: 18 }}>
                    {review.text}
                  </Text>
                </View>
              </ReviewCard>
            ))}
          </ScrollView>
          {/* 6. Question Input */}
          <QuestionButton>
            <Ionicons name="megaphone-outline" size={16} color="#333" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 14, color: '#333' }}>리뷰이벤트 어떻게 신청 가능하나요?</Text>
          </QuestionButton>
        </ReviewPreviewContainer>

        <Divider />

        {/* 7. Menu Filter (Sticky) */}
        <FilterSection>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'center', height: 40 }}>
            <SearchMenuButton>
              <Ionicons name="search" size={18} color="#333" />
            </SearchMenuButton>
            {FILTERS.map((filter) => (
              <FilterChip
                key={filter}
                active={activeFilter === filter}
                onPress={() => setActiveFilter(filter)}
              >
                <FilterText active={activeFilter === filter}>{filter}</FilterText>
              </FilterChip>
            ))}
          </ScrollView>
        </FilterSection>

        {/* 8. Menu Section */}
        <MenuSection>
          <MenuHeader>
            <MenuTitle>가장 인기 있는 메뉴</MenuTitle>
            <MenuSubtitle>한 달간 주문수가 많고 만족도가 높은 메뉴예요.</MenuSubtitle>
          </MenuHeader>

          {MENUS.map((menu) => (
            <Pressable
              key={menu.id}
              onPress={() => router.push(`/store/${id}/menu/${menu.id}`)}
              style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
            >
              <MenuCard>
                <MenuInfo>
                  {menu.tags.length > 0 && (
                    <MenuTagRow>
                      {menu.tags.map(tag => (
                        <MenuTag key={tag}>
                          <Text style={{ fontSize: 10, color: '#555', fontWeight: 'bold' }}>{tag}</Text>
                        </MenuTag>
                      ))}
                    </MenuTagRow>
                  )}
                  <MenuName>{menu.name}</MenuName>
                  <MenuDesc numberOfLines={1}>{menu.description}</MenuDesc>
                  <MenuPrice>{menu.price.toLocaleString()}원</MenuPrice>
                </MenuInfo>
                <MenuImageContainer>
                  <MenuImage />
                  <AddButton>
                    <Ionicons name="add" size={20} color="#333" />
                  </AddButton>
                </MenuImageContainer>
              </MenuCard>
            </Pressable>
          ))}
        </MenuSection>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 9. Bottom Fixed Banner */}
      <BottomBanner style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 12 }}>
        <MaterialCommunityIcons name="lightning-bolt" size={16} color="#fff" style={{ marginRight: 4 }} />
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>알뜰배달 선택 시 1,000원 즉시할인</Text>
      </BottomBanner>
    </Container>
  );
}

// --- Styles ---

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const HeaderContainer = styled.View`
  height: 250px;
  position: relative;
`;

const HeaderImage = styled.View`
  width: ${width}px;
  height: 250px;
  background-color: #ddd;
`;

const TopBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
  z-index: 10;
`;

const TopRightIcons = styled.View`
  flex-direction: row;
`;

const IconButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
`;

const PageIndicatorContainer = styled.View`
  position: absolute;
  bottom: 24px;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
`;

const PageDot = styled.View<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
`;

const StoreLogoOverlay = styled.View`
  position: absolute;
  left: 16px;
  bottom: -20px;
  z-index: 20;
`;

const StoreLogoPlaceholder = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #eee;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const OrderTogetherButton = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  bottom: 16px;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-radius: 20px;
`;

const StoreInfoSection = styled.View`
  margin-top: 32px;
  padding-horizontal: 16px;
  padding-bottom: 20px;
`;

const Badge = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #2AC1BC; 
  align-self: flex-start;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 4px;
  margin-bottom: 8px;
`;

const BadgeText = styled.Text`
  color: white;
  font-size: 11px;
  font-weight: 700;
`;

const StoreTitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const StoreName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #000;
`;

const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin-left: 4px;
  margin-right: 2px;
`;

const InfoButton = styled.TouchableOpacity`
  padding-horizontal: 10px;
  padding-vertical: 4px;
  background-color: #f5f5f5;
  border-radius: 12px;
`;

const InfoButtonText = styled.Text`
  font-size: 11px;
  color: #666;
`;

const DeliveryInfoContainer = styled.View`
  padding-horizontal: 16px;
  margin-bottom: 16px;
`;

const DeliveryBox = styled.View`
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 16px;
  border-width: 1px;
  border-color: #eee;
`;

const DeliveryRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DeliveryLabel = styled.Text`
  font-size: 13px;
  color: #666;
  width: 70px;
`;

const DeliveryValue = styled.Text`
  font-size: 13px;
  color: #000;
  font-weight: 500;
`;

const DeliveryGuideButton = styled.TouchableOpacity`
  background-color: #fff;
  border: 1px solid #eee;
  padding-horizontal: 8px;
  padding-vertical: 2px;
  border-radius: 4px;
`;

const CheapestBadge = styled.View`
  background-color: #E0F7FA;
  padding-horizontal: 4px;
  padding-vertical: 1px;
  border-radius: 4px;
  margin-left: 6px;
`;

const DiscountBannerContainer = styled.View`
  padding-horizontal: 16px;
  margin-bottom: 24px;
`;

const DiscountBanner = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  border-width: 1px;
  border-color: #eee;
`;

const ReviewPreviewContainer = styled.View`
  margin-bottom: 24px;
`;

const ReviewCard = styled.View`
  width: 280px;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 10px;
  flex-direction: row;
`;

const ReviewThumbnail = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 4px;
  background-color: #ddd;
`;

const QuestionButton = styled.TouchableOpacity`
  margin-horizontal: 16px;
  margin-top: 16px;
  padding: 14px;
  background-color: #fff;
  border-width: 1px;
  border-color: #eee;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`;

const Divider = styled.View`
  height: 8px;
  background-color: #f0f0f0;
`;

const FilterSection = styled.View`
  background-color: #fff;
  padding-vertical: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const SearchMenuButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`;

const FilterChip = styled.TouchableOpacity<{ active: boolean }>`
  padding-horizontal: 14px;
  padding-vertical: 8px;
  border-radius: 20px;
  background-color: ${props => props.active ? '#1A1A1A' : '#fff'};
  border: 1px solid ${props => props.active ? '#1A1A1A' : '#eee'};
  margin-right: 8px;
`;

const FilterText = styled.Text<{ active: boolean }>`
  color: ${props => props.active ? '#fff' : '#666'};
  font-size: 13px;
  font-weight: 500;
`;

const MenuSection = styled.View`
  padding: 16px;
`;

const MenuHeader = styled.View`
  margin-bottom: 16px;
  margin-top: 8px;
`;

const MenuTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 4px;
`;

const MenuSubtitle = styled.Text`
  font-size: 13px;
  color: #888;
`;

const MenuCard = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
`;

const MenuInfo = styled.View`
  flex: 1;
  padding-right: 16px;
`;

const MenuTagRow = styled.View`
  flex-direction: row;
  margin-bottom: 4px;
  flex-wrap: wrap;
  gap: 4px;
`;

const MenuTag = styled.View`
  background-color: #f0f0f0;
  padding-horizontal: 6px;
  padding-vertical: 2px;
  border-radius: 4px;
`;

const MenuName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 6px;
`;

const MenuDesc = styled.Text`
  font-size: 13px;
  color: #888;
  margin-bottom: 8px;
`;

const MenuPrice = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #000;
`;

const MenuImageContainer = styled.View`
  position: relative;
`;

const MenuImage = styled.View`
  width: 110px;
  height: 110px;
  border-radius: 12px;
  background-color: #ddd;
`;

const AddButton = styled.View`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 3;
`;

const BottomBanner = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #2AC1BC;
  padding-top: 12px;
  padding-horizontal: 16px;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  z-index: 100;
`;
