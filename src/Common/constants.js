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
      { name: 'violet', id: '6' }, { name: 'purple', id: '7' }, { name: 'white', id: '8' },
      { name: 'lavender', id: '9' }, { name: 'yellow', id: '10' }, { name: 'grey', id: '11' },
    ],
  },
];
