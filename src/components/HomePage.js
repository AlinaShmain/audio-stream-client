import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';

// import NavBar from './NavBar';

import AuthModal from './AuthModal/AuthModal';
// import music_image from './untitled.svg';

const HomePage = () => {
    const [modalShow, setModalShow] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    //
    // const onTabsChange = () => {
    //     setError(null);
    // };
    //
    // const onLoginSuccess = (method, response) => {
    //     console.log('logged successfully with ' + method);
    // };
    //
    // const onLoginFail = (method, response) => {
    //     console.log('logging failed with ' + method);
    //     setError(response);
    // };
    //
    // const startLoading = () => {
    //     setLoading(true);
    // };
    //
    // const finishLoading = () => {
    //     setLoading(false);
    // };

    const openModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
        // setError(null);
    };

    return (
        <React.Fragment>
            <div className='d-flex h-100'>
                <div className='col-8 image-welcome'></div>
                <div className="col-4 d-flex h-100 align-items-center logo">
                    <div className='col-12 text-center'>
                        <div className="welcome-text"><b>Yo<span>u</span> <span>are</span> wh<span>a</span>t <span>y</span>ou <span>
                            l</span>is<span>te</span>n <span>to</span>
                        </b></div>
                        {/*<img src={music_image} height='100px' width='100px'></img>*/}
                        <Button className='col-6 join-btn' onClick={openModal}>
                            <span>Sign In</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/*<NavBar show={modalShow} onHide={() => closeModal()} error={error} loading={loading} onTabsChange={onTabsChange}*/}
            {/*        startLoading={startLoading} finishLoading={finishLoading}/>*/}
            <AuthModal show={modalShow} onHide={closeModal}/>
        </React.Fragment>
    )
};

export default HomePage;