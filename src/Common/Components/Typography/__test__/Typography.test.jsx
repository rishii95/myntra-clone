/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Typography from '../index';

afterEach(cleanup);
test('it matches snapshot', () => {
  const { container } = render(<Typography type="title">Title</Typography>);
  expect(container.firstChild).toMatchSnapshot();
});

test('renders title correctly', () => {
  const { getByTestId } = render(<Typography type="title">Title</Typography>);
  expect(getByTestId('typography-title')).toHaveTextContent('Title');
});

test('renders subtitle correctly', () => {
  const { getByTestId } = render(<Typography type="subtitle">Subtitle</Typography>);
  expect(getByTestId('typography-subtitle')).toHaveTextContent('Subtitle');
});

test('renders text correctly', () => {
  const { getByTestId } = render(<Typography type="text">Text</Typography>);
  expect(getByTestId('typography-text')).toHaveTextContent('Text');
});
