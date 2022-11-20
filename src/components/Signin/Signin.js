import React from 'react'; 

class Signin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value });
	}

	submitFunction = () => {
		const passwordField = document.getElementById('password');
		const errorMessage = document.getElementById('error-message');	
			  errorMessage.innerText = "Signing In...";			
		fetch('https://secure-coast-44570.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
				 this.props.loadUser(user);	
				 this.props.onRouteChange('home');
				} else {
					return errorMessage.innerText = "Error Signing In...";
				}
			});
			return passwordField.value = '';
	}


	onSubmitSignIn = () => {
			this.submitFunction();	
	}

	onSubmitSignInKeyPress = (event) => {
		if (event.keyCode === 13) {
			this.submitFunction();
		}
		
	}

	keyPressEnter = () => {
		const passwordField = document.getElementById('password');
		passwordField.addEventListener("keypress", this.onSubmitSignInKeyPress);
	}

	


	render() {
		const { onRouteChange } = this.props;
		
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-60-m  mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" 
				        	   htmlFor="email-address">Email</label>
				        <input 
				        	className="pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="email" 
				        	name="email-address"  
				        	id="email-address" 
				        	onChange = {this.onEmailChange}
				        	/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" 
				        	   htmlFor="password">Password</label>
				        <input 
				        	className="b pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        	type="password" 
				        	name="password"  
				        	id="password" 
				        	onChange = {this.onPasswordChange}
				        	onKeyPress={this.keyPressEnter}
				        	/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={this.onSubmitSignIn} 
				      		 className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      		 type="submit" 
				      		 value="Sign in" 
				      		 />
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={() => onRouteChange('register')} 
				      	 className="f6 link dim black db pointer">Register</p>
				    </div>
				    <div className="f4" id="error-message">
				    </div>
				  </div>
				</main>
			</article>
			)
		}
	
}



export default Signin;