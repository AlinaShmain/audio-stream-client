import React from 'react';

import './HomePage.css';

const HomePage = ({heightSearch, widthMenu}) => {

    return (
      <React.Fragment>
          <div
              style={{marginTop: `calc(${heightSearch})`, marginLeft: widthMenu}}
              className='d-flex home-page-container w-100'>
              {console.log(heightSearch)}
          </div>
      </React.Fragment>
    );
};

export default HomePage;