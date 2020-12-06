import React from 'react';
import  './LinkForm.css'


const Rank = ({onInputChange , onButtonClick}) => {
    return (
        <div className="">
            <p className="f3 center"> {'This magic brain will detetct faces , give it a try '}<br/></p>
           <div className="form center">
                <div className="pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 " type="text" placeholder="paste link here.." onChange={onInputChange}/>
                    <button onClick={onButtonClick} className="w-30 grow f4 link ph3 pv2  dib white bg-light-purple " type="button" > Detect</button>
                </div>
           </div>
        </div>
    )
}


export default Rank;