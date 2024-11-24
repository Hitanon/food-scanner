import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductContext } from "../context/ProductContext";
import useProductData from '../hooks/useProductData';
import LoadingOverlay from '../components/LoadingOverlay';
import CustomButton from '../components/CustomButton';

import { useRouter } from 'expo-router';
import { useNavigation } from 'expo-router';

// Header Component
const Header = ({ onBack }) => (
  <View className="flex-row items-center justify-between px-6 py-4 bg-white">
    <Text className="text-black text-xl font-bold">Отсканируйте штрихкод</Text>
    <TouchableOpacity onPress={onBack}>
      <Ionicons name="close" size={24} color="black" />
    </TouchableOpacity>
  </View>
);

// Camera Overlay Component
const CameraViewOverlay = () => (
  <View className="absolute inset-0 justify-center h-full w-full items-center">
    <View className="w-80 h-80 border-2 border-white rounded-2xl" />
  </View>
);

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [ean, setEan] = useState(null);

  const { currentProduct } = useContext(ProductContext);
  const router = useRouter();
  const { productData, loading, error, fetchProductData } = useProductData();

  const navigation = useNavigation();

  useEffect(() => {
    if (ean) {
      fetchProductData(ean);
    }
  }, [ean]);

  useEffect(() => {
    if (productData && ean) {
      currentProduct.clear();
      currentProduct.updateProduct(productData);
      navigation.navigate('product', { mode: 'scan' });
      setEan(null);
      setScanned(false);
    } else if (ean && !loading && productData === null) {
      Alert.alert("⚠️Продукт не найден", `EAN: ${ean} нет в базе данных`, [
        { text: "OK", onPress: () => { setEan(null); setScanned(false); } }
      ]);
    } else if (error) {
      Alert.alert("⚠️Ошибка загрузки данных", `${error}`, [
        { text: "OK", onPress: () => { setEan(null); setScanned(false); } }
      ]);
    }
  }, [productData, loading, error]);

  const handleBarcodeScanned = ({ data }) => {
    if (!scanned && !loading) {
      setScanned(true);
      setEan(data);
    }
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-center text-lg pb-2">Нам нужно ваше разрешение для доступа к камере</Text>
        <CustomButton
          title="Предоставить разрешение"
          handlePress={requestPermission}
          containerStyles="w-[90%] bg-primary m-4"
          textStyles="text-white font-pmedium"
        />
        <CustomButton></CustomButton>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <Header onBack={() => router.back()} />
      <View className="flex-1 relative">
        {loading && <LoadingOverlay />}
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8'] }}
        />
        <CameraViewOverlay />
      </View>
    </SafeAreaView>
  );
}
