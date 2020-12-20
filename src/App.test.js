import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders title board game", () => {
  render(<App />);
  const titleElement = screen.getByText(/Board Game/i);
  expect(titleElement).toBeInTheDocument();
});

test("returns index active player", () => {
  const app = new App();
  const indexPlayer = app.getActivePlayer();
  expect(indexPlayer).toBe(0);
});

test("return new fields", () => {
  const app = new App();
  const newField = app.calcNewFieldForPlayer(1, "B");
  expect(newField).toBe(2);
});
