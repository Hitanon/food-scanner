import { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { observer } from 'mobx-react-lite';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductContext } from '../../context/ProductContext'; // импортируем контекст
import Summary from '../../components/Summary';
import ProductList from '../../components/ProductList';

const Home = observer(() => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Получаем ProductListStore из контекста
  const productListStore = useContext(ProductContext);

  // Обработка изменения даты
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (event, date) => setSelectedDate(date || selectedDate),
      mode: 'date',
    });
  };

  // Форматирование выбранной даты
  const formattedDate = selectedDate.toISOString().split('T')[0];

  // Получение продуктов и суммарных значений на выбранную дату
  const products = productListStore.getProductsByDate(formattedDate);
  const { calories, proteins, fats, carbs } = productListStore.getDailySummary(formattedDate);

  return (
    <SafeAreaView className="flex-1 bg-gray-200 p-4">
      {/* Выбор даты */}
      <TouchableOpacity onPress={showDatePicker} className="flex-row justify-center items-center py-2">
        <Text className="text-lg font-bold text-gray-800">Выберите дату:</Text>
        <Text className="text-lg font-bold text-primary ml-2">
          {selectedDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {/* Суммарные значения */}
      <Summary calories={calories} proteins={proteins} fats={fats} carbs={carbs} />

      {/* Список продуктов */}
      <ProductList products={products} />
    </SafeAreaView>
  );
});

export default Home;
