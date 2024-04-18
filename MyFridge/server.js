const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const {createUser, findUserByEmail,editUserRestrictions,findUserByID,editUserFridge} = require('./models/Users');
const app = express();
const bodyParser = require('body-parser')
const router = express.Router();
const cors = require('cors');
require('dotenv').config();

app.use(cors({
  origin: '*', // For development only; specify your frontend's URL in production
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
mongoose.connect('mongodb+srv://jamessinotte:Pygmy123@myfridge.hjftpuj.mongodb.net/?retryWrites=true&w=majority&appName=MyFridge')
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
  res.sendFile(__dirname + '/models/Food.json');
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
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});