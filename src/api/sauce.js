import { BASE_PATH } from "../utils/constants";

const BASE_API = localStorage.getItem(BASE_PATH);

export async function addSaucesApi(data, token) {
  try {
    const url = `${BASE_API}/api/sauce/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateSaucesApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/sauce/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getSaucesActiveApi() {
  try {
    const statusFilter = "active=True";

    const url = `${BASE_API}/api/sauce/?${statusFilter}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getSaucesApi() {
  try {
    const url = `${BASE_API}/api/sauce/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteSauceApi(id, token) {
  try {
    const url = `${BASE_API}/api/sauce/${id}/`;
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
