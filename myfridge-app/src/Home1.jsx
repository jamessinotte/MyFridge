import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from'./Home1.module.css'
class Home1 extends Component {
    render() {
      return (
      <div className={styles.Home1}>
        <h1 className={styles.Title}>Welcome To MyFridge!</h1>
        
        <Link to="/Signin">
          <button className={styles.getStarted} variant="raised">
              Get Started!
          </button>
        </Link>   
      </div>
      );
    }
}
export default Home1;