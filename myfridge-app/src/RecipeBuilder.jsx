import React, { Component,useState,useEffect,setState } from 'react';
import { Link } from 'react-router-dom';
import {userData} from './Signin.js'
import styles from'./RecipeBuilder.module.css'
import axios from 'axios'
require('dotenv').config({ path: 'info.env' });
const key = process.env.key

class RecipeBuilder extends Component {
    constructor() {
        super()
        this.state = {
            fridgeItems: [],
            ingredientsInFridge: [],
            ingredientsWeight: [],
            recipeSearch: false,
            recipes: [],
            currentRecipe: null,
            recipeNumber: 0,
            'showRecipe': false,
            'showNutrition': false,
            'showInstructions': false,
            showIngredients: false,
            ingredientsInRecipe: []

        }
    }
    componentDidMount() {
        this.setState({ fridgeItems: userData.user.ingredients_use.ingredients }, () => {
            const itemsInFridge = this.state.fridgeItems.filter(item => item.inFridge);
            const ingredientsWeight = [];
    
            itemsInFridge.forEach(item => {
                ingredientsWeight.push({ name: item.label, weight: item.weight });
            });
    
            const sortedIngredients = itemsInFridge.sort(); 
    

            this.setState({
                ingredientsInFridge: sortedIngredients,
                ingredientsWeight: ingredientsWeight
            });
        });
    }
    componentDidUpdate() {

    }
    ingredientClicked = async (type,index) => {
        let ingredientsInFridgeC = this.state.ingredientsInFridge 
            ingredientsInFridgeC[index].inRecipe = !ingredientsInFridgeC[index].inRecipe
        this.setState({ingredientsInFridge:ingredientsInFridgeC})
        
        
    }
    searchRecipe = async () => { 
        
        let ingredientsUse = ''
        let ingredientsExcluded = ''
        this.state.ingredientsInFridge.forEach(item =>{
            if (item.inRecipe == true) {
                ingredientsUse += (',' + item.label)

            }
            else {
                ingredientsExcluded += (',' + item.label)
            }
        })
        let diets = ''
        let allergies = ''
        userData.user.restrictions.diets.map((type) => {
            if (type.value == true) {
                diets += (',' + type.id) 
                }
        })
        userData.user.restrictions.allergies.map((type) => {
            if (type.value == true) {
                allergies += (',' + type.id) 
            }
        })
        const results = await this.searchRecipeAPI(diets,allergies,ingredientsUse,ingredientsExcluded)
        const id = results[0].id
        let recipe = results[0]
        const nutrition = await axios.get(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${key}`)
        const instructions = await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${key}`)
        const information = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`)
        recipe.nutrition = nutrition
        recipe.analyzedInstructions = instructions
        recipe.information = information
        this.setState(({showRecipe: true,recipes:results,currentRecipe:recipe,recipeSearch:true}), () => {
            console.log('RecipeSearch',this.state)
        })
    }
    searchRecipeAPI = async (diet,intolerances,includeIngredients,excludeIngredients) => {
    
            const params = new URLSearchParams({
                ingredients: includeIngredients,
                apiKey: key,
                sort:'min-missing-ingredients',
                ranking:'2',
                diet: diet,
                intolerances: intolerances,
                excludeIngredients: excludeIngredients,
                addRecipeInformation: true,
                addRecipeInstructions: true,
                addRecipeNutrition: true,
                number: 100,
                displayNutrition: false,
                displayInstructions: false,
                displayBreakdown: false,
                ignorePantry: false,
                instructionsRequired: true
               
                
                
            }).toString();

       
        
        const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com'
        
        const url = `${SPOONACULAR_BASE_URL}/recipes/findByIngredients?${params}`;
        console.log([url])
        try {
            const response = await axios.get(url); /* Adjusted width to allow space for the sidebar */
            return response.data;  
        } catch (error) {
            console.error('Failed to fetch recipes:', error);
            throw error;
        }
        
    }
    saveRecipe = async () => {
        let recipe = this.state.currentRecipe
        let ts = Date.now()
        let date_time = new Date(ts)
        let month = date_time.getMonth() + 1
        let year = date_time.getFullYear()
        let day = date_time.getDate()
        recipe['date'] = `${year}-${month}-${day}`
        try {
        const response = await axios.post(`https://myfridgeweb-9977.onrender.com/${userData.user.userNumber}`,{recipe})
        
        }
        catch (error) {
            console.error('Failed to Save Recipe')
        }
        this.setState({showRecipe: false,recipeSearch: false}, () => {
            console.log('Save',this.state)
        })
        

    }
    nextRecipe = async() => {
        let index = this.state.recipeNumber + 1
        let recipe = this.state.recipes[index]
        const id = recipe.id
        const nutrition = await axios.get(`https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${key}`)
        const instructions = await axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${key}`)
        const information = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${key}`)
        recipe.nutrition = nutrition
        recipe.analyzedInstructions = instructions
        recipe.information = information
        this.setState(({currentRecipe:recipe,recipeNumber: index}), () => {})
    

    }
    showRecipe = async(key) => {
        var recipes = userData.user.recipes.recipes;


        var recipe = recipes.find(recipe => recipe.id === key);
        console.log(recipes,key,recipe)
        this.setState(({showRecipe: true, currentRecipe: recipe}),() => {})
    }
    show = async (type) => {
        let change = !this.state[type]
        this.setState({[type]: change}, () => {})
        console.log(this.state)
    }
    render(){
    
        const savedRecipes = userData.user.recipes.recipes.toReversed().map((type,index) => {
            return (
                <div className={styles.SavedRecipes}>
                <button className={styles.Recipe}onClick={() => this.showRecipe(type.id)}>{type.title}</button>
                <h6 className={styles.Date}>{type.date}</h6>
                </div>

            )
        })
        const buttons = this.state.ingredientsInFridge.map((type,index) => {
            let className = `${styles.ingredientButtonIn}`
            if (type.inRecipe == false) {
                className = `${styles.ingredientButtonNotIn}`
            }
            return(
            <button  key={type.label} className ={className}onClick={() => this.ingredientClicked(type,index)}>{type.label}</button>)
       
        })
        
        const recipeSearch = () => {

            console.log('State at Beginning',this.state)
            console.log('RecipeDisplayed',this.state.currentRecipe)
            const ingredients =  this.state.currentRecipe.nutrition.data.ingredients.map((type) => {
                const inFridge = this.state.ingredientsInFridge.find((ingredient) => ingredient.ingredientId === type.id)
                let isIn = null
                if (inFridge) {
                    isIn = 'ingredientInFridge'
                }
                else {
                     isIn = 'ingredientNotInFridge'

                }
                if (type.unit == ""){
                return (
                <li className={styles[isIn]}>{type.amount} {type.name}</li>
                )}
                else {
                    return <li className={styles[isIn]}>{type.amount} {type.unit} of {type.name} </li>
    
                }
            })
            const instructions = this.state.currentRecipe.analyzedInstructions.data[0].steps.map((type) => {
                return (
                    <li className={styles.instructionStep}>{type.number}: {type.step}</li>
                )
            })
            const showIngredients = () => {
                return <ul className={styles.ingredientList}>{ingredients}</ul>
            }
            const showInstructions = () => {
                return (<ul className={styles.instructionsList}>{instructions}</ul>)
            }
            const nutrition = this.state.currentRecipe.nutrition.data.nutrients
            const showNutrients = () => {
                return (
                    <div className={styles.Nutrition}>
                <h1 className={styles.Nutrition}>Nutrition</h1>
                <h3 className={styles.perServing}>Per serving</h3>
                <h4 className={styles.servingAmount}>Servings: {this.state.currentRecipe.information.data.servings}</h4>
                <ul className={styles.nutritionList}>
                    <li className={styles.nutritionListItem}>Calories: {nutrition[0].amount}</li>
                    <li className={styles.nutritionListItem}>Fat: {nutrition[1].amount}{nutrition[1].unit}</li>
                    <li className={styles.nutritionListItem}>Carbs: {nutrition[3].amount}{nutrition[3].unit}</li>
                    <li className={styles.nutritionListItem}>Sugar: {nutrition[5].amount}{nutrition[5].unit}</li>
                    <li className={styles.nutritionListItem}>Protein: {nutrition[8].amount}{nutrition[8].unit}</li>
                    <li className={styles.nutritionListItem}>Sodium: {nutrition[7].amount}{nutrition[7].unit}</li>
                    <li className={styles.nutritionListItem}>Fiber: {nutrition[10].amount}{nutrition[10].unit}</li>
                </ul>
                </div>
                )
            }
            const displayButtons = () => {
                if (this.state.recipeSearch == true){
                    return (
                <div className='recipeDisplayButtons'>
                <button onClick = {() => this.nextRecipe()}>Next Recipe</button>
                <button onClick = {() => this.saveRecipe()}>Choose Recipe</button>
                </div>)

                }
                if (this.state.recipeSearch == false) {
                    return (
                        <button onClick = {() => this.saveRecipe()}>Use Recipe</button>
                    )
                }
            
            }
           
            return (
            <div className={styles.recipeDisplay}>
            <div className={styles.RecipeHeading}>
                <h1>{this.state.currentRecipe.title}</h1>
                <h2> Ingredients Missing: {this.state.currentRecipe.missedIngredientCount}</h2>
            </div>
            <div className={styles.Ingredient}>
                <button type='text' onClick={() => this.show('showIngredients')}>Ingredients</button>
                <ul className={styles.IngredientList}>
                    {this.state['showIngredients'] && showIngredients()}
                </ul>
               

            </div>
            <div className={styles.Instruction}>
                <button type='text' onClick={() => this.show('showInstructions')}>Instructions</button>
                <ul className={styles.instructionList}>
                {this.state['showInstructions'] && showInstructions()}
                </ul>
            </div>
            <div className={styles.NutrientsArea}>
                <button type='text' onClick={() => this.show('showNutrition')}>Nutrients</button>
                {this.state['showNutrition'] && showNutrients()}
            </div>
            <div className={styles.ImageArea}>
                <img className={styles.image}src={this.state.currentRecipe.image} alt='RecipeImage'></img>
            </div>
            {displayButtons()}
            
            </div>
            )
        }
    return(
        <div className={styles.main}>
        <h1 id='Welcome_MyFridge'>Recipe Builder</h1>
        <div className={styles.buttons}>
            {buttons}
        </div>
        <div className={styles.searchButton}>
            <button onClick={() => this.searchRecipe()}>Search For Recipes</button>
        </div>
        <div className={styles.savedRecipes}>
            <h1>Saved Recipes</h1>
            {savedRecipes}
            <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                    <Link to={`/FridgeHome/${userData.user.userNumber}`}>
                        <button className={styles.FridgeHomeButton}>Go to Fridge Home</button>
                    </Link>
            </div>
        </div>
        <div className={styles.recipe}>
            {this.state.showRecipe && recipeSearch()}
        </div>
    </div>
    
    )
}   
}
export default RecipeBuilder