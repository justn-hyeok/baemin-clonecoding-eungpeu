import React, { useState } from 'react';
import {
  ScrollView,
  Modal,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import styled from '@emotion/native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCartStore } from '../store/cartStore';
import { useUserStore } from '../store/userStore';

export default function CartScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [showAllergyModal, setShowAllergyModal] = useState(false);

  const items = useCartStore((state) => state.items);
  const storeName = useCartStore((state) => state.storeName);
  const storeId = useCartStore((state) => state.storeId);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotal = useCartStore((state) => state.getTotal);
  const userAllergies = useUserStore((state) => state.allergies);

  const getItemsWithMatchingAllergies = () => {
    return items.filter((item) =>
      item.allergies.some((allergy) => userAllergies.includes(allergy))
    );
  };

  const itemsWithAllergies = getItemsWithMatchingAllergies();
  const hasAllergyWarning = itemsWithAllergies.length > 0;

  const originalTotal = getTotal();
  const discount = originalTotal > 0 ? 1000 : 0;
  const finalTotal = originalTotal - discount;

  const handleOrder = () => {
    if (items.length === 0) return;
    if (hasAllergyWarning) {
      setShowAllergyModal(true);
    } else {
      console.log('주문 진행');
    }
  };

  const confirmOrder = () => {
    setShowAllergyModal(false);
    console.log('주문 확정');
  };

  const handleAddMenu = () => {
    if (storeId) {
      router.push(`/store/${storeId}`);
    } else {
      router.back();
    }
  };

  const tabs = [`배달·픽업 ${items.length || ''}`, '장보기·쇼핑', '전국특가'];

  // 장바구니 비어있을 때
  if (items.length === 0) {
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <Header>
            <IconBtn onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </IconBtn>
            <HeaderTitle>장바구니</HeaderTitle>
            <IconBtn><Ionicons name="people-outline" size={24} color="#000" /></IconBtn>
          </Header>
          <TabBar>
            {tabs.map((tab, i) => (
              <Tab key={i} active={activeTab === i} onPress={() => setActiveTab(i)}>
                <TabText active={activeTab === i}>{tab}</TabText>
              </Tab>
            ))}
          </TabBar>
          <EmptyBox>
            <Ionicons name="cart-outline" size={80} color="#ddd" />
            <EmptyText>장바구니가 비어있어요</EmptyText>
            <EmptyBtn onPress={() => router.push('/stores')}>
              <EmptyBtnText>맛집 둘러보기</EmptyBtnText>
            </EmptyBtn>
          </EmptyBox>
        </SafeAreaView>
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <IconBtn onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </IconBtn>
          <HeaderTitle>장바구니</HeaderTitle>
          <IconBtn><Ionicons name="people-outline" size={24} color="#000" /></IconBtn>
        </Header>

        <TabBar>
          {tabs.map((tab, i) => (
            <Tab key={i} active={activeTab === i} onPress={() => setActiveTab(i)}>
              <TabText active={activeTab === i}>{tab}</TabText>
            </Tab>
          ))}
        </TabBar>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 가게 정보 */}
          <StoreRow onPress={() => storeId && router.push(`/store/${storeId}`)}>
            <Ionicons name="restaurant" size={20} color="#2AC1BC" />
            <StoreName>{storeName || '가게 이름'}</StoreName>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </StoreRow>

          {/* 할인 배너 */}
          <DiscountBanner>
            <Ionicons name="flash" size={16} color="#2AC1BC" />
            <BannerText><Mint>1,000원</Mint> 알뜰배달 즉시할인</BannerText>
          </DiscountBanner>

          {/* 알레르기 경고 (간소화) */}
          {hasAllergyWarning && (
            <AllergyBanner>
              <Ionicons name="warning" size={16} color="#E53935" />
              <AllergyText>
                알레르기 주의: {itemsWithAllergies.map(i => i.name).join(', ')}
              </AllergyText>
            </AllergyBanner>
          )}

          {/* 메뉴 리스트 */}
          <MenuList>
            {items.map((item) => (
              <MenuCard key={item.id}>
                <MenuRow>
                  <MenuInfo>
                    <MenuName>{item.name}</MenuName>
                    <MenuPrice>{item.price.toLocaleString()}원</MenuPrice>
                    {item.options.map((opt, i) => (
                      <OptionText key={i}>{opt.label}: {opt.value}</OptionText>
                    ))}
                    <MenuTotal>{(item.price * item.quantity).toLocaleString()}원</MenuTotal>
                  </MenuInfo>
                  {item.image && <MenuImg source={{ uri: item.image }} />}
                </MenuRow>
                <MenuActions>
                  {item.options.length > 0 && (
                    <OptBtn><OptBtnText>옵션 변경</OptBtnText></OptBtn>
                  )}
                  <QtyBox>
                    <QtyBtn onPress={() => removeItem(item.id)}>
                      <Ionicons name="trash-outline" size={18} color="#666" />
                    </QtyBtn>
                    <QtyBtn onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Ionicons name="remove" size={18} color="#666" />
                    </QtyBtn>
                    <QtyNum>{item.quantity}</QtyNum>
                    <QtyBtn onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Ionicons name="add" size={18} color="#666" />
                    </QtyBtn>
                  </QtyBox>
                </MenuActions>
              </MenuCard>
            ))}
            <AddMenuBtn onPress={handleAddMenu}>
              <Ionicons name="add" size={20} color="#666" />
              <AddMenuText>메뉴 추가</AddMenuText>
            </AddMenuBtn>
          </MenuList>

          {/* 추천 */}
          <Section><SectionTitle>함께 먹으면 좋아요</SectionTitle></Section>

          {/* 배민클럽 */}
          <ClubBanner>
            <ClubText>배민클럽 가입하면 총 4천원 혜택 지급!</ClubText>
          </ClubBanner>

          <Spacer />
        </ScrollView>

        {/* 하단 바 */}
        <BottomBar>
          <PriceBox>
            <PriceRow>
              <FinalPrice>{finalTotal.toLocaleString()}원</FinalPrice>
              {discount > 0 && <OldPrice>{originalTotal.toLocaleString()}원</OldPrice>}
            </PriceRow>
            {discount > 0 && (
              <DiscountRow>
                <Ionicons name="flash" size={14} color="#2AC1BC" />
                <DiscountText>{discount.toLocaleString()}원 할인 적용</DiscountText>
              </DiscountRow>
            )}
          </PriceBox>
          <OrderBtn onPress={handleOrder}>
            <OrderBtnText>알뜰배달 주문하기</OrderBtnText>
          </OrderBtn>
        </BottomBar>

        {/* 알레르기 확인 모달 */}
        <Modal visible={showAllergyModal} transparent animationType="fade">
          <ModalBg>
            <ModalBox>
              <ModalTitle>
                <Ionicons name="warning" size={24} color="#E53935" />
                <ModalTitleText>알레르기 확인</ModalTitleText>
              </ModalTitle>
              <ModalMsg>다음 메뉴에 알레르기 성분이 포함되어 있어요:</ModalMsg>
              {itemsWithAllergies.map((item) => (
                <ModalItem key={item.id}>
                  {item.name} - {item.allergies.filter(a => userAllergies.includes(a)).join(', ')}
                </ModalItem>
              ))}
              <ModalMsg>그래도 주문하시겠어요?</ModalMsg>
              <ModalBtns>
                <ModalCancelBtn onPress={() => setShowAllergyModal(false)}>
                  <ModalCancelText>취소</ModalCancelText>
                </ModalCancelBtn>
                <ModalConfirmBtn onPress={confirmOrder}>
                  <ModalConfirmText>주문하기</ModalConfirmText>
                </ModalConfirmBtn>
              </ModalBtns>
            </ModalBox>
          </ModalBg>
        </Modal>
      </SafeAreaView>
    </Container>
  );
}

// Styles
const Container = styled.View`flex: 1; background-color: #f5f5f5;`;
const Header = styled.View`flex-direction: row; align-items: center; justify-content: space-between; padding: 12px 16px; background-color: #fff;`;
const IconBtn = styled.TouchableOpacity`padding: 4px;`;
const HeaderTitle = styled.Text`font-size: 18px; font-weight: 700;`;

const TabBar = styled.View`flex-direction: row; background-color: #fff; border-bottom-width: 1px; border-bottom-color: #eee;`;
const Tab = styled.TouchableOpacity<{active: boolean}>`flex: 1; padding: 14px 0; align-items: center; border-bottom-width: 2px; border-bottom-color: ${p => p.active ? '#000' : 'transparent'};`;
const TabText = styled.Text<{active: boolean}>`font-size: 14px; font-weight: ${p => p.active ? '700' : '400'}; color: ${p => p.active ? '#000' : '#999'};`;

const EmptyBox = styled.View`flex: 1; align-items: center; justify-content: center;`;
const EmptyText = styled.Text`font-size: 16px; color: #666; margin-top: 16px;`;
const EmptyBtn = styled.TouchableOpacity`margin-top: 20px; padding: 12px 24px; background-color: #2ac1bc; border-radius: 8px;`;
const EmptyBtnText = styled.Text`color: #fff; font-weight: 600;`;

const StoreRow = styled.TouchableOpacity`flex-direction: row; align-items: center; padding: 16px; background-color: #fff; margin-top: 8px; gap: 10px;`;
const StoreName = styled.Text`flex: 1; font-size: 16px; font-weight: 600;`;

const DiscountBanner = styled.View`flex-direction: row; align-items: center; background-color: #f0fafa; margin: 12px 16px; padding: 12px; border-radius: 8px; gap: 6px;`;
const BannerText = styled.Text`font-size: 14px; color: #333;`;
const Mint = styled.Text`color: #2ac1bc; font-weight: 700;`;

const AllergyBanner = styled.View`flex-direction: row; align-items: center; background-color: #fff3f3; margin: 0 16px 12px; padding: 12px; border-radius: 8px; gap: 6px;`;
const AllergyText = styled.Text`flex: 1; font-size: 13px; color: #e53935; font-weight: 500;`;

const MenuList = styled.View`background-color: #fff; margin: 0 16px; border-radius: 12px;`;
const MenuCard = styled.View`padding: 16px; border-bottom-width: 1px; border-bottom-color: #f0f0f0;`;
const MenuRow = styled.View`flex-direction: row; justify-content: space-between;`;
const MenuInfo = styled.View`flex: 1; padding-right: 12px;`;
const MenuName = styled.Text`font-size: 16px; font-weight: 600; margin-bottom: 4px;`;
const MenuPrice = styled.Text`font-size: 13px; color: #999;`;
const OptionText = styled.Text`font-size: 12px; color: #666;`;
const MenuTotal = styled.Text`font-size: 16px; font-weight: 700; margin-top: 8px;`;
const MenuImg = styled.Image`width: 70px; height: 70px; border-radius: 8px;`;

const MenuActions = styled.View`flex-direction: row; justify-content: flex-end; align-items: center; margin-top: 12px; gap: 8px;`;
const OptBtn = styled.TouchableOpacity`padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px;`;
const OptBtnText = styled.Text`font-size: 13px; color: #333;`;
const QtyBox = styled.View`flex-direction: row; align-items: center; border: 1px solid #ddd; border-radius: 6px;`;
const QtyBtn = styled.TouchableOpacity`padding: 8px 10px;`;
const QtyNum = styled.Text`font-size: 14px; font-weight: 600; min-width: 24px; text-align: center;`;

const AddMenuBtn = styled.TouchableOpacity`flex-direction: row; align-items: center; justify-content: center; padding: 16px; gap: 4px;`;
const AddMenuText = styled.Text`font-size: 14px; color: #666;`;

const Section = styled.View`background-color: #fff; padding: 20px 16px; margin-top: 12px;`;
const SectionTitle = styled.Text`font-size: 16px; font-weight: 700;`;

const ClubBanner = styled.TouchableOpacity`background-color: #7c4dff; padding: 16px; margin-top: 12px; align-items: center;`;
const ClubText = styled.Text`color: #fff; font-weight: 600;`;

const Spacer = styled.View`height: 100px;`;

const BottomBar = styled.View`position: absolute; bottom: 0; left: 0; right: 0; flex-direction: row; align-items: center; justify-content: space-between; background-color: #fff; padding: 16px; padding-bottom: 34px; border-top-width: 1px; border-top-color: #eee;`;
const PriceBox = styled.View`flex: 1;`;
const PriceRow = styled.View`flex-direction: row; align-items: center; gap: 8px;`;
const FinalPrice = styled.Text`font-size: 22px; font-weight: 800;`;
const OldPrice = styled.Text`font-size: 14px; color: #999; text-decoration-line: line-through;`;
const DiscountRow = styled.View`flex-direction: row; align-items: center; margin-top: 4px; gap: 4px;`;
const DiscountText = styled.Text`font-size: 13px; color: #2ac1bc; font-weight: 600;`;
const OrderBtn = styled.TouchableOpacity`background-color: #2ac1bc; padding: 16px 24px; border-radius: 8px;`;
const OrderBtnText = styled.Text`font-size: 16px; font-weight: 700; color: #fff;`;

// Modal
const ModalBg = styled.View`flex: 1; background-color: rgba(0,0,0,0.5); justify-content: center; align-items: center; padding: 20px;`;
const ModalBox = styled.View`background-color: #fff; border-radius: 16px; width: 100%; max-width: 320px; padding: 24px;`;
const ModalTitle = styled.View`flex-direction: row; align-items: center; justify-content: center; gap: 8px; margin-bottom: 16px;`;
const ModalTitleText = styled.Text`font-size: 18px; font-weight: 700;`;
const ModalMsg = styled.Text`font-size: 14px; color: #666; text-align: center; margin-bottom: 12px;`;
const ModalItem = styled.Text`background-color: #ffebee; color: #c62828; font-size: 14px; font-weight: 600; padding: 10px; border-radius: 8px; text-align: center; margin-bottom: 8px;`;
const ModalBtns = styled.View`flex-direction: row; margin-top: 16px; gap: 12px;`;
const ModalCancelBtn = styled.TouchableOpacity`flex: 1; padding: 14px; border: 1px solid #ddd; border-radius: 8px; align-items: center;`;
const ModalCancelText = styled.Text`font-size: 15px; color: #666;`;
const ModalConfirmBtn = styled.TouchableOpacity`flex: 1; padding: 14px; background-color: #2ac1bc; border-radius: 8px; align-items: center;`;
const ModalConfirmText = styled.Text`font-size: 15px; font-weight: 700; color: #fff;`;
