import { makeAutoObservable } from "mobx";

class Product {
    id;
    name;
    calories;
    proteins;
    fats;
    carbs;
    weight;
    dateAdded;

    constructor({ id, name, calories, proteins, fats, carbs, weight, dateAdded }) {
        this.id = id;
        this.name = name;
        this.calories = calories;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;
        this.weight = weight;
        this.dateAdded = dateAdded;
        makeAutoObservable(this);
    }
    
    updateProduct(data) {
        this.name = data.name || this.name;
        this.calories = data.calories || this.calories;
        this.proteins = data.proteins || this.proteins;
        this.fats = data.fats || this.fats;
        this.carbs = data.carbs || this.carbs;
        this.weight = data.weight || this.weight;
        this.dateAdded = data.dateAdded || this.dateAdded;
    }
}

export default Product;
