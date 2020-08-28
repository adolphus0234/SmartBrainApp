import React from 'react'; 
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return (
			<div>
				<p className='F3 pl1 pr1'>
					{'This Magic Brain will detect faces in your pictures. Give it a try!'}
				</p>
				<div className='center'>
					<div className='form center padding br3 shadow-5 mt3 mb3'>
						<input className='E4 pa2 w-70 center'
								placeholder='Enter Image URL' 
								type='text' 
								onChange={onInputChange}
								id='form-input'
						/>
						<button className='w-30 grow E4 link pv2 dib white bg-light-purple' 
								onClick={onPictureSubmit}
						>Detect</button>
					</div>
				</div>
			</div>

		)
}



export default ImageLinkForm;