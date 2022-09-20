import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('testes componente About.js', () => {
  it(
    'testa se a página contém um heading h2 com o texto Page requested not found',
    () => {
      renderWithRouter(<NotFound />);
      const title = screen.getByRole('heading', {
        name: /page requested not found/i,
        level: 2,
      });
      expect(title).toBeInTheDocument();
    },
  );
  it('testa se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const image = screen
      .getByRole(
        'img',
        { name: /pikachu crying because the page requested was not found/i },
      );
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
