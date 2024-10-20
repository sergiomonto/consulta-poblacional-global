import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function PopulationChart({ chartData, chartType }) {
    let graph;
    switch (chartType) {
        case 'Bar':
            graph = <Bar data={chartData} />;
            break;
        case 'Line':
            graph = <Line data={chartData} />;
            break;
        case 'Doughnut':
            graph = <Doughnut data={chartData} />;
            break;
        default:
            graph = <Bar data={chartData} />;
    }

    return (
        <div className="flex justify-center items-center w-full h-[400px] max-w-[80rem] mt-12">
            {graph}
        </div>
    );
}

PopulationChart.propTypes = {
    chartData: PropTypes.object.isRequired,
    chartType: PropTypes.oneOf(['Bar', 'Line', 'Doughnut']).isRequired,
};

export default PopulationChart;
