import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Tabs, useRouter, useLocalSearchParams } from 'expo-router';
import styled from '@emotion/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useReviews } from '../../../src/hooks/useReviews';
import type { ReviewWithReplies } from '../../../src/types/database';

// --- Types ---
interface Reply {
  id: string;
  isOwner: boolean;
  author: string;
  date: string;
  content: string;
}

interface Review {
  id: string;
  author: string;
  reviewCount: number;
  avgRating: number;
  rating: number;
  date: string;
  deliveryMethod: string;
  content: string;
  menuTag: string;
  images: string[];
  replies: Reply[];
}

// --- Mock Data (Fallback) ---
const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    author: '밥문나',
    reviewCount: 748,
    avgRating: 4.2,
    rating: 5,
    date: '어제',
    deliveryMethod: '한집배달',
    content: '잘먹었습니다 감사합니다!',
    menuTag: '1인세트',
    images: [],
    replies: [
      {
        id: 'r1',
        isOwner: true,
        author: '사장님',
        date: '어제',
        content: '감사합니다, 밥문나님! 잘 드셨다니 제 심장도 콩팡콩팡 뛰네요. 이 맛에 장사합니다! 다음에도 늘 만족 드릴 수 있도록 힘내겠습니다!',
      },
    ],
  },
  {
    id: '2',
    author: '처이',
    reviewCount: 16,
    avgRating: 5.0,
    rating: 5,
    date: '3일 전',
    deliveryMethod: '알뜰배달',
    content: '맛있게 잘 먹었고 양이 진짜 많아요.',
    menuTag: '2인세트',
    images: ['https://via.placeholder.com/300'],
    replies: [
      {
        id: 'r2',
        isOwner: true,
        author: '사장님',
        date: '3일 전',
        content: '양이 많더니, 입도 배도 춤추는 순간이었겠군요!! 2인세트가 제 역할을 톡톡히 한 것 같아 기쁩니다. 기쁨 가득 담아 또 내심할 날을 기다리겠습니다 :)',
      },
      {
        id: 'r3', // Example user reply (though usually replies are nested differently, sticking to simple list for now as per "add user reply")
        isOwner: false,
        author: '저',
        date: '방금',
        content: '사장님 친절하시네요 ㅎㅎ',
      }
    ],
  },
  {
    id: '3',
    author: '냥냥',
    reviewCount: 35,
    avgRating: 4.8,
    rating: 4,
    date: '1주일 전',
    deliveryMethod: '가게배달',
    content: '맛있어요 근데 안심지원금 사용한다고 만나서결제했는데 결제가 안된다하시네요 ㅠ',
    menuTag: '인기모둠세트20p',
    images: ['https://via.placeholder.com/300'],
    replies: [
      {
        id: 'r3_owner',
        isOwner: true,
        author: '사장님',
        date: '1주일 전',
        content: '냥냥님, 안녕하세요 반갑습니다. 쑥민누 김해점 을 찾아주셔서 감사합니다. 민생지원금 결제 가능합니다 다른분들 모두 민생지원금 후불카드로 잘 하고계시는데 무슨이유인지 이해가 안되네요 기계로 연락주시면 자세히 안내해 드리겠습니다. 055-323-0110 기사분이 잘못알고 계신것같은데 누구인지 가게로 연락주시면 감사하겠습니다.',
      },
    ],
  },
  {
    id: '4',
    author: '놈놈',
    reviewCount: 256,
    avgRating: 5.0,
    rating: 5,
    date: '4개월 전',
    deliveryMethod: '가게배달',
    content: '만두 땡기면 여기서만 시켜먹어요',
    menuTag: '인기모둠세트20p',
    images: [],
    replies: [],
  },
];

// Convert Supabase review to display format
const toDisplayReview = (review: ReviewWithReplies): Review => ({
  id: review.id,
  author: review.user?.name || '익명',
  reviewCount: 0,
  avgRating: 4.5,
  rating: review.rating || 5,
  date: formatDate(review.created_at),
  deliveryMethod: '알뜰배달',
  content: review.content,
  menuTag: '',
  images: [],
  replies: (review.replies || []).map(reply => ({
    id: reply.id,
    isOwner: false, // Would need to check against store owner
    author: reply.user?.name || '익명',
    date: formatDate(reply.created_at),
    content: reply.content,
  })),
});

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return '오늘';
  if (diffDays === 1) return '어제';
  if (diffDays < 7) return `${diffDays}일 전`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주일 전`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}개월 전`;
  return `${Math.floor(diffDays / 365)}년 전`;
};

export default function StoreReviewsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [replyText, setReplyText] = useState('');
  const [replyingToReviewId, setReplyingToReviewId] = useState<string | null>(null);
  const [isNoticeExpanded, setIsNoticeExpanded] = useState(true);
  const [localReviews, setLocalReviews] = useState<Review[]>(MOCK_REVIEWS);

  // Fetch reviews from Supabase
  const { reviews: supabaseReviews, loading, addReply: supabaseAddReply } = useReviews(id || '');

  // Use Supabase data if available, otherwise fallback to local mock data
  const displayReviews: Review[] = supabaseReviews.length > 0
    ? supabaseReviews.map(toDisplayReview)
    : localReviews;

  const handleAddReply = async (reviewId: string) => {
    if (!replyText.trim()) return;

    // Try to add reply via Supabase
    if (supabaseReviews.length > 0) {
      await supabaseAddReply(reviewId, replyText);
    } else {
      // Add reply locally for mock data
      setLocalReviews(prev => prev.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            replies: [
              ...review.replies,
              {
                id: `local-${Date.now()}`,
                isOwner: false,
                author: '나',
                date: '방금',
                content: replyText,
              }
            ]
          };
        }
        return review;
      }));
    }

    setReplyText('');
    setReplyingToReviewId(null);
  };

  const renderReviewItem = ({ item }: { item: Review }) => (
    <ReviewItem>
      <ReviewHeader>
        <ProfileIcon>
          <MaterialCommunityIcons name="face-man-profile" size={24} color="#ccc" />
        </ProfileIcon>
        <View style={{ flex: 1 }}>
          <AuthorName>{item.author} <Ionicons name="chevron-forward" size={12} color="#999" /></AuthorName>
          <AuthorStats>리뷰 {item.reviewCount} · 평균별점 {item.avgRating}</AuthorStats>
        </View>
        <ReportButton>
          <Text style={{ fontSize: 12, color: '#999' }}>신고하기</Text>
        </ReportButton>
      </ReviewHeader>

      <RatingDateRow>
        <StarsRow>
          {[...Array(5)].map((_, i) => (
            <Ionicons key={i} name={i < item.rating ? "star" : "star-outline"} size={14} color="#FFD700" />
          ))}
        </StarsRow>
        <DateText>{item.date}, {item.deliveryMethod}</DateText>
      </RatingDateRow>

      <ReviewContent>{item.content}</ReviewContent>

      <MenuTagContainer>
        <MenuTag>{item.menuTag}</MenuTag>
      </MenuTagContainer>

      {item.images.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12, marginBottom: 12 }}>
          {item.images.map((img, idx) => (
            <ReviewImage key={idx} source={{ uri: img }} />
          ))}
        </ScrollView>
      )}

      {/* Replies */}
      {item.replies.map(reply => (
        <ReplyBox key={reply.id} isOwner={reply.isOwner}>
          {reply.isOwner ? (
            <ReplyHeader>
              <StoreIcon>
                <Ionicons name="storefront" size={14} color="#333" />
              </StoreIcon>
              <OwnerBadge>사장님</OwnerBadge>
              <ReplyDate>{reply.date}</ReplyDate>
            </ReplyHeader>
          ) : (
            <ReplyHeader>
              <Text style={{ fontWeight: 'bold' }}>{reply.author}</Text>
              <ReplyDate style={{ marginLeft: 8 }}>{reply.date}</ReplyDate>
            </ReplyHeader>
          )}
          <ReplyContent>{reply.content}</ReplyContent>
        </ReplyBox>
      ))}

      {/* User Reply Input Area */}
      {replyingToReviewId === item.id ? (
        <UserReplyInputContainer>
          <TextInput
            style={{ flex: 1, padding: 8, backgroundColor: '#fff', borderRadius: 4, borderWidth: 1, borderColor: '#ddd', minHeight: 40 }}
            placeholder="답글을 입력하세요..."
            value={replyText}
            onChangeText={setReplyText}
            multiline
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8, gap: 8 }}>
            <TouchableOpacity onPress={() => setReplyingToReviewId(null)}>
              <Text style={{ color: '#666' }}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleAddReply(item.id)}>
              <Text style={{ color: '#2AC1BC', fontWeight: 'bold' }}>등록</Text>
            </TouchableOpacity>
          </View>
        </UserReplyInputContainer>
      ) : (
        <ReplyButton onPress={() => setReplyingToReviewId(item.id)}>
          <Text style={{ fontSize: 13, color: '#333' }}>답글 달기</Text>
        </ReplyButton>
      )}

    </ReviewItem>
  );

  return (
    <Container>
      {/* Hide the default header since we use a custom one */}
      <Tabs.Screen options={{ headerShown: false }} />

      {/* 1. Header */}
      <Header style={{ paddingTop: insets.top }}>
        <HeaderButton onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </HeaderButton>
        <HeaderTitle>리뷰</HeaderTitle>
        <HeaderButton>
          <Ionicons name="cart-outline" size={24} color="#333" />
        </HeaderButton>
      </Header>

      <FlatList
        data={displayReviews}
        keyExtractor={item => item.id}
        renderItem={renderReviewItem}
        ListHeaderComponent={
          <>
            {/* 2. Rating Stats */}
            <RatingStatsSection>
              <RatingBig>
                <RatingNumber>4.9</RatingNumber>
                <StarsRow>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons key={i} name="star" size={16} color="#FFD700" />
                  ))}
                </StarsRow>
              </RatingBig>
              <RatingDistribution>
                {[
                  { score: 5, count: 194, width: '100%' },
                  { score: 4, count: 15, width: '10%' },
                  { score: 3, count: 0, width: '0%' },
                  { score: 2, count: 0, width: '0%' },
                  { score: 1, count: 2, width: '2%' }
                ].map((stat, idx) => (
                  <DistRow key={idx}>
                    <DistLabel>{stat.score}점</DistLabel>
                    <DistBarContainer>
                      <DistBar width={stat.width} />
                    </DistBarContainer>
                    <DistCount>{stat.count}</DistCount>
                  </DistRow>
                ))}
              </RatingDistribution>
            </RatingStatsSection>

            {/* 3. Owner Notice */}
            <OwnerNoticeSection>
              <NoticeHeader onPress={() => setIsNoticeExpanded(!isNoticeExpanded)}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>사장님 공지</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: '#999', marginRight: 4 }}>2025년 04월 30일</Text>
                  <Ionicons name={isNoticeExpanded ? "chevron-up" : "chevron-down"} size={16} color="#999" />
                </View>
              </NoticeHeader>
              {isNoticeExpanded && (
                <NoticeContent>
                  <NoticeImagePlaceholder>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>리뷰이벤트</Text>
                    <Text style={{ color: '#fff', fontSize: 10 }}>#우리동네1등맛집 #고객감사</Text>
                  </NoticeImagePlaceholder>
                  <NoticeText>
                    안녕하세요 고객님들 식탁 위에 인사올리는[대창을품은떡볶이]입니다:)
                    {'\n'}
                    #우리동네 1등맛집! #고객 감사 특별 이벤트 개시!
                  </NoticeText>
                </NoticeContent>
              )}
            </OwnerNoticeSection>

            {/* 4. Filters */}
            <FilterSection>
              <FilterStatsRow>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>최근 리뷰 298개</Text>
                <TouchableOpacity>
                  <Text style={{ fontSize: 12, color: '#999' }}>리뷰 노출 정책 <Ionicons name="chevron-forward" size={10} /></Text>
                </TouchableOpacity>
              </FilterStatsRow>
              <Text style={{ fontSize: 13, color: '#666', marginTop: 4, marginBottom: 12 }}>사장님댓글 311개</Text>

              <ButtonsRow>
                <FilterButton>
                  <Text style={{ fontSize: 13, color: '#333' }}>최신순</Text>
                  <Ionicons name="chevron-down" size={14} color="#333" style={{ marginLeft: 2 }} />
                </FilterButton>
                <FilterButton>
                  <MaterialCommunityIcons name="camera-outline" size={16} color="#333" style={{ marginRight: 4 }} />
                  <Text style={{ fontSize: 13, color: '#333' }}>사진 리뷰만 보기</Text>
                </FilterButton>
              </ButtonsRow>
            </FilterSection>
          </>
        }
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </Container>
  );
}

// --- Styles ---
const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Header = styled.View`
  flex-direction: row;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: 16px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const HeaderTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const HeaderButton = styled.TouchableOpacity`
  padding: 4px;
`;

const RatingStatsSection = styled.View`
  flex-direction: row;
  padding: 24px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
  align-items: center;
`;

const RatingBig = styled.View`
  align-items: center;
  margin-right: 32px;
`;

const RatingNumber = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: #333;
`;

const RatingDistribution = styled.View`
  flex: 1;
`;

const DistRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const DistLabel = styled.Text`
  font-size: 11px;
  color: #888;
  width: 24px;
`;

const DistBarContainer = styled.View`
  flex: 1;
  height: 4px;
  background-color: #eee;
  margin-horizontal: 8px;
  border-radius: 2px;
`;

const DistBar = styled.View<{ width: string }>`
  height: 100%;
  width: ${props => props.width};
  background-color: #FFD700;
  border-radius: 2px;
`;

const DistCount = styled.Text`
  font-size: 11px;
  color: #888;
  width: 24px;
  text-align: right;
`;

const OwnerNoticeSection = styled.View`
  border-bottom-width: 8px;
  border-bottom-color: #f0f0f0;
  padding: 16px;
`;

const NoticeHeader = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const NoticeContent = styled.View``;

const NoticeImagePlaceholder = styled.View`
  height: 120px;
  background-color: #7AD3D1; 
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  overflow: hidden;
`;

const NoticeText = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 20px;
`;

const FilterSection = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const FilterStatsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsRow = styled.View`
  flex-direction: row;
  gap: 8px;
`;

const FilterButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 20px;
  background-color: #fff;
`;

const ReviewItem = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const ReviewHeader = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

const ProfileIcon = styled.View`
  margin-right: 8px;
`;

const AuthorName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const AuthorStats = styled.Text`
  font-size: 11px;
  color: #999;
  margin-top: 2px;
`;

const ReportButton = styled.TouchableOpacity`
  padding: 4px;
`;

const RatingDateRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const StarsRow = styled.View`
  flex-direction: row;
  margin-right: 8px;
`;

const DateText = styled.Text`
  font-size: 12px;
  color: #999;
`;

const ReviewContent = styled.Text`
  font-size: 15px;
  color: #333;
  line-height: 22px;
  margin-bottom: 12px;
`;

const MenuTagContainer = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

const MenuTag = styled.Text`
  font-size: 12px;
  color: #666;
  background-color: #f5f5f5;
  padding-horizontal: 8px;
  padding-vertical: 4px;
  border-radius: 4px;
`;

const ReviewImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  margin-right: 8px;
  background-color: #eee;
`;

const ReplyBox = styled.View<{ isOwner: boolean }>`
  background-color: ${props => props.isOwner ? '#f0fbfc' : '#f9f9f9'}; /* Mint tint for owner, gray for user */
  padding: 16px;
  border-radius: 8px;
  margin-top: 12px;
`;

const ReplyHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

const StoreIcon = styled.View`
  margin-right: 4px;
`;

const OwnerBadge = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #333;
`;

const ReplyDate = styled.Text`
  font-size: 11px;
  color: #999;
  margin-left: auto;
`;

const ReplyContent = styled.Text`
  font-size: 14px;
  color: #333;
  line-height: 20px;
`;

const ReplyButton = styled.TouchableOpacity`
  margin-top: 12px;
  align-self: flex-start;
`;

const UserReplyInputContainer = styled.View`
  margin-top: 12px;
  background-color: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
`;
