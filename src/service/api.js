//fetch products from fake store api logic
const url = "https://fakestoreapi.com/products";
const cart_url='https://fakestoreapi.com/carts'
export const fetchProducts = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    // const data = await response.json();
    return response;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return null;
  }
};
export const fetchDetails = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return null;
  }
};
export const fetchCarts = async () => {
  try {
    const response = await fetch(cart_url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return null;
  }
};
