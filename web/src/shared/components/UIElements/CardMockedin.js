import React from 'react'
import  './CardMockedin.scss'
const CardMockedin = (props) =>{
    return(
        <div className={`cardMocke ${props.className}`} style={props.style}>
            {props.children}
        </div>
    )
}

export default CardMockedin;
