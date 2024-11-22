import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import ProductItem from './ProductItem';

const ProductList = ({
  products = [],
  isInDiet = false,        // Флаг: продукты в рационе или в общем списке
  onSelect = null,         // Обработчик выбора продукта
  selectedProductId = null, // ID выбранного продукта
  onEdit = null,           // Обработчик редактирования (только для общего списка)
  onDelete = null,         // Обработчик удаления (только для общего списка)
  onRemoveFromDiet = null, // Обработчик удаления из рациона
}) => {
  if (products.length === 0) {
    return (
      <View className="mt-6">
        <Text className="text-2xl text-gray-800 text-center mb-4 font-bold">Список пуст</Text>
        <Text className="text-lg text-gray-600 text-center">Добавьте продукты для отображения</Text>
      </View>
    );
  }

  return (
    <ScrollView className="mt-6">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          isInDiet={isInDiet}
          isSelected={selectedProductId === product.id} // Проверяем, выбран ли продукт
          onSelect={onSelect}
          onEdit={!isInDiet ? onEdit : null} // "Изменить" только для общего списка
          onDelete={!isInDiet ? onDelete : null} // "Удалить" только для общего списка
          onRemoveFromDiet={isInDiet ? onRemoveFromDiet : null} // "Удалить из рациона" только для рациона
        />
      ))}
    </ScrollView>
  );
};

export default ProductList;
