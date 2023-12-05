import { computed, map } from 'nanostores';

export const $cart = map<Record<number, CartItem | undefined>>({});

export function addItemToCart(item: ShopItem) {
  const cartItem = $cart.get()[item.id];
  const quantity = cartItem?.quantity || 0;

  $cart.setKey(item.id, {
    item,
    quantity: quantity + 1,
  });
}

export function deleteItemFromCart(item: ShopItem) {
  $cart.setKey(item.id, undefined);
}

export function removeItemFromCart(item: ShopItem) {
  const cartItem = $cart.get()[item.id];
  if (cartItem) {
    if (cartItem.quantity === 1) {
      deleteItemFromCart(item);
    } else {
      $cart.setKey(item.id, {
        item,
        quantity: cartItem.quantity - 1,
      });
    }
  }
}

export const subTotal = computed($cart, (entries) => {
  let subTotal = 0;
  Object.values(entries).forEach((entry) => {
    if (!entry) {
      return;
    }
    subTotal += entry.quantity * entry.item.price;
  });

  return subTotal;
});
