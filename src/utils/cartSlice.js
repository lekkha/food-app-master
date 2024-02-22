import { createSlice } from "@reduxjs/toolkit";

//slice 

const cartSlice = createSlice({
    name: "cart",

    initialState: {
        items: []
    },

    reducers: {
        //add action whereever required 
        addItem: (state, action) => {
            //mutating the state(directly modifying )
            // state.items.push(action.payload);
            const doesItemExist = state.items.find((item) => item.card.info.id === action.payload.card.info.id);
            if (doesItemExist) {
                state.items.forEach(item => {
                    if (item.card.info.id === action.payload.card.info.id) {
                        item = { ...item, count: item.count++ }
                    }
                })
            } else {
                state.items.push({ ...action.payload, count: 1 })
            }
        },

        removeItem: (state, action) => {
            console.log(state.items, 'state.items')
            console.log(action.payload, 'action.payload')
            const doesItemExist = state.items.find((item) => item.card.info.id === action.payload);
            if (doesItemExist && doesItemExist.count > 1) {
                state.items.forEach(item => {
                    if (item.card.info.id === action.payload) {
                        item = { ...item, count: item.count-- }
                    }
                })
            } else {
                const filteredItems = state.items.filter(item => item.card.info.id !== action.payload);
                return { ...state, items: filteredItems };
            }
        },

        clearItem: (state) => {
            state.items = [];
            state.cartTotalQuantity = 0;
        },
    },

});

export const { addItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;

