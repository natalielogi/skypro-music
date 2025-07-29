import { render, screen } from '@testing-library/react';
import Sidebar from './sidebar';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => <img {...props} />,
}));

describe('Sidebar component', () => {
  it('renders with guest username by default', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    );

    expect(screen.getByText('Гость')).toBeInTheDocument();
  });
});
