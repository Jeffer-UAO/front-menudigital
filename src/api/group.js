import { BASE_API } from "../utils/constants";

//const BASE_API = localStorage.getItem(BASE_PATH);

export async function addGroupApi(data, token) {
  try {
    const url = `${BASE_API}/api/group/`;
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

export async function updateGroupApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/group/${id}/`;
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

export async function getGroupToIdApi(idGroup) {
  try {
    const url = `${BASE_API}/api/group/${idGroup}/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getGroupApi() {
  try {
    const url = `${BASE_API}/api/group/`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteGroupApi(id, token) {
  try {
    const url = `${BASE_API}/api/group/${id}/`;
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
