import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
const PasswordInput = ({id,placeholder,pwd,setPwd,validPwd,setPwdFocus,ariaId}) => {
  return (
    
    <div className="passwordInput">
                <input 
                    type="password" 
                    id={id}
                    placeholder={placeholder}
                    autoComplete='off'  
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby={ariaId}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() =>setPwdFocus(false)}
                />
                
                <span className={id === 'password' ? (validPwd ? "valid" : "hide"): (validPwd && pwd ? "valid" : "hide")} >
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                
                
                <span className={validPwd || !pwd ? "hide" : "invalid"} >
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
               
    </div>
  )
}

export default PasswordInput