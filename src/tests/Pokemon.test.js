import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../renderWithRouter';

describe('testes componente Pokemon.js', () => {
  const snorlax = {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: {
      value: '460.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Vermillion City',
        map: 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
      },
    ],
    summary:
    'What sounds like its cry may actually be its snores of its hungry belly.',
  };
  it('testa se o card é renderizado com os dados corretos', () => {
    renderWithRouter(<Pokemon pokemon={ snorlax } isFavorite />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe(snorlax.name);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe(snorlax.type);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const { averageWeight } = snorlax;
    expect(pokemonWeight.innerHTML)
      .toBe(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );
    const image = screen.getByRole('img', { name: `${snorlax.name} sprite` });
    expect(image).toHaveAttribute('src', snorlax.image);
  });

  it('testa o redirecionamento para o more details', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ snorlax } isFavorite />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toHaveAttribute('href', `/pokemons/${snorlax.id}`);
    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${snorlax.id}`);
    const imageFavorite = screen
      .getByRole('img', { name: `${snorlax.name} is marked as favorite` });
    expect(imageFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
