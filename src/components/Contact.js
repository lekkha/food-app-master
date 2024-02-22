const Contact = () => {
    return (
        <div>
            <h1 className="p-2 m-2 font-bold text-3xl">Contact Us page</h1>
            <form>
                <input type="text" className="border border-black p-2 m-2" placeholder="name" />
                <input type="text" className="border border-black p-2 m-2" placeholder="message" />
                <button className=" bg-black text-white rounded-lg p-2">Submit</button>
            </form>
        </div>
    );
};

export default Contact; 