import React, {useState, useContext} from 'react';
import {useDispatch} from "react-redux";
import {Form, InputGroup, Button} from "react-bootstrap";
import {
    faEye,
    faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// import '../loginForm.css';
import {onSuccessSignUp} from "../../actions/auth";
// import './SignUpPage.css';
import {AudioCtx} from "../AudioProvider/AudioProvider";
import GoogleLogin from "react-google-login";

const SignUpPage = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, toggle] = useState(false);
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const signUpAction = (token, credentials) => dispatch(onSuccessSignUp(token, credentials));
    const {socket} = useContext(AudioCtx);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const onInputChange = (event) => {
        const {name, value} = event.target;

        switch (name) {
            case 'username':
                setUsername(value);
                break;
            case 'email':
                setEmail(value);
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

        console.log({username, password});

        const user = {
            username: username,
            email: email,
            password: password
        };
        console.log(user);

        socket.emit('signUp', {user}, (response) => {

            // if (response.message) setStatus(response.message);

            if (response.status === 'success') {
                // setToken(response.token);
                signUpAction(response.token, user);
                console.log(response.token);

                console.log(props.history);
                props.history.push("/");
            }
        })
    };

    return (
        <Form onSubmit={onSubmit} className='auth'>
            <div className='pt-3 pr-3 pl-3'>
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
                <Form.Group controlId="formBasicEmail">
                    <Form.Control className='input-auth'
                                  type="text"
                                  name='email'
                                  value={email}
                                  placeholder='Email'
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

export default SignUpPage;