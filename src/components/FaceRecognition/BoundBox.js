import React from 'react';
import './FaceRecognition.css';

const BoundingBox = ({ clarifaiFace }) => {

	const calculateBox = () => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
		const box = {
                	bottomRow: height - (clarifaiFace.bottom_row * height),
                	leftCol: clarifaiFace.left_col * width,
                	rightCol: width - (clarifaiFace.right_col * width),
                	topRow: clarifaiFace.top_row * height
            	};
            	
        return box;
    }


	return (
			<div>
				<div className='bounding-box' 
					 style={{
					 		 top: Number(`${calculateBox().topRow}`), 
					 		 right: Number(`${calculateBox().rightCol}`), 
					 		 bottom: Number(`${calculateBox().bottomRow}`), 
					 		 left: Number(`${calculateBox().leftCol}`)
					 		}}
					 >
				</div>
			</div>
		);
}

export default BoundingBox;