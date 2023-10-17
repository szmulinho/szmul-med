import React, { useState, useEffect } from 'react';
import { getAllDrugs, deleteDrug, Drug } from '../../../data/drugstore'; // Zaimportuj funkcję getAllDrugs oraz interfejs Drug z odpowiedniego pliku

interface DeleteDrugProps {
    onDelete: () => void;
}

export const DeleteDrug: React.FC<DeleteDrugProps> = ({ onDelete }) => {
    const [drugs, setDrugs] = useState<Drug[]>([]);
    const [selectedDrug, setSelectedDrug] = useState<string>('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const drugsData = await getAllDrugs();
                setDrugs(drugsData);
                if (drugsData.length > 0) {
                    // Ustaw domyślny lek do usunięcia na pierwszy lek z listy
                    setSelectedDrug(drugsData[0].drug_id.toString());
                }
            } catch (error) {
                console.error('Error fetching drugs:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteDrug(selectedDrug);
            setIsDeleting(false);
            onDelete();
        } catch (error) {
            console.error('Error deleting drug:', error);
            setIsDeleting(false);
        }
    };

    return (
        <div>
            <label>
                Wybierz lek do usunięcia:
                <select value={selectedDrug} onChange={(e) => setSelectedDrug(e.target.value)}>
                    {drugs.map((drug) => (
                        <option key={drug.drug_id} value={drug.drug_id.toString()}>
                            {drug.name} (ID: {drug.drug_id})
                        </option>
                    ))}
                </select>
            </label>
            <button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Usuwanie...' : 'Usuń'}
            </button>
        </div>
    );
};

