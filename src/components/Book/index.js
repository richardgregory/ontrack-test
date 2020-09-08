import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

export const Book = ({
  title,
  author = [],
  pages,
  city,
  country,
  year,
  className,
}) => (
  <Card className={className}>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Subtitle className="mb-3">{author.join(", ")}</Card.Subtitle>
      <Card.Text as="div">
        <p className="mb-1">{`Publication: ${city}, ${country}, ${year}`}</p>
        <p className="mb-0">{`Pages: ${pages}`}</p>
      </Card.Text>
    </Card.Body>
  </Card>
);

Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.arrayOf(PropTypes.string),
  pages: PropTypes.number,
  city: PropTypes.string,
  country: PropTypes.string,
  year: PropTypes.number,
  className: PropTypes.string,
};

export default Book;
