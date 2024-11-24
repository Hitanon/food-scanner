import { Text } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from 'expo-router';
import { ProductContext } from '../../context/ProductContext';

const AddProduct = () => {
  const navigation = useNavigation();
  const { currentProduct } = useContext(ProductContext);

  const handleCameraRedirect = () => {

    navigation.navigate('camera');
  };

  const handleProductRedirect = () => {
    currentProduct.clear();
    navigation.navigate('product');
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-4 bg-white">
      <Text className="text-2xl text-center font-bold mb-4">Выбор способа добавления продукта</Text>

      <CustomButton
        title="Камера"
        handlePress={handleCameraRedirect}
        containerStyles="bg-primary my-2 w-full"
        textStyles="text-white font-medium"
      />
      <CustomButton
        title="Вручную"
        handlePress={handleProductRedirect}
        containerStyles="border border-primary my-4 w-full"
        textStyles="text-black font-medium"
      />

    </SafeAreaView>
  );
};

export default AddProduct;
