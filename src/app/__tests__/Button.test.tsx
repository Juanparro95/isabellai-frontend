import { render, screen } from "@testing-library/react";
import Button from "@/components/Button";

describe("Button Component", () => {
  it("should render the button with the correct label", () => {
    render(<Button label="Click Me" />);
    const buttonElement = screen.getByText(/Click Me/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
