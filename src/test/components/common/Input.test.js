import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/common/Input';

describe('Input Component', () => {
    test('renderiza correctamente el input con sus props', () => {
        render(
            <Input
                id="test-input"
                type="text"
                placeholder="Escribe algo"
                value=""
                onChange={() => { }}
            />
        );

        const input = screen.getByPlaceholderText('Escribe algo');
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('type', 'text');
    });

    test('muestra advertencia si el valor es menor que el mínimo', () => {
        const handleChange = jest.fn();

        render(
            <Input
                id="test-input"
                type="number"
                placeholder="Introduce un número"
                value=""
                onChange={handleChange}
                min={10}
            />
        );

        const input = screen.getByPlaceholderText('Introduce un número');
        fireEvent.change(input, { target: { value: '5' } });

        const warning = screen.getByText('El valor no puede ser menor que 10');
        expect(warning).toBeInTheDocument();

        expect(handleChange).not.toHaveBeenCalled();
    });

    test('no muestra advertencia cuando el valor es igual o mayor que el mínimo', () => {
        const handleChange = jest.fn();

        render(
            <Input
                id="test-input"
                type="number"
                placeholder="Introduce un número"
                value=""
                onChange={handleChange}
                min={10}
            />
        );

        const input = screen.getByPlaceholderText('Introduce un número');
        fireEvent.change(input, { target: { value: '15' } });

        const warning = screen.queryByText(/el valor no puede ser menor que/i);
        expect(warning).toBeNull();

        expect(handleChange).toHaveBeenCalled();
    });
});
