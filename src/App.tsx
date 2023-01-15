import { useState, useEffect } from 'react';
import CountryCard from './components/country_card/country.card';
import './App.css';
import Dropdown from './components/dropdown/dropdown';

const baseApiUrl = "https://restcountries.com/v3.1";

function parseResponseCountry(country: any) {
    return {
        name: country.name.common,
        flag: country.flags.svg,
        population: country.population.toLocaleString(),
        region: country.region,
        capital: country.capital[0]
    };
}

function App() {
    const [countries, setCountries] = useState([]);
    const [regionOptions, setRegionOptions] = useState([
        {
            id: 0,
            name: "Africa"
        },
        {
            id: 1,
            name: "America"
        },
        {
            id: 2,
            name: "Asia"
        },
        {
            id: 3,
            name: "Europe"
        },
        {
            id: 4,
            name: "Oceania"
        }
    ]);
    const [dropdownValue, setDropdownValue] = useState(null);

    useEffect(() => {
        fetch(`${baseApiUrl}/all`, {
            method: "GET"
        }).then(res => res.json())
            .then(res => {
                setCountries(res.slice(0, 10).map((country: any) => parseResponseCountry(country)));
            });
    }, []);

    function handleRegionChange(region: any) {
        console.log("reg", region);
        setDropdownValue(region);
        fetch(`${baseApiUrl}/region/${region.name}`, {
            method: "GET"
        }).then(res => res.json())
            .then(res => {
                setCountries(res.slice(0, 10).map((country: any) => parseResponseCountry(country)));
            });
    }

    return (
        <div >
            <h1 className="text-3xl font-bold underline text-center">
                Countries
            </h1>
            <Dropdown
                label="Filter by Region"
                options={regionOptions}
                value={dropdownValue}
                handleChange={handleRegionChange}
            />
            <div className="country_cards_list">
                {
                    countries.map(country => <CountryCard key={country.id} country={country} />)
                }
            </div>
        </div>
    );
}

export default App;

{/* <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p> */}