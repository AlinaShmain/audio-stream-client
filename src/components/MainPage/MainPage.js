import React, {useEffect, useState, useRef} from 'react';
import {useDispatch} from "react-redux";
import {Route, Switch, NavLink, Link} from 'react-router-dom';

import {HomePage, SongPage} from "../index";
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import {changeSearchY, changeMenuWidth} from '../../actions/main';

import './MainPage.css';


const Menu = ({props, open}) => {

    const searchRef = useRef();
    const menuRef = useRef();
    const openMenuRef = useRef();
    const closedMenuRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        if (searchRef.current) {
            // console.log(searchRef.current.offsetHeight);

            const y = `${searchRef.current.style.marginTop} + ${searchRef.current.getBoundingClientRect().height}px`;
            console.log('y', y);

            // setHeight(`${searchRef.current.style.marginTop} + ${searchRef.current.getBoundingClientRect().height}px`);
            dispatch(changeSearchY(y));
        }
        // console.log(menuRef);
        if(open && openMenuRef.current) {
                console.log('ldld', openMenuRef.current.offsetWidth);
                dispatch(changeMenuWidth(openMenuRef.current.offsetWidth));
        } else if(closedMenuRef) {
            console.log(closedMenuRef.current.offsetWidth);
                dispatch(changeMenuWidth(closedMenuRef.current.offsetWidth));
        }
        // if (menuRef.current) {
        //     console.log(menuRef.current.offsetWidth);
        //     // setWidth(menuRef.current.offsetWidth);
        //
        //     dispatch(changeMenuWidth(menuRef.current.offsetWidth));
        // }
    }, [searchRef, openMenuRef, closedMenuRef, open]);

    return (
        <React.Fragment>
                {open
                    ?
                    <nav
                        ref={openMenuRef}
                        className='opened-menu'
                    >
                        <NavLink to='/home' activeClassName='active-link'>
                            <span>Home</span>
                        </NavLink>
                        <NavLink to='/songs' activeClassName='active-link'>
                            <span>Songs</span>
                        </NavLink>
                        <NavLink to='#' activeClassName='active-link'>
                            <span>Playlists</span>
                        </NavLink>
                    </nav>
                    :
                    <nav
                        ref={closedMenuRef}
                        className='closed-menu'
                    >
                        <a href='/home'>
                            <div className="home-icon"><span>Home</span></div>
                        </a>
                        <a href='/songs'>
                            <div className="song-icon"><span>Songs</span></div>
                        </a>
                        <a href='#'>
                            <div className="playlist-icon"><span>Playlists</span></div>
                        </a>
                    </nav>
                }

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

            {props.children}
            {/*<Switch>*/}
            {/*    <Route exact path='/home' component={(props) =>*/}
            {/*        <HomePage {...props} heightSearch={height} widthMenu={width}/>*/}
            {/*    }/>*/}
            {/*    <Route path='/songs' component={SongPage}/>*/}
            {/*</Switch>*/}

        </React.Fragment>
    )
};

{/*<nav*/}
{/*    // style={{transform: open ? 'translateX(0)' : 'translateX(-50%)'}}*/}
{/*    // style={{transform: open ? 'width(5%)' : 'width(20%)'}}*/}
{/*    ref={menuRef}*/}
{/*    className={open ? 'opened-menu' : 'closed-menu'}*/}
{/*>*/}
{/*    {open*/}
{/*        ?*/}
{/*        <React.Fragment>*/}
{/*            <NavLink to='/home' activeClassName='active-link'>*/}
{/*                <span>Home</span>*/}
{/*            </NavLink>*/}
{/*            <NavLink to='/songs' activeClassName='active-link'>*/}
{/*                <span>Songs</span>*/}
{/*            </NavLink>*/}
{/*            <NavLink to='#' activeClassName='active-link'>*/}
{/*                <span>Playlists</span>*/}
{/*            </NavLink>*/}
{/*        </React.Fragment>*/}
{/*        :*/}
{/*        <React.Fragment>*/}
{/*            <a href='/home'>*/}
{/*                <div className="home-icon"><span>Home</span></div>*/}
{/*            </a>*/}
{/*            <a href='/songs'>*/}
{/*                <div className="song-icon"><span>Songs</span></div>*/}
{/*            </a>*/}
{/*            <a href='#'>*/}
{/*                <div className="playlist-icon"><span>Playlists</span></div>*/}
{/*            </a>*/}
{/*        </React.Fragment>*/}
{/*    }*/}
{/*</nav>*/}

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

const MainPage = (props) => {
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        console.log('mainpage ' + open);
        // console.log('location', props);
    }, []);

    return (
        <div className='main-page h-100'>
            <Burger open={open} setOpen={setOpen}/>
            <Menu props={props} open={open} setOpen={setOpen}/>
            <AudioPlayer props={props}/>
        </div>
    );
};

export default MainPage;