import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem, removeItem } from "../utils/cartSlice";
import { useState } from "react";

const ItemList = ({ items }) => {
    // console.log(items);
    const [selectItemId, setSelectItemId] = useState(null);

    const cartItems = useSelector((store) => store.cart.items);

    const dispatch = useDispatch();

    const addFoodItem = (item) => {
        setSelectItemId(item.card.info.id);
        dispatch(addItem(item));
    }

    const removeFoodItem = (item) => {
        console.log(item, 'XXXXXXXXXXXXXXX')
        setSelectItemId(item.card.info.id);
        dispatch(removeItem(item.card.info.id))
    }

    return (
        <div>
            {items.map((item) =>
                <div data-testid="foodItems" key={item.card.info.id} className="m-2 p-2 border-b-2 border-gray-300 text-left flex items-center gap-2">

                    <div className="w-9/12">
                        <div className="py-2">
                            <span>{item.card.info.name}</span>
                            <span> - ₹{item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}</span>
                        </div>
                        <p className="text-xs">{item.card.info.description}</p>
                    </div>

                    <div className="w-3/12">
                        <div className="absolute">
                            {/* <button
                                className="mx-10 bg-green-500 shadow-lg rounded-lg text-white"
                                onClick={() => addFoodItem(item)}
                            >Add +</button> */}
                            <button className="text-2xl bg-white hover:text-yellow-400" onClick={() => addFoodItem(item)}>&#8853;</button>
                            <span className="bg-white text-2xl">{selectItemId === item.card.info.id ?
                                <>
                                    {
                                        cartItems.length ?
                                            cartItems.map(foodItem => {
                                                if (foodItem.card.info.id === item.card.info.id) {
                                                    return foodItem.count;
                                                }
                                            }) : 0
                                    }
                                </>
                                : 0}</span>
                            <button onClick={() => { removeFoodItem(item) }} className="text-2xl bg-white hover:text-yellow-400">&#8861;</button>
                        </div>
                        <img src={CDN_URL + item.card.info.imageId} alt="pic" />
                    </div>

                </div>
            )}
        </div>

    );

}

export default ItemList;