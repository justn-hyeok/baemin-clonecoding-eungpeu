import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const categories = [
  { emoji: '🎪', label: '푸드페스타' },
  { emoji: '🍗', label: '치킨' },
  { emoji: '🍴', label: '분식' },
  { emoji: '🍔', label: '패스트푸드' },
  { emoji: '🍕', label: '피자' },
  { emoji: '🍲', label: '찜·탕' },
  { emoji: '🥩', label: '족발·보쌈' },
  { emoji: '🌙', label: '야식' },
  { emoji: '🍚', label: '한그릇' },
  { emoji: '🏷️', label: '픽업 할인', badge: '500원딜' },
];

const marts = [
  { label: 'B마트', text: 'B마트', color: '#FF6B35', textColor: '#fff' },
  { label: 'CU', text: 'CU', color: '#8B5CF6', textColor: '#fff' },
  { label: 'GS25', text: 'GS25', color: '#3B82F6', textColor: '#fff' },
  { label: '홈플러스', text: 'Homeplus', color: '#EF4444', textColor: '#fff' },
  { label: '이마트', text: 'emart', color: '#EAB308', textColor: '#000' },
  { label: 'GS더프레시', text: 'GS', color: '#22C55E', textColor: '#fff' },
];

const tabs = ['음식배달', '픽업', '장보기·쇼핑', '배민푸드페스타', '선물하기'];

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('음식배달');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} />

      {/* Header Section - Mint Background */}
      <View style={{ backgroundColor: colors.primary }}>
        <SafeAreaView edges={['top']}>
          {/* Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 17, fontWeight: '700' }}>경남 김해시 주촌면 천곡로 26</Text>
              <Ionicons name="chevron-down" size={18} color="#fff" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <TouchableOpacity>
                <MaterialCommunityIcons name="percent-circle-outline" size={26} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={26} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/cart')}>
                <Ionicons name="cart-outline" size={26} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
            <View style={{ backgroundColor: '#fff', borderRadius: 25, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 48, borderWidth: 1, borderColor: '#e0e0e0' }}>
              <Text style={{ flex: 1, fontSize: 15, color: '#999' }}>순대볶음 나와라 뚝딱!!</Text>
              <Ionicons name="search" size={22} color={colors.primary} />
            </View>
          </View>

          {/* Event Banner */}
          <View style={{ marginHorizontal: 16, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 4 }}>황가네님 주목!</Text>
              <Text style={{ fontSize: 15, color: '#000', marginBottom: 12 }}>총 4천원 할인 당첨되셨어요</Text>
              <TouchableOpacity style={{ backgroundColor: '#000', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
                <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>배민클럽 가입하고 받기</Text>
                <Ionicons name="chevron-forward" size={14} color="#fff" style={{ marginLeft: 2 }} />
              </TouchableOpacity>
            </View>
            <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 50 }}>🎟️</Text>
            </View>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Tab Menu */}
        <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          {/* 빽다방 선착순 배지 */}
          <View style={{ alignItems: 'center', paddingTop: 8 }}>
            <View style={{ backgroundColor: '#f5f5f5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 }}>
              <Text style={{ fontSize: 11, color: '#666', fontWeight: '500' }}>빽다방 선착순</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={{ paddingVertical: 14, paddingHorizontal: 14, borderBottomWidth: 2, borderBottomColor: isActive ? '#000' : 'transparent' }}
                >
                  <Text style={{ fontSize: 16, fontWeight: isActive ? '700' : '400', color: isActive ? '#000' : '#999' }}>{tab}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Category Grid - 2 rows x 5 columns */}
        <View style={{ paddingVertical: 24, paddingHorizontal: 12 }}>
          {/* Row 1 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
            {categories.slice(0, 5).map((cat, index) => (
              <TouchableOpacity key={index} onPress={() => router.push('/stores')} style={{ alignItems: 'center', width: (SCREEN_WIDTH - 24) / 5 }}>
                <View style={{ width: 60, height: 60, backgroundColor: '#f5f5f5', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontSize: 32 }}>{cat.emoji}</Text>
                </View>
                <Text style={{ fontSize: 12, color: '#333', textAlign: 'center' }}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Row 2 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {categories.slice(5, 10).map((cat, index) => (
              <TouchableOpacity key={index + 5} onPress={() => router.push('/stores')} style={{ alignItems: 'center', width: (SCREEN_WIDTH - 24) / 5 }}>
                <View style={{ position: 'relative' }}>
                  <View style={{ width: 60, height: 60, backgroundColor: '#f5f5f5', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>
                    <Text style={{ fontSize: 32 }}>{cat.emoji}</Text>
                  </View>
                  {cat.badge && (
                    <View style={{ position: 'absolute', top: -6, right: -10, backgroundColor: '#FF6B6B', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 }}>
                      <Text style={{ fontSize: 9, color: '#fff', fontWeight: '700' }}>{cat.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={{ fontSize: 12, color: '#333', textAlign: 'center' }}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* More Link */}
        <TouchableOpacity onPress={() => router.push('/stores')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 16 }}>
          <Text style={{ fontSize: 14, color: '#666' }}>음식배달</Text>
          <Text style={{ fontSize: 14, color: '#666', textDecorationLine: 'underline' }}>에서 더보기</Text>
          <Ionicons name="chevron-forward" size={16} color="#666" />
        </TouchableOpacity>

        {/* Divider */}
        <View style={{ height: 8, backgroundColor: '#f5f5f5' }} />

        {/* Mart Section */}
        <View style={{ paddingVertical: 24 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
            {marts.map((mart, index) => (
              <TouchableOpacity key={index} style={{ alignItems: 'center', width: 72 }}>
                <View style={{ position: 'relative', marginBottom: 8 }}>
                  {/* 배지 */}
                  {mart.badge && (
                    <View style={{ position: 'absolute', top: -10, left: '50%', transform: [{ translateX: -20 }], backgroundColor: mart.badgeColor, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, zIndex: 1 }}>
                      <Text style={{ fontSize: 9, color: '#fff', fontWeight: '700' }}>{mart.badge}</Text>
                    </View>
                  )}
                  {/* 로고 원형 */}
                  <View style={{ width: 64, height: 64, backgroundColor: mart.color, borderRadius: 32, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: mart.textColor, fontSize: mart.text.length > 3 ? 11 : 16, fontWeight: '700' }}>{mart.text}</Text>
                    {mart.subText && (
                      <Text style={{ color: mart.textColor, fontSize: 8, marginTop: 2 }}>{mart.subText}</Text>
                    )}
                  </View>
                </View>
                <Text style={{ fontSize: 12, color: '#333', textAlign: 'center' }}>{mart.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Divider */}
        <View style={{ height: 8, backgroundColor: '#f5f5f5' }} />

        {/* Promotion Banner */}
        <View style={{ margin: 16 }}>
          <View style={{ backgroundColor: '#1a472a', borderRadius: 12, padding: 24, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 15, marginBottom: 8 }}>2025년 마지막 최대 할인</Text>
            <Text style={{ color: '#ffd700', fontSize: 22, fontWeight: '700' }}>매일 최대 8,000원 혜택!</Text>
            <View style={{ position: 'absolute', right: 16, bottom: 8 }}>
              <Text style={{ color: '#fff', fontSize: 10 }}>1/16 전체 &gt;</Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing for Tab Bar */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
