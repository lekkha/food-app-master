import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestrauntCategory from "./RestaurantCategory";
import { useState } from "react";


const RestrauntMenu = () => {

    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);
    const [showIndex, setShowIndex] = useState(null);


    if (resInfo === null) return <Shimmer />;

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info;

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c) =>
            c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    console.log(categories);


    return (
        <div className="Menu text-center">
            <h2 className="font-bold my-2 text-2xl">{name}</h2>
            <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwoMessage}</p>

            {/* categories accordian  */}

            {categories.map((category, index) =>
            ( //controlled component 
                <RestrauntCategory
                    key={category?.card?.card?.title}
                    data={category?.card?.card}
                    showItems={index === showIndex ? true : false} //set showitem to true if index of card = show index 
                    setShowIndex={(newIndex) => setShowIndex(newIndex)}     //passed as function so that child can change value on being clicked 
                    index={index}
                />))}

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