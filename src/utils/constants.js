export const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
export const LOGO_URL = "https://gearfiles.gsmcdn.com/wp-content/uploads/sites/15/2023/03/26142052/Food-Order-Pro-Logo-Green-Back-Circle.png";
export const MENU_API = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.65420&lng=77.23730&restaurantId=";
export const MENU_ITEM_TYPE_KEY = "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
export const RESTAURANTS_API = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
// export const PROXY_CORS = "https://corsproxy.org/?";
export const PROXY_CORS = "https://thingproxy.freeboard.io/fetch/";
// export const generateProxyUrl = (URL) => PROXY_CORS + encodeURIComponent(URL);
export const generateProxyUrl = (URL) => PROXY_CORS + URL;
