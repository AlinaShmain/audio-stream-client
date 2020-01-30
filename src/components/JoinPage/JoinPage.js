import React, {useState} from 'react';

import './JoinPage.css';
import AuthModal from "../AuthModal/AuthModal";

const JoinPage = () => {
    const [modalShow, setModalShow] = useState(false);
    const [visibleClass, setVisibleClass] = useState('visible');

    const openModal = () => {
        setModalShow(true);
        setVisibleClass('hidden');
    };

    const closeModal = () => {
        setModalShow(false);
        setVisibleClass('visible');
    };

    return (
        <div className="view">
            <div className="d-flex rgba-gradient justify-content-center h-100">
                {/*<div className="container h-100">*/}
                {/*    <div className="row h-100">*/}
                {/*        <div className="col-md-12 mb-4 white-text text-center h-100">*/}
                <div className='welcome-header text-center'
                     style={ {visibility: visibleClass}}>
                    <h1 className="h1-reponsive white-text text-uppercase">
                        You are what you</h1>
                    <h1 className="h1-reponsive white-text text-uppercase">
                        listen to</h1>
                    <a style={{marginTop: '40px'}} className='parallelogram-button' onClick={openModal}>
                        <span className='skew-fix'>Get started</span></a>
                </div>
                {/*</div>*/}
                {/*</div>*/}
            </div>
            <AuthModal show={modalShow} onHide={closeModal}/>
        </div>
    );
};

export default JoinPage;

{/*<div className='bg-image h-100'>*/
}
{/*    <div className='d-flex justify-content-center align-items-center h-100'>*/
}
{/*        <div className='welcome-header text-center'>*/
}
{/*            <span>You are what you listen to</span>*/
}
{/*        </div>*/
}
{/*        <button>*/
}
{/*            Get started*/
}
{/*        </button>*/
}
{/*    </div>*/
}
{/*</div>*/
}