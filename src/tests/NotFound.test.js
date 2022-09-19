import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

test('testes componente About.js', () => {
  renderWithRouter(<NotFound />);
  const title = screen.getByRole('heading', {
    name: /page requested not found/i,
  });
  const image = screen
    .getByRole(
      'img',
      { name: /pikachu crying because the page requested was not found/i },
    );
  expect(title).toBeInTheDocument();
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
