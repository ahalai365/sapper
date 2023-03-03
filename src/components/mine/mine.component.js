import React from 'react';
import './mine.styles.css'

export function Mine(props) {
    function handleClick() {
        console.log(props)
    }

    return <button className='mine' onClick={handleClick}></button>
}