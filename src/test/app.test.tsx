import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";

import App from "@/App";

it("renders the homepage and opens the mobile navigation", () => {
  render(<App />);

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Laboratory tests and ultrasound in Surulere",
  );

  fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
  const navigation = screen.getByRole("navigation", { name: "Mobile navigation" });
  const services = within(navigation).getByRole("link", { name: "Services" });
  expect(services).toHaveAttribute("href", "#services");

  fireEvent.click(services);
  expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});
