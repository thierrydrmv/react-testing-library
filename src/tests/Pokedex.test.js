import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

test('testes componentes Pokedex.js', () => {
  const obj = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: true,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  renderWithRouter(<Pokedex isPokemonFavoriteById={ obj } pokemons={ data } />);
  const title = screen.getByRole('heading', { name: /encountered pokémons/i });
  expect(title).toBeInTheDocument();

  const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

  expect(btnNextPokemon).toBeInTheDocument();
  const btnAll = screen.getAllByRole('button');

  userEvent.click(btnAll[0]);
  expect(btnAll[0]).not.toHaveAttribute('disabled');

  const bntFilter = screen.getAllByTestId('pokemon-type-button');
  const bntSize = 7;
  const filterTypes = [...new Set(bntFilter)];
  expect(filterTypes).toHaveLength(bntSize);

  const poisonPokemon = screen.getByRole('button', { name: /poison/i });
  userEvent.click(poisonPokemon);
  const namePokemon = screen.getByText(/ekans/i);
  expect(namePokemon).toBeInTheDocument();
});
