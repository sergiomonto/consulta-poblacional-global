import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PopulationFilter from '../../../components/population/PopulationFilter';

jest.mock('react-tooltip', () => ({
  Tooltip: () => <div data-testid="mock-tooltip">Mock Tooltip</div>,
}));

describe('PopulationFilter Component', () => {
  const mockOnChange = jest.fn();

  test('renderiza correctamente el ícono de la lupa y el input', () => {
    render(
      <PopulationFilter
        filter={1000}
        onChange={mockOnChange}
        id="population-filter"
        tooltip="Introduce un valor para filtrar"
      />
    );

    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Filtrar por población mínima');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(1000);

    const tooltip = screen.getByTestId('mock-tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  test('llama a la función onChange cuando se cambia el valor del input', () => {
    render(
      <PopulationFilter
        filter={1000}
        onChange={mockOnChange}
        id="population-filter"
        tooltip="Introduce un valor para filtrar"
      />
    );

    const input = screen.getByPlaceholderText('Filtrar por población mínima');

    fireEvent.change(input, { target: { value: '2000' } });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
