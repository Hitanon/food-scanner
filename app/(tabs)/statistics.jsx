import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductContext } from '../../context/ProductContext';
import { BarChart } from 'react-native-chart-kit';

const Statistics = () => {
    const { ProductListStore } = useContext(ProductContext);
    const [activeTab, setActiveTab] = useState('calories'); // Добавили 'calories' как дефолтный активный таб

    // Формирование массива последних 7 дней
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
    }).reverse();

    // Получение данных для графиков
    const data = dates.map((date) => ProductListStore.getDietSummaryByDate(date));

    // Данные для активного таба
    const chartData = {
        labels: dates.map((date) => date.split('-').slice(1).join('/')), // Формат: MM/DD
        datasets: [
            {
                data:
                    activeTab === 'calories'
                        ? data.map((summary) => summary.calories)
                        : activeTab === 'proteins'
                            ? data.map((summary) => summary.proteins)
                            : activeTab === 'fats'
                                ? data.map((summary) => summary.fats)
                                : data.map((summary) => summary.carbs), // Для углеводов
            },
        ],
    };

    const screenWidth = Dimensions.get('window').width;

    return (
        <SafeAreaView className="flex-1 py-5 bg-gray-200">
            {/* Табы */}
            <View className="flex-row justify-center mt-4 mb-2">
                <TouchableOpacity
                    className={`px-4 py-2 rounded-full ${activeTab === 'calories' ? 'bg-primary' : 'bg-white'}`}
                    onPress={() => setActiveTab('calories')}
                >
                    <Text className={activeTab === 'calories' ? 'text-white font-bold' : 'text-gray-700'}>
                        Калории
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`px-4 py-2 ml-2 rounded-full ${activeTab === 'proteins' ? 'bg-primary' : 'bg-white'}`}
                    onPress={() => setActiveTab('proteins')}
                >
                    <Text className={activeTab === 'proteins' ? 'text-white font-bold' : 'text-gray-700'}>
                        Белки
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`px-4 py-2 ml-2 rounded-full ${activeTab === 'fats' ? 'bg-primary' : 'bg-white'}`}
                    onPress={() => setActiveTab('fats')}
                >
                    <Text className={activeTab === 'fats' ? 'text-white font-bold' : 'text-gray-700'}>
                        Жиры
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`px-4 py-2 ml-2 rounded-full ${activeTab === 'carbs' ? 'bg-primary' : 'bg-white'}`}
                    onPress={() => setActiveTab('carbs')}
                >
                    <Text className={activeTab === 'carbs' ? 'text-white font-bold' : 'text-gray-700'}>
                        Углеводы
                    </Text>
                </TouchableOpacity>
            </View>

            {/* График */}
            <View className="flex-1 items-center justify-top bg-white mx-4 mt-4 rounded-lg px-4 py-8 shadow">
                <Text className="text-lg font-pbold text-gray-800 mb-10">
                    {activeTab === 'calories'
                        ? 'График калорий'
                        : activeTab === 'proteins'
                            ? 'График белков'
                            : activeTab === 'fats'
                                ? 'График жиров'
                                : 'График углеводов'}
                </Text>
                <BarChart
                    data={chartData}
                    width={screenWidth - 50} // Отступы
                    height={220}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(80, 149, 5, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        barPercentage: 0.75,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default Statistics;
