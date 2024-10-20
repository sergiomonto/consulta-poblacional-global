import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Selector from '../../../components/common/Selector';

describe('Selector Component', () => {
    const mockOptions = [
        { value: 'Bar', label: 'Barras' },
        { value: 'Line', label: 'Área (Línea)' },
        { value: 'Doughnut', label: 'Donuts' },
    ];

    test('renderiza correctamente el label y el select con opciones', () => {
        render(
            <Selector
                id="test-selector"
                htmlFor="test-selector"
                textLabel="Elige un gráfico"
                value="Bar"
                onChange={() => { }}
                options={mockOptions}
            />
        );

        const label = screen.getByLabelText('Elige un gráfico');
        expect(label).toBeInTheDocument();

        const select = screen.getByRole('combobox');
        expect(select).toBeInTheDocument();

        const optionBar = screen.getByText('Barras');
        const optionLine = screen.getByText('Área (Línea)');
        const optionDoughnut = screen.getByText('Donuts');
        expect(optionBar).toBeInTheDocument();
        expect(optionLine).toBeInTheDocument();
        expect(optionDoughnut).toBeInTheDocument();
    });

    test('cambia el valor seleccionado y llama a onChange', () => {
        const handleChange = jest.fn();

        render(
            <Selector
                id="test-selector"
                htmlFor="test-selector"
                textLabel="Elige un gráfico"
                value="Line"
                onChange={handleChange}
                options={mockOptions}
            />
        );

        const select = screen.getByRole('combobox');
        fireEvent.change(select, { target: { value: 'Line' } });

        expect(handleChange).toHaveBeenCalled();
        expect(select.value).toBe('Line');
    });
});
