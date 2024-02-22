import { render, screen } from "@testing-library/react"
import RestrauntCard from "../RestrauntCard"
import MOCK_DATA from "./mocks/resCardMock.json"

it("should render RestaurantCard comp with prop data", () => {
    render(<RestrauntCard resList={MOCK_DATA} />);

    const name = screen.getByText("Wow! Momo");
    expect(name).toBeInTheDocument();

})