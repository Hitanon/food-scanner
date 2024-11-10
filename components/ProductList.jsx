import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

const ProductList = ({ products = [] }) => {
    if (products.length === 0) {
        return (
            <View className="mt-6">
                <Text className="text-2xl text-gray-800 text-center mb-4 font-pextrabold">Дневной рацион</Text>
                <Text className="text-lg text-gray-600 text-center font-pmedium">Список продуктов пуст</Text>
            </View>
        );
    }

    return (
        <ScrollView className="mt-6">
            {products.map((product) => (
                <View
                    key={product.id}
                    className="flex-row bg-white rounded-xl p-4 mb-3 shadow-sm items-center"
                >
                    <Image source={{ uri: product.image }} className="w-16 h-16 rounded-md mr-4" />
                    <View className="flex-1">
                        <Text className="text-lg font-bold text-gray-800">{product.name}</Text>
                        <Text className="text-sm text-gray-600">{product.weight} гр.</Text>
                    </View>
                    <Text className="text-lg font-bold text-red-500">{product.calories} ккал</Text>
                </View>
            ))}
        </ScrollView>
    );
};

export default ProductList;
