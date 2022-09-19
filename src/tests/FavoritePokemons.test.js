import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('testes componente FavoritePokemons.js', () => {
  renderWithRouter(<FavoritePokemons />);
  const noFavoritesText = screen.getByText('No favorite pokemon found');
  expect(noFavoritesText).toBeInTheDocument();
  renderWithRouter(<App />);
  const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
  userEvent.click(linkMoreDetails);
  const checkBoxFavorite = screen.getByLabelText(/pokémon favoritado?/i);
  userEvent.click(checkBoxFavorite);
  const linkToFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(linkToFavorites);
  const numberOfFavorites = screen.getAllByText(/more details/i);
  expect(numberOfFavorites).toHaveLength(1);
});
