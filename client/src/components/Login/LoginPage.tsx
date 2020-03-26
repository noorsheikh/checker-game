import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import { SendServer } from '../../services/SendServer';

import './LoginPage.css';


interface LPProps {}

interface LPState {
    username: string;
    password: string;
    redirectToReferrer: boolean;
}

class CreateAccount extends Component<LPProps, LPState> {

  constructor(props: Readonly<LPProps>){
    super(props); 
   
    this.state = {
     username: '',
     password: '',
     redirectToReferrer: false
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);

  }
 
  onSearchClick = (): void => {
    const inputValue = this.state.username;
    console.log("Testing Function ");
    fetch(`https://testing/${inputValue}`).then((res) => {
      if (res.status !== 200) {
        console.log("NOT OK here " + res.json());
        return;
      }
    });
  };
  
  login() {
    if(this.state.username && this.state.password){
      SendServer('login',this.state).then((result) => {
       let responseJson = result;
       if(responseJson.userData){         
         sessionStorage.setItem('userData',JSON.stringify(responseJson));
         this.setState({redirectToReferrer: true});
       }
       
      });
    }
   }

  
  onChange(e:any){
    this.setState({
      [e.target.name]: e.target.value
    } as any);
}

render() {

  if (this.state.redirectToReferrer || sessionStorage.getItem('userData')){
   return (<Redirect to={'/home'}/>)
 }

  return (
   <div className="row" id="Body">
     <div className="medium-5 columns left">
     <h4>Login</h4>
     <label>Username</label>
     <input type="text" name="username" placeholder="Username" onChange={this.onChange}/>
     <label>Password</label>
     <input type="password" name="password"  placeholder="Password" onChange={this.onChange}/>
     <input type="submit" className="button success" value="Login" onClick={this.login}/>
     <a href="/signup">Registration</a>
     </div>
   </div>
 );
}
}

export default CreateAccount;