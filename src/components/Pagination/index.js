import React from "react";
import PropTypes from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import { Pagination as BootstrapPagination } from "react-bootstrap";

export const Pagination = ({ className, currentPath, page, totalPages }) => {
  const limit = 2;

  const renderPageNumbers = () => {
    const pages = [];
    const start = page > limit ? page - limit : 1;
    const end = page + limit < totalPages ? page + limit : totalPages;

    for (let i = start; i <= end; i++) {
      pages.push(
        <QueryNavLink
          key={i}
          to={{ pathname: currentPath, search: `?page=${i}` }}
        >
          <BootstrapPagination.Item active={i === page}>
            {i}
          </BootstrapPagination.Item>
        </QueryNavLink>
      );
    }

    return pages;
  };

  return (
    <BootstrapPagination
      className={`${className} justify-content-center align-items-center`}
    >
      <QueryNavLink to={{ pathname: currentPath, search: `?page=${page - 1}` }}>
        <BootstrapPagination.Prev disabled={page <= 1}>
          Previous
        </BootstrapPagination.Prev>
      </QueryNavLink>

      {page > limit + 1 && (
        <>
          <QueryNavLink to={{ pathname: currentPath, search: `?page=1` }}>
            <BootstrapPagination.Item>1</BootstrapPagination.Item>
          </QueryNavLink>

          <BootstrapPagination.Ellipsis disabled />
        </>
      )}

      {renderPageNumbers()}

      {page < totalPages - limit && (
        <>
          <BootstrapPagination.Ellipsis disabled />
          <QueryNavLink
            to={{ pathname: currentPath, search: `?page=${totalPages}` }}
          >
            <BootstrapPagination.Item>{totalPages}</BootstrapPagination.Item>
          </QueryNavLink>
        </>
      )}

      <QueryNavLink to={{ pathname: currentPath, search: `?page=${page + 1}` }}>
        <BootstrapPagination.Next disabled={page >= totalPages}>
          Next
        </BootstrapPagination.Next>
      </QueryNavLink>
    </BootstrapPagination>
  );
};

// Setting isActive to false on react router link
// so active state is managed by bootstrap
const QueryNavLink = ({ children, ...props }) => (
  <LinkContainer isActive={() => false} {...props}>
    {children}
  </LinkContainer>
);

Pagination.propTypes = {
  className: PropTypes.string,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  currentPath: PropTypes.string,
};

export default Pagination;
