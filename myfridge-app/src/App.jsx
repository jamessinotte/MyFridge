import React, { Component,useEffect } from 'react';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home1 from './Home1.js';
import Signin from './Signin.js'
import Signup from './Signup.js'
import FridgeHome from './FridgeHome.js'
import Fridge from './Fridge.js'
import RecipeBuilder from './RecipeBuilder.js'
import {userData} from './Signin.js'
const userNumber = userData.userNumber
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home1 />}/>
            <Route path='/Signin' element={<Signin/>}/>
            <Route path='/Signup' element = {<Signup/>}/>
            <Route path='/FridgeHome/:userNumber' element = {<FridgeHome/>}/>
            <Route path="/RecipeBuilder/:userNumber" element = {<RecipeBuilder/>}/>
            <Route path ="/Fridge/:userNumber" element ={<Fridge/>}/>
          </Routes>
        </Router>
      </div>
      
    );
  }
};

export default App;