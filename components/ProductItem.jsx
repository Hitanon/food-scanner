import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <View className="flex-row bg-white rounded-xl p-4 mb-3 shadow-sm items-center">
      {/* Изображение продукта */}
      <Image
        source={{ uri: product.image || 'https://via.placeholder.com/150' }}
        className="w-16 h-16 rounded-md mr-4"
      />

      {/* Текстовая информация */}
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">{product.name}</Text>
        <Text className="text-sm text-gray-600">{product.weight} гр.</Text>
      </View>

      {/* Калории и действия */}
      <View className="items-center">
        <Text className="text-lg font-bold text-orange-500 mb-2">
          🔥 {product.calories} ккал
        </Text>
        <View className="flex-row space-x-2">
          {onEdit && (
            <TouchableOpacity
              onPress={() => onEdit(product)}
              className="px-3 py-1 border border-green-500 rounded-lg"
            >
              <Text className="text-green-500 font-medium">Изменить</Text>
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              onPress={() => onDelete(product)}
              className="px-3 py-1 border border-red-500 rounded-lg"
            >
              <Text className="text-red-500 font-medium">Удалить</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductItem;
