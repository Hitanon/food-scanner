import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerField = ({ initialImage = '', onImageSelected }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    if (initialImage) {
      setImage(initialImage.trim()); 
    }
  }, [initialImage]);
  
  const handlePickImage = async () => {
    // Запрашиваем разрешение
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('⚠️Ошибка', 'Разрешение на доступ к галерее не предоставлено.');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('⚠️Ошибка', 'Не удалось выбрать изображение.');
    }
  };

  return (
    <View className="mb-5">
      <Text className="text-base text-gray-700 mb-2">Изображение продукта</Text>
      <TouchableOpacity
        onPress={handlePickImage}
        className="border border-gray-300 rounded-lg p-3 items-center justify-center bg-white"
      >
        {image ? (
          <Image
          source={{ uri: image }}
            className="w-40 h-40 rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-gray-500">Выберите изображение</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerField;
