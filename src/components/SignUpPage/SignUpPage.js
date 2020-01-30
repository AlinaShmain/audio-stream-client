import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {signUp} from "../../actions/auth";


const SignUpPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const signUpAction = (credentials) => dispatch(signUp(credentials));

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

        signUpAction({username, password});
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                onChange={onInputChange}
                type='text'
                name='username'
                value={username}
                placeholder='Enter your name'
            />
            <input
                onChange={onInputChange}
                type='password'
                name='password'
                value={password}
                placeholder='Enter your password'
            />
            <input type='submit' value='Sign Up'/>
        </form>
    );
};

export default SignUpPage;