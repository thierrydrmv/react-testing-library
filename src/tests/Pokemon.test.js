import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

test('testes componente Pokemon.js', () => {
  const { history } = renderWithRouter(<Pokemon pokemon={ data[7] } isFavorite />);
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName.innerHTML).toBe('Snorlax');
  const pokemonType = screen.getByTestId('pokemon-type');
  expect(pokemonType.innerHTML).toBe('Normal');
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  expect(pokemonWeight.innerHTML).toBe('Average weight: 460.0 kg');
  const image = screen.getByRole('img', { name: /snorlax sprite/i });
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');
  const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
  expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/143');
  userEvent.click(linkMoreDetails);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/143');
  const imageFavorite = screen
    .getByRole('img', { name: /snorlax is marked as favorite/i });
  expect(imageFavorite).toHaveAttribute('src', '/star-icon.svg');
});
