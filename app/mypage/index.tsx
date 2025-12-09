import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import styled from '@emotion/native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';

export default function MypageScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Container>
        <Header>
          <HeaderTitle>마이배민</HeaderTitle>
          <HeaderIcons>
            <IconButton>
              <MaterialCommunityIcons name="headset" size={26} color="black" />
            </IconButton>
            <IconButton style={{ marginLeft: 16 }}>
              <Ionicons name="settings-outline" size={26} color="black" />
            </IconButton>
          </HeaderIcons>
        </Header>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 2. Feedback Banner (Look like search bar) */}
          <View style={{ paddingHorizontal: 16, marginTop: 10, marginBottom: 20 }}>
            <FeedbackBanner>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="help-circle-outline" size={18} color="#666" style={{ marginRight: 6 }} />
                <FeedbackText>배민의 음식주문 경험, 어떠셨나요?</FeedbackText>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#999" />
            </FeedbackBanner>
          </View>

          {/* 3. Profile Section */}
          <ProfileSection>
            <AvatarContainer>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' }}
                style={{ width: 60, height: 60, resizeMode: 'contain' }}
              />
              <SparkleIcon style={{ top: 0, right: -10 }}>✨</SparkleIcon>
              <SparkleIcon style={{ bottom: 0, left: -10 }}>✨</SparkleIcon>
            </AvatarContainer>
            <ProfileNameRow>
              <ProfileName>황가네</ProfileName>
              <MaterialCommunityIcons name="pencil" size={14} color="#ccc" style={{ marginLeft: 4 }} />
            </ProfileNameRow>
            <StickerButton>
              <StickerButtonText>스티커 붙이기</StickerButtonText>
            </StickerButton>
          </ProfileSection>

          {/* 4. Baemin Club + TVING Banner */}
          <Section>
            <ClubBanner>
              <ClubHeader>
                <ClubLogoRow>
                  <MaterialCommunityIcons name="plus-box" size={18} color="#2AC1BC" style={{ marginRight: 2 }} />
                  <ClubLogoText>배민클럽</ClubLogoText>
                  <Text style={{ marginHorizontal: 6, color: '#e0e0e0', fontSize: 12 }}>|</Text>
                  <TvingLogoText>TVING</TvingLogoText>
                  <Text style={{ fontSize: 13, fontWeight: '700', marginLeft: 6 }}>할인 중</Text>
                </ClubLogoRow>
                <Ionicons name="chevron-forward" size={16} color="#999" />
              </ClubHeader>

              <ClubContent>
                <ClubTitle>4,990원에 무료배달+콘텐츠까지!</ClubTitle>
                <ClubSubtitle>
                  지금만 가입 즉시 <Text style={{ color: '#2AC1BC', fontWeight: 'bold' }}>4,990원</Text> 포인트 드려요
                </ClubSubtitle>
                <ClubButton>
                  <ClubButtonText>혜택 받고 가입하기</ClubButtonText>
                </ClubButton>
              </ClubContent>
            </ClubBanner>
          </Section>

          {/* 5. Assets Section */}
          <Section style={{ paddingHorizontal: 0 }}>
            <AssetGroup>
              <AssetItem>
                <AssetLeft>
                  <AssetIconContainer>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1063/1063376.png' }} style={{ width: 22, height: 22, tintColor: '#8A2BE2' }} />
                  </AssetIconContainer>
                  <AssetText>쿠폰함</AssetText>
                </AssetLeft>
                <AssetRight>
                  <AssetValue>0장</AssetValue>
                  <Ionicons name="chevron-forward" size={14} color="#bbb" />
                </AssetRight>
              </AssetItem>
              <AssetDivider />
              <AssetItem>
                <AssetLeft>
                  <AssetIconContainer>
                    <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFD700', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>P</Text>
                    </View>
                  </AssetIconContainer>
                  <AssetText>포인트</AssetText>
                </AssetLeft>
                <AssetRight>
                  <AssetValue>0원</AssetValue>
                  <Ionicons name="chevron-forward" size={14} color="#bbb" />
                </AssetRight>
              </AssetItem>
              <AssetDivider />
              <AssetItem>
                <AssetLeft>
                  <AssetIconContainer>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4539/4539428.png' }} style={{ width: 22, height: 22, tintColor: '#00C7AE' }} />
                  </AssetIconContainer>
                  <AssetText>선물함</AssetText>
                </AssetLeft>
                <AssetRight>
                  <AssetValue>0원</AssetValue>
                  <Ionicons name="chevron-forward" size={14} color="#bbb" />
                </AssetRight>
              </AssetItem>
              <AssetDivider />
              <AssetItem>
                <AssetLeft>
                  <AssetIconContainer>
                    <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: '#FFA500', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}>Pay</Text>
                    </View>
                  </AssetIconContainer>
                  <View style={{ marginLeft: 0 }}>
                    <AssetText>배민페이</AssetText>
                    <AssetSubText>머니로 결제하면 배민포인트 적립</AssetSubText>
                  </View>
                </AssetLeft>
                <AssetRight>
                  <AssetValue>결제수단 관리</AssetValue>
                  <Ionicons name="chevron-forward" size={14} color="#bbb" />
                </AssetRight>
              </AssetItem>
            </AssetGroup>
          </Section>

          <DividerBar />

          {/* 6. Menu List 1 */}
          <Section>
            <MenuItem icon="chatbubble-outline" text="리뷰관리" />
            <MenuItem icon="location-outline" text="주소관리" />
            <MenuItem icon="restaurant-outline" text="배민취향" />
            <MenuItem icon="people-outline" text="가족계정" />
            <MenuItem icon="flash-outline" text="배민클럽" isLast />
          </Section>

          <DividerBar />

          {/* 7. Event Banner */}
          <Section style={{ paddingVertical: 10 }}>
            <EventBanner>
              <View>
                <Text style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>독거 어르신 힘이 되어주고</Text>
                <EventBannerTitle>배달의민족 2만원{'\n'}상품권 받기</EventBannerTitle>
              </View>
              <EventButton>
                <EventButtonText>보러가기</EventButtonText>
                <Ionicons name="chevron-forward" size={10} color="#fff" />
              </EventButton>
            </EventBanner>
          </Section>

          {/* 8. Event/Benefit Menu List */}
          <Section>
            <MenuItem iconName="shield-check-outline" iconType="MCI" text="진행중인 이벤트" />
            <MenuItem iconName="gift-outline" iconType="MCI" text="혜택 모아보기" />
            <MenuItem iconName="alpha-p-circle-outline" iconType="MCI" text="배민포인트 모으기" />
            <MenuItem iconName="credit-card-outline" iconType="MCI" text="배민 신한카드 받친구" />
            <MenuItem iconName="sandwich" iconType="MCI" text="샌드위치 쌓고 쿠폰 받기" isLast />
          </Section>

          <DividerBar />

          {/* 9. Service Grid */}
          <ServiceGrid>
            <ServiceRow>
              <ServiceItem icon="moped" iconType="MCI" text="배민커넥트" badge="최대 12만원" badgeColor="#8A2BE2" />
              <ServiceItem icon="gift" iconType="MCI" text="선물하기" />
              <ServiceItem icon="bullhorn" iconType="MCI" text="배민이야기" />
              <ServiceItem icon="clipboard-text" iconType="MCI" text="배민리서치" badge="3만원" badgeColor="#444" />
            </ServiceRow>
            <ServiceRow style={{ marginTop: 24 }}>
              <ServiceItem icon="leaf" iconType="MCI" text="배민그린" iconColor="#00C7AE" />
              <ServiceItem icon="food-takeout-box" iconType="MCI" text="배민도시락" />
              <ServiceItem icon="book-open-page-variant" iconType="MCI" text="배민사용법" />
              <ServiceItem icon="handshake" iconType="MCI" text="함께가치" />
            </ServiceRow>
          </ServiceGrid>

          <DividerBar />

          {/* 10. Bottom Menu List */}
          <View style={{ paddingBottom: 60 }}>
            <BottomMenuItem text="고객센터" onPress={() => router.push('/mypage/support')} />
            <BottomMenuItem text="자주 묻는 질문" />
            <BottomMenuItem text="공지사항" />
            <BottomMenuItem text="약관 및 정책" />
            <VersionItem>
              <VersionText>현재 버전 15.18.1</VersionText>
            </VersionItem>
          </View>
        </ScrollView>
      </Container>
    </>
  );
}

// Components
const MenuItem = ({ icon, iconName, iconType, text, isLast }: { icon?: keyof typeof Ionicons.glyphMap, iconName?: string, iconType?: 'MCI', text: string, isLast?: boolean }) => (
  <SimpleMenuItem style={!isLast && { borderBottomWidth: 1, borderBottomColor: '#f9f9f9' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <IconBox>
        {iconType === 'MCI' ? (
          <MaterialCommunityIcons name={iconName as any || icon as any} size={24} color="#333" />
        ) : (
          <Ionicons name={icon as any} size={24} color="#333" />
        )}
      </IconBox>
      <MenuText>{text}</MenuText>
    </View>
    <Ionicons name="chevron-forward" size={16} color="#ddd" />
  </SimpleMenuItem>
);

const ServiceItem = ({ icon, iconType, text, badge, badgeColor, iconColor }: { icon: string, iconType?: 'MCI', text: string, badge?: string, badgeColor?: string, iconColor?: string }) => (
  <ServiceItemContainer>
    <ServiceIconCircle>
      {iconType === 'MCI' ? (
        <MaterialCommunityIcons name={icon as any} size={28} color={iconColor || '#333'} />
      ) : (
        <Ionicons name={icon as any} size={28} color={iconColor || '#333'} />
      )}
    </ServiceIconCircle>
    {badge && (
      <Badge style={badgeColor ? { backgroundColor: badgeColor } : {}}>
        <BadgeText>{badge}</BadgeText>
      </Badge>
    )}
    <ServiceText>{text}</ServiceText>
  </ServiceItemContainer>
);

const BottomMenuItem = ({ text, onPress }: { text: string, onPress?: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <BottomMenuRow>
      <BottomMenuText>{text}</BottomMenuText>
      <Ionicons name="chevron-forward" size={16} color="#ccc" />
    </BottomMenuRow>
  </TouchableOpacity>
);

// Styles
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  background-color: #fff;
  height: 56px;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #000;
`;

const HeaderIcons = styled.View`
  flex-direction: row;
`;

const IconButton = styled.TouchableOpacity``;

const Section = styled.View`
  padding: 0 16px;
`;

const FeedbackBanner = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #F0F0F0; /* Slightly darker/more neutral gray */
  padding: 14px 16px;
  border-radius: 24px; /* More rounded like search bar */
`;

const FeedbackText = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: #555;
`;

const ProfileSection = styled.View`
  align-items: center;
  margin: 10px 0 30px;
`;

const AvatarContainer = styled.View`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: #eee;
  position: relative;
`;

const SparkleIcon = styled.Text`
  position: absolute;
  font-size: 16px;
`;

const ProfileNameRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ProfileName = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #000;
`;

const StickerButton = styled.TouchableOpacity`
  padding: 5px 12px;
  background-color: #f6f6f6;
  border-radius: 16px;
`;

const StickerButtonText = styled.Text`
  font-size: 12px;
  color: #666;
  font-weight: 500;
`;

const ClubBanner = styled.View`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px 24px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  elevation: 3;
  margin-bottom: 24px;
  border-width: 1px;
  border-color: #f7f7f7;
`;

const ClubHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ClubLogoRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ClubLogoText = styled.Text`
  font-size: 15px;
  font-weight: 900;
  color: #2AC1BC;
`;

const TvingLogoText = styled.Text`
  font-size: 15px;
  font-weight: 900;
  color: #ff153c;
`;

const ClubContent = styled.View``;

const ClubTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin-bottom: 4px;
  letter-spacing: -0.5px;
`;

const ClubSubtitle = styled.Text`
  font-size: 13px;
  color: #333;
  margin-bottom: 20px;
  letter-spacing: -0.3px;
`;

const ClubButton = styled.TouchableOpacity`
  background-color: #1a1a1a;
  padding: 10px 16px;
  border-radius: 24px;
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
`;

const ClubButtonText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 13px;
`;

/* Assets */
const AssetGroup = styled.View`
  padding: 0 16px;
`;

const AssetItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const AssetLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AssetIconContainer = styled.View`
  width: 24px;
  align-items: center;
  margin-right: 12px;
`;

const AssetText = styled.Text`
  font-size: 16px;
  color: #111;
  font-weight: 600;
`;

const AssetSubText = styled.Text`
  font-size: 12px;
  color: #999;
  margin-top: 1px;
`;

const AssetRight = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AssetValue = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin-right: 8px;
`;

const AssetDivider = styled.View`
  height: 1px;
  background-color: #f4f4f4;
  margin-left: 36px;
`;

const DividerBar = styled.View`
  height: 10px;
  background-color: #F4F6F8;
  margin-bottom: 0px;
  margin-top: 10px;
`;

const SimpleMenuItem = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
`;

const IconBox = styled.View`
  width: 32px;
  align-items: flex-start;
  margin-right: 0px;
`;

const MenuText = styled.Text`
  font-size: 16px;
  color: #222;
  font-weight: 600;
`;

const EventBanner = styled.View`
  background-color: #E6F7F6;
  height: 120px;
  border-radius: 12px;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  overflow: hidden;
`;

const EventBannerTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #222;
  line-height: 24px;
`;

const EventButton = styled.View`
  background-color: rgba(0,0,0,0.7);
  padding: 6px 12px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
`;

const EventButtonText = styled.Text`
  font-size: 11px;
  color: #fff;
  font-weight: 600;
  margin-right: 2px;
`;

const ServiceGrid = styled.View`
  padding: 24px 16px 32px 16px;
`;

const ServiceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ServiceItemContainer = styled.TouchableOpacity`
  align-items: center;
  width: 23%;
`;

const ServiceIconCircle = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: #F5F6F8;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
`;

const ServiceText = styled.Text`
  font-size: 11px;
  color: #333;
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.3px;
`;

const Badge = styled.View`
  position: absolute;
  top: -6px;
  right: -2px;
  background-color: #8A2BE2;
  padding: 3px 6px;
  border-radius: 6px;
  z-index: 10;
`;

const BadgeText = styled.Text`
  color: #fff;
  font-size: 9px;
  font-weight: 700;
`;

const BottomMenuRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px;
`;

const BottomMenuText = styled.Text`
  font-size: 15px;
  color: #333;
  font-weight: 500;
`;

const VersionItem = styled.View`
  padding: 16px 16px;
  margin-top: 0px;
`;

const VersionText = styled.Text`
  color: #999;
  font-size: 13px;
`;
