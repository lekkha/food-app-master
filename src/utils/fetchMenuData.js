export const fetchMenuData = async (restaurantId) => {
    const API_KEY = "74cda4beaf97fae8";  // Use your new API key
    const EDUCORS_URL = "https://educorssolver.host/api/getData";
    const MENU_API_URL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.65420&lng=77.23730&restaurantId=${restaurantId}`;

    try {
        const response = await fetch(EDUCORS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ApiKey: API_KEY, Target: MENU_API_URL }),
        });

        const jsonResponse = await response.json();
        const menuData = extractMenuData(jsonResponse);
        return menuData;

    } catch (error) {
        console.error("Error fetching menu data:", error);
    }
};

const extractMenuData = (json) => {
    return (
        json?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
        json?.data?.cards?.[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
        []
    );
};
