export const TOTAL_PAGES = 50;
export const PAGE_SIZE = 10;
export const FILTERS = [
  {
    type: 'Department',
    filterValues: [
      { name: 'Grocery', id: '1' }, { name: 'Clothing', id: '2' },
      { name: 'Electronics', id: '3' }, { name: 'Computers', id: '4' },
      { name: 'Movies', id: '5' },
      { name: 'Books', id: '12' },
    ],
  },
  {
    type: 'Color',
    filterValues: [
      { name: 'violet', id: '6', colorCode: '#EE82EE' }, { name: 'purple', id: '7', colorCode: '#800080' },
      { name: 'salmon', id: '8', colorCode: '#FA8072' },
      { name: 'lavender', id: '9', colorCode: '#E6E6FA' },
      { name: 'yellow', id: '10', colorCode: '#FFFF00' }, { name: 'grey', id: '11', colorCode: '#808080' },
    ],
  },
];
export const ERROR_STATES = {
  EMPTY: 'Empty',
  LOADING: 'Loading',
  NOT_FOUND: '404',
  ERROR: '500',
};
export const TYPOGRAPHY_TYPES = {
  TITLE: 'title',
  SUBTITLE: 'subtitle',
  TEXT: 'text',
};
