import React, { Component } from 'react';
import axios from 'axios';
import styles from './Signup.module.css';
import { Link, Navigate } from 'react-router-dom';

const Invalid_Password = () => (
    <div id='Invalid_Password'>
        <h1 className={styles.invalidPassword}>Passwords do not match</h1>
    </div>
);

const Inputs = ({ OnInputChangeEmail, OnInputChangePassword, OnInputChangeName }) => (
    <div id='SignupInputs' className={styles.SignupInputs}>
        <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={OnInputChangeEmail}
            className={styles.emailBox}
        />
        <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={OnInputChangePassword}
            className={styles.passwordBox}
        />
        <input
            type='password'
            name='confirm_password'
            placeholder='Confirm Password'
            onChange={OnInputChangePassword}
            className={styles.confirmPasswordBox}
        />
        <input
            type='text'
            name='name'
            placeholder='Display Name'
            onChange={OnInputChangeName}
            className={styles.nameBox}
        />
    </div>
);

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirm_password: '',
            name: '',
            showInput: true,
            showPasswordError: false,
            errorMessage: '',
            Signedup: false,
        };
    }

    handleInputChangeEmail = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleInputChangePassword = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleInputChangeName = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password, confirm_password, name } = this.state;
        if (password === confirm_password) {
            try {
                await axios.post('https://myfridgeweb-9977.onrender.com/Signup', { email, password, name });
                this.showInputs(false);
                this.setState({ Signedup: true, errorMessage: '' });
            } catch (error) {
                console.error('Signup error:', error);
                this.setState({ errorMessage: 'Signup failed. Please try again.' });
            }
        } else {
            this.setState({ showPasswordError: true, errorMessage: '' });
        }
    };

    showInputs = (booleon) => {
        this.setState({ showInput: booleon });
    };

    render() {
        return (
            <div className={styles.Signup}>
                <form className={styles.SignupForm} onSubmit={this.handleSubmit}>
                    {this.state.showInput && (
                        <Inputs
                            OnInputChangeEmail={this.handleInputChangeEmail}
                            OnInputChangePassword={this.handleInputChangePassword}
                            OnInputChangeName={this.handleInputChangeName}
                        />
                    )}
                    {this.state.showPasswordError && <Invalid_Password />}
                    {/* Display error message */}
                    {this.state.errorMessage && (
                        <div className={styles.ErrorMessage}>
                            {this.state.errorMessage}
                        </div>
                    )}
                    <button type='submit' className={styles.Submit}>Sign Up</button>
                    <Link to="/Signin" className={styles.Link}>
                        Sign In
                    </Link>
                </form>
                {this.state.Signedup && <Navigate to='/Signin' />}
            </div>
        );
    }
}

export default Signup;
