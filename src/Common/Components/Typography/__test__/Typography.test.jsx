/* eslint-disable max-len */
/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Typography from '../index';
import { TYPOGRAPHY_TYPES } from '../../../constants';

afterEach(cleanup);
test('it matches snapshot', () => {
  const { container } = render(<Typography type={TYPOGRAPHY_TYPES.TITLE}>Title</Typography>);
  expect(container.firstChild).toMatchSnapshot();
});

test('renders title correctly', () => {
  const { getByTestId } = render(<Typography type={TYPOGRAPHY_TYPES.TITLE}>Title</Typography>);
  expect(getByTestId('typography-title')).toHaveTextContent('Title');
});

test('renders subtitle correctly', () => {
  const { getByTestId } = render(<Typography type={TYPOGRAPHY_TYPES.SUBTITLE}>Subtitle</Typography>);
  expect(getByTestId('typography-subtitle')).toHaveTextContent('Subtitle');
});

test('renders text correctly', () => {
  const { getByTestId } = render(<Typography type={TYPOGRAPHY_TYPES.TEXT}>Text</Typography>);
  expect(getByTestId('typography-text')).toHaveTextContent('Text');
});
