const mongoose = require('mongoose');
require('dotenv').config()

var number = require('random-number');
const { isBooleanObject } = require('util/types');
let options = {
  min: 0,
  max: 1000000000,
  integar:true


}


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: {type: String, required: true},
  password: { type: String, required: true },
  userNumber: {type: String},
  recipes: {type: Object},
  ingredients_use: {type: Object},
  ingredients_weight: {type: Object},
  restrictions: {type: Object}
});


const User = mongoose.model('User', userSchema);

 async function createUser(email, password,name) {
    let userNumber = Math.floor(number(options))
    let recipes = {recipes: []}
    let ingredients_use = {'made':false,'ingredients':[],}
    let ingredients_weight = {'name':0}
    let restrictions = {diets:[],
    allergies:[],made:false}
    const newUser = new User({ email, password,name,userNumber,recipes,ingredients_use,ingredients_weight,restrictions});
    await newUser.save();
    console.log('created')
    return newUser;
  }
  
  async function findUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }
  async function findUserByID(userNumber) {
    const user = await User.findOne({ userNumber });
    return user;
  }
  async function addRecipe(userNumber,recipe) {
    try {
      const user = await User.findOne({userNumber})
      user.recipes.recipes.push(recipe)
      user.markModified('recipes')
      user.save()
    }
    catch(error){
      console.error('failed to add recipe',error)
    }
  }


  async function editUserRestrictions(userNumber,diet,allergies) {
    try {
    const user = await User.findOne({userNumber})
    
    user.restrictions.diets = diet
    user.restrictions.allergies = allergies
    user.restrictions['made'] = true
    user.markModified('restrictions');
    console.log('[LOG] NEw user:',  user.restrictions.diets,user.restrictions.allergies);
    await user.save();
    }
    catch(error){
      console.error('failed to update'(error))
    }

  }
  async function editUserFridge(userNumber,fridgeItems) {
    try {
    const user = await User.findOne({userNumber})
    user.ingredients_use.made = true
    user.ingredients_use.ingredients = fridgeItems
    console.log('[LOG] new Fridge:' ,user.ingredients_use.ingredients)
    user.markModified('ingredients_use');
    await user.save()
    }
    catch(error) {
      console.error("failed to update Fridge", error)
    }
  }
 
  async function createUserExample() {
    try {
      const email = 'user@example.com';
      const password = 'securepassword'; // Remember to hash passwords in real applications
      const newUser = await createUser(email, password);
      console.log('User created:', newUser);
      
      const user = await findUserByEmail(email);
      console.log('Found user:', user);
    } catch (error) {
      console.error('Error creating or finding user:', error);
    }
  }
  
module.exports = {
  createUser, 
  findUserByEmail,
  editUserRestrictions,
  findUserByID,
  editUserFridge,
  addRecipe,

};

