import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Pagination from ".";

describe("Pagination", () => {
  it("Should render previous as disabled", () => {
    const { container } = render(
      <BrowserRouter>
        <Pagination page={1} totalPages={10} currentPath="/" />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("Should render pages in between", () => {
    const { container } = render(
      <BrowserRouter>
        <Pagination page={4} totalPages={10} currentPath="/" />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("Should render next as disabled", () => {
    const { container } = render(
      <BrowserRouter>
        <Pagination page={10} totalPages={10} currentPath="/" />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("Should render with no ellipsis at start when page less than 3", () => {
    const { container } = render(
      <BrowserRouter>
        <Pagination page={3} totalPages={10} currentPath="/" />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it("Should render with no ellipsis at end when page greater than 7", () => {
    const { container } = render(
      <BrowserRouter>
        <Pagination page={8} totalPages={10} currentPath="/" />
      </BrowserRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
