import { useContext, useState } from 'react';
import { LOGO_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
import { useSelector } from 'react-redux';
import { RiBaseStationLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";



const Header = () => {

  const [loginbtn, setLoginbtn] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  //subsscribing to the store using selector 
  const cartItems = useSelector((store) => store.cart.items); //will read the store -> slice named cart -> array named items
  console.log(cartItems);

  return (
    <div className="h-20 flex justify-between items-center px-32 inset-0 bg-white z-50 shadow-md">
      <div className="logo-container">
        <img className="w-14 h-auto top-3" src={LOGO_URL} alt="logo" />
      </div>
      <div className="flex items-center ml-40">
        <ul className="flex justify-between list-none text-md font-bold capitalize whitespace-nowrap outline-none">
          <li
            className="text-[#3d4152] hover:text-[#4cc850fd] transition-all duration-300 no-underline flex p-4">
            <span className=" mt-1 pr-2 scale-150">
              <RiBaseStationLine />
            </span>
            Online Status : {onlineStatus ? "🟢" : "🔴"}
          </li>

          <li>
            <Link
              className="text-[#3d4152] transition-all duration-300 hover:text-[#4cc850fd] no-underline flex p-4"
              to="/" >
              <span className=" mt-1 pr-2 scale-150">
                <IoHomeOutline />
              </span>
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              className="text-[#3d4152] transition-all duration-300 hover:text-[#4cc850fd] no-underline flex p-4"
              to="/about">
              <span className=" mt-1 pr-2 scale-150">
                <IoHelpBuoyOutline />
              </span>
              <span>About Us</span>
            </Link>
          </li>

          {/* <li className="text-[#3d4152] transition-all duration-300 hover:text-[#fc8019] no-underline flex p-4"><Link to="/contact">Contact</Link></li> */}
          <li>
            <Link
              className="text-[#3d4152] transition-all duration-300 hover:text-[#4cc850fd] no-underline flex p-4"
              to="/cart">
              <span className=" mt-1 pr-2 scale-150">
                <FiShoppingCart />
              </span>
              <span>Cart ({cartItems.length})</span>
            </Link>
          </li>

          {/* <button
            className="text-[#3d4152] transition-all duration-300 hover:text-[#fc8019] no-underline flex p-4"
            onClick={() => loginbtn === "Login" ? setLoginbtn("Logout") : setLoginbtn("Login")}
          >{loginbtn}</button> */}

          {/* <li className="text-[#3d4152] transition-all duration-300 hover:text-[#fc8019] no-underline flex p-4">{loggedInUser}</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header; 