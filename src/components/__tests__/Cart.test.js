import { fireEvent, getAllByRole, render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import RestrauntMenu from "../RestrauntMenu"
import MOCK_DATA from "./mocks/MockResMenuData.json"
import { Provider } from "react-redux"
import appStore from "../../utils/appStore"
import { BrowserRouter } from "react-router-dom"
import Header from "../Header"
import Cart from "../Cart"

it("should Load restaurant menu component", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(MOCK_DATA)
        })
    );

    await act(async () => render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header />
                <RestrauntMenu />
                <Cart />
            </Provider>
        </BrowserRouter>
    ))

    const accordianHeader = screen.getByText("Menu Starts @125/- (14)")
    fireEvent.click(accordianHeader);
    expect(screen.getAllByTestId("foodItems").length).toBe(14);

    const addBtns = screen.getAllByRole("button", { name: "Add +" })
    fireEvent.click(addBtns[0]);

    expect(screen.getByText("Cart (1)")).toBeInTheDocument();

    //the itemlist being rendered in the cart is same as that of the itemlist in the rest-menu thus in addition of cart items the length of itemlist will increse 
    expect(screen.getAllByTestId("foodItems").length).toBe(15);

    //to clear cart
    const btn = screen.getByTestId("clear-btn")
    fireEvent.click(btn)
    expect(screen.getAllByTestId("foodItems").length).toBe(14);

    expect(screen.getByText("Cart is Empty.Shop to add items!")).toBeInTheDocument()
})