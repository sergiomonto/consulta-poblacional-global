import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from '../../../components/population/NavigationBar';

describe('NavigationBar Component', () => {
  test('renderiza el logo, el título y los enlaces de navegación', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    const title = screen.getByText('Consulta Poblacional Global');
    expect(title).toBeInTheDocument();

    const links = ['Inicio', 'África', 'Asia', 'Europa', 'América', 'Oceanía'];
    links.forEach((linkText) => {
      const link = screen.getAllByText(linkText)[0]; 
      expect(link).toBeInTheDocument();
    });
  });

  test('alternar el menú móvil al hacer clic en el botón de hamburguesa', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );

    const mobileMenu = screen.getAllByRole('list')[1];
    expect(mobileMenu).toHaveClass('hidden');

    const burgerButton = screen.getByRole('button');
    fireEvent.click(burgerButton);

    expect(mobileMenu).toHaveClass('block');
  });

  test('el enlace activo tiene la clase de estilo correcto', () => {
    render(
      <Router>
        <NavigationBar />
      </Router>
    );

    const activeLink = screen.getAllByText('Inicio')[0];
    expect(activeLink).toHaveClass('text-yellow-50');
    expect(activeLink).toHaveClass('font-bold');
  });
});
