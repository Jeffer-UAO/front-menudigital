import { BASE_PATH } from "../utils/constants";

const BASE_API = localStorage.getItem(BASE_PATH);

export async function getProductsApi() {
  try {
    const url = `${BASE_API}/api/products/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addProductsApi(data, token) {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("active", data.active);
    formData.append("image", data.image);

    const url = `${BASE_API}/api/products/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateProductsApi(id, data, token) {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("active", data.active);
    if (data.image) formData.append("image", data.image);

    const url = `${BASE_API}/api/products/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteProductsApi(id, token) {
  try {
    const url = `${BASE_API}/api/products/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProductByIdApi(id) {
  try {
    const url = `${BASE_API}/api/products/${id}/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getProductsByCategoryApi(idCategory) {
  try {
    const categoryFilter = `category=${idCategory}`;
    const url = `${BASE_API}/api/products/?${categoryFilter}`;

    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
