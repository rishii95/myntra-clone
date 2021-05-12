const fetchProductList = async (page) => {
  const limit = 10;
  const url = `https://609280e585ff510017212f6e.mockapi.io/api/v1/products?page=${page}&limit=${limit}`;
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    // Add Toaster
  }
  return data;
};
export default fetchProductList;
// export const getFilteredList = async (queryString) => {
//   const url = `https://609280e585ff510017212f6e.mockapi.io/api/v1/products?${queryString}`;
//   let data;
//   try {
//     const response = await fetch(url);
//     data = await response.json();
//   } catch (error) {
//     // Add Toaster
//   }
//   return data;
// };

// export const getSearchData = async (queryString) => {
//   const url = `https://609280e585ff510017212f6e.mockapi.io/api/v1/products?${queryString}`;
//   let data;
//   try {
//     const response = await fetch(url);
//     data = await response.json();
//   } catch (error) {
//     // Add Toaster
//   }
//   return data;
// };
