import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { SendServer } from '../../services/SendServer';

import './CreateAccount.css';


interface CAProps {}

interface CAState {
    email: string;
    name: string;
    username: string;
    password: string;
    redirectToReferrer: boolean;
}

class CreateAccount extends Component<CAProps, CAState> {

  constructor(props: Readonly<CAProps>){
    super(props);
   
    this.state = {
     email: '',
     name: '',
     username: '',
     password: '',
     redirectToReferrer: false
    };

    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);

  }
 
  onSearchClick = (): void => {
    const inputValue = this.state.username;
    console.log("I was called Dude");
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`).then((res) => {
      if (res.status !== 200) {
        console.log("NOT OK DUDE " + res.json());
        alert("hey bddy");
        return;
      }
    });
  };
  
  signup() {
    if(this.state.username && this.state.password && this.state.email && this.state.name){
    SendServer('signup',this.state).then((result) => {
      let responseJson = result;
      this.onSearchClick();
      //console.log("manish " + responseJson.userData + " gg " + responseJson.status);
      if(responseJson.userData){         
        sessionStorage.setItem('userData',JSON.stringify(responseJson));
        this.setState({redirectToReferrer: true});
      } else {
        console.log("NOT GETTING");

      }
     });
     console.log("value is MANISH " + this.state.redirectToReferrer);
    }
  }

  
  onChange(e:any){
    this.setState({
      [e.target.name]: e.target.value
    } as any);
}

  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'}/>)
    }
   
    return (
      
      <div className="row " id="Body">
        <div className="medium-5 columns left">
        <h4>Signup</h4>
        <label>Email</label>
        <input type="text" name="email"  placeholder="Email" onChange={this.onChange}/>
        <label>Name</label>
        <input type="text" name="name"  placeholder="Name" onChange={this.onChange}/>
        <label>Username</label>
        <input type="text" name="username" placeholder="Username" onChange={this.onChange}/>
        <label>Password</label>
        <input type="password" name="password"  placeholder="Password" onChange={this.onChange}/>
        
        <input type="submit" className="button" value="Sign Up" onClick={this.signup}/>
        <a href="/login">Login</a>
        </div>
        
      </div>
    );
  }
}

export default CreateAccount;