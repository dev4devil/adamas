import React from "react";

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul>
      <li key={0}>
        {currentPage > 1 ? (
          <a onClick={() => paginate(currentPage - 1)}>Prev</a>
        ) : (
          <a>Prev</a>
        )}
      </li>
      {pageNumbers.map((num) => (
        <li key={num}>
          <a
            className={currentPage == num ? "active" : ""}
            onClick={() => paginate(num)}
          >
            {num}
          </a>
        </li>
      ))}
      <li key={-1}>
        {currentPage < pageNumbers.length ? (
          <a onClick={() => paginate(currentPage + 1)}>Next</a>
        ) : (
          <a>Next</a>
        )}
      </li>
    </ul>
  );
}

export default Pagination;
