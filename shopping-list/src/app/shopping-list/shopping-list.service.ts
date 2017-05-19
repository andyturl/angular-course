import { Ingredient } from "app/shared/ingredient.model";
import {Subject} from "rxjs/Subject";

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients : Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Bananas', 12)
    ];

    getIngredients() {
        return this.ingredients.slice();        
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    getIngredientsPromise() {
        console.log('getting ingredients...');
        return new Promise<Ingredient[]>((resolve, reject) => {
            console.log('got ingredients');
            resolve(this.ingredients.slice());
        });
    }

    addIngredient(ingredient:Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    remove(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}