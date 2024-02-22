import RestrauntCard, { withPromotedLable } from "./RestrauntCard";
import Shimmer from "./Shimmer";
import { generateProxyUrl } from "../utils/constants";
import { RESTAURANTS_API } from "../utils/constants";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";


const Body = () => {

  const [listOfRes, setListOfRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRest, setFilteredRest] = useState([]);

  const RestrauntCardPromoted = withPromotedLable(RestrauntCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resource = generateProxyUrl(RESTAURANTS_API)
    const data = await fetch(resource);
    // const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65420&lng=77.23730&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
    const json = await data.json();
    // console.log("apiData", json);
    setListOfRes(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRest(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };
  // console.log("resList", listOfRes);


  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1>
        Looks like you are offline please check your internet connection
      </h1>
    );

  return (listOfRes.length === 0) ? <Shimmer /> : (
    <div className="flex flex-col items-center w-full">
      <div className="w-full">
        <div className="mx-24 w-11/12">
          <input
            type="text"
            data-testid="searchInput"
            className="mt-8 border border-1 border-slate-400 w-10/12"
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value) }}
          ></input>
          <button
            className="px-2 py-0.5 bg-slate-200 m-2"
            //filter logic 
            onClick={() => {
              const filteredRest = listOfRes.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
              setFilteredRest(filteredRest);
            }}
          >Search</button>
        </div>

        <div className="flex items-center">
          <button
            className="mt-1 mb-8 ml-24 rounded-lg hover:bg-[#4cc850fd] transition-all duration-300 no-underline flex bg-green-100 p-1"
            onClick={() => {
              const filteredList = listOfRes.filter((res) => res?.info?.avgRating > 4.5);
              console.log(filteredList)
              setFilteredRest(filteredList);
            }}
          >Top Rated Restaurants</button>
        </div>

      </div>
      <div className="flex flex-wrap mx-20">
        {/* since resList is an arrya  */}

        {filteredRest.map((restraunt) => (
          <Link key={restraunt.info.id} to={"/restaurant/" + restraunt.info.id}>

            {restraunt.info.veg ? <RestrauntCardPromoted resList={restraunt} /> : <RestrauntCard resList={restraunt} />}

          </Link>

        ))}

      </div>
    </div>
  );
};

export default Body; 