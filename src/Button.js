import React from "react"
import './button.css'
const Button = (props) =>{
    const handleClick = ()=>{
        props.numberChange(props.value)    
    }
    return(
        <button 
            style={{borderColor:props.color}} 
            className="numberDisplay" 
            onClick = {(props.ischeat)? handleClick:null}
        >
            {props.value}
        </button>
    )
}

export default Button