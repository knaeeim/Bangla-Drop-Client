import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';
import Benefits from '../Benefits/Benefits';
import BeMerchent from '../BeMerchent/BeMerchent';
import HowItWorks from '../HowitWorks/HowItWorks';
import Reviews from '../ReviewCarousel/Reviews';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <ClientLogosMarquee></ClientLogosMarquee>
            <Benefits></Benefits>
            <BeMerchent></BeMerchent>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;