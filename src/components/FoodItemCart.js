import { CDN_URL } from "../utils/constants";
import { addItem, removeItem } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const FoodItemCart = (item) => {


    const count = item.count
    console.log(count)
    const [selectItemId, setSelectItemId] = useState(null);

    const dispatch = useDispatch();

    const addFoodItem = (item) => {
        setSelectItemId(item.card.info.id);
        dispatch(addItem(item))
    }

    const removeFoodItem = (item) => {
        console.log(item, 'XXXXXXXXXXXXXXX')
        setSelectItemId(item.card.info.id);
        dispatch(removeItem(item.card.info.id))
    }

    return (
        <div>
            <div className="p-5 m-3 mt-0 bg-white border border-gray-200 shadow-md dark:bg-white dark:border-gray-700 flex">
                <div className="pb-2 w-32 pr-4"><img src={CDN_URL + item.card.info.imageId} alt="pic" /></div>
                <div className=" flex-grow">
                    <h4 className="truncate">{item.card.info.name}</h4>
                    <p className="item-cost text-lime-900"> - ₹{item.card.info.price ? item.card.info.price / 100 : item.card.info.defaultPrice / 100}</p>
                    <h4 className="py-1"> {item.card.info.description} </h4>
                </div>
                <div className="self-center flex-shrink">
                    <div className="addBtn flex w-full md:w-36 bg-green-600 text-white justify-around items-center my-2 rounded-lg">
                        <button className="text-2xl hover:text-yellow-400" onClick={() => addFoodItem(item)}> &#8853;</button>
                        <span>{count}</span>
                        <button onClick={() => { removeFoodItem(item) }} className="text-2xl hover:text-yellow-400">&#8861;</button>
                    </div>
                </div>

            </div>



        </div>
    )
}

export default FoodItemCart;