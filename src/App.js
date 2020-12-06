import Navigation from './components/Navigation/Navigation';
import React , { Component } from 'react';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import LinkForm from './components/LinkForm/LinkForm.js';
import './App.css';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';


// const app = new Clarifai.App({
//   apiKey: '44141d5ce8eb4435a38d99176a832d0c'
//  });

const ParticlesOption ={
      particles : {
        number : {
          value : 250 ,
          density : {
            enable: true,
            value_area : 80
          }
        } 

      }
}

const initialstate = {
  input : '',
  imageurl : '',
  box : {} ,
  route : 'signin' ,
  issignedin : false ,
  user : {
    id: '' ,
    name: '',
    email: '',
    score : 0 ,
    joineddate : ''
  }
}

class App extends Component{
  constructor(){
    super();
    this.state = initialstate;
  }


  Loaduser = (data) => {
    this.setState({user:{
        id: data.id ,
        name: data.name,
        email: data.email,
        score : data.score ,
        joineddate : data.joineddate

    }})
  }

  calculateFace = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displabox = (box) => {
    // console.log(box);
    this.setState({box : box})
  }




  onInputChange = (event) => {
    this.setState({input : event.target.value})
    // console.log(event.target.value)
  }
  
  onButtonClick = () => {
    // console.log('clicked');
    this.setState({imageurl: this.state.input});
    // app.models.predict("d02b4508df58432fbb84e800597b8959", this.state.input )
    fetch(' https://radiant-depths-54780.herokuapp.com/imagesurl/' , {
            method : 'post',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify({
                input : this.state.input,
               
            }) 
        })
        .then(response => response.json())
    .then(response => {
      if (response){
        fetch(' https://radiant-depths-54780.herokuapp.com/images/' , {
            method : 'put',
            headers : {'Content-type' : 'application/json'},
            body : JSON.stringify({
                id : this.state.user.id,
               
            }) 
        })
        .then(response => response.json())
        .then (count => {
          this.setState(Object.assign(this.state.user , {score : count}))
        })
      }
      this.displabox(this.calculateFace(response))
    })
    .catch (err => { console.log(err) })
    
  }

  onroutechange = (route) => {
    if(route === 'signout') {
      this.setState({issignedin : initialstate})
    } else if (route === 'home') {
      this.setState({issignedin : true})
    }
    this.setState({route : route});
  }

  render(){
   const {issignedin , imageurl , route , box } = this.state; 
    return (
      <div>
      <Particles className="Particles" params={{ParticlesOption}} />
      <Navigation onroutechange={this.onroutechange} issignedin={issignedin}/>
      <Logo />
      {route === 'home' 
      ? <div> <Rank name={this.state.user.name} score={this.state.user.score} />
      <LinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} /> 
      <ImageRecognition box={box} imgurl={imageurl} /> 
      </div>
      : (route === 'signin' 
          ? <SignIn Loaduser={this.Loaduser} onroutechange={this.onroutechange}/>
          : <Register Loaduser={this.Loaduser} onroutechange={this.onroutechange} />
        )
      }
      
      </div>
    );
  }
}


export default App;
