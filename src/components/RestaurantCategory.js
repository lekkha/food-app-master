
import ItemList from "./ItemList";

const RestrauntCategory = ({ data, showItems, setShowIndex, index }) => {
    // console.log(data);

    const handleClick = () => {
        //for toggling 
        if (showItems) setShowIndex(null);
        else setShowIndex(index);
    }

    return (
        <div>
            <div className="w-6/12 mx-auto my-4 bg-gray-100 shadow-lg p-4">
                {/* header */}
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold">{data.title} ({data.itemCards.length})</span>
                    <span>🔽</span>
                </div>
                {/* //accordian body */}
                {showItems && <ItemList items={data.itemCards} />}
            </div>

        </div>
    );
}

export default RestrauntCategory;



// power has been taken away and given to parent
// const [showItems, setShowItems] = useState(false);
// const handleClick = () => {
//     setShowItems(!showItems);
// };