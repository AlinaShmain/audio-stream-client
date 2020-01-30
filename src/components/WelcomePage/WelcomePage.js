import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import {Nav} from 'react-bootstrap';

import JoinPage from '../JoinPage/JoinPage';
import './WelcomePage.css';

const WelcomePage = () => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg rgba-gradient fixed-top scrolling-navbar">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent-7" aria-controls="navbarSupportedContent-7"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-7">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/join">Join <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Help</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Route path='/join' component={JoinPage}/>
        </React.Fragment>
    );
};

export default WelcomePage;

{/*<Nav className='navbar fixed-top scrolling-navbar welcome-nav h-10 w-100'>*/}
{/*    <div className='navbar-nav mr-auto'>*/}
{/*        <Nav.Item>*/}
{/*            <Nav.Link as={NavLink} to='/join'>Join</Nav.Link>*/}
{/*        </Nav.Item>*/}
{/*        <Nav.Item>*/}
{/*            <Nav.Link as={NavLink} to='#'>About</Nav.Link>*/}
{/*        </Nav.Item>*/}
{/*        <Nav.Item>*/}
{/*            <Nav.Link as={NavLink} to='#'>Help</Nav.Link>*/}
{/*        </Nav.Item>*/}
{/*    </div>*/}
{/*</Nav>*/}