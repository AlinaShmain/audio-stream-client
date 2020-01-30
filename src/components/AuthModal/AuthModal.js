import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';

import SignInPage from "../SignInPage/SignInPage";
import SignUpPage from "../SignUpPage/SignUpPage";

import './authModal.css';

const AuthModal = (props) => {
    const [isLoginOpen, setIsLoginOpen] = useState(true);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const showRegisterBox = () => {
        setIsRegisterOpen(true);
        setIsLoginOpen(false);
    };

    const showLoginBox = () => {
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
    };

    return (
        <Modal
            {...props}
            centered>
            <Modal.Header closeButton>
                {/*<button type="button" className="close" onClick={props.onHide}>*/}
                {/*    <span aria-hidden="true">×</span><span*/}
                {/*    className="sr-only">Close</span></button>*/}
                <Nav className='w-100' fill variant='tabs'>
                    <Nav.Item>
                        <div
                            className={'tablink w-100 ' + (isLoginOpen ? 'active' : '')}
                            onClick={showLoginBox}
                        >Sign In
                            <div className='border-line'/>
                        </div>
                    </Nav.Item>
                    <Nav.Item>
                        <div
                            className={'tablink w-100 ' + (isRegisterOpen ? 'active' : '')}
                            onClick={showRegisterBox}
                        >Sign Up
                            <div className='border-line'/>
                        </div>
                    </Nav.Item>
                </Nav>
            </Modal.Header>
            <Modal.Body className='text-center'>
                {isLoginOpen && <SignInPage/>}
                {isRegisterOpen && <SignUpPage/>}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default AuthModal;