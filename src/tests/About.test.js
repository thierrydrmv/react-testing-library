import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

test('testes componente About.js', () => {
  renderWithRouter(<About />);

  const aboutTitle = screen.getByRole('heading', { name: /about pokédex/i });
  const image = screen.getByRole('img', { name: /pokédex/i });

  expect(aboutTitle).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
