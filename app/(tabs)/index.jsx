import React, { useState, useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductContext } from '../../context/ProductContext';
import Summary from '../../components/Summary';
import ProductList from '../../components/ProductList';
import { useNavigation } from '@react-navigation/native';
import { round } from '../../utils/functions';

const Home = observer(() => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigation = useNavigation();
  const { ProductListStore, currentProduct } = useContext(ProductContext);

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (event, date) => setSelectedDate(date || selectedDate),
      mode: 'date',
    });
  };

  const formattedDate = selectedDate.toISOString().split('T')[0];

  // Получаем продукты из рациона за выбранную дату
  const dietProducts = ProductListStore.getDietProductsByDate(formattedDate);

  // Получаем сводку по продуктам в рационе
  const { calories, proteins, fats, carbs, weight } = ProductListStore.getDietSummaryByDate(formattedDate);

  return (
    <SafeAreaView className="flex-1 bg-gray-200 p-4">
      {/* Выбор даты */}
      <TouchableOpacity onPress={showDatePicker} className="flex-row justify-center items-center py-2">
        <Text className="text-lg font-bold text-gray-800">Выберите дату:</Text>
        <Text className="text-lg font-bold text-primary ml-2">
          {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {/* Сводка по рациону */}
      <Summary
        calories={round(calories)}
        proteins={round(proteins)}
        fats={round(fats)}
        carbs={round(carbs)}
        weight={round(weight)}
      />

      {/* Список продуктов в рационе */}
      <View className="flex-1">
        {dietProducts.length > 0 ? (
          <ProductList
            products={dietProducts}
            onEdit={(product) => {
              currentProduct.updateProduct(product);
              navigation.navigate('product', { mode: 'edit' })
            }}
            onDelete={(product) => ProductListStore.removeFromDiet(product.id, formattedDate)}
          />
        ) : (
          <Text className="text-center text-gray-600 mt-4">
            ❗ Продукты для выбранной даты отсутствуют.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
});

export default Home;
