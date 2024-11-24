import { makeAutoObservable } from "mobx";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { convertWeightToGrams } from "../utils/functions";

class Product {
    id;
    name;
    calories;
    proteins;
    fats;
    carbs;
    weight; // всегда в граммах
    imageLink;
    dateAdded;

    constructor({ name, calories, proteins, fats, carbs, weight, imageLink, dateAdded }) {
        this.id = uuidv4();
        this.name = name;
        this.calories = calories;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;
        this.weight = convertWeightToGrams(weight); // обработка веса
        this.dateAdded = dateAdded;
        this.imageLink = imageLink;
        makeAutoObservable(this);
    }

    updateProduct(data) {
        this.id = data.id || this.id;
        this.name = data.name || this.name;
        this.calories = data.calories || this.calories;
        this.proteins = data.proteins || this.proteins;
        this.fats = data.fats || this.fats;
        this.carbs = data.carbs || this.carbs;
        this.weight = convertWeightToGrams(data.weight) || this.weight;
        this.imageLink = data.imageLink || this.imageLink;
        this.dateAdded = data.dateAdded || this.dateAdded;
    }

    clear() {
        this.id="";
        this.name = "";
        this.calories = 0;
        this.proteins = 0;
        this.fats = 0;
        this.carbs = 0;
        this.weight = 0;
        this.imageLink = "";
        this.dateAdded = "";
    }
}

export default Product;
