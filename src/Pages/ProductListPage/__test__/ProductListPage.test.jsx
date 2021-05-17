/* eslint-disable no-undef */
import React from 'react';
import {
  render, cleanup, screen,
} from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ProductListPage from '../index';

delete window.matchMedia;

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  productListReducer: {
    allData: {},
    currentData: [{
      id: '1', createdAt: '2021-05-09T03:34:09.666Z', name: 'Test Dummy', avatar: 'http://lorempixel.com/640/480/nightlife', desc: 'Frozen', price: '666.00', dept: 'Grocery', color: 'lavender',
    }, {
      id: '2', createdAt: '2021-05-09T07:49:32.627Z', name: 'Sleek Rubber Sausages', avatar: 'http://lorempixel.com/640/480/abstract', desc: 'Rubber', price: '835.00', dept: 'Clothing', color: 'lavender',
    }, {
      id: '3', createdAt: '2021-05-09T00:07:05.881Z', name: 'Gorgeous Steel Cheese', avatar: 'http://lorempixel.com/640/480/business', desc: 'Plastic', price: '771.00', dept: 'Clothing', color: 'yellow',
    }, {
      id: '4', createdAt: '2021-05-08T15:19:38.340Z', name: 'Licensed Plastic Shoes', avatar: 'http://lorempixel.com/640/480/animals', desc: 'Granite', price: '603.00', dept: 'Jewelery', color: 'magenta',
    }, {
      id: '5', createdAt: '2021-05-08T21:53:46.219Z', name: 'Incredible Frozen Pizza', avatar: 'http://lorempixel.com/640/480/sports', desc: 'Frozen', price: '385.00', dept: 'Health', color: 'pink',
    }, {
      id: '6', createdAt: '2021-05-08T23:05:09.983Z', name: 'Intelligent Granite Towels', avatar: 'http://lorempixel.com/640/480/sports', desc: 'Frozen', price: '155.00', dept: 'Music', color: 'sky blue',
    }, {
      id: '7', createdAt: '2021-05-09T06:38:24.942Z', name: 'Generic Concrete Shirt', avatar: 'http://lorempixel.com/640/480/cats', desc: 'Metal', price: '419.00', dept: 'Music', color: 'grey',
    }, {
      id: '8', createdAt: '2021-05-09T11:54:26.524Z', name: 'Handcrafted Frozen Tuna', avatar: 'http://lorempixel.com/640/480/nature', desc: 'Frozen', price: '969.00', dept: 'Jewelery', color: 'salmon',
    }, {
      id: '9', createdAt: '2021-05-08T22:16:29.029Z', name: 'Handmade Wooden Tuna', avatar: 'http://lorempixel.com/640/480/animals', desc: 'Rubber', price: '422.00', dept: 'Home', color: 'azure',
    }, {
      id: '10', createdAt: '2021-05-09T02:48:47.613Z', name: 'Generic Steel Bike', avatar: 'http://lorempixel.com/640/480/nature', desc: 'Soft', price: '576.00', dept: 'Grocery', color: 'violet',
    }],
    searchedData: {},
    filteredData: {},
  },
});
// const url = 'https://609280e585ff510017212f6e.mockapi.io/api/v1/products?page=1&limit=10';

const server = setupServer(
  rest.get('api/v1/products', (req, res, ctx) => res(ctx.json([{
    id: '1', createdAt: '2021-05-09T03:34:09.666Z', name: 'Handcrafted Rishi Soap', avatar: 'http://lorempixel.com/640/480/nightlife', desc: 'Frozen', price: '666.00', dept: 'Grocery', color: 'lavender',
  }, {
    id: '2', createdAt: '2021-05-09T07:49:32.627Z', name: 'Sleek Rubber Sausages', avatar: 'http://lorempixel.com/640/480/abstract', desc: 'Rubber', price: '835.00', dept: 'Clothing', color: 'lavender',
  }, {
    id: '3', createdAt: '2021-05-09T00:07:05.881Z', name: 'Gorgeous Steel Cheese', avatar: 'http://lorempixel.com/640/480/business', desc: 'Plastic', price: '771.00', dept: 'Clothing', color: 'yellow',
  }, {
    id: '4', createdAt: '2021-05-08T15:19:38.340Z', name: 'Licensed Plastic Shoes', avatar: 'http://lorempixel.com/640/480/animals', desc: 'Granite', price: '603.00', dept: 'Jewelery', color: 'magenta',
  }, {
    id: '5', createdAt: '2021-05-08T21:53:46.219Z', name: 'Incredible Frozen Pizza', avatar: 'http://lorempixel.com/640/480/sports', desc: 'Frozen', price: '385.00', dept: 'Health', color: 'pink',
  }, {
    id: '6', createdAt: '2021-05-08T23:05:09.983Z', name: 'Intelligent Granite Towels', avatar: 'http://lorempixel.com/640/480/sports', desc: 'Frozen', price: '155.00', dept: 'Music', color: 'sky blue',
  }, {
    id: '7', createdAt: '2021-05-09T06:38:24.942Z', name: 'Generic Concrete Shirt', avatar: 'http://lorempixel.com/640/480/cats', desc: 'Metal', price: '419.00', dept: 'Music', color: 'grey',
  }, {
    id: '8', createdAt: '2021-05-09T11:54:26.524Z', name: 'Handcrafted Frozen Tuna', avatar: 'http://lorempixel.com/640/480/nature', desc: 'Frozen', price: '969.00', dept: 'Jewelery', color: 'salmon',
  }, {
    id: '9', createdAt: '2021-05-08T22:16:29.029Z', name: 'Handmade Wooden Tuna', avatar: 'http://lorempixel.com/640/480/animals', desc: 'Rubber', price: '422.00', dept: 'Home', color: 'azure',
  }, {
    id: '10', createdAt: '2021-05-09T02:48:47.613Z', name: 'Generic Steel Bike', avatar: 'http://lorempixel.com/640/480/nature', desc: 'Soft', price: '576.00', dept: 'Grocery', color: 'violet',
  }]))),
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
// const FILTERS_TEST = [
//   {
//     type: 'Department',
//     filterValues: [
//       { name: 'Grocery', id: '1' }, { name: 'Clothing', id: '2' },
//       { name: 'Electronics', id: '3' }, { name: 'Computers', id: '4' },
//       { name: 'Movies', id: '5' },
//       { name: 'Books', id: '12' },
//     ],
//   },
//   {
//     type: 'Color',
//     filterValues: [
//       { name: 'violet',
// id: '6', colorCode: '#EE82EE' }, { name: 'purple', id: '7', colorCode: '#800080' },
//       { name: 'salmon', id: '8', colorCode: '#FA8072' },
//       { name: 'lavender', id: '9', colorCode: '#E6E6FA' },
//       { name: 'yellow',
// id: '10', colorCode: '#FFFF00' }, { name: 'grey', id: '11', colorCode: '#808080' },
//     ],
//   },
// ];
const history = createMemoryHistory();

const renderWithWrapper = (Component) => (
  <Provider store={store}>
    <Router history={history}>
      <Route>
        <Component />
      </Route>
    </Router>
  </Provider>
);

afterEach(cleanup);
test('it matches snapshot', () => {
  // eslint-disable-next-line no-unused-vars
  const { container } = render(
    renderWithWrapper(ProductListPage),
  );
  expect(container.firstChild).toMatchSnapshot();
});

// test('Loader to be present', async () => {
//   const { getByTestId } = render(
//     renderWithWrapper(ProductListPage),
//   );
//   // const checkbox = getByTestId('checkbox_1');
//   // expect(checkbox.checked).toEqual(false);
//   // fireEvent.click(checkbox);
//   expect(getByTestId('loader')).toBeInTheDocument();
//   // debug();
//   // await waitFor(() => getByTestId('pagination'));

//   // expect(screen.getByText('Handcrafted Rishi Soap')).toBeInTheDocument();
// });

test('Dummy data to be present', async () => {
  render(
    renderWithWrapper(ProductListPage),
  );
  expect(screen.getByText('Test Dummy')).toBeInTheDocument();
});

// test('Filter to be applied', async () => {
//   const { getByTestId } = render(
//     renderWithWrapper(ProductListPage),
//   );
//   const checkbox = getByTestId('checkbox_1');
//   console.log(checkbox);
//   expect(checkbox.checked).toEqual(false);
//   fireEvent.click(checkbox);
//   console.log(checkbox);

//   expect(checkbox.checked).toEqual(true);
//   // expect(screen.getByTestId('loader')).toBeNot();
//   // await waitFor(() => screen.getByTestId('pagination'))
//   expect(screen.getByText('Test Dummy')).toBeInTheDocument();

//   expect(screen.getByText('Sleek Rubber Sausages')).not.toBeInTheDocument();
// });
