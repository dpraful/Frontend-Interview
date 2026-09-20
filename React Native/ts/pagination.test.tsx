import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

import App from '../src/App';

interface MockProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface MockResponse {
  total: number;
  products: MockProduct[];
  skip?: number;
  limit?: number;
}

const mockFetch = jest.fn(
  (): Promise<{
    ok: boolean;
    json: () => Promise<MockResponse>;
  }> =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          total: 30,
          products: [
            {
              id: 1,
              title: 'iPhone',
              price: 999,
              thumbnail:
                'https://dummyjson.com/image.jpg',
            },
          ],
        }),
    }),
);

global.fetch = mockFetch as unknown as typeof fetch;

describe('Pagination Screen', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test('renders first page', async () => {
    const { findByText } = render(<App />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(await findByText('iPhone')).toBeTruthy();
  });

  test('shows page 1 initially', async () => {
    const { findByText } = render(<App />);

    expect(await findByText('Page 1')).toBeTruthy();
  });

  test('click next button changes page', async () => {
    const { findByText } = render(<App />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    const next = await findByText('NEXT');

    fireEvent.press(next);

    expect(await findByText('Page 2')).toBeTruthy();

    // Client-side pagination means API is NOT called again
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('click previous button changes page', async () => {
    const { findByText } = render(<App />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    const next = await findByText('NEXT');

    fireEvent.press(next);

    expect(await findByText('Page 2')).toBeTruthy();

    const prev = await findByText('PREV');

    fireEvent.press(prev);

    expect(await findByText('Page 1')).toBeTruthy();

    // Still only the initial API call
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('API called initially', async () => {
    render(<App />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });
});