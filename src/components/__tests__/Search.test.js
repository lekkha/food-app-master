import { fireEvent, render, screen } from "@testing-library/react"
import Body from "../Body"
import MOCK_DATA from "./mocks/MockResListData.json"
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

// global.fetch = jest.fn(() => {
//     return Promise.resolve({
//         json: () => {
//             return Promise.resolve(MOCK_DATA)
//         }
//     })
// })



it("should search res card list for pizza text input", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(MOCK_DATA)
        })
    );

    await act(async () => {
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        );
    });

    const cardsBeforeSearch = screen.getAllByTestId("resCard")
    expect(cardsBeforeSearch.length).toBe(20);

    const searchbtn = screen.getByRole("button", { name: "Search" })
    const searchInput = screen.getByTestId("searchInput")

    fireEvent.change(searchInput, { target: { value: "pizza" } })
    fireEvent.click(searchbtn)

    const cardsAfterSearch = screen.getAllByTestId("resCard")
    expect(cardsAfterSearch.length).toBe(4);

});

it("should filter top rated restaurants", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(MOCK_DATA)
        })
    );

    await act(async () => {
        render(
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        )
    })

    const topRatedButton = screen.getByRole("button", { name: "Top Rated Restaurants" })
    fireEvent.click(topRatedButton);

    const cardsAfterFilter = screen.getAllByTestId("resCard")
    expect(cardsAfterFilter.length).toBe(2)

}); 