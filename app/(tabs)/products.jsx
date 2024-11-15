import { View, Text, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { ProductContext } from '../../context/ProductContext'
import { SafeAreaView } from 'react-native-safe-area-context'

const Products = () => {
  const { ProductListStore } = useContext(ProductContext);

  return (
    <SafeAreaView>
      <Text>Список всех продуктов</Text>
      <FlatList
        data={ProductListStore.products}
        keyExtractor={(item) => item.id }
        renderItem={({ item }) => (
          <View>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.calories} ккал</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default Products;
