import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Pressable, StatusBar as RNStatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styled from '@emotion/native';
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StoreInfoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('알뜰배달');
  const [isOriginExpanded, setIsOriginExpanded] = useState(false);
  const [isNotifyExpanded, setIsNotifyExpanded] = useState(true);

  return (
    <Container>
      <RNStatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* 1. Header */}
      <Header style={{ paddingTop: insets.top }}>
        <HeaderLeft onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </HeaderLeft>
        <HeaderTitle>가게정보·원산지</HeaderTitle>
        <HeaderRight>
          <Ionicons name="cart-outline" size={24} color="#000" />
        </HeaderRight>
      </Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>

        {/* 2. Store Notification Section */}
        <Section>
          <SectionHeader>
            <SectionTitle>가게 알림</SectionTitle>
          </SectionHeader>
          <NotifyContent>
            <NotifyTitle>리뷰이벤트 어떻게 신청 가능하나요?</NotifyTitle>
            <NotifyText>1. 메인화면 상단에 찜 버튼을 꾹 눌러주세요:)</NotifyText>
            <NotifyText>2. 메뉴를 선택하시고 리뷰옵션에서 원하시는 리뷰 선택!!</NotifyText>
            <NotifyText>3. 음식을 받으신 뒤 사진을 찰칵~ 찰칵~</NotifyText>
            <NotifyText>4. 맛있게 드세요:)</NotifyText>
            <NotifyText>5. 다 드신 후 별점 5점과 포토리뷰로 작성해주시면됩니다!!</NotifyText>
          </NotifyContent>
          <ExpandButton onPress={() => setIsNotifyExpanded(!isNotifyExpanded)}>
            <Ionicons name={isNotifyExpanded ? "chevron-up" : "chevron-down"} size={20} color="#ccc" />
          </ExpandButton>
        </Section>

        <Divider />

        {/* 3. Store Statistics Section */}
        <Section>
          <SectionHeader>
            <SectionTitle>가게 통계</SectionTitle>
            <Ionicons name="help-circle-outline" size={18} color="#999" style={{ marginLeft: 4 }} />
          </SectionHeader>

          <StatRow>
            <StatLabel>최근 주문수</StatLabel>
            <StatValue>900+</StatValue>
          </StatRow>
          <StatRow>
            <StatLabel>전체 리뷰수</StatLabel>
            <StatValue>277</StatValue>
          </StatRow>
          <StatRow style={{ borderBottomWidth: 0 }}>
            <StatLabel>찜</StatLabel>
            <StatValue>219</StatValue>
          </StatRow>
        </Section>

        <Divider />

        {/* 4. Delivery Info Section */}
        <Section>
          <SectionHeader>
            <SectionTitle>배달 안내</SectionTitle>
          </SectionHeader>

          <TabContainer>
            <TabButton active={activeTab === '알뜰배달'} onPress={() => setActiveTab('알뜰배달')}>
              <TabText active={activeTab === '알뜰배달'}>알뜰배달</TabText>
            </TabButton>
            <TabButton active={activeTab === '가게배달'} onPress={() => setActiveTab('가게배달')}>
              <TabText active={activeTab === '가게배달'}>가게배달</TabText>
            </TabButton>
          </TabContainer>

          <DeliveryDescBox>
            <DeliveryDescTitle>알뜰배달은 배달팁 부담이 적고, 근처 주문을 함께 배달해요</DeliveryDescTitle>
            <Ionicons name="information-circle-outline" size={14} color="#999" />
          </DeliveryDescBox>

          <DeliveryTags>
            <DeliveryTag>
              <Text style={{ fontSize: 11, color: '#666' }}>배민 직접배달</Text>
            </DeliveryTag>
            <DeliveryTag>
              <Ionicons name="location-outline" size={12} color="#666" style={{ marginRight: 2 }} />
              <Text style={{ fontSize: 11, color: '#666' }}>위치 확인 가능</Text>
            </DeliveryTag>
          </DeliveryTags>

          <TableTitle>주문금액별 총 배달팁</TableTitle>
          <DeliveryTable>
            <DeliveryTableRow>
              <DeliveryTableLeft>5,000원 이상</DeliveryTableLeft>
              <DeliveryTableRight>4,800원</DeliveryTableRight>
            </DeliveryTableRow>
          </DeliveryTable>

          <DisclaimerText>
            • 배달예상시간은 수행한 배달 데이터를 학습하여 예측합니다. 거리별 배달예상시간, 시간별 배달현황, 가게별 준비시간, 라이더의 운행시간을 고려하여 예측합니다. 기상 상항의 변화와 주문량 증가 등과 같은 배달시간에 영향을 주는 상황도 반영하고 있습니다.
          </DisclaimerText>
          <DisclaimerText>
            • 거리, 시간대, 지역, 배달방식, 할인, 배민클럽 혜택, 시장님이 설정하는 요금제 등에 따라 배달팁이 달라져요.
          </DisclaimerText>
          <DisclaimerText>
            • 주문금액별 배달팁 외 추가 배달팁이 있는 경우 포함된 금액이에요.
          </DisclaimerText>
        </Section>

        <Divider />

        {/* 5. Business Info Section */}
        <Section>
          <SectionHeader>
            <SectionTitle>사업자 정보</SectionTitle>
          </SectionHeader>

          <InfoRow>
            <InfoLabel>대표자명</InfoLabel>
            <InfoValue>구본민</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>상호명</InfoLabel>
            <InfoValue>올데이 비빔밥&익마의 곱도리탕&소금창대가&대창을 품은 떡볶이</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>사업자주소</InfoLabel>
            <InfoValue>경상남도 김해시 내동 134-1 (내동) 위 주소는 사업자등록증에 표기된 정보입니다</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>사업자등록번호</InfoLabel>
            <InfoValue>665-60-01077</InfoValue>
          </InfoRow>
        </Section>

        <Divider />

        {/* 6. Origin Info Section */}
        <Section>
          <SectionHeader>
            <SectionTitle>원산지 표기</SectionTitle>
          </SectionHeader>
          <OriginText numberOfLines={isOriginExpanded ? undefined : 8}>
            밀 미국산, 호주산 섞음 / 스팸김치덮밥 김치 : (배추 국내산, 고추가루 국내산) 계란 : 국내산 콩나물 : 중국산 쌀 : 국내산 스팸 : 돼지고기 (수입산, 국산 섞음) 김치전 : 김치(배추 중국산, 고추가루 중국산) 꿔바로우 : 돼지고기 국내산 수제지 : 닭고기 국내산 우동면 : 밀가루 호주산 떡 : 밀가루 (미국산 호주산 섞음) 양파 : 중국산 새송이버섯 : 중국산 / 맛감자 : 감자 중국산 / 시킨베이컨 : 닭고기 국내산 / 고구마고로케 : 중국산 / 새우감자고로케 : 중국산 / 버팔로윙 : 태국산 / 버팔로봉 : 닭고기 태국산 / 치킨가라아게 : 닭다리살 브라질산 / 새우튀김 : 베트남산 / 치즈볼 : 미국, 독일, 호주산 섞음 / 등심돈까스 : 돼지고기 브라질산 / 생선까스 : 대구살 중국산, 네덜란드산 섞음 / 베이컨 : 앞다리살 미국산 / 치즈 : 모짜렐라치즈 외국산(독일, 미국, 오스트리아 섞음) / 부추 : 중국산 / 오징어 : 외국산 / 순대 : 당면 중국산...
          </OriginText>
          <ExpandButton onPress={() => setIsOriginExpanded(!isOriginExpanded)}>
            <Ionicons name={isOriginExpanded ? "chevron-up" : "chevron-down"} size={20} color="#ccc" />
          </ExpandButton>
        </Section>

      </ScrollView>
    </Container>
  );
}

// Styles
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
  padding-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  background-color: #fff;
`;

const HeaderLeft = styled.TouchableOpacity`
  padding: 4px;
`;

const HeaderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

const HeaderRight = styled.TouchableOpacity`
  padding: 4px;
`;

const Divider = styled.View`
  height: 8px;
  background-color: #f0f0f0;
`;

const Section = styled.View`
  padding: 20px;
`;

const SectionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #000;
`;

const NotifyContent = styled.View`
  margin-bottom: 12px;
`;

const NotifyTitle = styled.Text`
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
`;

const NotifyText = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 22px;
`;

const ExpandButton = styled.TouchableOpacity`
  align-items: center;
  padding-vertical: 8px;
`;

const StatRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 12px;
`;

const StatLabel = styled.Text`
  font-size: 15px;
  color: #333;
`;

const StatValue = styled.Text`
  font-size: 15px;
  color: #333;
`;

const TabContainer = styled.View`
  flex-direction: row;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 16px;
`;

const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  flex: 1;
  padding-vertical: 8px;
  align-items: center;
  border-radius: 6px;
  background-color: ${props => props.active ? '#fff' : 'transparent'};
  shadow-color: ${props => props.active ? '#000' : 'transparent'};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: ${props => props.active ? 2 : 0};
`;

const TabText = styled.Text<{ active: boolean }>`
  font-size: 14px;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#000' : '#888'};
`;

const DeliveryDescBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
`;

const DeliveryDescTitle = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: #333;
  margin-right: 4px;
`;

const DeliveryTags = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 20px;
`;

const DeliveryTag = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-color: #eee;
  padding-horizontal: 6px;
  padding-vertical: 4px;
  border-radius: 4px;
`;

const TableTitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const DeliveryTable = styled.View`
  border-width: 1px;
  border-color: #ddd;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const DeliveryTableRow = styled.View`
  flex-direction: row;
`;

const DeliveryTableLeft = styled.Text`
  flex: 1;
  padding: 10px;
  font-size: 13px;
  color: #333;
  border-right-width: 1px;
  border-right-color: #ddd;
`;

const DeliveryTableRight = styled.Text`
  width: 100px;
  padding: 10px;
  font-size: 13px;
  color: #333;
  text-align: right;
`;

const DisclaimerText = styled.Text`
  font-size: 12px;
  color: #888;
  line-height: 18px;
  margin-bottom: 8px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

const InfoLabel = styled.Text`
  width: 100px;
  font-size: 14px;
  color: #666;
`;

const InfoValue = styled.Text`
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: 20px;
`;

const OriginText = styled.Text`
  font-size: 13px;
  color: #555;
  line-height: 20px;
`;
