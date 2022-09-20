import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';
import data from '../data';

describe('testes componentes Pokedex.js', () => {
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
  it('testa se a página contem um heading h2 com o texo encountered pokémons', () => {
    renderWithRouter(<Pokedex isPokemonFavoriteById={ obj } pokemons={ data } />);
    const title = screen
      .getByRole('heading', { name: /encountered pokémons/i, level: 2 });
    expect(title).toBeInTheDocument();
  });
  it(
    'testa se é exibido o próximo pokemon da lista quando clica no botão próximo pokemon',
    () => {
      renderWithRouter(<Pokedex isPokemonFavoriteById={ obj } pokemons={ data } />);
      const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      expect(btnNextPokemon).toBeInTheDocument();
      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
      const charmander = screen.getByText(/charmander/i);
      expect(charmander).toBeInTheDocument();
    },
  );
  it(
    'testa se a lista recomeça ao clicar no botão estando no último pokemon.',
    () => {
      renderWithRouter(<Pokedex isPokemonFavoriteById={ obj } pokemons={ data } />);
      const btnNextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(btnNextPokemon);
      userEvent.click(btnNextPokemon);
      userEvent.click(btnNextPokemon);
      userEvent.click(btnNextPokemon);
      userEvent.click(btnNextPokemon);
      userEvent.click(btnNextPokemon);
      userEvent.click(btnNextPokemon);
      userEvent.click(btnNextPokemon);
      const dragonair = screen.getByText(/dragonair/i);
      expect(dragonair).toBeInTheDocument();
      userEvent.click(btnNextPokemon);
      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
    },
  );
  it('testa se aparece apenas um pokemon por vez', () => {
    renderWithRouter(<Pokedex isPokemonFavoriteById={ obj } pokemons={ data } />);
    const pokemons = screen.getAllByRole('link', { name: /more details/i });
    expect(pokemons).toHaveLength(1);
  });
  it('testa se a pokedex tem 7 botões de filtro diferentes e o botão sem filtro', () => {
    renderWithRouter(<Pokedex isPokemonFavoriteById={ obj } pokemons={ data } />);
    const btnAll = screen.getAllByRole('button');
    expect(btnAll[0]).toBeInTheDocument();
    const bntFilter = screen.getAllByTestId('pokemon-type-button');
    const bntSize = 7;
    const filterTypes = [...new Set(bntFilter)];
    expect(filterTypes).toHaveLength(bntSize);

    userEvent.click(btnAll[0]);
    expect(btnAll[0]).not.toHaveAttribute('disabled');
  });
  it('testa se ao clicar no filtro type apenas um tipo de pokemon aparece', () => {
    renderWithRouter(<Pokedex isPokemonFavoriteById={ obj } pokemons={ data } />);
    const poisonPokemon = screen.getByRole('button', { name: /poison/i });
    userEvent.click(poisonPokemon);
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon.innerHTML).toBe('Poison');
  });
});
