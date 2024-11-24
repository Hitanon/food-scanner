import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import SmallCustomButton from './SmallCustomButton';
import { round } from '../utils/functions';

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
      className={`flex-row bg-white rounded-xl p-4 mb-3 shadow-sm items-center border ${isSelected ? 'border-green-500' : 'border-gray-300'
        }`}
      onPress={() => onSelect && onSelect(product)} // Событие выбора продукта
    >
      {/* Изображение продукта */}
      <View className="w-16 h-16 rounded-md bg-gray-300 mr-4 items-center justify-center">
        {product.imageLink ? (
          <Image
            source={{ uri: product.imageLink }}
            className="w-full h-full rounded-md"
          />

        ) : (
          <Text className="text-gray-600 m-2 text-center text-sm">No Image</Text>
        )}
      </View>

      {/* Текстовая информация */}
      <View className="flex-1 justify-between">
        <Text className="text-lg font-bold text-gray-800 mb-2">{product.name}</Text>
        <View className="flex-row mt-1">
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
        <Text className="text-orange-500 text-2xl">🔥</Text>
        <Text className="text-lg font-psemibold text-gray-800">{round(product.calories)}</Text>
        <Text className="text-sm text-gray-500 leading-[10px]">ккал</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
