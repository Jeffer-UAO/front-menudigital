const PRODUCT_CART = "productsCart";
const TABLE_CART = "TableCart";
const CLIENT_CART = "userCar";

export function getProductCart() {
  const response = localStorage.getItem(PRODUCT_CART);
  return JSON.parse(response || "[]");
}

export function addProductCart(dataOrder) {
  const products = getProductCart();
  products.push(dataOrder);
  localStorage.setItem(PRODUCT_CART, JSON.stringify(products));
}

export function removeProductCardApi(index) {
  const idProducts = getProductCart();
  idProducts.splice(index, 1);
  localStorage.setItem(PRODUCT_CART, JSON.stringify(idProducts));
}

export function cleanProductCartApi() {
  localStorage.removeItem(PRODUCT_CART);
}

//---------------------tables--------------

export function addTableCart(numberTable) {
  localStorage.setItem(TABLE_CART, JSON.stringify(numberTable));
}

export function getTableCart() {
  const response = localStorage.getItem(TABLE_CART);
  return JSON.parse(response || "");
}

export function getClientCart() {
  const response = localStorage.getItem(CLIENT_CART);
  return JSON.parse(response || "");
}
