import React, {useEffect, useState, useRef} from 'react';
import {Route, Switch, NavLink, Link} from 'react-router-dom';

import {HomePage, SongPage} from "../index";
import AudioPlayer from '../AudioPlayer/AudioPlayer';

import './MainPage.css';


const Menu = ({open}) => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    const searchRef = useRef();
    const menuRef = useRef();

    useEffect(() => {
        if (searchRef.current) {
            console.log(searchRef.current.offsetHeight);
            setHeight(`${searchRef.current.style.marginTop} + ${searchRef.current.getBoundingClientRect().height}px`);
        }
        console.log(menuRef);
        if (menuRef.current) {
            console.log(menuRef.current.offsetWidth);
            setWidth(menuRef.current.offsetWidth);
        }
    }, [searchRef, menuRef, open]);

    return (
        <React.Fragment>
            <nav
                // style={{transform: open ? 'translateX(0)' : 'translateX(-50%)'}}
                // style={{transform: open ? 'width(5%)' : 'width(20%)'}}
                ref={menuRef}
                className={open ? 'opened-menu' : 'closed-menu'}
            >
                {open
                    ?
                    <React.Fragment>
                        <NavLink to='/home' activeClassName='active-link'>
                            <span>Home</span>
                        </NavLink>
                        <NavLink to='/songs' activeClassName='active-link'>
                            <span>Songs</span>
                        </NavLink>
                        <NavLink to='#' activeClassName='active-link'>
                            <span>Playlists</span>
                        </NavLink>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <a href='/home'>
                            <div className="home-icon"><span>Home</span></div>
                        </a>
                        <a href='/songs'>
                            <div className="song-icon"><span>Songs</span></div>
                        </a>
                        <a href='#'>
                            <div className="playlist-icon"><span>Playlists</span></div>
                        </a>
                    </React.Fragment>
                }
            </nav>

            <div
                ref={searchRef}
                style={{
                    marginLeft: open ? '25%' : '9%', transition: 'margin-left 0.3s ease-in-out',
                    marginTop: '2%'
                }}
                className='d-flex fixed-top search'>
                <div className='input-group w-50'>
                    <input
                        className="form-control"
                        type="text"
                        placeholder='Search for song, artist, album'
                        onChange={() => {
                        }}
                    />
                    <span className="input-group-append">
                        <i className="fa fa-search"></i>
                    </span>
                </div>
            </div>

            <Switch>
                <Route exact path='/home' component={(props) =>
                    <HomePage {...props} heightSearch={height} widthMenu={width}/>
                }/>
                <Route path='/songs' component={SongPage}/>
            </Switch>

            <AudioPlayer/>
        </React.Fragment>
    )
};

const Burger = ({open, setOpen}) => {
    return (
        <button
            onClick={() => setOpen(!open)}
            className='hamburger'>
            <div style={
                open
                    ? {
                        ...styles.hamLine, transform: 'rotate(45deg)'
                    }
                    : {
                        ...styles.hamLine, transform: 'rotate(0)'
                    }
            }/>
            <div style={
                open
                    ? {
                        ...styles.hamLine, opacity: '0', transform: 'translateX(20px)'
                    }
                    : {
                        ...styles.hamLine, opacity: '1', transform: 'translateX(0)'
                    }
            }/>
            <div style={
                open
                    ? {
                        ...styles.hamLine, transform: 'rotate(-45deg)'
                    }
                    : {
                        ...styles.hamLine, transform: 'rotate(0)'
                    }
            }/>
        </button>
    )
};

const styles = {
    hamLine: {
        width: '2rem',
        height: '0.25rem',
        backgroundColor: '#fff',
        borderRadius: '10px',
        transition: 'all 0.3s linear',
        position: 'relative',
        transformOrigin: '1px'
    }
};

const MainPage = () => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        console.log('mainpage ' + open);
    }, []);

    return (
        <div className='main-page h-100'>
            <Burger open={open} setOpen={setOpen}/>
            <Menu open={open} setOpen={setOpen}/>
        </div>
    );
};

export default MainPage;