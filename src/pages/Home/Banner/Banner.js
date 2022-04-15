import React from 'react';
import logo from '../../../images/logo_edu.png'
const Banner = () => {
    return (
        <div>
            <div className="banner my-5">
                <div className="header_img d-flex justify-content-center">
                    <div>
                        <img className="img-fluid" src={logo} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;