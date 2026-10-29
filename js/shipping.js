// shipping.js
// Delivery rule shared by the cart footer and the WhatsApp order message.
// Kept out of config.js: that file is skip-worktree, so it never deploys.

const DELIVERY = {
    CHARGE: 20,
    FREE_ABOVE: 500
};

// Delivery is free at or above DELIVERY.FREE_ABOVE, otherwise a flat charge.
function getDeliveryCharge(subtotal) {
    return subtotal >= DELIVERY.FREE_ABOVE ? 0 : DELIVERY.CHARGE;
}
