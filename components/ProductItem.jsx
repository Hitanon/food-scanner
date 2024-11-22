import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import SmallCustomButton from './SmallCustomButton';

const ProductItem = ({
  product,
  isSelected = false,      // Для выделения выбранных продуктов
  onSelect,                // Событие выбора
  onEdit,                  // Событие редактирования (только для экрана всех продуктов)
  onDelete,                // Событие удаления
  isInDiet = false,        // Флаг: продукт в рационе или в общем списке
  onRemoveFromDiet,        // Событие удаления из рациона
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`flex-row bg-white rounded-xl p-4 mb-3 shadow-sm items-center border ${
        isSelected ? 'border-green-500' : 'border-gray-300'
      }`}
      onPress={() => onSelect && onSelect(product)} // Событие выбора продукта
    >
      {/* Изображение продукта */}
      <View className="w-16 h-16 rounded-md bg-gray-300 mr-4 items-center justify-center">
        {product.image ? (
          <Image source={{ uri: product.image }} className="w-full h-full rounded-md" />
        ) : (
          <Text className="text-gray-600 text-sm">No Image</Text>
        )}
      </View>

      {/* Текстовая информация */}
      <View className="flex-1 justify-between">
        <Text className="text-lg font-bold text-gray-800 mb-2">{product.name}</Text>
        <View className="flex-row mt-2">
          {/* Кнопка "Изменить" (только для экрана продуктов) */}
          {!isInDiet && onEdit && (
            <SmallCustomButton
              title="Изменить"
              handlePress={() => onEdit(product)}
              bgColor="bg-blue-500"
              textColor="text-white"
              className="mr-2"
            />
          )}

          {/* Кнопка "Удалить" */}
          <SmallCustomButton
            title={isInDiet ? 'Удалить из рациона' : 'Удалить'}
            handlePress={() => (isInDiet ? onRemoveFromDiet(product) : onDelete(product))}
            bgColor="bg-red-500"
            textColor="text-white"
          />
        </View>
      </View>

      {/* Калории */}
      <View className="items-center ml-4">
        <Text className="text-orange-500 text-2xl mb-1">🔥</Text>
        <Text className="text-lg font-bold text-gray-800">{product.calories}</Text>
        <Text className="text-sm text-gray-500">ккал</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
