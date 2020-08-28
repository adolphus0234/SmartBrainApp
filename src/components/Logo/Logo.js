import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain2.png';

const Logo = () => {
	return (
			<div className='logo-margin mt0'>
				<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} >
				  <div className="Tilt-inner"> 
				 	 <img style={{paddingTop: '3px'}} alt='logo' src={brain} />
				  </div>
				</Tilt>
			</div>
		)
}



export default Logo;