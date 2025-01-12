// import Shimmer from "./Shimmer";
// import { useParams } from "react-router-dom";
// import useRestaurantMenu from "../utils/useRestaurantMenu";
// import RestrauntCategory from "./RestaurantCategory";
// import { useState } from "react";


// const RestrauntMenu = () => {

//     const { resId } = useParams();

//     const resInfo = useRestaurantMenu(resId);
//     const [showIndex, setShowIndex] = useState(null);


//     if (resInfo === null) return <Shimmer />;

//     const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;

//     const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
//         (c) =>
//             c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
//     );

//     console.log(categories);


//     return (
//         <div className="Menu text-center">
//             <h2 className="font-bold my-2 text-2xl">{name}</h2>
//             <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwoMessage}</p>

//             {/* categories accordian  */}

//             {categories.map((category, index) =>
//             ( //controlled component 
//                 <RestrauntCategory
//                     key={category?.card?.card?.title}
//                     data={category?.card?.card}
//                     showItems={index === showIndex ? true : false} //set showitem to true if index of card = show index 
//                     setShowIndex={(newIndex) => setShowIndex(newIndex)}     //passed as function so that child can change value on being clicked 
//                     index={index}
//                 />))}

//         </div>
//     );
// };

// export default RestrauntMenu; old code - old api 

import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import RestrauntCategory from "./RestaurantCategory";
import { useState, useEffect } from "react";

const RestrauntMenu = () => {
    const { resId } = useParams();
    const [resInfo, setResInfo] = useState(null);
    const [showIndex, setShowIndex] = useState(null);

    // Function to fetch menu data using the Educors API proxy
    const fetchMenuData = async () => {
        try {
            const API_KEY = "11006d1b531e3c96";
            const EDUCORS_URL = "https://educorssolver.host/api/getData";
            const TARGET_URL = `https://www.swiggy.com/dapi/menu/v4/full?lat=13.1017167&lng=77.634826600000011&menuId=${resId}`;

            const response = await fetch(EDUCORS_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ApiKey: API_KEY, Target: TARGET_URL }),
            });

            const jsonResponse = await response.json();
            setResInfo(jsonResponse?.data);
        } catch (error) {
            console.error("Error fetching menu data:", error);
        }
    };

    // Fetch data when the component is mounted or resId changes
    useEffect(() => {
        fetchMenuData();
    }, [resId]);

    if (!resInfo) return <Shimmer />;

    // Extract restaurant info
    const { name, cuisines, costForTwoMessage } =
        resInfo?.cards?.[2]?.card?.card?.info || {};

    // Extract categories from the fetched data
    const categories =
        resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
            (c) =>
                c.card?.card?.["@type"] ===
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) || [];

    return (
        <div className="Menu text-center">
            <h2 className="font-bold my-2 text-2xl">{name}</h2>
            <p className="font-bold text-lg">
                {cuisines?.join(", ")} - {costForTwoMessage}
            </p>

            {/* Render categories as an accordion */}
            {categories.map((category, index) => (
                <RestrauntCategory
                    key={category?.card?.card?.title}
                    data={category?.card?.card}
                    showItems={index === showIndex} // Show items if the index matches the showIndex
                    setShowIndex={(newIndex) => setShowIndex(newIndex)} // Update the showIndex on click
                    index={index}
                />
            ))}
        </div>
    );
};

export default RestrauntMenu;





// import { MENU_API } from "../utils/constants";
// import { generateProxyUrl } from "../utils/constants";
//was at line 17 
//is now no longer required --> after using categories for mapping
// const [resInfo, setResInfo] = useState(null);
// useEffect(() => {
//     fetchMenu();
// }, []);

// const fetchMenu = async () => {
//     const resource = generateProxyUrl(MENU_API + resId)
//     const data = await fetch(resource);
//     const json = await data.json();
//     console.log(json);
//     setResInfo(json.data);
// }
// const { itemCards } = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;///was changed to menu
// const menu = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(x => x.card.card.title === "Recommended")
//line 47 
//      <ul>
//     {menu?.card.card.itemCards?.map((menuItem) => (
//         <li key={menuItem?.card?.info?.id}>{menuItem?.card?.info.name}</li>
//     ))}
// </ul>*//