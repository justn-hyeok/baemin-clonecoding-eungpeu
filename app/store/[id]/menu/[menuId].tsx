import React, { useState } from 'react';
import {
  ScrollView,
  Dimensions,
  StatusBar as RNStatusBar,
  Animated,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styled from '@emotion/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartStore } from '../../../../store/cartStore';
import { useUserStore } from '../../../../store/userStore';

const { width } = Dimensions.get('window');

// Mock Data
const MOCK_MENU = {
  menuId: 'menu-001',
  name: '김치볶음밥',
  price: 5900,
  image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
  allergies: ['계란', '대두'],
  tags: ['인기 3위', '사장님 추천'],
  reviews: 8,
};

const MOCK_STORE = {
  storeId: 'store-001',
  storeName: '대창을품은떡볶이 김해점',
};

const MIN_ORDER = 5000;

export default function MenuDetailScreen() {
  const router = useRouter();
  const { id, menuId } = useLocalSearchParams<{ id: string; menuId: string }>();
  const insets = useSafeAreaInsets();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [toastAnim] = useState(new Animated.Value(0));

  const addItem = useCartStore((state) => state.addItem);
  const getItemCount = useCartStore((state) => state.getItemCount);
  const getAllergyMatches = useUserStore((state) => state.getAllergyMatches);

  const matchedAllergies = getAllergyMatches(MOCK_MENU.allergies);
  const totalPrice = MOCK_MENU.price * quantity;

  const showToastMessage = () => {
    setShowToast(true);
    Animated.sequence([
      Animated.timing(toastAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setShowToast(false));
  };

  const handleAddToCart = () => {
    addItem({
      menuId: menuId || MOCK_MENU.menuId,
      storeId: id || MOCK_STORE.storeId,
      storeName: MOCK_STORE.storeName,
      name: MOCK_MENU.name,
      price: MOCK_MENU.price,
      quantity,
      image: MOCK_MENU.image,
      allergies: MOCK_MENU.allergies,
      options: [],
    });
    showToastMessage();
  };

  return (
    <Container>
      <RNStatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBox>
          <MenuImage source={{ uri: MOCK_MENU.image }} />
          <TopBar style={{ paddingTop: insets.top }}>
            <IconBtn onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </IconBtn>
            <RightIcons>
              <IconBtn><Feather name="share" size={22} color="white" /></IconBtn>
              <IconBtn><Ionicons name="search" size={24} color="white" /></IconBtn>
              <IconBtn onPress={() => router.push('/cart')}>
                <Ionicons name="cart-outline" size={24} color="white" />
                {getItemCount() > 0 && (
                  <Badge><BadgeText>{getItemCount()}</BadgeText></Badge>
                )}
              </IconBtn>
            </RightIcons>
          </TopBar>
        </ImageBox>

        <Section>
          <TagRow>
            {MOCK_MENU.tags.map((tag) => (
              <Tag key={tag}><TagText>{tag}</TagText></Tag>
            ))}
          </TagRow>
          <MenuName>{MOCK_MENU.name}</MenuName>
          <ReviewLink onPress={() => router.push(`/store/${id}/reviews`)}>
            <LinkText>메뉴 리뷰 {MOCK_MENU.reviews}개</LinkText>
            <Ionicons name="chevron-forward" size={16} color="#666" />
          </ReviewLink>
          <PriceRow>
            <Label>가격</Label>
            <Price>{MOCK_MENU.price.toLocaleString()}원</Price>
          </PriceRow>
        </Section>

        {matchedAllergies.length > 0 && (
          <AllergyWarning>
            <Ionicons name="warning" size={16} color="#E53935" />
            <WarningText>알레르기 주의: {matchedAllergies.join(', ')} 포함</WarningText>
          </AllergyWarning>
        )}

        <QuantityRow>
          <Label>수량</Label>
          <QuantityBox>
            <QtyBtn onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
              <Ionicons name="remove" size={20} color={quantity > 1 ? '#333' : '#ccc'} />
            </QtyBtn>
            <QtyText>{quantity}개</QtyText>
            <QtyBtn onPress={() => setQuantity(quantity + 1)}>
              <Ionicons name="add" size={20} color="#333" />
            </QtyBtn>
          </QuantityBox>
        </QuantityRow>

        <Notice>
          <NoticeText>메뉴 사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있어요.</NoticeText>
          <NoticeText>메뉴 정보와 관련된 의견이 있다면 의견 보내기 버튼을 눌러주세요.</NoticeText>
          <FeedbackLink>의견 보내기 &gt;</FeedbackLink>
        </Notice>

        <Spacer />
      </ScrollView>

      <BottomBar style={{ paddingBottom: insets.bottom || 16 }}>
        <MinOrder>
          <MinLabel>배달</MinLabel>
          <MinText>최소주문금액 {MIN_ORDER.toLocaleString()}원</MinText>
        </MinOrder>
        <CartBtn onPress={handleAddToCart}>
          <CartBtnText>{totalPrice.toLocaleString()}원 담기</CartBtnText>
        </CartBtn>
      </BottomBar>

      {showToast && (
        <ToastBox
          style={{
            opacity: toastAnim,
            transform: [{ translateY: toastAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }],
          }}
        >
          <ToastText>장바구니에 담았어요</ToastText>
          <ToastBtn onPress={() => router.push('/cart')}>
            <ToastBtnText>보기</ToastBtnText>
          </ToastBtn>
        </ToastBox>
      )}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const ImageBox = styled.View`
  width: ${width}px;
  height: 280px;
  background-color: #ddd;
`;

const MenuImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TopBar = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 16px;
`;

const RightIcons = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const IconBtn = styled.TouchableOpacity`
  padding: 4px;
  position: relative;
`;

const Badge = styled.View`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #e53935;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
`;

const BadgeText = styled.Text`
  color: #fff;
  font-size: 11px;
  font-weight: bold;
`;

const Section = styled.View`
  padding: 20px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const TagRow = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 12px;
`;

const Tag = styled.View`
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
`;

const TagText = styled.Text`
  font-size: 12px;
  color: #666;
`;

const MenuName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const ReviewLink = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const LinkText = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const PriceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled.Text`
  font-size: 15px;
  color: #333;
`;

const Price = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

const AllergyWarning = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
  margin: 0 16px;
  padding: 12px;
  background-color: #fff3f3;
  border-radius: 8px;
`;

const WarningText = styled.Text`
  font-size: 13px;
  color: #e53935;
  font-weight: 500;
`;

const QuantityRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

const QuantityBox = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const QtyBtn = styled.TouchableOpacity`
  padding: 10px 12px;
`;

const QtyText = styled.Text`
  font-size: 15px;
  min-width: 50px;
  text-align: center;
  border-left-width: 1px;
  border-right-width: 1px;
  border-color: #e0e0e0;
  padding: 10px 0;
`;

const Notice = styled.View`
  background-color: #f9f9f9;
  padding: 20px 16px;
`;

const NoticeText = styled.Text`
  font-size: 13px;
  color: #888;
  line-height: 20px;
`;

const FeedbackLink = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 12px;
  text-decoration-line: underline;
`;

const Spacer = styled.View`
  height: 100px;
`;

const BottomBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff;
  border-top-width: 1px;
  border-top-color: #f0f0f0;
`;

const MinOrder = styled.View`
  flex: 1;
`;

const MinLabel = styled.Text`
  font-size: 11px;
  color: #2ac1bc;
  font-weight: 600;
`;

const MinText = styled.Text`
  font-size: 12px;
  color: #666;
`;

const CartBtn = styled.TouchableOpacity`
  background-color: #2ac1bc;
  padding: 14px 28px;
  border-radius: 8px;
`;

const CartBtnText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const ToastBox = styled(Animated.View)`
  position: absolute;
  bottom: 100px;
  left: 16px;
  right: 16px;
  flex-direction: row;
  align-items: center;
  background-color: #333;
  padding: 14px 16px;
  border-radius: 8px;
`;

const ToastText = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 14px;
`;

const ToastBtn = styled.TouchableOpacity`
  padding: 6px 12px;
  background-color: #2ac1bc;
  border-radius: 4px;
`;

const ToastBtnText = styled.Text`
  color: #fff;
  font-size: 13px;
  font-weight: 600;
`;
