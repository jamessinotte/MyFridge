import React, {Component,useState } from 'react';
import { Link, Navigate} from 'react-router-dom';
import {userData} from './Signin.js'
import axios from 'axios'
import { trusted } from 'mongoose';
import styles from './FridgeHome.module.css'

class FridgeHome extends Component {
    constructor() {
        super()
        this.state = {
            dataSent:false,
            userNumber: null,
            checkedRestrictions:false,
            navigateto: null,
            diets: [
                { text: "Vegan", id: "Vegan" , value:false},
                { text: "Vegetarian", id: "Vegetarian" , value:false},
                { text: "Gluten-free", id: "Pork-free", value:false },
                { text: "Pescatarian", id: "Pescatarian" , value:false},
                { text: "Lacto-Vegetarian", id: "Lacto-vegeterian", value:false },
                { text: "Ovo-Vegetarian", id: "Kosher" , value:false},
                { text: "Whole30", id: "Whole30", value:false },
                { text: "Keto", id: "Keto" , value:false},
                { text: "Paleo", id: "Paleo", value:false },
                
           ],
            allergies: [ 
                { text: "Dairy", id: "Dairy-free", value:false},
                { text: "Eggs", id: "Eggs-free", value:false },
                { text: "Seafood", id: "Seafood" , value:false},
                { text: "Tree Nuts", id: "Tree-Nut-free", value:false },
                { text: "Wheat", id: "Wheat-free" , value:false},
                { text: "Peanut", id: "Peanut" , value:false},
                { text: "Soy", id: "Soy-free", value:false },
                { text: "Shellfish", id: "Shellfish-free", value:false },
            ]
        }
    }
    componentDidMount(){
        this.setState({userNumber:userData.user.userNumber})
        this.prevRestrictions()
    }

    prevRestrictions = () => {
        console.log('prevRestrictions')
        if (this.state.checkedRestrictions == false && userData.user.restrictions.made == true) {
            console.log('set restrictions')

            this.setState((prevState) => {
                const newRestrictions = {
                    diets: userData.user.restrictions.diets,
                    allergies: userData.user.restrictions.allergies,
                    checkedRestrictions: true

                }
                return {...prevState, ...newRestrictions}

            })
            
        }
        else if(this.state.checkedRestrictions == false){
            console.log('update restrictions')
            userData.user.restrictions.allergies = this.state.allergies
            userData.user.restrictions.diets = this.state.diets
            this.setState((prevState) => {
                const newRestrictions = {
                    checkedRestrictions: true

                }
                return {...prevState, ...newRestrictions}
        })

    }}
    onclickDiet = (index) => {
        this.setState((prevState) => {

       
            const newDiets = prevState.diets.map((diet, idx) => {
            if (idx === index) {
                return { ...diet, value: !diet.value }; 
            }
            return diet; 
        });
        console.log(this.state)
     
        return { diets: newDiets };
        })
    };       
    onclickAllergy = (index) => {
        this.setState((prevState) =>{
                const newAllergies = prevState.allergies.map((allergy,idx)=> {
                if(idx == index){
                    return {...allergy, value: !allergy.value}

                }
                return allergy

                
            })
            console.log(this.state)
            return {allergies: newAllergies}
        })
    }
    handleSubmit = async (event,destination,diet,allergies) => {
        
        event.preventDefault()
        console.log(this.state)
        const userNumber = userData.user.userNumber || userData.user.userNumber
        this.setState({dataSent:true,navigateto:destination})
        console.log('userNumber', userNumber)
        if (!userNumber) {
            console.error('Usernumber is undefined')
            return
        }
        
        try {
            console.log('UserNumber',this.state.userNumber)
            const response = await axios.post(`https://myfridgeweb-9977.onrender.com/FridgeHome/${userNumber}`,({diet,allergies}))
            
        }
        catch(error) {event.preventDefault()
            console.log('Error sending data too database',error)
        }}


    render(){
        
        const dietList = this.state.diets.map((type,index) => (
            <div key={type.id} className={styles.diet}>
                <input className={styles.cbx}type="checkbox" checked={type.value} id={type.id} onChange={() => {this.onclickDiet(index)}}></input>
                <label className={styles.lbl}htmlFor={type.id}>{type.text}</label>
            </div>
        ))
        const allergyList = this.state.allergies.map((type,index) => (
            <div key={type.id} className={styles.allergy} >
                <input className={styles.cbx}type="checkbox" checked={type.value} id={type.id} onChange={() => {this.onclickAllergy(index)}}></input>
                <label className={styles.lbl}htmlFor={type.id}>{type.text}</label>
            </div>       
        ))
   
    return(
        <div className={styles.FridgeHome}>
        <h1 className={styles.Title} id='Welcome_MyFridge'>Welcome to MyFridge!</h1>
        <h2 className={styles.headingFridge}>Click on your Fridge to edit your Ingredients!</h2>
        <h3 className={styles.headingRecipe}>Click on Recipe Builder to craft a Recipe!</h3>
        <div className={styles.options} id='options'>
            <div className={styles.dietArea}>
            <h4>Diets</h4>
            {dietList}
            </div>
            <div className = {styles.allergyArea}>
            <h4>Allergies</h4>
            {allergyList}
            </div>
        </div>
        <div id='homeLinks' className={styles.links}>
            <button className={styles.buttons}onClick={(e) => this.handleSubmit(e,'Fridge',this.state.diets,this.state.allergies)}>Open Fridge</button>
            <button className={styles.buttons}onClick={(e) => this.handleSubmit(e,'RecipeBuilder',this.state.diets,this.state.allergies)}>Build Recipes</button>
            {this.state.dataSent && <Navigate to={`/${this.state.navigateto}/${this.state.userNumber}`}/>}

        </div>
        </div>
        )
    }
}
export default FridgeHome
