import React from 'react';
import Header from '../../Components/User/Header'
import Footer from '../../Components/User/Footer'
import Banner from '../../Components/User/Banner'


function UserHome() {
    return (
        <div className="homeParentDiv">
            <Header/>
            <Banner/>
            <Footer/>
        </div>


    );
}

export default UserHome;
