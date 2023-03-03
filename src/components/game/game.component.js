import React from 'react';
import './game.styles.css'

export function Game(props) {
    return <div className='game'>{props.children}</div>
}