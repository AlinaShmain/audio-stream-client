import React, {useState, useEffect, useRef, useContext} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {onUpdateInfo} from "../../actions/auth";
import {changeSearchY} from "../../actions/main";
import {AudioCtx} from "../AudioProvider/AudioProvider";
import {setFoundTracks} from '../../actions/player';

const SearchInput = ({open}) => {
    const [input, setInput] = useState('');
    const searchRef = useRef();
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {socket} = useContext(AudioCtx);

    useEffect(() => {
        const username = localStorage.getItem("username");
        if (username) {
            dispatch(onUpdateInfo({username}));
        } else localStorage.setItem("username", user.username);
    }, []);

    useEffect(() => {
        if (searchRef.current) {
            const y = `${searchRef.current.style.marginTop} + ${searchRef.current.getBoundingClientRect().height}px`;
            console.log('y', y);

            dispatch(changeSearchY(y));
        }
    }, [searchRef]);

    const onInputChange = (event) => {
        console.log(event);
        let value = event.target.value;

        setInput(value);
    };

    const onSearch = () => {
        let value = input;
        if (value) {
            console.log(value);
            // value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            // const regexp = new RegExp(value, 'g');

            // const tracks = await getMatchTracks(regexp);

            socket.emit('searchTracks', {value}, (response) => {
                dispatch(setFoundTracks(response));

                // console.log(props.history);
                //props.history.push("/search");
            });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch();
            // console.log('ent');
        }
    };

    return (
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
                    onChange={onInputChange}
                    onKeyPress={handleKeyPress}
                    value={input}
                />
                <span className="input-group-append"
                      onClick={onSearch}>
                        <i className="fa fa-search"/>
                </span>
            </div>
            <div className='w-50 text-right pr-4'>
                <span className='user-name pr-3 align-text-top'>{user && user.username}</span>
                <div className='log-out-icon align-bottom' onClick={() => {
                }}/>
            </div>
        </div>
    )
};

export default SearchInput;