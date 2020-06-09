import React, {useContext, useState} from 'react';
import {Form, Button} from "react-bootstrap";
import {AudioCtx} from "../AudioProvider/AudioProvider";

const AdminPage = () => {
    const [title, setTitle] = useState('');
    const [nameArtist, setNameArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [descriptionArtist, setDescriptionArtist] = useState('');
    const [genreArtist, setGenreArtist] = useState('');
    const {socket} = useContext(AudioCtx);

    const onInputChange = (event) => {
        const {name, value} = event.target;

        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'nameArtist':
                setNameArtist(value);
                break;
            case 'album':
                setAlbum(value);
                break;
            case 'descriptionArtist':
                setDescriptionArtist(value);
                break;
            case 'genreArtist':
                setGenreArtist(value);
                break;
            default:
                break;
        }
    };

    const onSubmit = () => {
        const trackInfo = {
            title,
            artistInfo: {
                nameArtist,
                descriptionArtist,
                genreArtist
            },
            album
        };
        socket.emit('addTrack', {trackInfo}, (response) => {
            console.log(response);
        });
    };

    return (
        <div>
            <Form onSubmit={onSubmit} className=''>
                <p>Add new track info</p>
                <Form.Group controlId="formBasicTitle">
                    <Form.Control className=''
                                  type="text"
                                  name='title'
                                  value={title}
                                  placeholder='Title'
                                  onChange={onInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicNameArtist">
                    <Form.Control className=''
                                  type="text"
                                  name='nameArtist'
                                  value={nameArtist}
                                  placeholder='Name Artist'
                                  onChange={onInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicAlbum">
                    <Form.Control className=''
                                  type="text"
                                  name='album'
                                  value={album}
                                  placeholder='Album'
                                  onChange={onInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicDescriptionArtist">
                    <Form.Control className=''
                                  type="text"
                                  name='descriptionArtist'
                                  value={descriptionArtist}
                                  placeholder='Description Artist'
                                  onChange={onInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicGenreArtist">
                    <Form.Control className=''
                                  type="text"
                                  name='genreArtist'
                                  value={genreArtist}
                                  placeholder='Genre Artist'
                                  onChange={onInputChange}
                    />
                </Form.Group>
                <div className='d-flex justify-content-center mt-4'>
                    <Button
                        className=''
                        type='submit'>
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
};

export default AdminPage;