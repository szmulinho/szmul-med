import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DrugNames } from '../../data/drugstore';

export function DrugNamesComponent() {
    const [drugNames, setDrugNames] = useState<DrugNames>("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get<DrugNames>('http://localhost:8081/drugs');
            setDrugNames(response.data);
        } catch (error) {
            console.error('Error fetching drug names:', error);
        }
    };

    return (
        <div>
            <h1>Drug Names</h1>
            {drugNames ? (
                <p>{drugNames}</p>
            ) : (
                <p>No drug names found.</p>
            )}
        </div>
    );
}
