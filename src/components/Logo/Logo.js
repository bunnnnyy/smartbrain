import React from 'react';
import Tilt from 'react-tilt'
import Logopic from './logo.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"> 
                    <img  alt="LOGO" src={Logopic}/>
                </div>
            </Tilt>
        </div>
    )
}


export default Logo;