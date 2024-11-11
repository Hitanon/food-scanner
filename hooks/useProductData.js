import { useState } from 'react';
import { getProduct } from '../API/Api';

export default function useProductData() {
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProductData = async (ean) => {
        setLoading(true);
        setError(null);
        try {
            const product = await getProduct(ean);
            if (product && product.product) {
                const { product_name, nutriments, selected_images, quantity, serving_quantity } = product.product;
                setProductData({
                    id: ean,
                    name: product_name || 'Неизвестно',
                    calories: nutriments?.['energy-kcal_100g'] || 0,
                    proteins: nutriments?.['proteins_100g'] || 0,
                    fats: nutriments?.['fat_100g'] || 0,
                    carbs: nutriments?.['carbohydrates_100g'] || 0,
                    weight: quantity || serving_quantity || 0,
                    imageLink: selected_images?.front?.display?.ru || selected_images?.front?.display?.en || null
                });
            } else {
                setProductData(null);
            }
        } catch (fetchError) {
            setError(fetchError);
            setProductData(null);
        } finally {
            setLoading(false);
        }
    };

    return { productData, loading, error, fetchProductData };
}
