const PRODUCT_CART = "productsCart";

export function getProductCart() {
  const response = localStorage.getItem(PRODUCT_CART);
  return JSON.parse(response || "[]");
}

export function addProductCart(idProduct) {
  const products = getProductCart();
  products.push(idProduct);
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
