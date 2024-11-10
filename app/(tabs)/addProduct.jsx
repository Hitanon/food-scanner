import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from 'expo-router';

const AddProduct = () => {
  const navigation = useNavigation();

  // Функция для редиректа на экран камеры
  const handleCameraRedirect = () => {
    navigation.navigate('camera');
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-4 bg-white">
      <Text className="text-2xl text-center font-bold mb-4">Выбор способа добавления продукта</Text>
      
      {/* CustomButton для перехода на экран камеры */}
      <CustomButton 
        title="Камера" 
        handlePress={handleCameraRedirect} 
        containerStyles="bg-primary my-4 w-full" 
        textStyles="text-white font-medium" 
      />

      <Text className="text-lg text-gray-600">Вручную</Text>
    </SafeAreaView>
  );
};

export default AddProduct;
