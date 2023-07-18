import { BASE_API } from "../utils/constants";

//const BASE_API = localStorage.getItem(BASE_PATH);

//--------------------Start LocalStore-------------------------
const USER_CAR = "userCar";

export function getUserLocal() {
  const response = localStorage.getItem(USER_CAR);
  const result = JSON.parse(response);
  return result;
}

export function addUserLocal(data) {
  //const user = [];
  // user.push(data);
  localStorage.setItem(USER_CAR, JSON.stringify(data));

}

export function cleanUserLocal() {
  localStorage.removeItem(USER_CAR);
}
//---------------------end LocalStore-------------------------

//---------------------start dataBaseTemporal-----------------

export async function getClientTempApi(idUser) {
  try {
    const url = `${BASE_API}/api/userClientTemp/${idUser}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function addClientTempApi(data) {
  try {
    const url = `${BASE_API}/api/userClientTemp/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, params);

    if (response.status !== 201) {
      throw new Error("Se perdió la conexión, reinicie la aplicación");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
//---------------------end dataBaseTemporal--------------------

export async function loginClientApi(formValue) {
  try {
    const url = `${BASE_API}/api/userClient/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    };

    const response = await fetch(url, params);

    if (response.status !== 201) {
      throw new Error("Usuario no permitido");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getMeClientAPi(token) {
  try {
    const url = `${BASE_API}/api/auth/me/`;
    const params = {
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

export async function getUsersClientApi(token) {
  try {
    const url = `${BASE_API}/api/users/`;
    const params = {
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

export async function addUserClientApi(data, token) {
  try {
    const url = `${BASE_API}/api/users/`;
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

export async function updateUserClientApi(id, data, token) {
  try {
    const url = `${BASE_API}/api/users/${id}/`;
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

export async function deleteUserClientApi(id, token) {
  try {
    const url = `${BASE_API}/api/users/${id}`;
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
