import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CATEGORY_ITEM_WIDTH = (SCREEN_WIDTH - 32) / 5;

const MINT = '#2AC1BC';

const categories = [
  { emoji: '🎉', label: '푸드페스타' },
  { emoji: '🍗', label: '치킨' },
  { emoji: '🌭', label: '분식' },
  { emoji: '🍔', label: '패스트푸드' },
  { emoji: '🍕', label: '피자' },
  { emoji: '🍲', label: '찜·탕' },
  { emoji: '🥓', label: '족발·보쌈' },
  { emoji: '🌙', label: '야식' },
  { emoji: '💰', label: '한그릇' },
  { emoji: '🏷️', label: '픽업 할인' },
];

const marts = [
  { label: 'B마트', initial: 'B', color: '#FF6B35' },
  { label: 'CU', initial: 'C', color: '#8B5CF6' },
  { label: 'GS25', initial: 'G', color: '#3B82F6' },
  { label: '홈플러스', initial: '홈', color: '#EF4444' },
  { label: '이마트', initial: '이', color: '#EAB308' },
  { label: 'GS더프레시', initial: 'G', color: '#22C55E' },
];

const tabs = ['음식배달', '픽업', '장보기·쇼핑', '배민푸드페스타', '선물하기'];

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('음식배달');

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={MINT} />

      {/* Header Section - Mint Background */}
      <MintSection>
        <SafeAreaView>
          {/* Header */}
          <Header>
            <AddressContainer>
              <AddressText>경남 김해시 주촌면 천곡로 26</AddressText>
              <Ionicons name="chevron-down" size={16} color="#fff" />
            </AddressContainer>
            <HeaderIcons>
              <IconButton>
                <Ionicons name="pricetag-outline" size={24} color="#fff" />
              </IconButton>
              <IconButton>
                <Ionicons name="notifications-outline" size={24} color="#fff" />
              </IconButton>
              <IconButton onPress={() => router.push('/cart')}>
                <Ionicons name="cart-outline" size={24} color="#fff" />
              </IconButton>
            </HeaderIcons>
          </Header>

          {/* Search Bar */}
          <SearchContainer>
            <SearchInput
              placeholder="순대볶음 나와라 뚝딱!!"
              placeholderTextColor="#999"
              editable={false}
            />
            <SearchIconContainer>
              <Ionicons name="search" size={20} color={MINT} />
            </SearchIconContainer>
          </SearchContainer>

          {/* Event Banner */}
          <EventBanner>
            <EventTextContainer>
              <EventTitle>황가네님 주목!</EventTitle>
              <EventSubtitle>총 4천원 할인 당첨되셨어요</EventSubtitle>
              <ClubButton>
                <ClubButtonText>배민클럽 가입하고 받기</ClubButtonText>
                <Ionicons name="chevron-forward" size={14} color="#fff" />
              </ClubButton>
            </EventTextContainer>
            <CouponPlaceholder>
              <CouponBox>
                <Text style={{ fontSize: 10, color: '#666' }}>LIVE</Text>
                <Text style={{ fontSize: 10, color: '#666' }}>CONCERT</Text>
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#2AC1BC' }}>A</Text>
              </CouponBox>
            </CouponPlaceholder>
          </EventBanner>
        </SafeAreaView>
      </MintSection>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tab Menu */}
        <TabContainer>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tabs.map((tab) => (
              <TabItem
                key={tab}
                onPress={() => setActiveTab(tab)}
              >
                <TabText isActive={activeTab === tab}>{tab}</TabText>
                {activeTab === tab && <TabUnderline />}
              </TabItem>
            ))}
          </ScrollView>
        </TabContainer>

        {/* Category Grid - 2 rows x 5 columns */}
        <CategorySection>
          <CategoryRow>
            {categories.slice(0, 5).map((cat, index) => (
              <CategoryItem key={index} onPress={() => router.push('/stores')}>
                <CategoryEmojiBox>
                  <CategoryEmoji>{cat.emoji}</CategoryEmoji>
                </CategoryEmojiBox>
                <CategoryLabel>{cat.label}</CategoryLabel>
              </CategoryItem>
            ))}
          </CategoryRow>
          <CategoryRow>
            {categories.slice(5, 10).map((cat, index) => (
              <CategoryItem key={index + 5} onPress={() => router.push('/stores')}>
                <CategoryEmojiBox>
                  <CategoryEmoji>{cat.emoji}</CategoryEmoji>
                </CategoryEmojiBox>
                <CategoryLabel>{cat.label}</CategoryLabel>
              </CategoryItem>
            ))}
          </CategoryRow>
        </CategorySection>

        {/* More Link */}
        <MoreLink onPress={() => router.push('/stores')}>
          <MoreLinkText>음식배달에서 더보기</MoreLinkText>
          <Ionicons name="chevron-forward" size={16} color="#666" />
        </MoreLink>

        <Divider />

        {/* Mart Section */}
        <MartSection>
          <MartScrollView horizontal showsHorizontalScrollIndicator={false}>
            {marts.map((mart, index) => (
              <MartItem key={index}>
                <MartCircle style={{ backgroundColor: mart.color }}>
                  <MartInitial>{mart.initial}</MartInitial>
                </MartCircle>
                <MartLabel>{mart.label}</MartLabel>
              </MartItem>
            ))}
          </MartScrollView>
        </MartSection>

        <Divider />

        {/* Promotion Banner */}
        <PromoBanner>
          <PromoBannerInner>
            <PromoText>2025년 마지막 최대 할인</PromoText>
            <PromoHighlight>매일 최대 8,000원 혜택!</PromoHighlight>
          </PromoBannerInner>
        </PromoBanner>

        {/* Bottom Spacing for Tab Bar */}
        <BottomSpacer />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <BottomTabBar>
        <TabBarItem isActive>
          <Ionicons name="home" size={24} color={MINT} />
          <TabBarLabel isActive>홈</TabBarLabel>
        </TabBarItem>
        <TabBarItem>
          <Ionicons name="storefront-outline" size={24} color="#999" />
          <TabBarLabel>장보기·쇼핑</TabBarLabel>
        </TabBarItem>
        <TabBarItem>
          <Ionicons name="heart-outline" size={24} color="#999" />
          <TabBarLabel>찜</TabBarLabel>
        </TabBarItem>
        <TabBarItem>
          <Ionicons name="receipt-outline" size={24} color="#999" />
          <TabBarLabel>주문내역</TabBarLabel>
        </TabBarItem>
        <TabBarItem onPress={() => router.push('/mypage')}>
          <Ionicons name="person-outline" size={24} color="#999" />
          <TabBarLabel>마이배민</TabBarLabel>
        </TabBarItem>
      </BottomTabBar>
    </Container>
  );
}

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const MintSection = styled.View`
  background-color: ${MINT};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
`;

const AddressContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const AddressText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

const HeaderIcons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const IconButton = styled.Pressable`
  padding: 4px;
`;

const SearchContainer = styled.View`
  margin: 0 16px 16px 16px;
  position: relative;
`;

const SearchInput = styled.TextInput`
  background-color: #fff;
  border-radius: 24px;
  padding: 14px 48px 14px 16px;
  font-size: 14px;
`;

const SearchIconContainer = styled.View`
  position: absolute;
  right: 16px;
  top: 0;
  bottom: 0;
  justify-content: center;
`;

const EventBanner = styled.View`
  margin: 0 16px 16px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const EventTextContainer = styled.View`
  flex: 1;
`;

const EventTitle = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const EventSubtitle = styled.Text`
  color: #000;
  font-size: 15px;
  margin-bottom: 12px;
`;

const ClubButton = styled.Pressable`
  background-color: #000;
  padding: 10px 14px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  gap: 4px;
`;

const ClubButtonText = styled.Text`
  color: #fff;
  font-size: 13px;
  font-weight: 600;
`;

const CouponPlaceholder = styled.View`
  width: 80px;
  height: 90px;
  justify-content: center;
  align-items: center;
`;

const CouponBox = styled.View`
  width: 70px;
  height: 80px;
  background-color: #E8F5F5;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

const TabContainer = styled.View`
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const TabItem = styled.Pressable`
  padding: 16px 20px;
  position: relative;
`;

const TabText = styled.Text<{ isActive?: boolean }>`
  font-size: 16px;
  font-weight: ${(props: { isActive?: boolean }) => (props.isActive ? '700' : '400')};
  color: ${(props: { isActive?: boolean }) => (props.isActive ? '#000' : '#999')};
`;

const TabUnderline = styled.View`
  position: absolute;
  bottom: 0;
  left: 16px;
  right: 16px;
  height: 3px;
  background-color: #000;
`;

const CategorySection = styled.View`
  padding: 24px 16px 8px 16px;
`;

const CategoryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CategoryItem = styled.Pressable`
  width: ${CATEGORY_ITEM_WIDTH}px;
  align-items: center;
`;

const CategoryEmojiBox = styled.View`
  width: 56px;
  height: 56px;
  background-color: #f5f5f5;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const CategoryEmoji = styled.Text`
  font-size: 32px;
`;

const CategoryLabel = styled.Text`
  font-size: 12px;
  color: #333;
  text-align: center;
`;

const MoreLink = styled.Pressable`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 4px;
`;

const MoreLinkText = styled.Text`
  font-size: 14px;
  color: #666;
  text-decoration-line: underline;
`;

const Divider = styled.View`
  height: 10px;
  background-color: #f5f5f5;
`;

const MartSection = styled.View`
  padding: 24px 0;
`;

const MartScrollView = styled.ScrollView`
  padding-left: 16px;
`;

const MartItem = styled.Pressable`
  align-items: center;
  margin-right: 20px;
`;

const MartCircle = styled.View`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const MartInitial = styled.Text`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
`;

const MartLabel = styled.Text`
  font-size: 12px;
  color: #333;
  text-align: center;
`;

const PromoBanner = styled.View`
  margin: 16px;
  border-radius: 12px;
  overflow: hidden;
`;

const PromoBannerInner = styled.View`
  background-color: #1a472a;
  padding: 28px 20px;
  align-items: center;
`;

const PromoText = styled.Text`
  color: #fff;
  font-size: 15px;
  margin-bottom: 6px;
`;

const PromoHighlight = styled.Text`
  color: #ffd700;
  font-size: 22px;
  font-weight: 700;
`;

const BottomSpacer = styled.View`
  height: 100px;
`;

const BottomTabBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #eee;
  padding-bottom: 24px;
  padding-top: 8px;
`;

const TabBarItem = styled.Pressable<{ isActive?: boolean }>`
  flex: 1;
  align-items: center;
  padding: 8px 0;
`;

const TabBarLabel = styled.Text<{ isActive?: boolean }>`
  font-size: 11px;
  margin-top: 4px;
  color: ${(props: { isActive?: boolean }) => (props.isActive ? MINT : '#999')};
`;
