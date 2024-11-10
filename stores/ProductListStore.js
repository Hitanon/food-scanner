import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Product from "./ProductStore";

class ProductListStore {
    products = []; // Массив экземпляров Product

    constructor() {
        makeAutoObservable(this);
        this.initializeStore();
    }

    async initializeStore() {
        try {
            const productsData = await AsyncStorage.getItem("products");
            runInAction(() => {
                this.products = productsData ? JSON.parse(productsData).map((item) => new Product(item)) : [];
            });
        } catch (error) {
            console.error("Ошибка при инициализации данных:", error);
        }
    }

    // Добавить новый продукт с сохранением даты добавления
    async addProduct(data) {
        const dateAdded = data.dateAdded || new Date().toISOString().split('T')[0];
        const newProduct = new Product({ ...data, dateAdded });
        this.products.push(newProduct);
        await this.saveProducts();
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

    // Получить список продуктов за выбранную дату
    getProductsByDate(selectedDate) {
        return this.products.filter((product) => product.dateAdded === selectedDate);
    }

    // Получить суммарные калории, белки, жиры, углеводы за выбранную дату
    getDailySummary(selectedDate) {
        const productsByDate = this.getProductsByDate(selectedDate);
        const summary = {
            calories: 0,
            proteins: 0,
            fats: 0,
            carbs: 0,
            weight: 0
        };
        
        productsByDate.forEach((product) => {
            summary.calories += product.calories;
            summary.proteins += product.proteins;
            summary.fats += product.fats;
            summary.carbs += product.carbs;
            summary.weight += product.weight;
        });

        return summary;
    }

    // Удалить продукт из дневного рациона и обновить хранилище
    async removeProduct(id) {
        this.products = this.products.filter((product) => product.id !== id);
        await this.saveProducts();
    }

    // Очистить все данные
    async clearAllProducts() {
        this.products = [];
        await AsyncStorage.removeItem("products");
    }
}

export default new ProductListStore();
