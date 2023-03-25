import React,{useState,useEffect} from 'react'; 
import TextInput from './TextInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import PasswordInput from './PasswordInput';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



const Register = () => {
    

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

     const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])
   
  useEffect(() => {  
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

  return (
    <section>
        <h1>
            Register
        </h1>
        <form >

            <label htmlFor="username">
                 Username:
            </label>
            <TextInput 
                id={"username"} 
                placeholder={"Username"} 
                text={user} 
                setText={setUser} 
                validText={validName}               
                setTextFocus={setUserFocus}
                ariaID={"UserInputInstruction"}
            />
            <p id="UserInputInstruction" className={userFocus && user && !validName ? "instructions" : "offscreen"} >
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="email">
                 Email:
            </label>
            <TextInput 
                id={"email"} 
                placeholder={"Email"}
                text={email} 
                setText={setEmail} 
                validText={validEmail}               
                setTextFocus={setEmailFocus}
                ariaID={"UserInputInstruction"}
            />
            <p id="EmailInputInstruction" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Use valid email.<br />
            </p>

            <label htmlFor="password">
                 Password:
            </label>

            <PasswordInput 
                id={"password"} 
                placeholder={"Password"}
                pwd={pwd} 
                setPwd={setPwd} 
                validPwd={validPwd}               
                setPwdFocus={setPwdFocus}
                ariaID={"pwdnote"}
            />

            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and a special character.<br />
                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
             </p>

             <label htmlFor="re-password">
                 Password:
            </label>

            <PasswordInput 
                id={"re-password"} 
                placeholder={"Confirm Password"}
                pwd={matchPwd} 
                setPwd={setMatchPwd} 
                validPwd={validMatch}               
                setPwdFocus={setMatchFocus}
                ariaID={"confirmnote"}
            />

            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                 <FontAwesomeIcon icon={faInfoCircle} />
                 Must match the first password input field.
            </p>

             <button disabled={!validName || !validPwd || !validMatch ? true : false} onClick={(e)=> e.preventDefault()}>Sign Up</button>

        </form>
    </section>
  )
}

export default Register