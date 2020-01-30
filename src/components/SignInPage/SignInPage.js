import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {signIn} from "../../actions/auth";
import {Form, InputGroup, Button} from "react-bootstrap";
import {
    faEye,
    faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// import '../loginForm.css';
import './SignInPage.css';

const SignInPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [show, toggle] = useState(false);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const signInAction = (credentials) => dispatch(signIn(credentials));

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const onInputChange = (event) => {
        const {name, value} = event.target;

        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        console.log({username, password})

        // signInAction({username, password});
    };

    return (
        <Form onSubmit={onSubmit} className='auth'>
            <div className='btn-google'>
                <a><span>Sign In With Google</span></a>
            </div>
            <div className='div-line'><p className='line'>or</p></div>
            <div className='pt-0 pr-3 pl-3'>
                <p>Sign up with your email address</p>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control className='input-auth'
                                  type="text"
                                  name='username'
                                  value={username}
                                  placeholder='Username'
                                  onChange={onInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <InputGroup>
                        <Form.Control className='input-auth'
                                      type={show ? "text" : "password"}
                                      name='password'
                                      value={password}
                                      placeholder='Password'
                                      onChange={onInputChange}
                        />
                        <InputGroup.Append>
                        <span className='password-icon' onClick={() => toggle(!show)}>
                            <FontAwesomeIcon
                                icon={show ? faEyeSlash : faEye}
                                style={{color: '#6F716D'}}
                            />
                        </span>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
                <div className='d-flex justify-content-between'>
                    <div className='checkbox'>
                        <input type='checkbox'
                               checked={checked}
                               onChange={handleCheckboxChange}
                        />
                        <span>Keep me signed in</span>
                    </div>
                    <span className='forget-password'>Forget <a href='#'>password?</a></span>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-4'>
                <a href='#'
                   type='submit'
                   onClick={onSubmit}
                   style={{padding: '2px 15px', fontSize: '15px'}} className='parallelogram-button'>
                    <span className='skew-fix'>Submit</span>
                </a>
                {/*<Button*/}
                {/*    className=''*/}
                {/*    type='submit'>*/}
                {/*    Submit*/}
                {/*</Button>*/}
            </div>
        </Form>
    );
};

export default SignInPage;