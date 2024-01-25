import React, { useRef } from 'react';
import './ImageLinkForm.css';

const ImageLinkFormFood = ({ onInputChange, onPictureSubmitFood, clearInputField }) => {
	const inputRef = useRef();
	return (
			<div>
				<p className='F3 pl1 pr1'>
					{"This Magic Brain will list ingredients from pictures of food. Give it a try!"}
				</p>
				<div className='center'>
					<div className='form center padding br3 shadow-5 mt3 mb3'>
						<input className='E4 pa2 w-70 center'
								placeholder='Enter Image URL' 
								type='text' 
								onChange={onInputChange}
								ref={inputRef}
						/>
						<button className='w-20 grow E4 link pv2 dib white bg-light-purple' 
								onClick={onPictureSubmitFood}
						>Detect</button>
						<button className='w-20 grow E4 link pv2 dib white bg-light-purple' 
								onClick={() => clearInputField(inputRef)}
						>Clear</button>
					</div>
				</div>
			</div>

		)
}



export default ImageLinkFormFood;