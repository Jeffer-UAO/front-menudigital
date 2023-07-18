import { BASE_API } from "../utils/constants";

//const BASE_API = localStorage.getItem(BASE_PATH);

export async function addSalesmanApi(data, token) {
  try {
    const url = `${BASE_API}/api/salesman/`;
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

export async function updateSalesmanApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/salesman/${id}/`;
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

export async function getSalesmanToIdApi(idSalesman) {
  try {
    const url = `${BASE_API}/api/salesman/${idSalesman}/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getSalesmanActiveApi() {
  try {
    const statusFilter = "active=True";

    const url = `${BASE_API}/api/salesman/?${statusFilter}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getSalesmanApi() {
  try {
    const url = `${BASE_API}/api/salesman/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteSalesmanApi(id, token) {
  try {
    const url = `${BASE_API}/api/salesman/${id}/`;
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
