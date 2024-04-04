import { fireEvent, render, screen } from "@testing-library/react";

import { IProduct } from "../../interfaces/Product";
import React from "react";
import { TableComponent } from "./index";

const productsMock: IProduct[] = [
  {
    id: "1",
    name: "Product 1",
    price: 10,
    description: "Description 1",
    category: "Category 1",
  },
  {
    id: "2",
    name: "Product 2",
    price: 20,
    description: "Description 2",
    category: "Category 2",
  },
];

describe("TableComponent", () => {
  beforeEach(() => {
    // mock matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn().mockReturnValue("asijd"), // Mock addListener method
        removeListener: jest.fn(), // Mock removeListener method
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  // Your test code goes here

  test("renders table correctly", () => {
    const changePageMock: jest.Mock<void, [any]> = jest.fn();
    render(
      <TableComponent
        products={productsMock}
        changePage={changePageMock}
        totalItens={10}
      />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });

  test("calls changePage function when table pagination changes", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn().mockReturnValue("asijd"), // Mock addListener method
        removeListener: jest.fn(), // Mock removeListener method
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const changePageMock: jest.Mock<void, [any]> = jest.fn();
    render(
      <TableComponent
        products={productsMock}
        changePage={changePageMock}
        totalItens={10}
      />
    );

    fireEvent.click(screen.getByText("2"));

    expect(changePageMock).toHaveBeenCalledWith({
      current: 2,
      pageSize: 2,
      total: 10,
    });
  });
});
