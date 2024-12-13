import React, { useState } from "react";
import { Covid } from "./Covid";
import { createCovidData } from "../../api/covidService";
import '../../styles/FormStyle.css'; // Import the CSS file

interface CovidFormProps {
    existingCovid?: Covid;
    onSave: () => void;
}

const CovidForm: React.FC<CovidFormProps> = ({ existingCovid, onSave }) => {
    const initialCovidState: Covid = existingCovid || {
        continent: '',
        country: '',
        population: 0,
        cases: {
            active: 0,
            recovered: 0,
            total: 0,
        },
        deaths: {
            total: 0,
        },
        tests: {
            total: 0,
        },
    };

    const [covid, setCovid] = useState<Covid>(initialCovidState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Handle nested property updates
        if (name === 'population' || name === 'active' || name === 'recovered' || name === 'totalDeaths' || name === 'totalTests') {
            const updatedCovid = { ...covid };
            if (name === 'population') {
                updatedCovid.population = Number(value);
            } else if (name === 'active') {
                updatedCovid.cases.active = Number(value);
            } else if (name === 'recovered') {
                updatedCovid.cases.recovered = Number(value);
            } else if (name === 'totalDeaths') {
                updatedCovid.deaths.total = Number(value);
            } else if (name === 'totalTests') {
                updatedCovid.tests.total = Number(value);
            }
            setCovid(updatedCovid);
        } else {
            setCovid({ ...covid, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { id, ...covidDataWithoutId } = covid; // Exclude the ID from the submission
        await createCovidData(covidDataWithoutId);
        onSave();
    };

    return (
        <div className="form-container">
            <h2 className="form-title">COVID Data Form</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Continent:</label>
                    <input
                        type="text"
                        name="continent"
                        value={covid.continent}
                        onChange={handleChange}
                        placeholder="Enter continent"
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={covid.country}
                        onChange={handleChange}
                        placeholder="Enter country"
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Population:</label>
                    <input
                        type="number"
                        name="population"
                        value={covid.population}
                        onChange={handleChange}
                        placeholder="Enter population"
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Active Cases:</label>
                    <input
                        type="number"
                        name="active"
                        value={covid.cases.active}
                        onChange={handleChange}
                        placeholder="Enter active cases"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Recovered Cases:</label>
                    <input
                        type="number"
                        name="recovered"
                        value={covid.cases.recovered}
                        onChange={handleChange}
                        placeholder="Enter recovered cases"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Total Deaths:</label>
                    <input
                        type="number"
                        name="totalDeaths"
                        value={covid.deaths.total}
                        onChange={handleChange}
                        placeholder="Enter total deaths"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Total Tests:</label>
                    <input
                        type="number"
                        name="totalTests"
                        value={covid.tests.total}
                        onChange={handleChange}
                        placeholder="Enter total tests"
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">Save</button>
            </form>
        </div>
    );
};

export default CovidForm;
