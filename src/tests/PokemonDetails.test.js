import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonDetails from '../pages/PokemonDetails';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('testes componente PokemonDetails.js', () => {
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

  const pikachu = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'Pikachu roasts hard berries with electricity to make them tender enough.',
  };

  it('testa se as informações do pokémon selecionado são mostradas na tela', () => {
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
    const details = screen
      .getByRole('heading', { name: `${pikachu.name} Details`, level: 2 });
    expect(details).toBeInTheDocument();
    const linkDetails = screen.queryByRole('link', { name: /more details/i });
    expect(linkDetails).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();
    const pokemonDetails = screen
      .getByText(
        /Pokémon roasts hard berries with electricity to make them tender enough./i,
      );
    expect(pokemonDetails).toBeInTheDocument();
  });
  it('testa se existe na página os mapas contendo as localizações do pokemon', () => {
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
    const location = screen
      .getByRole('heading', { name: `Game Locations of ${pikachu.name}`, level: 2 });
    expect(location).toBeInTheDocument();
    const imageLocation = screen
      .getAllByRole('img', { name: `${pikachu.name} location` });
    const locationName = screen.getByText(/kanto viridian forest/i);
    expect(imageLocation).toHaveLength(pikachu.foundAt.length);
    expect(imageLocation[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(locationName.innerHTML).toBe(pikachu.foundAt[0].location);
  });
  it('testa se o usuario pode favoritar um pokemon através da página detalhes', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMoreDetails);
    const checkboxFavorite = screen.getByLabelText(/pokémon favoritado?/i);
    expect(checkboxFavorite).not.toBeChecked();
    userEvent.click(checkboxFavorite);
    expect(checkboxFavorite).toBeChecked();
  });
});
