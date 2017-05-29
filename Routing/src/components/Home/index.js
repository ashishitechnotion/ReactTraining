import React, { Component } from 'react';
import './style.css';
import Navbar from '../Navbar'

class Home extends Component {
  render() {
    return (
      <div>
       <Navbar/>
       <div className="container">
       {this.props.children} 
       </div>
      </div>
    );
  }
}

export default Home;
