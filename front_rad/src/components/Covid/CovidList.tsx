import React, { useEffect, useState } from "react";
import { Covid } from "./Covid";
import { fetchCovidData, deleteCovidData, updateCovidData, getCountryCovidData } from "../../api/covidService"; // Import getCountryCovidData
import '../../styles/List.css';

const CovidList: React.FC = () => {
    const [covidData, setCovidData] = useState<Covid[]>([]);
    const [selectedCovidId, setSelectedCovidId] = useState<string | null>(null);
    const [editingCovidId, setEditingCovidId] = useState<string | null>(null);
    const [editFormData, setEditFormData] = useState<Covid>({
        continent: "",
        country: "",
        population: 0,
        cases: {
            active: 0,
            recovered: 0,
            total: 0
        },
        deaths: {
            total: 0
        },
        tests: {
            total: 0
        }
    });

    // State for new country input
    const [newCountry, setNewCountry] = useState<string>("");

    useEffect(() => {
        const getCovidData = async () => {
            try {
                const data = await fetchCovidData();
                setCovidData(data);
            } catch (error) {
                console.error('Error fetching COVID data:', error);
            }
        };
        getCovidData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteCovidData(id);
            setCovidData(covidData.filter(cd => cd.id !== id));
        } catch (error) {
            console.error('Error deleting COVID data:', error);
        }
    };

    const toggleCovidDetails = (id: string) => {
        if (editingCovidId !== id) {
            setSelectedCovidId(selectedCovidId === id ? null : id);
        }
    };

    const handleEdit = (data: Covid) => {
        setEditingCovidId(data.id || null);
        setEditFormData(data);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        setEditFormData(prev => {
            if (keys.length > 1) {
                const [outerKey, innerKey] = keys;
                return {
                    ...prev,
                    [outerKey]: {
                        ...(prev[outerKey as keyof Covid] as object),
                        [innerKey]: value
                    }
                };
            } else {
                return {
                    ...prev,
                    [name]: value
                };
            }
        });
    };

    const handleSubmitEdit = async (id: string) => {
        try {
            const updatedData = await updateCovidData(id, editFormData);
            setCovidData(covidData.map(item => 
                item.id === id ? updatedData : item
            ));
            setEditingCovidId(null);
            setEditFormData({
                continent: "",
                country: "",
                population: 0,
                cases: {
                    active: 0,
                    recovered: 0,
                    total: 0
                },
                deaths: {
                    total: 0
                },
                tests: {
                    total: 0
                }
            });
        } catch (error) {
            console.error('Error updating COVID data:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingCovidId(null);
        setEditFormData({
            continent: "",
            country: "",
            population: 0,
            cases: {
                active: 0,
                recovered: 0,
                total: 0
            },
            deaths: {
                total: 0
            },
            tests: {
                total: 0
            }
        });
    };

    // Function to handle adding new country data
    const handleAddCountry = async () => {
        if (!newCountry.trim()) return; // Prevent empty input

        try {
            await getCountryCovidData(newCountry);
            const data = await fetchCovidData();
            setCovidData(data);
        } catch (error) {
            console.error('Error adding new country COVID data:', error);
        }
    };

    return (
        <div>
            <h1>Covid Data List</h1>
            <div>
                <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    placeholder="Enter country name"
                />
                <button onClick={handleAddCountry}>Add Country</button>
            </div>
            <ul>
               {covidData.map(cd => (
        <li key={cd.id ? cd.id : `${cd.country}-${cd.continent}`}> {/* Use cd.id, or a composite key if id is undefined */}
            <h3 onClick={() => cd.id && toggleCovidDetails(cd.id)}>
                {cd.country}
            </h3>

            {selectedCovidId === cd.id && editingCovidId !== cd.id && (
                <div>
                    <p><strong>Continent:</strong> {cd.continent}</p>
                    <p><strong>Population:</strong> {cd.population}</p>
                    <p><strong>Active Cases:</strong> {cd.cases.active}</p>
                    <p><strong>Recovered Cases:</strong> {cd.cases.recovered}</p>
                    <p><strong>Total Deaths:</strong> {cd.deaths.total}</p>
                    <p><strong>Total Tests:</strong> {cd.tests.total}</p>
                    <div>
                        <button onClick={() => handleEdit(cd)}>
                            Edit
                        </button>
                        <button onClick={() => cd.id && handleDelete(cd.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            )}

                        {editingCovidId === cd.id && (
                            <div>
                                <div>
                                    <label>Continent</label>
                                    <input
                                        type="text"
                                        name="continent"
                                        value={editFormData.continent}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={editFormData.country}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Population</label>
                                    <input
                                        type="number"
                                        name="population"
                                        value={editFormData.population}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Active Cases</label>
                                    <input
                                        type="number"
                                        name="cases.active"
                                        value={editFormData.cases.active}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Recovered Cases</label>
                                    <input
                                        type="number"
                                        name="cases.recovered"
                                        value={editFormData.cases.recovered}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Total Deaths</label>
                                    <input
                                        type="number"
                                        name="deaths.total"
                                        value={editFormData.deaths.total}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <label>Total Tests</label>
                                    <input
                                        type="number"
                                        name="tests.total"
                                        value={editFormData.tests.total}
                                        onChange={handleEditChange}
                                    />
                                </div>
                                <div>
                                    <button onClick={() => cd.id && handleSubmitEdit(cd.id)}>
                                        Save
                                    </button>
                                    <button onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CovidList;
