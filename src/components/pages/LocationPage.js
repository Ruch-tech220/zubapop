import React from 'react';
import { useParams } from 'react-router-dom';
import LocationDetail from '../js/LocationDetail';

function LocationPage({ aqiData }) {
    const { postalCode } = useParams(); // รับ postalCode จาก URL

    return (
        <div>
            <LocationDetail aqiData={aqiData} postalCode={postalCode} />
        </div>
    );
}

export default LocationPage;
