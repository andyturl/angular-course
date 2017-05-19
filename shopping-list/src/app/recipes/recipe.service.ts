import { Subject } from 'rxjs/Subject';
import { ShoppingListService } from 'app/shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable} from '@angular/core';
import {Recipe} from './recipe.model';

@Injectable()
export class RecipeService {    
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Chicken stew', 'chicken stew recipe', 'http://ukcdn.ar-cdn.com/recipes/originalxl/2a76fb08-0de9-4ce4-929e-8fdea20521dd.jpg',[new Ingredient('chicken',3)]),
        new Recipe('Mango stew', 'Mango stew recipe', 'https://lh3.googleusercontent.com/C22deJtAFi731LGnG6DmvDA74xGlomwoKPVwr-gUqzGwXhWYyZnOhNp2aTyxbl7u1AbNVW1u546V2QLkpVyh=s730-e365',[new Ingredient('mango', 1)])
    ];

    constructor(private shoppingListService: ShoppingListService){}

    getRecipes() {        
        return this.recipes.slice();              
    }

    getRecipe(index: number){
        return this.recipes[index];        
    }

    getRecipesPromise() {
        console.log('getting recipes...');
        return new Promise<Recipe[]>((resolve,reject) => {
            console.log('got recipes');
            setTimeout(() => {resolve(this.recipes.slice());}, 1000);
        });        
    }

    getRecipePromise(index: number){
        console.log("getting recipe id: ", index);
        return new Promise<Recipe>((resolve, reject) => {
            console.log("got recipe ", this.recipes[index]);
            setTimeout(() => {resolve(this.recipes[index]);}, 1000);
        });
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);        
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}