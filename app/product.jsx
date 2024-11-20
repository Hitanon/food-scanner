import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Alert, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native'; // Подключаем useRoute
import ProductForm from '../components/ProductForm';
import { icons } from '../constants';
import { ProductContext } from '../context/ProductContext';

const Product = () => {
  const { ProductListStore } = useContext(ProductContext); // Получаем доступ к ProductListStore
  const navigation = useNavigation();
  const route = useRoute(); // Получаем параметры маршрута

  const { mode = 'create', product } = route.params || {}; // Делаем проверку на наличие параметров
  const [loading, setLoading] = useState(false);

  // Функция для сохранения или обновления продукта
  const handleSave = async (productData) => {
    setLoading(true);
    try {
      if (mode === 'edit') {
        // Если редактируем, обновляем продукт
        await ProductListStore.updateProduct(productData); // Вам нужно добавить метод updateProduct в ProductListStore
        Alert.alert('Успех', 'Продукт успешно обновлен!');
      } else {
        // Если создаем новый продукт
        await ProductListStore.addProduct(productData);
        Alert.alert('Успех', 'Продукт успешно добавлен!');
      }
      navigation.navigate('index'); // Переходим на главный экран после сохранения
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить продукт.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Если в режиме редактирования передан продукт, можно сделать дополнительные действия, например, загрузить его данные
    if (mode === 'edit' && product) {
      // здесь можно что-то сделать с продуктом, если нужно
    }
  }, [mode, product]);

  return (
    <SafeAreaView className="flex-1 p-5">
      <View className="mb-5">
        <View className="flex-row items-center justify-center">
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={{
              position: 'absolute', 
              left: 0, 
              paddingLeft: 10,
              padding: 10,
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Image source={icons.arrow} style={{ width: 16, height: 16 }} />
          </TouchableOpacity>
          <Text className="text-lg font-bold">
            {mode === 'edit' ? 'Редактирование продукта' : 'Создание продукта'}
          </Text>
        </View>
      </View>

      {/* Форма */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ProductForm 
          mode={mode} 
          initialProduct={product}  // Передаем данные для редактирования
          onSubmit={handleSave} 
        />
      )}
    </SafeAreaView>
  );
};

export default Product;
