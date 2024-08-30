import React, { useState, useEffect, useRef } from "react";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import '../css/TableComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY = "47de584d708e209aa1803379fa530fe9221def58"; // Replace with your API key

const columns = [
    {
        name: 'จังหวัด',
        selector: row => row.name,
        sortable: true,
        cell: row => <div className="text-left">{row.name}</div>,
    },
    {
        name: 'ค่า PM2.5',
        selector: row => row.pm25,
        sortable: true,
        cell: row => <div className="text-center">{row.pm25}</div>,
    },
    {
        name: 'อุณหภูมิ (°C)',
        selector: row => row.temp,
        sortable: true,
        cell: row => <div className="text-center">{row.temp}</div>,
    },
];

const TableComponent = ({ provinces }) => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProvinces, setFilteredProvinces] = useState([]);
    const autocompleteRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            const updatedProvinces = await Promise.all(provinces.map(async (province) => {
                try {
                    const response = await axios.get(`https://api.waqi.info/feed/geo:${province.lat};${province.lon}/?token=${API_KEY}`);
                    const pm25 = response.data.status === "ok" && response.data.data.iaqi.pm25 ? response.data.data.iaqi.pm25.v : "N/A";
                    const temp = response.data.status === "ok" && response.data.data.iaqi.t ? response.data.data.iaqi.t.v : "N/A";
                    return { ...province, pm25, temp };
                } catch (error) {
                    console.error(`Error fetching data for ${province.name}:`, error);
                    return { ...province, pm25: "Error", temp: "Error" };
                }
            }));

            updatedProvinces.sort((a, b) => parseInt(a.postalCode, 10) - parseInt(b.postalCode, 10));
            setData(updatedProvinces);
        }

        fetchData();
    }, [provinces]);

    useEffect(() => {
        const filtered = data.filter(province =>
            province.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        filtered.sort((a, b) => parseInt(a.postalCode, 10) - parseInt(b.postalCode, 10));
        setFilteredProvinces(filtered);
    }, [searchQuery, data]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
                setSearchQuery('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="table-container">
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="ค้นหาจังหวัด..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="rdt_TableWrapper">
                {filteredProvinces.length > 0 ? (
                    <DataTable
                        columns={columns}
                        data={filteredProvinces}
                        pagination
                        highlightOnHover
                        striped
                        dense
                    />
                ) : (
                    <div className="no-data">ไม่มีข้อมูลที่ตรงกับการค้นหา</div>
                )}
            </div>
        </div>
    );
};

export default TableComponent;
