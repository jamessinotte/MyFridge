"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Signin = require("./Signin.js");
var _RecipeBuilderModule = _interopRequireDefault(require("./RecipeBuilder.module.css"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
require('dotenv').config({
  path: 'info.env'
});
const key = process.env.key;
class RecipeBuilder extends _react.Component {
  constructor() {
    super();
    _defineProperty(this, "ingredientClicked", async (type, index) => {
      let ingredientsInFridgeC = this.state.ingredientsInFridge;
      ingredientsInFridgeC[index].inRecipe = !ingredientsInFridgeC[index].inRecipe;
      this.setState({
        ingredientsInFridge: ingredientsInFridgeC
      });
    });
    _defineProperty(this, "searchRecipe", async () => {
      let ingredientsUse = '';
      let ingredientsExcluded = '';
      this.state.ingredientsInFridge.forEach(item => {
        if (item.inRecipe == true) {
          ingredientsUse += ',' + item.label;
        } else {
          ingredientsExcluded += ',' + item.label;
        }
      });
      let diets = '';
      let allergies = '';
      _Signin.userData.user.restrictions.diets.map(type => {
        if (type.value == true) {
          diets += ',' + type.id;
        }
      });
      _Signin.userData.user.restrictions.allergies.map(type => {
        if (type.value == true) {
          allergies += ',' + type.id;
        }
      });
      const results = await this.searchRecipeAPI(diets, allergies, ingredientsUse, ingredientsExcluded);
      const id = results[0].id;
      let recipe = results[0];
      const nutrition = await _axios.default.get("https://api.spoonacular.com/recipes/".concat(id, "/nutritionWidget.json?apiKey=").concat(key));
      const instructions = await _axios.default.get("https://api.spoonacular.com/recipes/".concat(id, "/analyzedInstructions?apiKey=").concat(key));
      const information = await _axios.default.get("https://api.spoonacular.com/recipes/".concat(id, "/information?apiKey=").concat(key));
      recipe.nutrition = nutrition;
      recipe.analyzedInstructions = instructions;
      recipe.information = information;
      this.setState({
        showRecipe: true,
        recipes: results,
        currentRecipe: recipe,
        recipeSearch: true
      }, () => {
        console.log('RecipeSearch', this.state);
      });
    });
    _defineProperty(this, "searchRecipeAPI", async (diet, intolerances, includeIngredients, excludeIngredients) => {
      const params = new URLSearchParams({
        ingredients: includeIngredients,
        apiKey: key,
        sort: 'min-missing-ingredients',
        ranking: '2',
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
      const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com';
      const url = "".concat(SPOONACULAR_BASE_URL, "/recipes/findByIngredients?").concat(params);
      console.log([url]);
      try {
        const response = await _axios.default.get(url); /* Adjusted width to allow space for the sidebar */
        return response.data;
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
        throw error;
      }
    });
    _defineProperty(this, "saveRecipe", async () => {
      let recipe = this.state.currentRecipe;
      let ts = Date.now();
      let date_time = new Date(ts);
      let month = date_time.getMonth() + 1;
      let year = date_time.getFullYear();
      let day = date_time.getDate();
      recipe['date'] = "".concat(year, "-").concat(month, "-").concat(day);
      try {
        const response = await _axios.default.post("https://myfridgeweb-9977.onrender.com/".concat(_Signin.userData.user.userNumber), {
          recipe
        });
      } catch (error) {
        console.error('Failed to Save Recipe');
      }
      this.setState({
        showRecipe: false,
        recipeSearch: false
      }, () => {
        console.log('Save', this.state);
      });
    });
    _defineProperty(this, "nextRecipe", async () => {
      let index = this.state.recipeNumber + 1;
      let recipe = this.state.recipes[index];
      const id = recipe.id;
      const nutrition = await _axios.default.get("https://api.spoonacular.com/recipes/".concat(id, "/nutritionWidget.json?apiKey=").concat(key));
      const instructions = await _axios.default.get("https://api.spoonacular.com/recipes/".concat(id, "/analyzedInstructions?apiKey=").concat(key));
      const information = await _axios.default.get("https://api.spoonacular.com/recipes/".concat(id, "/information?apiKey=").concat(key));
      recipe.nutrition = nutrition;
      recipe.analyzedInstructions = instructions;
      recipe.information = information;
      this.setState({
        currentRecipe: recipe,
        recipeNumber: index
      }, () => {});
    });
    _defineProperty(this, "showRecipe", async key => {
      var recipes = _Signin.userData.user.recipes.recipes;
      var recipe = recipes.find(recipe => recipe.id === key);
      console.log(recipes, key, recipe);
      this.setState({
        showRecipe: true,
        currentRecipe: recipe
      }, () => {});
    });
    _defineProperty(this, "show", async type => {
      let change = !this.state[type];
      this.setState({
        [type]: change
      }, () => {});
      console.log(this.state);
    });
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
    };
  }
  componentDidMount() {
    this.setState({
      fridgeItems: _Signin.userData.user.ingredients_use.ingredients
    }, () => {
      const itemsInFridge = this.state.fridgeItems.filter(item => item.inFridge);
      const ingredientsWeight = [];
      itemsInFridge.forEach(item => {
        ingredientsWeight.push({
          name: item.label,
          weight: item.weight
        });
      });
      const sortedIngredients = itemsInFridge.sort();
      this.setState({
        ingredientsInFridge: sortedIngredients,
        ingredientsWeight: ingredientsWeight
      });
    });
  }
  componentDidUpdate() {}
  render() {
    const savedRecipes = _Signin.userData.user.recipes.recipes.toReversed().map((type, index) => {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: _RecipeBuilderModule.default.SavedRecipes
      }, /*#__PURE__*/_react.default.createElement("button", {
        className: _RecipeBuilderModule.default.Recipe,
        onClick: () => this.showRecipe(type.id)
      }, type.title), /*#__PURE__*/_react.default.createElement("h6", {
        className: _RecipeBuilderModule.default.Date
      }, type.date));
    });
    const buttons = this.state.ingredientsInFridge.map((type, index) => {
      let className = "".concat(_RecipeBuilderModule.default.ingredientButtonIn);
      if (type.inRecipe == false) {
        className = "".concat(_RecipeBuilderModule.default.ingredientButtonNotIn);
      }
      return /*#__PURE__*/_react.default.createElement("button", {
        key: type.label,
        className: className,
        onClick: () => this.ingredientClicked(type, index)
      }, type.label);
    });
    const recipeSearch = () => {
      console.log('State at Beginning', this.state);
      console.log('RecipeDisplayed', this.state.currentRecipe);
      const ingredients = this.state.currentRecipe.nutrition.data.ingredients.map(type => {
        const inFridge = this.state.ingredientsInFridge.find(ingredient => ingredient.ingredientId === type.id);
        let isIn = null;
        if (inFridge) {
          isIn = 'ingredientInFridge';
        } else {
          isIn = 'ingredientNotInFridge';
        }
        if (type.unit == "") {
          return /*#__PURE__*/_react.default.createElement("li", {
            className: _RecipeBuilderModule.default[isIn]
          }, type.amount, " ", type.name);
        } else {
          return /*#__PURE__*/_react.default.createElement("li", {
            className: _RecipeBuilderModule.default[isIn]
          }, type.amount, " ", type.unit, " of ", type.name, " ");
        }
      });
      const instructions = this.state.currentRecipe.analyzedInstructions.data[0].steps.map(type => {
        return /*#__PURE__*/_react.default.createElement("li", {
          className: _RecipeBuilderModule.default.instructionStep
        }, type.number, ": ", type.step);
      });
      const showIngredients = () => {
        return /*#__PURE__*/_react.default.createElement("ul", {
          className: _RecipeBuilderModule.default.ingredientList
        }, ingredients);
      };
      const showInstructions = () => {
        return /*#__PURE__*/_react.default.createElement("ul", {
          className: _RecipeBuilderModule.default.instructionsList
        }, instructions);
      };
      const nutrition = this.state.currentRecipe.nutrition.data.nutrients;
      const showNutrients = () => {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: _RecipeBuilderModule.default.Nutrition
        }, /*#__PURE__*/_react.default.createElement("h1", {
          className: _RecipeBuilderModule.default.Nutrition
        }, "Nutrition"), /*#__PURE__*/_react.default.createElement("h3", {
          className: _RecipeBuilderModule.default.perServing
        }, "Per serving"), /*#__PURE__*/_react.default.createElement("h4", {
          className: _RecipeBuilderModule.default.servingAmount
        }, "Servings: ", this.state.currentRecipe.information.data.servings), /*#__PURE__*/_react.default.createElement("ul", {
          className: _RecipeBuilderModule.default.nutritionList
        }, /*#__PURE__*/_react.default.createElement("li", {
          className: _RecipeBuilderModule.default.nutritionListItem
        }, "Calories: ", nutrition[0].amount), /*#__PURE__*/_react.default.createElement("li", {
          className: _RecipeBuilderModule.default.nutritionListItem
        }, "Fat: ", nutrition[1].amount, nutrition[1].unit), /*#__PURE__*/_react.default.createElement("li", {
          className: _RecipeBuilderModule.default.nutritionListItem
        }, "Carbs: ", nutrition[3].amount, nutrition[3].unit), /*#__PURE__*/_react.default.createElement("li", {
          className: _RecipeBuilderModule.default.nutritionListItem
        }, "Sugar: ", nutrition[5].amount, nutrition[5].unit), /*#__PURE__*/_react.default.createElement("li", {
          className: _RecipeBuilderModule.default.nutritionListItem
        }, "Protein: ", nutrition[8].amount, nutrition[8].unit), /*#__PURE__*/_react.default.createElement("li", {
          className: _RecipeBuilderModule.default.nutritionListItem
        }, "Sodium: ", nutrition[7].amount, nutrition[7].unit), /*#__PURE__*/_react.default.createElement("li", {
          className: _RecipeBuilderModule.default.nutritionListItem
        }, "Fiber: ", nutrition[10].amount, nutrition[10].unit)));
      };
      const displayButtons = () => {
        if (this.state.recipeSearch == true) {
          return /*#__PURE__*/_react.default.createElement("div", {
            className: "recipeDisplayButtons"
          }, /*#__PURE__*/_react.default.createElement("button", {
            onClick: () => this.nextRecipe()
          }, "Next Recipe"), /*#__PURE__*/_react.default.createElement("button", {
            onClick: () => this.saveRecipe()
          }, "Choose Recipe"));
        }
        if (this.state.recipeSearch == false) {
          return /*#__PURE__*/_react.default.createElement("button", {
            onClick: () => this.saveRecipe()
          }, "Use Recipe");
        }
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        className: _RecipeBuilderModule.default.recipeDisplay
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: _RecipeBuilderModule.default.RecipeHeading
      }, /*#__PURE__*/_react.default.createElement("h1", null, this.state.currentRecipe.title), /*#__PURE__*/_react.default.createElement("h2", null, " Ingredients Missing: ", this.state.currentRecipe.missedIngredientCount)), /*#__PURE__*/_react.default.createElement("div", {
        className: _RecipeBuilderModule.default.Ingredient
      }, /*#__PURE__*/_react.default.createElement("button", {
        type: "text",
        onClick: () => this.show('showIngredients')
      }, "Ingredients"), /*#__PURE__*/_react.default.createElement("ul", {
        className: _RecipeBuilderModule.default.IngredientList
      }, this.state['showIngredients'] && showIngredients())), /*#__PURE__*/_react.default.createElement("div", {
        className: _RecipeBuilderModule.default.Instruction
      }, /*#__PURE__*/_react.default.createElement("button", {
        type: "text",
        onClick: () => this.show('showInstructions')
      }, "Instructions"), /*#__PURE__*/_react.default.createElement("ul", {
        className: _RecipeBuilderModule.default.instructionList
      }, this.state['showInstructions'] && showInstructions())), /*#__PURE__*/_react.default.createElement("div", {
        className: _RecipeBuilderModule.default.NutrientsArea
      }, /*#__PURE__*/_react.default.createElement("button", {
        type: "text",
        onClick: () => this.show('showNutrition')
      }, "Nutrients"), this.state['showNutrition'] && showNutrients()), /*#__PURE__*/_react.default.createElement("div", {
        className: _RecipeBuilderModule.default.ImageArea
      }, /*#__PURE__*/_react.default.createElement("img", {
        className: _RecipeBuilderModule.default.image,
        src: this.state.currentRecipe.image,
        alt: "RecipeImage"
      })), displayButtons());
    };
    return /*#__PURE__*/_react.default.createElement("div", {
      className: _RecipeBuilderModule.default.main
    }, /*#__PURE__*/_react.default.createElement("h1", {
      id: "Welcome_MyFridge"
    }, "Recipe Builder"), /*#__PURE__*/_react.default.createElement("div", {
      className: _RecipeBuilderModule.default.buttons
    }, buttons), /*#__PURE__*/_react.default.createElement("div", {
      className: _RecipeBuilderModule.default.searchButton
    }, /*#__PURE__*/_react.default.createElement("button", {
      onClick: () => this.searchRecipe()
    }, "Search For Recipes")), /*#__PURE__*/_react.default.createElement("div", {
      className: _RecipeBuilderModule.default.savedRecipes
    }, /*#__PURE__*/_react.default.createElement("h1", null, "Saved Recipes"), savedRecipes, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        marginTop: 'auto',
        textAlign: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: "/FridgeHome/".concat(_Signin.userData.user.userNumber)
    }, /*#__PURE__*/_react.default.createElement("button", {
      className: _RecipeBuilderModule.default.FridgeHomeButton
    }, "Go to Fridge Home")))), /*#__PURE__*/_react.default.createElement("div", {
      className: _RecipeBuilderModule.default.recipe
    }, this.state.showRecipe && recipeSearch()));
  }
}
var _default = exports.default = RecipeBuilder;