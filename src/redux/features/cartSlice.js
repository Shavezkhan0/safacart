import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log("Adding to cart", action.payload);
            const existingItem = state.cart.find(
                (item) => item.id === action.payload._id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                const newItem = {
                    _id: action.payload._id,
                    quantity: 1,
                    name: action.payload.name,
                    price: action.payload.price,
                    imageUrl: action.payload.imageUrl,
                    recycled: action.payload.recycled,
                    Highlights: action.payload.Highlights,
                    color: action.payload.color,
                    carbon: action.payload.carbon,
                    shippingCarbon: action.payload.shippingCarbon,
                };
                state.cart.push(newItem);
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload._id);
            if (item) {
                item.quantity += 1;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload._id);
            if (item) {
                item.quantity -= 1;
                if (item.quantity === 0) {
                    state.cart = state.cart.filter(
                        (item) => item._id !== action.payload._id
                    );
                }
            }
        },
        deleteItem: (state, action) => {
            state.cart = state.cart.filter((item) => item._id !== action.payload._id);
        },
        clearCart: (state) => {
            state.cart = [];
        },
    }
})

export const { addToCart, incrementQuantity, decrementQuantity, deleteItem,clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;