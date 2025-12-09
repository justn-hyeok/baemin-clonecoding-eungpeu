import { Tabs } from 'expo-router';

export default function StoreTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2AC1BC',
        tabBarStyle: { backgroundColor: '#fff' },
        headerStyle: { backgroundColor: '#2AC1BC' },
        headerTintColor: '#fff',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '메뉴',
          tabBarLabel: '메뉴',
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: '정보',
          tabBarLabel: '정보',
        }}
      />
      <Tabs.Screen
        name="reviews"
        options={{
          title: '리뷰',
          tabBarLabel: '리뷰',
        }}
      />
      <Tabs.Screen
        name="menu/[menuId]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
