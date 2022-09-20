import { screen } from '@testing-library/react';
import PokemonDetails from '../pages/PokemonDetails';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

test('testes componente PokemonDetails.js', () => {
  const obj = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  const value = {
    params: { id: '25' },
  };
  renderWithRouter(
    <PokemonDetails
      pokemons={ data }
      isPokemonFavoriteById={ obj }
      match={ value }
      onUpdateFavoritePokemons={
        (checked) => onUpdateFavoritePokemons(data.id, checked)
      }
    />,
  );
  const details = screen.getByRole('heading', { name: /details/i });
  expect(details).toBeInTheDocument();
  const linkDetails = screen.queryByRole('link', { name: /more details/i });
  expect(linkDetails).not.toBeInTheDocument();
  const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
  expect(summary).toBeInTheDocument();
  const pokemonDetails = screen
    .getByText(
      /pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
  expect(pokemonDetails).toBeInTheDocument();
  const location = screen.getByRole('heading', { name: /game locations of pikachu/i });
  expect(location).toBeInTheDocument();
  const imageLocation = screen
    .getAllByRole('img', { name: /pikachu location/i });
  expect(imageLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  const imageFavorite = screen.getByText(/pokémon favoritado\?/i);
  expect(imageFavorite).toBeInTheDocument();
});
