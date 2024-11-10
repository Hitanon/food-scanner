const BASE_URL = 'https://world.openfoodfacts.org';

export async function getProduct(ean) {
    const url = `${BASE_URL}/api/v0/product/${ean}.json`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const product = await response.json();
        if (product.status === 0) {
            return null;
        }
        return product;
    } catch (error) {
        console.error("Error fetching product data:", error);
        return null;
    }
}
