import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import HomeScreenNav from './components/HomeScreenNav/HomeScreenNav';
import ImageLinkFormColor from './components/ImageLinkForm/ImageLinkFormColor';
import ImageLinkFormFood from './components/ImageLinkForm/ImageLinkFormFood';
import FaceDetect from './components/FaceRecognition/FaceDetect';
import ColorImage from './components/ColorModel/ColorImage';
import FoodImage from './components/FoodModel/FoodImage';
import ColorModel from './components/ColorModel/ColorModel';
import FoodModel from './components/FoodModel/FoodModel';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import {imageScroll} from './functions/imageScroll.js';
import './App.css';

//PARTICLES BG=====================

const particleOptions = {
        particles: {
            	number: {
            	value: 50,
            	density: {
            		enable: true,
            		value_area: 400
            	   }
            	}
            }
}

//DEFAULT STATE====================

const initialState = {
            input: '',
            imageUrl: '',
            imageUrl2: '',
            imageUrl3: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
            // route: 'home',
            // isSignedIn: true,
            colors: [],
            ingredients: [],
            faceFetch: false,
            colorFetch: false,
            foodFetch: false,
            timeout: false,
            invalidUrl: false,
            apiModelFail: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }

let setT;

//========================================

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    //SIGNIN/REGISTER

    loadUser = (data) => {
            this.setState({user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    //ROUTING
   
    onRouteChange = (route) => {
        if (route === 'signout' || route === 'register' || route === 'signin') {
            this.setState(initialState);
        } else if (route === 'home' || 'home2' || 'home3') {
            this.setState({
                isSignedIn: true,
                box: {},
                invalidUrl: false,
                input: ''
            });         
        }
        this.setState({route: route});
    }

    //INPUT

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    //API TIMEOUT ====================================

    setTimeoutState = () => {
        this.setState({timeout: true});
        imageScroll();
    }

    apiTimeout = () => {
        setT = setTimeout(this.setTimeoutState, 8000);
    }

    apiClearTimeout = () => {
        clearTimeout(setT);
    }

    //FACE_MODEL ======================================

    calculateFaceLocation = (data) => {
        const clarifaiFaceObject = data.outputs[0].data.regions;
        if (clarifaiFaceObject === undefined) {
            this.setState({apiModelFail: true})
        }
        return Object.entries(clarifaiFaceObject);
    }    

    displayBox = (box) => {
        this.setState({box: box});
    }


    onPictureSubmit = () => {
        this.setState({
            imageUrl: this.state.input, 
            faceFetch: true, 
            timeout: false
        });
        this.apiTimeout();
        imageScroll();

        fetch('https://secure-coast-44570.herokuapp.com/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                input: this.state.input
                            })
                    })
        .then(response => response.json())
        .then(response => {
            if (response) {

                    this.apiClearTimeout();
                    imageScroll();
                    this.setState({faceFetch: false})

                if (response === 'Unable to access API') {
                    return this.setState({invalidUrl: true, faceFetch: false})
                } else {
                    this.setState({invalidUrl: false})
                }
                    fetch('https://secure-coast-44570.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                            })
                    })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, { entries: count }))
                    })  
            }
            this.displayBox(this.calculateFaceLocation(response))        
        })
        .catch(err => console.log(err));
    }

    //COLOR_MODEL========================================

    onPictureSubmitColor = () => {
       this.setState({
                imageUrl2: this.state.input, 
                colorFetch: true, 
                timeout: false
            })
       this.apiTimeout();
       imageScroll();

       fetch('https://secure-coast-44570.herokuapp.com/imageurlcolor', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                input: this.state.input
                            })
                    })
        .then(response => response.json())
        .then(resp => {
            if (resp) {

            if (resp === 'Unable to access API') {
                    this.setState({invalidUrl: true, colorFetch: false})
                } else {
                    this.setState({invalidUrl: false})
                }

            this.apiClearTimeout();
            imageScroll();
            const colorsArray = resp.outputs[0].data.colors;
            this.setState({colors: colorsArray, colorFetch: 'false'})

                    fetch('https://secure-coast-44570.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                            })
                    })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, { entries: count }))
                    })  
            }  
        }) 
        .catch(err => console.log(err));
    }

    //FOOD_MODEL===========================================

    onPictureSubmitFood = () => {
       this.setState({
                imageUrl3: this.state.input, 
                foodFetch: true, 
                timeout: false
            })
       this.apiTimeout();
       imageScroll();

       fetch('https://secure-coast-44570.herokuapp.com/imageurlfood', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                input: this.state.input
                            })
                    })
        .then(response => response.json())
        .then(resp => {
            if (resp) {            

            if (resp === 'Unable to access API') {
                    this.setState({invalidUrl: true, foodFetch: false})
                } else {
                    this.setState({invalidUrl: false})
                }

            this.apiClearTimeout();
            imageScroll();
            const foodArray = resp.outputs[0].data.concepts;
            this.setState({ingredients: foodArray, foodFetch: 'false'})
            
                    fetch('https://secure-coast-44570.herokuapp.com/image', {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                            })
                    })
                    .then(response => response.json())
                    .then(count => {
                        this.setState(Object.assign(this.state.user, { entries: count }))
                    })  
            }  
        }) 
        .catch(err => console.log(err));
    }


	render() {

            const { isSignedIn, 
                    route, 
                    box,
                    user,
                    faceFetch,
                    timeout,
                    invalidUrl,
                    apiModelFail, 
                    imageUrl,
                    colors,
                    colorFetch,
                    imageUrl2,
                    ingredients,
                    foodFetch,
                    imageUrl3
                } = this.state;

		return (
                //NAVIGATION
			<div className='App'>
				<Particles 
                    className='particles' 
                    params={particleOptions} 
                    />
				<Navigation 
                    isSignedIn={isSignedIn} 
                    onRouteChange={this.onRouteChange} 
                    />
                { 
                         route === 'home'
                //HOME SCREEN
                ? <div>
                    <HomeScreenNav 
                        name={user.name}
                        entries={user.entries}
                        route={route}
                        onRouteChange={this.onRouteChange}
                        /> 
                    <FaceDetect 
                        onInputChange={this.onInputChange}
                        onPictureSubmit={this.onPictureSubmit}
                        box={box}
                        invalidUrl={invalidUrl}
                        imageUrl={imageUrl}
                        faceFetch={faceFetch}
                        timeout={timeout}
                        apiModelFail={apiModelFail}
                        />  
                  </div>
                       : (route === 'home2'

                    ? <div>
                          <HomeScreenNav 
                              name={user.name}
                              entries={user.entries}
                              route={route}
                              onRouteChange={this.onRouteChange}
                              />  
                          <ImageLinkFormColor 
                                onInputChange={this.onInputChange} 
                                onPictureSubmitColor={this.onPictureSubmitColor} 
                                />
                          <ColorModel 
                                colors={colors} 
                                colorFetch={colorFetch}
                                timeout={timeout}
                                invalidUrl={invalidUrl} 
                                />
                          <ColorImage imageUrl={imageUrl2} />
                      </div>
                            : (route === 'home3'

                        ?   <div>  
                                <HomeScreenNav 
                                    name={user.name}
                                    entries={user.entries}
                                    route={route}
                                    onRouteChange={this.onRouteChange}
                                    /> 
                                <ImageLinkFormFood 
                                    onInputChange={this.onInputChange} 
                                    onPictureSubmitFood={this.onPictureSubmitFood} 
                                    />
                                <FoodModel 
                                    ingredients={ingredients} 
                                    foodFetch={foodFetch}
                                    timeout={timeout}
                                    invalidUrl={invalidUrl} 
                                    />
                                <FoodImage imageUrl={imageUrl3} />
                            </div>
                        : ( route === 'signin'

                            ?   <Signin 
                                    loadUser={this.loadUser} 
                                    onRouteChange={this.onRouteChange} 
                                    />
                            : ( route === 'signout'

                                ?   <Signin 
                                        loadUser={this.loadUser} 
                                        onRouteChange={this.onRouteChange} 
                                        />
                                :   <Register 
                                        loadUser={this.loadUser} 
                                        onRouteChange={this.onRouteChange} 
                                        />
                    ))))
                }	
			</div>
		);
	}
}

export default App;