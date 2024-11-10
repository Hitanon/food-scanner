import React from 'react';
import { View, Text } from 'react-native';

const Summary = ({ calories = 0, proteins = 0, fats = 0, carbs = 0 }) => {
  return (
    <View className="bg-white rounded-xl p-4 mt-4 shadow-sm">
      <Text className="text-2xl font-bold text-gray-800 mb-2">Суммарные значения</Text>
      <View className="flex-row justify-around mt-2">
        <View className="items-center">
          <Text className="text-xl font-bold text-gray-800">{calories}</Text>
          <Text className="text-sm text-gray-600">ккал</Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-gray-800">{proteins}</Text>
          <Text className="text-sm text-gray-600">белки</Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-gray-800">{fats}</Text>
          <Text className="text-sm text-gray-600">жиры</Text>
        </View>
        <View className="items-center">
          <Text className="text-xl font-bold text-gray-800">{carbs}</Text>
          <Text className="text-sm text-gray-600">углеводы</Text>
        </View>
      </View>
    </View>
  );
};

export default Summary;
