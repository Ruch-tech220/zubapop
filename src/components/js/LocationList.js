import React from "react";
import { Link } from "react-router-dom";
import provinces from "../data/provinces";

const LocationList = () => {
    return (
        <div>
            <h1>จังหวัดในประเทศไทย</h1>
            <ul>
                {provinces.map((province) => (
                    <li key={province.postalCode}>
                        {province.name}
                        <Link to={`/card/${province.postalCode}`}>
                            <button>ดูรายละเอียด</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationList;
