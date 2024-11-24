import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import CustomButton from './CustomButton';
import InputField from './InputField';
import ImagePickerField from './ImagePickerField';

const ProductForm = ({ mode = 'create', initialProduct = null, onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    calories: '',
    proteins: '',
    fats: '',
    carbs: '',
    weight: '',
    imageLink: '',
  });

  const [adjustedValues, setAdjustedValues] = useState({
    calories: 0,
    proteins: 0,
    fats: 0,
    carbs: 0,
  });

  // Инициализация формы при редактировании или сканировании
  useEffect(() => {
    if ((mode === 'edit' || mode === 'scan') && initialProduct) {
      // Если режим редактирования, масштабируем значения на 100 грамм
      const factor = mode === 'edit' ? initialProduct.weight / 100 : 1;
      setForm({
        name: initialProduct.name,
        calories: (initialProduct.calories / factor).toFixed(2),
        proteins: (initialProduct.proteins / factor).toFixed(2),
        fats: (initialProduct.fats / factor).toFixed(2),
        carbs: (initialProduct.carbs / factor).toFixed(2),
        weight: String(initialProduct.weight),
        imageLink: initialProduct.imageLink || '',
      });
    }
  }, [mode, initialProduct]);

  // Пересчет значений на основе веса
  useEffect(() => {
    recalculateAdjustedValues();
  }, [form.calories, form.proteins, form.fats, form.carbs, form.weight]);

  const recalculateAdjustedValues = () => {
    const multiplier = parseFloat(form.weight) / 100 || 0;
    setAdjustedValues({
      calories: parseFloat(form.calories) * multiplier || 0,
      proteins: parseFloat(form.proteins) * multiplier || 0,
      fats: parseFloat(form.fats) * multiplier || 0,
      carbs: parseFloat(form.carbs) * multiplier || 0,
    });
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const { name, weight, imageLink } = form;

    if (!name || !form.calories || !form.proteins || !form.fats || !form.carbs || !weight) {
      Alert.alert('⚠️Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    // Проверка изменений при редактировании
    if (
      mode === 'edit' &&
      name === initialProduct.name &&
      adjustedValues.calories === initialProduct.calories &&
      adjustedValues.proteins === initialProduct.proteins &&
      adjustedValues.fats === initialProduct.fats &&
      adjustedValues.carbs === initialProduct.carbs &&
      parseFloat(weight) === initialProduct.weight &&
      imageLink === initialProduct.imageLink
    ) {
      Alert.alert('⚠️Ошибка', 'Вы не внесли изменений.');
      return;
    }

    const productData = {
      id: initialProduct?.id || '',
      name,
      calories: adjustedValues.calories,
      proteins: adjustedValues.proteins,
      fats: adjustedValues.fats,
      carbs: adjustedValues.carbs,
      weight: parseFloat(weight),
      imageLink,
    };

    onSubmit(productData);
  };

  return (
    <View>
      {/* Выбор изображения */}
      <ImagePickerField
        initialImage={form.imageLink}
        onImageSelected={(uri) => handleInputChange('imageLink', uri)}
      />

      {/* Поля ввода */}
      <InputField
        label="Название продукта"
        placeholder="Введите название"
        value={form.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />
      <Text className="text-sm text-gray-600 mb-2">Введите для 100гр продукта:</Text>
      <InputField
        label="🔥 ккал"
        placeholder="Введите калории"
        value={form.calories}
        onChangeText={(value) => handleInputChange('calories', value)}
        keyboardType="numeric"
      />
      <InputField
        label="Белки"
        placeholder="Введите белки"
        value={form.proteins}
        onChangeText={(value) => handleInputChange('proteins', value)}
        keyboardType="numeric"
        labelStyles="text-green-700"
      />
      <InputField
        label="Жиры"
        placeholder="Введите жиры"
        value={form.fats}
        onChangeText={(value) => handleInputChange('fats', value)}
        keyboardType="numeric"
        labelStyles="text-orange-700"
      />
      <InputField
        label="Углеводы"
        placeholder="Введите углеводы"
        value={form.carbs}
        onChangeText={(value) => handleInputChange('carbs', value)}
        keyboardType="numeric"
        labelStyles="text-blue-700"
      />
      <InputField
        label="Вес (гр.)"
        placeholder="Введите вес"
        value={form.weight}
        onChangeText={(value) => handleInputChange('weight', value)}
        keyboardType="numeric"
        labelStyles="text-gray-700"
      />

      {/* Результаты пересчета */}
      <View className="my-5">
        <Text className="text-base text-gray-700">На вес: {form.weight}</Text>
        <Text className="text-base text-gray-700">Калории 🔥: {adjustedValues.calories.toFixed(2)}</Text>
        <Text className="text-base text-gray-700">Белки: {adjustedValues.proteins.toFixed(2)}</Text>
        <Text className="text-base text-gray-700">Жиры: {adjustedValues.fats.toFixed(2)}</Text>
        <Text className="text-base text-gray-700">Углеводы: {adjustedValues.carbs.toFixed(2)}</Text>
      </View>

      {/* Кнопка сохранения */}
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
