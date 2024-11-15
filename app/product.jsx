import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { ProductContext, generateId } from '../context/ProductContext';
import { icons } from '../constants';
import CustomButton from '../components/CustomButton';

const Product = () => {
  const navigation = useNavigation();
  const { ProductListStore, selectedProduct } = useContext(ProductContext);

  const [name, setName] = useState(selectedProduct.name || '');
  const [calories, setCalories] = useState(String(selectedProduct.calories || ''));
  const [proteins, setProteins] = useState(String(selectedProduct.proteins || ''));
  const [fats, setFats] = useState(String(selectedProduct.fats || ''));
  const [carbs, setCarbs] = useState(String(selectedProduct.carbs || ''));

  const handleCreateProduct = () => {
    const newProductData = {
      name,
      calories: parseFloat(calories),
      proteins: parseFloat(proteins),
      fats: parseFloat(fats),
      carbs: parseFloat(carbs),
    };
    
    selectedProduct.updateProduct(newProductData);
    ProductListStore.addProduct(selectedProduct);

    navigation.navigate('products');

    Alert.alert("Продукт создан", "Продукт успешно добавлен в список!");
  };

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
              padding: 10, // Увеличиваем область вокруг стрелки
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} // Увеличиваем область для клика вокруг иконки
          >
            <Image source={icons.arrow} style={{ width: 16, height: 16 }} />
          </TouchableOpacity>

          <Text className="text-lg font-bold">Создание продукта</Text>
        </View>
      </View>


      <View className="mb-5">
        <Text className="text-base text-gray-700 mb-2">Название продукта</Text>
        <TextInput
          className="bg-white p-3 rounded-lg text-base"
          placeholder="Введите название"
          value={name}
          onChangeText={setName}
        />
      </View>

      <Text className="text-sm text-gray-600 mb-2">Введите для 100гр продукта:</Text>

      <View className="mb-5">
        <Text className="text-base text-gray-700 mb-2">🔥 ккал</Text>
        <TextInput
          className="bg-white p-3 rounded-lg text-base"
          placeholder="Введите калории"
          keyboardType="numeric"
          value={calories}
          onChangeText={setCalories}
        />
      </View>

      <View className="mb-5">
        <Text className="text-base text-green-700 mb-2">Белки</Text>
        <TextInput
          className="bg-white p-3 rounded-lg text-base"
          placeholder="Введите белки"
          keyboardType="numeric"
          value={proteins}
          onChangeText={setProteins}
        />
      </View>

      <View className="mb-5">
        <Text className="text-base text-orange-700 mb-2">Жиры</Text>
        <TextInput
          className="bg-white p-3 rounded-lg text-base"
          placeholder="Введите жиры"
          keyboardType="numeric"
          value={fats}
          onChangeText={setFats}
        />
      </View>

      <View className="mb-5">
        <Text className="text-base text-blue-700 mb-2">Углеводы</Text>
        <TextInput
          className="bg-white p-3 rounded-lg text-base"
          placeholder="Введите углеводы"
          keyboardType="numeric"
          value={carbs}
          onChangeText={setCarbs}
        />
      </View>

      <CustomButton
        title="Создать продукт"
        handlePress={handleCreateProduct}
        containerStyles="bg-primary my-2 w-full"
        textStyles="text-white font-medium"
      />
    </SafeAreaView>
  );
};

export default Product;
