import React, { Component, useState , useEffect,onChange} from 'react';
import { Link, withRouter, Navigate } from 'react-router-dom';
import {Home1} from './Home1.js'
import axios from 'axios'
import styles from './Signin.module.css'
const Input = ({InputChange}) => (
    
    <>
    <h1 className={styles.Title}> MyFridge </h1>
    <h1 className={styles.Heading}>Login</h1>
    <div className={styles.Inputs}>
    <input className={styles.emailBox}type='email' name='email' placeholder='Email' onChange={InputChange} />
    <input type='password' className={styles.passwordBox}name='password' placeholder='Password' onChange={InputChange}/>
    <button type='submit' className={styles.Submit}>Sign In</button>
    </div>
    </>
)
let userData = {}
class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email:'',
            password:'',
            data_sent:false,
            showSignin:true,
            id: '',
            errorMessage:'',
    }
}
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
    };
    handleSubmit = async (event) => {
        
        event.preventDefault()
        const {email,password} = this.state
        try {
            await axios.post('https://myfridgeweb-9977.onrender.com/Signin', {email,password})
            .then(response => {
            userData = response.data
            let idd  = userData.user.userNumber
            console.log(idd)
            this.setState({data_sent: true,showSignin: false, id: idd}, () => {
            })
            })
        } catch (error) {
             console.error('Sign-in error:', error);
             this.setState({ errorMessage: 'Invalid email or password. Please try again.' });
            }
     }
    render() {
    return(
    <div id='Signin' className={styles.Signin}>
        <div className={styles.Form}>
        <form id='Signin' onSubmit={this.handleSubmit}>
            {this.state.showSignin && (
            <Input InputChange = {this.handleInputChange}></Input>
            )}
              {this.state.errorMessage && (
                            <div className={styles.ErrorMessage}>
                                {this.state.errorMessage}
                            </div>
                        )}
     </form>  
            <div className={styles.Signup}>
            <h3 className={styles.SignupText}>New To MyFridge?</h3>
            <Link to="/Signup">
                <h1 className={styles.SignupLink}>Signup</h1>
            </Link>
            </div>
            </div>
    {this.state.data_sent &&(
    <Navigate to ={`/FridgeHome/${this.state.id}`}/>)}
    </div>
    )
    }
}
export default Signin
export {userData}
