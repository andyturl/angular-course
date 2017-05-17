import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Chicken stew', 'chicken stew recipe', 'http://ukcdn.ar-cdn.com/recipes/originalxl/2a76fb08-0de9-4ce4-929e-8fdea20521dd.jpg'),
        new Recipe('Mango stew', 'Mango stew recipe', 'http://ukcdn.ar-cdn.com/recipes/originalxl/2a76fb08-0de9-4ce4-929e-8fdea20521dd.jpg')
    ];

    getRecipes() {
        return new Promise<Recipe[]>((resolve,reject) => {
            resolve(this.recipes.slice());
        })        
    }
}