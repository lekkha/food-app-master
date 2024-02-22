// const Shimmer = () => {
//     return(
//         <div className="shimmer-container">
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//             <div className="shimmer-card"></div>
//         </div>
//     );
// };

// export default Shimmer; 


const Shimmer = () => {
    return (
        <>
            <div data-testid="shimmer" className="body">
                {Array(10).fill('').map((e, index) => <div key={index} className="w-48 h-72 p-1 m-4  mt-20 bg-gray-200 float-left"></div>)}
            </div>
        </>
    )
}
export default Shimmer
