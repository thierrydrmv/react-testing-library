import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testes do componente app.js', () => {
  it('testa se o topo da aplicação tem 3 links: Home, About e Favorite', () => {
    renderWithRouter(<App />);
    const linkToHome = screen.getByRole('link', { name: /home/i });
    const linkToAbout = screen.getByRole('link', { name: /about/i });
    const linkToFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkToFavorites).toBeInTheDocument();
  });
  it(
    'testa se a aplicação é redirecionada para a página inicial ao clicar no linkHome',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToHome = screen.getByRole('link', { name: /home/i });
      userEvent.click(linkToHome);
      const { pathname } = history.location;
      const homeTitle = screen.getByRole('heading', { name: /encountered pokémons/i });
      expect(homeTitle).toBeInTheDocument();
      expect(pathname).toBe('/');
    },
  );
  it(
    'testa se a aplicação é redirecionada para a página sobre ao clicar no linkAbout',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToAbout = screen.getByRole('link', { name: /about/i });
      userEvent.click(linkToAbout);
      const { pathname } = history.location;
      const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
      expect(aboutTitle).toBeInTheDocument();
      expect(pathname).toBe('/about');
    },
  );
  it(
    'testa se a aplicação é redirecionada para a página favoritos ao clicar no linkFavor',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(linkToFavorites);
      const { pathname } = history.location;
      const favoritesTitle = screen.getByRole('heading', { name: /favorite pokémons/i });
      expect(favoritesTitle).toBeInTheDocument();
      expect(pathname).toBe('/favorites');
    },
  );
  it(
    'a aplicação é redirecionada para a página notFound ao receber uma URL inexistente',
    () => {
      const { history } = renderWithRouter(<App />);

      act(() => {
        history.push('/pagina-nao-existente');
      });
      const imagePageNotFound = screen.getByRole('img', {
        name: /pikachu crying because the page requested was not found/i,
      });
      expect(imagePageNotFound).toBeInTheDocument();
    },
  );
});
