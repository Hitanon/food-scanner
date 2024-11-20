import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import ProductItem from './ProductItem';

const ProductList = ({
  products = [],
  onSelect = null, // Обработчик выбора
  onEdit = null, // Обработчик редактирования
  onDelete = null, // Обработчик удаления
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
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ScrollView>
  );
};

export default ProductList;