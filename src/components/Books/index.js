import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";

import Book from "../Book";
import Pagination from "../Pagination";
import { useFetchBooks } from "./useFetchBooks";

export const Books = () => {
  const limit = 20;
  const initialState = { books: [], count: 0 };

  const { search, pathname } = useLocation();
  const query = new URLSearchParams(search);
  const page = parseInt(query.get("page") || 1, 10);

  const { loading, error, data = initialState } = useFetchBooks(page);
  const totalPages = Math.round(data.count / limit);

  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="mb-4">Books</h1>

          {error && <Alert variant="danger">Error retrieving books</Alert>}

          {loading ? (
            <Spinner
              animation="border"
              role="status"
              className="d-block mx-auto mb-3"
            >
              <span className="sr-only">Loading</span>
            </Spinner>
          ) : (
            <div>
              {data.books.map((book) => (
                <Book
                  key={book.id}
                  className="mb-2"
                  title={book.book_title}
                  author={book.book_author}
                  pages={book.book_pages}
                  year={book.book_publication_year}
                  city={book.book_publication_city}
                  country={book.book_publication_country}
                />
              ))}
            </div>
          )}

          {totalPages > 0 && (
            <Pagination
              className="mb-4"
              currentPath={pathname}
              page={page}
              totalPages={totalPages}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Books;
