import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import CustomButton from './CustomButton';
import { v4 as uuidv4 } from 'uuid';

const ProductForm = ({ mode = 'create', initialProduct = null, onSubmit }) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [proteins, setProteins] = useState('');
  const [fats, setFats] = useState('');
  const [carbs, setCarbs] = useState('');
  const [weight, setWeight] = useState('');
  const [adjustedValues, setAdjustedValues] = useState({ calories: 0, proteins: 0, fats: 0, carbs: 0 });

  useEffect(() => {
    if (mode === 'edit' && initialProduct) {
      // Преобразуем значения обратно к "на 100 граммов"
      const factor = initialProduct.weight / 100;
      setName(initialProduct.name);
      setCalories((initialProduct.calories / factor).toFixed(2));
      setProteins((initialProduct.proteins / factor).toFixed(2));
      setFats((initialProduct.fats / factor).toFixed(2));
      setCarbs((initialProduct.carbs / factor).toFixed(2));
      setWeight(String(initialProduct.weight));
    }
  }, [mode, initialProduct]);

  useEffect(() => {
    // Пересчет значений на основе веса
    recalculateAdjustedValues();
  }, [calories, proteins, fats, carbs, weight]);

  const recalculateAdjustedValues = () => {
    const multiplier = parseFloat(weight) / 100 || 0;
    setAdjustedValues({
      calories: parseFloat(calories) * multiplier || 0,
      proteins: parseFloat(proteins) * multiplier || 0,
      fats: parseFloat(fats) * multiplier || 0,
      carbs: parseFloat(carbs) * multiplier || 0,
    });
  };

  const handleSave = () => {
    if (!name || !calories || !proteins || !fats || !carbs || !weight) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    const productData = {
      id: initialProduct?.id || uuidv4(),
      name,
      calories: adjustedValues.calories,
      proteins: adjustedValues.proteins,
      fats: adjustedValues.fats,
      carbs: adjustedValues.carbs,
      weight: parseFloat(weight),
      image: initialProduct?.image || 'https://via.placeholder.com/150', // Пример изображения
    };

    onSubmit(productData);
  };

  return (
    <View>
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

      <View className="mb-5">
        <Text className="text-base text-gray-700 mb-2">Вес (гр.)</Text>
        <TextInput
          className="bg-white p-3 rounded-lg text-base"
          placeholder="Введите вес"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      {/* Отображение пересчитанных значений */}
      <View className="my-5">
        <Text className="text-base text-gray-700">На вес: {weight}</Text>
        <Text className="text-base text-gray-700">Калории 🔥: {adjustedValues.calories.toFixed(2)}</Text>
        <Text className="text-base text-gray-700">Белки: {adjustedValues.proteins.toFixed(2)}</Text>
        <Text className="text-base text-gray-700">Жиры: {adjustedValues.fats.toFixed(2)}</Text>
        <Text className="text-base text-gray-700">Углеводы: {adjustedValues.carbs.toFixed(2)}</Text>
      </View>

      <CustomButton
        title={mode === 'edit' ? 'Сохранить изменения' : 'Создать продукт'}
        handlePress={handleSave}
        containerStyles="bg-primary my-2 w-full"
        textStyles="text-white font-medium"
      />
    </View>
  );
};

export default ProductForm;
