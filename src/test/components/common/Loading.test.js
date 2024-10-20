import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../../../components/common/Loading';

describe('Loading Component', () => {
    test('renderiza correctamente el ícono de carga', () => {
        const { container } = render(<Loading />);
        const loadingSpinner = container.querySelector('.animate-spin');
        
        expect(loadingSpinner).toBeInTheDocument();
        expect(loadingSpinner).toHaveClass('rounded-full');
        expect(loadingSpinner).toHaveClass('h-16');
        expect(loadingSpinner).toHaveClass('w-16');
    });
});
