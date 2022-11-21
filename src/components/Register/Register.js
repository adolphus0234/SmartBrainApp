import React from 'react';
import { domains } from './domains';

class Register extends React.Component {
		constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: '',
			password: ''
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value });
	}


	onEmailChange = (event) => {
		this.setState({email: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value });
	}

	onSubmitSignIn = () => {
		const nameField = document.getElementById('name');
		const emailField = document.getElementById('email');
		const passwordField = document.getElementById('password');
		const errorMessage = document.getElementById('error-message');
		const { name, email, password } = this.state;

		const validEmail = domains.map((domain) => {
			const valid = email.includes(domain);
            if (valid === true) {
            return valid;
            }
            return valid;
		});

		if (!name || !email || !password) {
			if (name === '') {
				nameField.focus(); 
			} else if (email === '' && name !== '') {
				emailField.focus();
			} else {
				passwordField.focus();
			}
			return errorMessage.innerText = "Please fill in all fields";
	 	
		} else if (email.includes('@') && (validEmail.includes(true))) {

			if (password.length < 5) {
				return errorMessage.innerText = "Password must be 5 or more characters";

			} else {
				errorMessage.innerText = "Please wait...";
				fetch('https://secure-coast-44570.herokuapp.com/register', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						name: name,
						email: email,
						password: password
					})
				})
				.then(response => response.json())
				.then(user => {
					if (user.id) {
					this.props.loadUser(user);	
					this.props.onRouteChange('home');
					}
				});
			}		
		} else {
			return errorMessage.innerText = "Please enter valid email";
		}		
	}

	render() {
	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-60-m  mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" 
			        	   htmlFor="email-address">Name</label>
			        <input className="pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	   type="text" 
			        	   name="name"  
			        	   id="name" 
			        	   onChange = {this.onNameChange}
			        	   />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" 
			        	   htmlFor="password">Email</label>
			        <input className="b pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			               type="email"
			               name="email"
			               id="email" 
			               onChange = {this.onEmailChange}
			               />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" 
			        	   htmlFor="password">Password</label>
			        <input className="b pa2 b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			               type="password" 
			               name="password"  
			               id="password"
			               onChange = {this.onPasswordChange}
			                />
			      </div>
			    </fieldset>
			    <div className="">
			      <input onClick={this.onSubmitSignIn} 
			      		 className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      		 type="submit" 
			      		 value="Register" 
			      		 />
			    </div>	    
			  </div>
			  <div className="f6 bold tc" 
			  	   id="error-message"
			  	   style={{width: '96%', 
			  	   		   marginLeft: '2%', 
			  	   		   marginRight: '2%', 
			  	   		   paddingTop: '20px'
			  	   		}}
			  	   >
			  </div>
			</main>
		</article>
		)
	}
}

export default Register;
