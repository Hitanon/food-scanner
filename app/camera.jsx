import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProductContext } from "../context/ProductContext";
import useProductData from '../hooks/useProductData';
import LoadingOverlay from '../components/LoadingOverlay';

import { useRouter } from 'expo-router';

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

// Product Alert Component
const showProductAlert = (product, ean, onClose) => {
  Alert.alert(
    "Продукт отсканирован",
    `EAN: ${ean}\n\n` +
    `Название: ${product.name}\n` +
    `Калории: ${product.calories}\n` +
    `Белки: ${product.proteins}\n` +
    `Жиры: ${product.fats}\n` +
    `Углеводы: ${product.carbs}\n` +
    `Вес: ${product.weight} г\n` +
    `Изображение: ${product.imageLink}`,
    [{ text: "OK", onPress: onClose }]
  );
};

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [ean, setEan] = useState(null);

  const { selectedProduct } = useContext(ProductContext);
  const router = useRouter();
  const { productData, loading, error, fetchProductData } = useProductData();

  useEffect(() => {
    if (ean) {
      fetchProductData(ean);
    }
  }, [ean]);

  useEffect(() => {
    if (productData && ean) {
      selectedProduct.updateProduct(productData);
      showProductAlert(selectedProduct, ean, () => {
        setEan(null);
        setScanned(false);
      });
    } else if (ean && !loading && productData === null) {
      Alert.alert("Продукт не найден", `EAN: ${ean} нет в базе данных`, [
        { text: "OK", onPress: () => { setEan(null); setScanned(false); } }
      ]);
    } else if (error) {
      Alert.alert("Ошибка загрузки данных", `${error}`, [
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
        <Text className="text-center pb-4">Нам нужно ваше разрешение для доступа к камере</Text>
        <Button onPress={requestPermission} title="Предоставить разрешение" />
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
