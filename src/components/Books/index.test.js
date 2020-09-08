import React from "react";
import { render, screen, waitForElement } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import Books from ".";

describe("Books", () => {
  it("Should render error", async () => {
    const server = setupServer(
      rest.post("http://nyx.vima.ekt.gr:3000/api/books", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    server.listen();

    render(
      <BrowserRouter>
        <Books />
      </BrowserRouter>
    );

    await waitForElement(() => screen.getByText("Error retrieving books"));
    expect(screen.getByText("Error retrieving books")).toBeInTheDocument();

    server.resetHandlers();
    server.close();
  });

  it("Should render loading", () => {
    const server = setupServer(
      rest.post("http://nyx.vima.ekt.gr:3000/api/books", (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );

    server.listen();

    render(
      <BrowserRouter>
        <Books />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading")).toBeInTheDocument();

    server.resetHandlers();
    server.close();
  });

  it("Should render list of books", async () => {
    const server = setupServer(
      rest.post("http://nyx.vima.ekt.gr:3000/api/books", (req, res, ctx) => {
        return res(
          ctx.json({
            books: [
              {
                id: 2086,
                book_author: ["Author 1"],
                book_title: "Book 1",
                book_publication_year: 1529,
                book_publication_country: "UK",
                book_publication_city: "London",
                book_pages: 104,
              },
              {
                id: 2060,
                book_author: ["Author 2"],
                book_title: "Book 2",
                book_publication_year: 1548,
                book_publication_country: "UK",
                book_publication_city: "London",
                book_pages: 32,
              },
            ],
          })
        );
      })
    );

    server.listen();

    render(
      <BrowserRouter>
        <Books />
      </BrowserRouter>
    );

    await waitForElement(() => screen.getByText("Book 1"));
    expect(screen.getByText("Book 1")).toBeInTheDocument();
    expect(screen.getByText("Book 2")).toBeInTheDocument();

    server.resetHandlers();
    server.close();
  });
});
