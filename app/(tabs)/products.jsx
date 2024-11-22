import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductContext } from '../../context/ProductContext';
import ProductItem from '../../components/ProductItem';
import { useNavigation } from '@react-navigation/native';

const Products = observer(() => {
  const { ProductListStore } = useContext(ProductContext);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigation = useNavigation();

  const toggleProductSelection = (product) => {
    if (selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts((prev) => [...prev, product]);
    }
  };

  const handleAddSelectedToDiet = () => {
    if (selectedProducts.length === 0) {
      Alert.alert('Ошибка', 'Выберите хотя бы один продукт для добавления в рацион.');
      return;
    }

    selectedProducts.forEach((product) => {
      ProductListStore.addToDiet(product);
    });

    Alert.alert('Продукты добавлены', `${selectedProducts.length} продукт(ов) добавлено в рацион!`);
    setSelectedProducts([]);
  };

  const handleEditProduct = (product) => {
    navigation.navigate('product', { mode: 'edit', product });
  };

  const handleDeleteProduct = (product) => {
    ProductListStore.removeProduct(product.id);
  };

  const products = ProductListStore.getAllProducts();

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <View className="h-16 items-center justify-center bg-white shadow-md mb-2">
        <Text className="text-lg font-bold text-gray-800">
          {selectedProducts.length > 0 ? `Выбрано продуктов: ${selectedProducts.length}` : 'Список продуктов'}
        </Text>
      </View>

      <ScrollView className="p-4">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            isSelected={selectedProducts.some((p) => p.id === product.id)}
            onSelect={toggleProductSelection} // Выделение продукта
          />
        ))}
      </ScrollView>

      <TouchableOpacity onPress={handleAddSelectedToDiet} className="m-4 p-4 bg-green-500 rounded-lg">
        <Text className="text-white text-center font-bold">Добавить в рацион</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
});

export default Products;
