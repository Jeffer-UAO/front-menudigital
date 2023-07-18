import { BASE_API } from "../utils/constants";

//const BASE_API = localStorage.getItem(BASE_PATH);

//** Salsas por producto*/

export async function addSauceToOrderApi(idOrder, idSauce ) {
  try {
    const url = `${BASE_API}/api/sauceorder/`;
    const params = {
      method: "POST",
      headers: {        
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        sauces: idSauce,
        order: idOrder,
      }),
    };

    await fetch(url, params);
  } catch (error) {
    throw error;
  }
}
