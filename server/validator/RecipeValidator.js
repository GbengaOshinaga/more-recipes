import Recipes from '../models/Recipes';

export default class RecipeValidator{

    static isRecipeValid(recipe){
        let errors = [];
        if(!(recipe.recipeName && recipe.recipeDetail && recipe.ingredients)){
            errors.push('Recipe Name, Description and Ingredients are required');
        }
        return errors;
    }

    static areParamsValid(sort, order){
        let errors = [];
        if(sort !== 'upvotes'){
            errors.push('sort parameter must be upvotes, instead found ' + sort);
        }
        
        if(order !== 'asc' && order !== 'des'){
            errors.push('Invalid order parameter, must be "asc" or "des", instead found ' + order);
        }
        return errors;
    }

    static isIDValid(id){
        let errors = [];
        if(Number(id) <= 0){
            errors.push('Id cannot be 0 or a negative value');
        }
        let recipes = new Recipes();
        let ids = recipes.getRecipesIDs();
        let isFound;
        for(let i = 0; i < ids.length; i++){
           if(ids[i] === Number(id)){
               isFound = true;
           } 
        }
        if(!isFound){
            errors.push('Id does not exist');
        }
        return errors;
    }
}