import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('testes do componente app.js', () => {
  renderWithRouter(<App />);

  const linkToHome = screen.getByRole('link', { name: /home/i });
  const linkToAbout = screen.getByRole('link', { name: /about/i });
  const linkToFavorites = screen.getByRole('link', { name: /favorite pokémons/i });

  expect(linkToHome).toBeInTheDocument();
  expect(linkToAbout).toBeInTheDocument();
  expect(linkToFavorites).toBeInTheDocument();

  userEvent.click(linkToHome);
  const homeTitle = screen.getByRole('heading', { name: /encountered pokémons/i });
  expect(homeTitle).toBeInTheDocument();

  userEvent.click(linkToAbout);
  const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
  expect(aboutTitle).toBeInTheDocument();

  userEvent.click(linkToFavorites);
  const favoritesTitle = screen.getByRole('heading', { name: /favorite pokémons/i });
  expect(favoritesTitle).toBeInTheDocument();
});
