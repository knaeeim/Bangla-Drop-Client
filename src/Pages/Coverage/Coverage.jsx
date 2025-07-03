import React from 'react';
import { useLoaderData } from 'react-router';
import BangladeshMap from './BangladeshMap';

const Coverage = () => {

    const serviceAreas = useLoaderData();

    return (
        <div className='max-w-7xl mx-auto px-4 py-10'>
            <h1 className='text-3xl font-bold text-center mb-6'>We are available in 64 districts</h1>
            <BangladeshMap serviceCenters={serviceAreas}></BangladeshMap>
        </div>
    );
};

export default Coverage;