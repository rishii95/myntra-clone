/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TextButton from '../index';

afterEach(cleanup);
test('it matches snapshot', () => {
  const { container } = render(<TextButton>Hello</TextButton>);
  expect(container.firstChild).toMatchSnapshot();
});

test('renders button correctly', () => {
  const { getByTestId } = render(<TextButton>Click me</TextButton>);
  expect(getByTestId('text-button')).toHaveTextContent('Click me');
});

test('renders button correctly', () => {
  const { getByTestId } = render(<TextButton>Press</TextButton>);
  expect(getByTestId('text-button')).toHaveTextContent('Press');
});
