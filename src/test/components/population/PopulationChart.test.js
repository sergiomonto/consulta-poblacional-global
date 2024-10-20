import React from 'react';
import { render, screen } from '@testing-library/react';
import PopulationChart from '../../../components/population/PopulationChart';

jest.mock('react-chartjs-2', () => ({
  Bar: jest.fn(() => <div>Bar Chart Mock</div>),
  Line: jest.fn(() => <div>Line Chart Mock</div>),
  Doughnut: jest.fn(() => <div>Doughnut Chart Mock</div>),
}));

describe('PopulationChart Component', () => {
  const mockChartData = {
    labels: ['Enero', 'Febrero', 'Marzo'],
    datasets: [
      {
        label: 'Población',
        data: [1000, 2000, 3000],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  test('renderiza un gráfico de barras cuando el tipo es "Bar"', () => {
    render(<PopulationChart chartData={mockChartData} chartType="Bar" />);

    expect(screen.getByText('Bar Chart Mock')).toBeInTheDocument();
  });

  test('renderiza un gráfico de líneas cuando el tipo es "Line"', () => {
    render(<PopulationChart chartData={mockChartData} chartType="Line" />);

    expect(screen.getByText('Line Chart Mock')).toBeInTheDocument();
  });

  test('renderiza un gráfico de donuts cuando el tipo es "Doughnut"', () => {
    render(<PopulationChart chartData={mockChartData} chartType="Doughnut" />);

    expect(screen.getByText('Doughnut Chart Mock')).toBeInTheDocument();
  });

  test('renderiza un gráfico de barras por defecto cuando el tipo es desconocido', () => {
    render(<PopulationChart chartData={mockChartData} chartType="Unknown" />);

    expect(screen.getByText('Bar Chart Mock')).toBeInTheDocument();
  });
});
