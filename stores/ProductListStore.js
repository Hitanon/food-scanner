import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "./ProductStore";

class ProductListStore {
    products = []; // Массив всех продуктов
    dietProducts = []; // Массив продуктов в рационе

    constructor() {
        makeAutoObservable(this);
        this.initializeStore();
    }

    async initializeStore() {
        try {
            const productsData = await AsyncStorage.getItem("products");
            const dietProductsData = await AsyncStorage.getItem("dietProducts");

            runInAction(() => {
                this.products = productsData
                    ? JSON.parse(productsData).map((item) => new Product(item))
                    : [];
                this.dietProducts = dietProductsData
                    ? JSON.parse(dietProductsData).map((item) => new Product(item))
                    : [];
            });
        } catch (error) {
            console.error("Ошибка при инициализации данных:", error);
        }
    }

    // Сохранить все продукты в AsyncStorage
    async saveProducts() {
        try {
            const productsData = this.products.map((product) => ({ ...product }));
            await AsyncStorage.setItem("products", JSON.stringify(productsData));
        } catch (error) {
            console.error("Ошибка при сохранении продуктов:", error);
        }
    }

    // Сохранить продукты рациона в AsyncStorage
    async saveDietProducts() {
        try {
            const dietProductsData = this.dietProducts.map((product) => ({ ...product }));
            await AsyncStorage.setItem("dietProducts", JSON.stringify(dietProductsData));
        } catch (error) {
            console.error("Ошибка при сохранении продуктов рациона:", error);
        }
    }

    // Добавить новый продукт
    async addProduct(data) {
        const newProduct = new Product({ ...data });
        this.products.push(newProduct);
        await this.saveProducts();
    }

    // Обновить продукт
    async updateProduct(updatedProductData) {
        const productIndex = this.products.findIndex((product) => product.id === updatedProductData.id);
        const dietProductIndex = this.dietProducts.findIndex((product) => product.id === updatedProductData.id);

        if (productIndex !== -1) {
            // Продукт найден в общем списке
            this.products[productIndex] = { ...updatedProductData };
        } else if (dietProductIndex !== -1) {
            // Продукт найден в списке рациона
            this.dietProducts[dietProductIndex] = { ...updatedProductData, dateAdded: this.dietProducts[dietProductIndex].dateAdded };
        } else {
            // Продукт не найден в обоих списках
            console.log("Продукт не найден в списках");
            return;
        }

        await this.saveProducts();
        await this.saveDietProducts();
    }

    // Удалить продукт
    async removeProduct(id) {
        this.products = this.products.filter((product) => product.id !== id);
        this.dietProducts = this.dietProducts.filter((product) => product.id !== id); // Удаляем из рациона
        await this.saveProducts();
        await this.saveDietProducts();
    }

    // Получить все продукты
    getAllProducts() {
        return this.products;
    }

    // Методы для работы с рационом:

    // Добавить продукт в рацион
    async addToDiet(product) {
        const currentDate = new Date().toISOString().split("T")[0];
        const dietProduct = new Product({
            ...product,
            dateAdded: currentDate,
        });
        this.dietProducts.push(dietProduct);
        await this.saveDietProducts();
    }

    // Удалить продукт из рациона
    async removeFromDiet(productId) {
        this.dietProducts = this.dietProducts.filter((product) => product.id !== productId);
        await this.saveDietProducts();
    }

    // Очистить рацион
    async clearDiet() {
        this.dietProducts = [];
        await this.saveDietProducts();
    }

    // Получить продукты в рационе
    getDietProducts() {
        return this.dietProducts;
    }

    // Получить продукты по дате
    getDietProductsByDate(selectedDate) {
        return this.dietProducts.filter((product) => product.dateAdded === selectedDate);
    }

    // Получить суммарные калории, белки, жиры, углеводы за выбранную дату
    getDietSummaryByDate(selectedDate) {
        const productsByDate = this.getDietProductsByDate(selectedDate);
        const summary = {
            calories: 0,
            proteins: 0,
            fats: 0,
            carbs: 0,
            weight: 0,
        };

        productsByDate.forEach((product) => {
            summary.calories += product.calories || 0;
            summary.proteins += product.proteins || 0;
            summary.fats += product.fats || 0;
            summary.carbs += product.carbs || 0;
            summary.weight += product.weight || 0;
        });

        return summary;
    }

}

export default new ProductListStore();
