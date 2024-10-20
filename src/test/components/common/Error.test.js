import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from '../../../components/common/Error';

describe('Error Component', () => {
  test('debe mostrar el mensaje de error', () => {
    const errorMessage = 'Este es un error';
    render(<Error message={errorMessage} />);
    expect(screen.getByText(/este es un error/i)).toBeInTheDocument();
  });
});
