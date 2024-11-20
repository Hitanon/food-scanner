import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductContext } from '../../context/ProductContext';
import ProductList from '../../components/ProductList';
import { useNavigation } from '@react-navigation/native';

const Products = observer(() => {
    // Достаем ProductListStore из контекста
    const { ProductListStore } = useContext(ProductContext);
    const navigation = useNavigation();

    // Функция для очистки списка
    const handleClearProducts = () => {
      ProductListStore.clearAllProducts();

      Alert.alert("Список очищен", "Все продукты были удалены!");
    };

    return (
    <SafeAreaView className="flex-1 bg-gray-200 p-4">

      {/* Список продуктов */}
      <ProductList
        products={ProductListStore.getAllProducts()}
        onEdit={(product) => navigation.navigate('product', { mode: 'edit', product })}
        onDelete={(product) => ProductListStore.removeProduct(product.id)}
        onSelect={(product) => console.log('Продукт выбран:', product)}
      />

      {/* Кнопка очистки списка */}
      <TouchableOpacity 
        onPress={handleClearProducts} 
        className="mt-6 p-3 bg-red-500 rounded-lg"
      >
        <Text className="text-white text-center font-bold">Очистить список продуктов</Text>
      </TouchableOpacity>

    </SafeAreaView>
    );
});

export default Products;
