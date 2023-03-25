import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
const TextInput = ({id,placeholder,text,setText,validText,setTextFocus,ariaId}) => {
  return (
    
    <div className="textInput">
                <input 
                    type="text" 
                    id={id}
                    placeholder={placeholder}
                    autoComplete='off'
                    
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    aria-invalid={validText ? "false" : "true"}
                    aria-describedby={ariaId}
                    onFocus={() => setTextFocus(true)}
                    onBlur={() =>setTextFocus(false)}
                />
                <span className={validText ? "valid" : "hide"} >
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validText || !text ? "hide" : "invalid"} >
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
               
    </div>
  )
}

export default TextInput