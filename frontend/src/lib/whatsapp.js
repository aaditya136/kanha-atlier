import { WHATSAPP_NUMBER } from "../data/products";

export function buildWhatsAppLink({ productName, productId, priceLabel, size } = {}) {
  let msg;
  if (productName && productId) {
    msg = `Hi Kanha Atelier, I am interested in ordering the "${productName}" (${productId}${
      size ? `, size ${size}` : ""
    }${priceLabel ? `, listed at ${priceLabel}` : ""}). Please share the details!`;
  } else {
    msg = `Hi Kanha Atelier, I would love to learn more about your handcrafted collection. Please share the details!`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
