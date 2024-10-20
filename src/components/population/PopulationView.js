import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import PopulationFilter from "./PopulationFilter";
import PopulationChart from "./PopulationChart";
import { generateColorPalette } from "../../utils/colorUtils";
import { useAxiosFetch } from "../../services/useAxiosFetch";
import { Chart, CategoryScale, BarElement, Title, Tooltip as ChartTooltip, Legend, RadialLinearScale, PointElement, LineElement, ArcElement, LinearScale } from "chart.js";
import Selector from "../common/Selector";
import { API_URL_ALL_COUNTRIES, API_URL_ONE_REGION } from "../../services/urls";
import Loading from '../common/Loading';
import Error from '../common/Error';

Chart.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend, RadialLinearScale, PointElement, LineElement, ArcElement);

function PopulationView() {
    const { continentName } = useParams();
    const [filter, setFilter] = useState("");
    const [chartType, setChartType] = useState("Bar");

    const URL = continentName ? `${API_URL_ONE_REGION}/${continentName}` : API_URL_ALL_COUNTRIES;
    const { data, loading, error } = useAxiosFetch(URL);

    const filteredData = useMemo(() => {
        if (continentName) {
            return data.filter((country) => !filter || country.population >= parseInt(filter, 10));
        } else {
            const continentPopulation = data.reduce((acc, country) => {
                const continent = country.region;
                if (!acc[continent]) acc[continent] = 0;
                acc[continent] += country.population;
                return acc;
            }, {});

            return Object.entries(continentPopulation).filter(
                ([, population]) => !filter || population >= parseInt(filter, 10)
            );
        }
    }, [data, filter, continentName]);

    const { backgroundColors, borderColors } = generateColorPalette(filteredData.length);

    const chartData = useMemo(() => {
        if (continentName) {
            return {
                labels: filteredData.map((country) => country.name.common),
                datasets: [
                    {
                        label: `Población de Países en ${continentName}`,
                        data: filteredData.map((country) => country.population),
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1,
                    },
                ],
            };
        }

        return {
            labels: filteredData.map(([continent]) => continent),
            datasets: [
                {
                    label: "Población por Continente",
                    data: filteredData.map(([, population]) => population),
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1,
                },
            ],
        };
    }, [filteredData, backgroundColors, borderColors, continentName]);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <Error message={error} />;
    }

    const options = [
        { value: 'Bar', label: 'Barras' },
        { value: 'Line', label: 'Área (Línea)' },
        { value: 'Doughnut', label: 'Donuts' },
    ];

    const handleFilter = (e) => setFilter(e.target.value);
    const handleSelector = (e) => setChartType(e.target.value);

    return (
        <div className="flex flex-col items-center mt-10 p-4 w-full">
            <PopulationFilter
                filter={filter}
                onChange={handleFilter}
                id="filterContinentsByPopulation"
                tooltip="Indica una población mínima por la cual filtrar los paises."
            />

            <Selector
                id="chartType"
                htmlFor="chartType"
                textLabel="Selecciona el tipo de gráfica:"
                value={chartType}
                onChange={handleSelector}
                options={options}
            />

            <PopulationChart chartData={chartData} chartType={chartType} />
        </div>
    );
}

export default PopulationView;