import { useEffect, useState } from "react";
import { MENU_API } from "./constants";
import { generateProxyUrl } from "./constants";

const useRestaurantMenu = (resId) => {

    const [resInfo, setResInfo] = useState(null);
    // const [menuFoodRender, setMenuFoodRender] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const resource = generateProxyUrl(MENU_API + resId)
        const data = await fetch(resource);
        const json = await data.json();
        setResInfo(json.data);
        // setMenuFoodRender(Object.values(json?.data?.menu?.items));
    };

    return resInfo

    // return [resInfo, menuFoodRender, setMenuFoodRender]
}

export default useRestaurantMenu; 