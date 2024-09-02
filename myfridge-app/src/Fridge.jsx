import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {userData} from './Signin.js'
import axios from 'axios'
import Select from 'react-select-virtualized';
import styles from './Fridge.module.css'


class Fridge extends Component {
    constructor(){
        super()
        this.state = {
            foodData: [],
            fridgeItems:[],
            made: false,
            selectedValue: 'Corn'
        }
        
    }
        newFoodData = async () => { 
            const response = await fetch(`https://myfridgeweb-9977.onrender.com/Food`) 
            const data = await response.json()

            const newItems = data.map((item ,index)=> ({...item, inFridge:false, label:item.ingredient, number:index, weight:0,inRecipe:true}))
            console.log(newItems,'items seen')
            const newData = {fridgeItems:newItems}
            this.setState({made: true})
            this.setState((prevState) => { return  {...prevState,...newData}})}
            

                


        
    componentDidMount = async () => {
        console.log(userData)
        
        if (userData.user.ingredients_use.ingredients.length == 0){
            await this.newFoodData()  
            
        console.log(this.state, 'newState')     }
        else{
            const newItems = await userData.user.ingredients_use.ingredients
            const newData = {
                fridgeItems: newItems
            }
            this.setState((prevState) => { return {...prevState,...newData}})
            
        }
        this.setState({made:true})
    }
    componentDidUpdate = async() => {
        console.log(this.state, 'Update State')
        if (this.state.made == true) {
        {this.updateFoodDataSubmit()}
        }
        

    }
    updateFoodDataSubmit = async () => {
        
        let fridgeItems = this.state.fridgeItems
        const response = await axios.post(`https://myfridgeweb-9977.onrender.com/Fridge/${userData.user.userNumber}`,{fridgeItems})

    }
    deleteItem = (index) => {
        const newItems = this.state.fridgeItems

        console.log(newItems[index])
        newItems[index].inFridge = false
        let newData = {fridgeItems:newItems}
        this.setState({newData})
        this.updateFoodDataSubmit()
    }
    
    addFridge = async (event) => {
       
        event.preventDefault()
     
        const fridgeItemss = this.state.fridgeItems
        if (this.state.selectedValue) {

            const itemToUpdate = fridgeItemss[this.state.selectedValue.number]
            
            itemToUpdate.inFridge = true
            let number = itemToUpdate.number
            fridgeItemss[number] = itemToUpdate
            
           

            

        }
        
        this.setState({fridgeItems: fridgeItemss})
        

       
           }    
 
    searchbarDropdown  = (props) => {
        <input type='text' className={styles.AddItem} placeholder='Search for Items'/>
    }
    handleSearchChange = (option) => {
        this.setState({selectedValue: option})
    }
    render(){
        
        const {fridgeItems} = this.state
        const fridgeList = this.state.fridgeItems.map((item, index) => {
            if (item.inFridge == true) {
              console.log('button made');
              return (
                <div className={styles.itemArea} key={index}> 
                  <button className={styles.itemFridge}onClick={() => this.deleteItem(index)}>
                    {item.label}
                  </button>
                </div>
              );
            } else {
              return null; 
            }
          });
                 
    return(
        
        
        <div className={styles.Fridge}>
        <div className={styles.FridgeHeadings}>
        <h1 className={styles.FridgeWelcome}id='Welcome_MyFridge'>Welcome to The Fridge!</h1>
        <h2 className={styles.FridgeHeading}> Search for Items to Add, Click on Items to Delete</h2>
        </div>
       
        <div className={styles.addFridge}>
            <form method='post' className={styles.Form}>
            <Select className={styles.Select}onChange={this.handleSearchChange} options={this.state.fridgeItems} getOptionValue={(option) => option.label}>
            </Select>
            <button className={styles.SubmitFridge}onClick={this.addFridge} type='submit'>Add Item</button>
            </form>

        </div>
        <div className={styles.Items}>
        {fridgeList}
        </div>
        <div className={styles.FridgeHomeButtonContainer}>
                <Link to={`/FridgeHome/${userData.user.userNumber}`}>
                    <button className={styles.FridgeHomeButton}>
                        Go to Fridge Home
                    </button>
                </Link>
            </div>
        </div>
    )
}    
}
export default Fridge
