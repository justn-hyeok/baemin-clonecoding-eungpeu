import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import styled from '@emotion/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MypageScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Header>
        <HeaderTitle>마이배민</HeaderTitle>
        <HeaderIcons>
          <IconButton onPress={() => router.push('/mypage/support')}>
            <MaterialCommunityIcons name="headset" size={26} color="black" />
          </IconButton>
          <IconButton style={{ marginLeft: 16 }}>
            <Ionicons name="settings-outline" size={26} color="black" />
          </IconButton>
        </HeaderIcons>
      </Header>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Feedback Banner */}
        <View style={{ paddingHorizontal: 16, marginTop: 10, marginBottom: 20 }}>
          <FeedbackBanner>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="help-circle-outline" size={18} color="#666" style={{ marginRight: 6 }} />
              <FeedbackText>배민의 음식주문 경험, 어떠셨나요?</FeedbackText>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#999" />
          </FeedbackBanner>
        </View>

        {/* Profile Section */}
        <ProfileSection>
          <AvatarContainer>
            <Text style={{ fontSize: 40 }}>🐑</Text>
            <SparkleIcon style={{ top: 0, right: -10 }}>✨</SparkleIcon>
            <SparkleIcon style={{ bottom: 0, left: -10 }}>✨</SparkleIcon>
          </AvatarContainer>
          <ProfileNameRow>
            <ProfileName>서명균</ProfileName>
            <MaterialCommunityIcons name="pencil" size={14} color="#ccc" style={{ marginLeft: 4 }} />
          </ProfileNameRow>
          <StickerButton>
            <StickerButtonText>스티커 붙이기</StickerButtonText>
          </StickerButton>
        </ProfileSection>

        {/* Baemin Club + TVING Banner */}
        <Section>
          <ClubBanner>
            <ClubHeader>
              <ClubLogoRow>
                <MaterialCommunityIcons name="plus-box" size={18} color="#2AC1BC" style={{ marginRight: 2 }} />
                <ClubLogoText>배민클럽</ClubLogoText>
                <Text style={{ marginHorizontal: 6, color: '#e0e0e0', fontSize: 12 }}>+</Text>
                <TvingLogoText>TVING</TvingLogoText>
                <Text style={{ fontSize: 13, fontWeight: '700', marginLeft: 6 }}>할인 중</Text>
              </ClubLogoRow>
              <Ionicons name="chevron-forward" size={16} color="#999" />
            </ClubHeader>

            <ClubContent>
              <ClubTitle>4,990원에 무료배달+콘텐츠까지!</ClubTitle>
              <ClubSubtitle>
                지금만 가입 즉시 <Text style={{ color: '#2AC1BC', fontWeight: '700' }}>4,990원</Text> 포인트 드려요
              </ClubSubtitle>
              <ClubButton>
                <ClubButtonText>혜택 받고 가입하기</ClubButtonText>
              </ClubButton>
            </ClubContent>
          </ClubBanner>
        </Section>

        {/* Assets Section */}
        <Section style={{ paddingHorizontal: 0 }}>
          <AssetGroup>
            <AssetItem>
              <AssetLeft>
                <AssetIconContainer>
                  <Text style={{ fontSize: 20 }}>🎟️</Text>
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
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 14 }}>P</Text>
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
                  <Text style={{ fontSize: 20 }}>🎁</Text>
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
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 10 }}>Pay</Text>
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

        {/* Menu List */}
        <Section>
          <MenuItem icon="chatbubble-outline" text="리뷰관리" />
          <MenuItem icon="location-outline" text="주소관리" />
          <MenuItem icon="restaurant-outline" text="배민취향" />
          <MenuItem icon="alert-circle-outline" text="알레르기 설정" onPress={() => router.push('/mypage/allergy')} />
          <MenuItem icon="people-outline" text="가족계정" />
        </Section>

        <DividerBar />

        {/* Bottom Menu List */}
        <View style={{ paddingBottom: 60 }}>
          <BottomMenuItem text="고객센터" onPress={() => router.push('/mypage/support')} />
          <BottomMenuItem text="자주 묻는 질문" />
          <BottomMenuItem text="공지사항" />
          <BottomMenuItem text="약관 및 정책" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Components
const MenuItem = ({ icon, text, onPress }: { icon: keyof typeof Ionicons.glyphMap, text: string, onPress?: () => void }) => (
  <SimpleMenuItem onPress={onPress}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <IconBox>
        <Ionicons name={icon} size={24} color="#333" />
      </IconBox>
      <MenuText>{text}</MenuText>
    </View>
    <Ionicons name="chevron-forward" size={16} color="#ddd" />
  </SimpleMenuItem>
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
  background-color: #F0F0F0;
  padding: 14px 16px;
  border-radius: 24px;
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
  background-color: #FFF0F5;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
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
`;

const ClubSubtitle = styled.Text`
  font-size: 13px;
  color: #333;
  margin-bottom: 20px;
`;

const ClubButton = styled.TouchableOpacity`
  background-color: #1a1a1a;
  padding: 10px 16px;
  border-radius: 24px;
  align-self: flex-start;
`;

const ClubButtonText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 13px;
`;

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
  border-bottom-width: 1px;
  border-bottom-color: #f9f9f9;
`;

const IconBox = styled.View`
  width: 32px;
  align-items: flex-start;
`;

const MenuText = styled.Text`
  font-size: 16px;
  color: #222;
  font-weight: 600;
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
