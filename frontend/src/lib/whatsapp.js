import { WHATSAPP_NUMBER } from "../data/products";

export function buildWhatsAppLink({ productName, productId, priceLabel } = {}) {
  let msg;
  if (productName && productId) {
    msg = `Hi Kanha Atelier, I am interested in ordering the "${productName}" (${productId}${
      priceLabel ? `, listed at ${priceLabel}` : ""
    }). Please share the details!`;
  } else {
    msg = `Hi Kanha Atelier, I would love to learn more about your handcrafted collection. Please share the details!`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
