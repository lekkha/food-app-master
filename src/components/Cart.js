import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearItem } from "../utils/cartSlice";
import BillDetails from "./BillDetails";
import FoodItemCart from "./FoodItemCart";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems)

    const dispatch = useDispatch();
    const handleClearCart = () => {
        dispatch(clearItem());
    };

    return (

        <div className="p-3">
            <div className=" flex justify-between align-middle py-5">
                <h1 className=" font-semibold text-2xl pl-8">Added Cart Items: {cartItems.length}</h1>
                <button className="inline-flex justify-center border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 rounded-lg" onClick={() => handleClearCart()}>Clear Cart</button>
            </div>

            {cartItems.length === 0 ? "Cart is Empty. Shop to see food items and Billing" :
                <div className="flex flex-wrap px-5">
                    {/*  <FoodItemCart {...cartItems[0]}/> */}
                    <div className="flex flex-col w-3/4">
                        {cartItems.map((item) => <FoodItemCart key={item.card.info.id} {...item} />)}
                        {/* <FoodItemCart /> */}
                    </div>

                    <div className=" w-1/4">
                        <BillDetails />
                    </div>
                </div>
            }

        </div>
    );
};

export default Cart; 