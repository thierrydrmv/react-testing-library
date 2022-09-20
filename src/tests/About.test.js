import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('testes componente About.js', () => {
  it('testa se a página possui 2 frases e um titulo', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
    const aboutPokedex1 = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all Poké/i,
    );
    const aboutPokedex2 = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );
    expect(aboutTitle).toBeInTheDocument();
    expect(`${aboutPokedex1}${aboutPokedex2}`);
  });
  it('testa se a página possui a imagem do pokedex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
