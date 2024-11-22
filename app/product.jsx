import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProductForm from '../components/ProductForm';
import { icons } from '../constants';
import { ProductContext } from '../context/ProductContext';

const Product = () => {
  const { ProductListStore } = useContext(ProductContext);
  const navigation = useNavigation();
  const route = useRoute();

  const { mode = 'create', product } = route.params || {};
  const [loading, setLoading] = useState(false);

  // Функция для сохранения или обновления продукта
  const handleSave = async (productData) => {
  setLoading(true);
  try {
    if (mode === 'edit') {
      // Если редактируем, обновляем продукт
      await ProductListStore.updateProduct(productData);
      Alert.alert('Успех', 'Продукт успешно обновлен!');
    } else {
      // Или создаем новый продукт
      await ProductListStore.addProduct(productData);
      Alert.alert('Успех', 'Продукт успешно добавлен!');
    }
    
    // Навигация после сохранения
    navigation.goBack(); // Переходим назад после сохранения
  } catch (error) {
    Alert.alert('Ошибка', 'Не удалось сохранить продукт.');
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  }, [mode, product]);

  return (
    <SafeAreaView className="flex-1">
      
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
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }} // Устанавливаем отступы
        showsVerticalScrollIndicator={false} // Убираем вертикальный индикатор прокрутки
      >
        {/* Форма */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ProductForm
            mode={mode}
            initialProduct={product} // Передаем данные для редактирования
            onSubmit={handleSave}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Product;
