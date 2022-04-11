import React from 'react';
import logo from '../../../images/logo_edu.png';

const Banner = () => {
    return (
        <div>
            <div class="banner my-5">
            <div class="header_img d-flex justify-content-center">
            <div>
                <img class="img-fluid" src={logo} alt=""/>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Banner;