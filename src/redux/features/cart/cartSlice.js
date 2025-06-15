import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                toast.success("Đã thêm sản phẩm vào giỏ hàng!");
            } else {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
                toast.info("Đã tăng số lượng sản phẩm!");
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
            toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
        },
        clearCart: (state) => {
            state.cartItems = []
            toast.success("Đã xóa tất cả sản phẩm khỏi giỏ hàng!");
        },
        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload._id);
            if (item) {
                item.quantity = (item.quantity || 1) + 1;
                toast.info("Đã tăng số lượng sản phẩm!");
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload._id);
            if (item && (item.quantity || 1) > 1) {
                item.quantity -= 1;
                toast.info("Đã giảm số lượng sản phẩm!");
            } else if (item && (item.quantity || 1) === 1) {
                state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
                toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
            }
        }
    }
})

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;