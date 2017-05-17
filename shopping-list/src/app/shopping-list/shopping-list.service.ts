import { EventEmitter } from '@angular/core';
import {Ingredient} from "app/shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients : Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Bananas', 12)
    ];

    getIngredients() {
        return new Promise<Ingredient[]>((resolve, reject) => {
            resolve(this.ingredients.slice());
        });
    }

    addIngredient(ingredient:Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}