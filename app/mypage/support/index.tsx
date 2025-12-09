import React from 'react';
import { ScrollView, Pressable, TextInput } from 'react-native';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FAQ_TAGS = [
  '배민클럽',
  '취소',
  '배달 현황',
  '배달완료 미수령',
  '메뉴 누락',
  '음식 파손',
  '다른 음식 배달',
  '배달 수령방식 변경',
  '가게 연락처 확인',
  '수저포크 요청',
];

export default function SupportScreen() {
  const router = useRouter();

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <HeaderSection>
          <Greeting>
            <UserName>황가네</UserName>
            <NormalText>님</NormalText>
          </Greeting>
          <SubTitle>무엇을 도와드릴까요?</SubTitle>
        </HeaderSection>

        {/* Search */}
        <SearchSection>
          <SearchInputWrapper>
            <SearchInput
              placeholder="궁금한 점을 검색해 보세요"
              placeholderTextColor="#999"
            />
            <SearchIcon>
              <Ionicons name="search" size={24} color="#333" />
            </SearchIcon>
          </SearchInputWrapper>
        </SearchSection>

        {/* FAQ Tags */}
        <FAQSection>
          <FAQHeader>
            <FAQTitle>자주 묻는 질문</FAQTitle>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </FAQHeader>
          <TagsContainer>
            {FAQ_TAGS.map((tag, index) => (
              <TagButton key={index}>
                <TagText>{tag}</TagText>
              </TagButton>
            ))}
          </TagsContainer>
        </FAQSection>

        {/* Support Options */}
        <SupportSection>
          {/* Chat Support */}
          <SupportItem onPress={() => { }}>
            <SupportItemLeft>
              <SupportTitle>채팅 상담</SupportTitle>
              <Badge>
                <BadgeText>연결이 원활해요</BadgeText>
              </Badge>
            </SupportItemLeft>
            <SupportSubText>
              취소, 배달현황, 오배달 상담은 상담사 연결없이 가능해요
            </SupportSubText>
            <ChevronWrapper>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </ChevronWrapper>
          </SupportItem>

          {/* Phone Support */}
          <SupportItem onPress={() => { }}>
            <SupportItemLeft>
              <SupportTitle>전화 상담</SupportTitle>
              <Badge>
                <BadgeText>연결이 원활해요</BadgeText>
              </Badge>
            </SupportItemLeft>
            <ChevronWrapper>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </ChevronWrapper>
          </SupportItem>

          {/* AI Chatbot Support */}
          <SupportItem onPress={() => router.push('/mypage/support/chatbot')}>
            <SupportItemLeft>
              <SupportTitle>AI 챗봇 상담</SupportTitle>
              <MintBadge>
                <MintBadgeText>24시간</MintBadgeText>
              </MintBadge>
            </SupportItemLeft>
            <SupportSubText>AI가 빠르게 답변해드려요</SupportSubText>
            <ChevronWrapper>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </ChevronWrapper>
          </SupportItem>
        </SupportSection>

        {/* Divider */}
        <Divider />

        {/* Other Options */}
        <OtherSection>
          <OtherItem onPress={() => { }}>
            <OtherItemText>안전거래센터 신고</OtherItemText>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </OtherItem>

          <OtherItem onPress={() => { }}>
            <OtherItemText>약관 및 정책</OtherItemText>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </OtherItem>
        </OtherSection>
      </ScrollView>
    </Container>
  );
}

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const HeaderSection = styled.View`
  padding: 20px 16px 16px;
`;

const Greeting = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const UserName = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #2ac1bc;
`;

const NormalText = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #000;
`;

const SubTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #000;
  margin-top: 4px;
`;

const SearchSection = styled.View`
  padding: 0 16px 20px;
`;

const SearchInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 25px;
  padding: 0 16px;
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  height: 48px;
  font-size: 15px;
  color: #333;
`;

const SearchIcon = styled.View`
  padding-left: 8px;
`;

const FAQSection = styled.View`
  padding: 0 16px 20px;
`;

const FAQHeader = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const FAQTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #000;
`;

const TagsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagButton = styled(Pressable)`
  background-color: #f5f5f5;
  padding: 10px 16px;
  border-radius: 20px;
`;

const TagText = styled.Text`
  font-size: 14px;
  color: #333;
`;

const SupportSection = styled.View`
  padding: 0 16px;
`;

const SupportItem = styled(Pressable)`
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  position: relative;
`;

const SupportItemLeft = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

const SupportTitle = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: #000;
  margin-right: 8px;
`;

const Badge = styled.View`
  background-color: #3182F6;
  padding: 4px 8px;
  border-radius: 4px;
`;

const BadgeText = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: #fff;
`;

const MintBadge = styled.View`
  background-color: #2ac1bc;
  padding: 4px 8px;
  border-radius: 4px;
`;

const MintBadgeText = styled.Text`
  font-size: 11px;
  font-weight: 600;
  color: #fff;
`;

const SupportSubText = styled.Text`
  font-size: 13px;
  color: #888;
  padding-right: 30px;
`;

const ChevronWrapper = styled.View`
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -10px;
`;

const Divider = styled.View`
  height: 8px;
  background-color: #f5f5f5;
  margin-top: 8px;
`;

const OtherSection = styled.View`
  padding: 0 16px;
`;

const OtherItem = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const OtherItemText = styled.Text`
  font-size: 16px;
  color: #000;
`;
