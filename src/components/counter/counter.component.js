import React from 'react';
import './counter.styles.css'

export function Counter(props) {
    return <div className='counter'>{props.children}</div>
}