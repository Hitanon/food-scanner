import { makeAutoObservable } from "mobx";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

class Product {
    id;
    name;
    calories;
    proteins;
    fats;
    carbs;
    weight;
    imageLink;
    dateAdded;

    constructor({ id, name, calories, proteins, fats, carbs, weight, imageLink, dateAdded }) {
        this.id = uuidv4();
        this.name = name;
        this.calories = calories;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;
        this.weight = weight;
        this.dateAdded = dateAdded;
        this.imageLink = imageLink;
        makeAutoObservable(this);
    }
    
    updateProduct(data) {
        this.name = data.name || this.name;
        this.calories = data.calories || this.calories;
        this.proteins = data.proteins || this.proteins;
        this.fats = data.fats || this.fats;
        this.carbs = data.carbs || this.carbs;
        this.weight = data.weight || this.weight;
        this.imageLink = data.imageLink || this.imageLink;
        this.dateAdded = data.dateAdded || this.dateAdded;
    }
}

export default Product;
