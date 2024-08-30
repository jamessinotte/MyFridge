const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: 'info.env' });
const mongoose_uri= process.env.mongoose_uri;
const path = require('path');
const {createUser, findUserByEmail,editUserRestrictions,findUserByID,editUserFridge,addRecipe} = require('./models/Users');
const app = express();
const bodyParser = require('body-parser')
const router = express.Router();
const cors = require('cors');
require('dotenv').config();
mongoose.connect(mongoose_uri)
app.use(cors({
  origin: '*', // For development only; specify your frontend's URL in production
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.post('/Signin', async (req, res) => {
  console.log("Signin Hit")
  const { email, password } = req.body;
  try {
    user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).send('User not found.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password.');
    }
 
    res.send({user})
    
  
   
    console.log('Signedin')

  } catch (error) {
    return res.status(500).send('Server error');
  }
});
app.use((req, res, next) => {
    console.log(`[LOG] Incoming request: ${req.method} ${req.url}`);
    next();
});
app.post(`/RecipeBuilder/:userNumber`, async (req,res) => {
      try {
      const {recipe} = req.body
      const {userNumber} = req.params
      await addRecipe(userNumber,recipe)
      }
      catch(error) {
        console.error('Error saving Recipe',error)
      }
      res.send("Saved Recipe");
      

})
app.post('/Signup', async (req,res) => {
    console.log('[LoG] /api/Signup route hit');
    try {
        const {email,password,name} = req.body
        const emailExists = await findUserByEmail(email)
        

        if (emailExists) {
            return res.status(400).send('Email already exists')

        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await createUser(email, hashedPassword,name);
        res.send("Created Account");
        console.log('User created:', newUser);

    }catch (error) {
        console.error('Error in signup:', error);
        res.status(500).send('Server error');
    }
})
app.use((req, res, next) => {
  console.log(`[LOG] Incoming request: ${req.method} ${req.url}`);
  next();
});
app.post(`/FridgeHome/:userNumber`, async (req,res) => {
  const {userNumber} = req.params
  const {diet,allergies} = req.body

  console.log('[LOG] Received userNumber:', req.params);
  console.log('[LOG] Request body:', req.body);
  console.log('[LOG] FridgeHome Hit')
  try {
    await editUserRestrictions(userNumber,diet,allergies)
    console.log('Restrictions updated')
    res.status(200).send('Restrictions updated successfully');
  }
  catch(error){
    console.log('Error in restriction list update',error)
}})
app.get(`/Food`,(req,res) => {
  res.sendFile(__dirname + '/models/csvjson.json');
})

app.post(`/Fridge/:userNumber`, async (req,res) => {
  const {userNumber} = req.params
  const {fridgeItems} = req.body

  console.log('[LOG] Received userNumber:', req.params);

  console.log('[LOG] Fridge Hit')
 
  

 

  try {
    
    await editUserFridge(userNumber,fridgeItems)
    console.log('Restrictions updated')
  }
  catch(error){
    console.log('Error in restriction list update',error)
  
}})

module.exports = router
app.use(express.static(path.join(__dirname, '../myfridge-app/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../myfridge-app/dist', 'index.html'));
});
const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});