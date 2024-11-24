// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import { icons } from '../../constants';
import TabIcon from '../../components/TabIcon';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#509505",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#FFFFFF",
          height: 84,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Главная"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="addProduct"
        options={{
          title: "Добавить продукт",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.add}
              color={color}
              name="Добавить продукт"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Список продуктов",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.products}
              color={color}
              name="Список продуктов"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: "Отчеты",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.stats}
              color={color}
              name="Отчеты"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
