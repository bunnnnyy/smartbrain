import React from 'react';


const Rank = ({name , score}) => {
    return (
        <div className=" center">
            <p className="white f2">{`${name} , you are current entry count is `}<span className=" f1">{score}</span></p>
        </div>
    )
}


export default Rank;