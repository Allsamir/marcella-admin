/* eslint-disable prettier/prettier */
/* eslint-disable no-loop-func */
import { useState } from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { setUrlParams } from "src/utils/setUrlParam";

const PaginationButton = ({ totalPageNumber, searchUrl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handlePage = (page) => {
    setCurrentPage(page);
    navigate(setUrlParams(searchUrl || "?", "page", page.toString()));
  };
  // calculate page number
  let pageNumber = !totalPageNumber ? [] : Array.from({ length: totalPageNumber }, (v, k) => k + 1);

  let items = [];

  for (let number = 1; number <= pageNumber.length; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePage(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <div className="d-flex justify-content-end mt-4">
      <Pagination size="sm">
        {currentPage > 1 && <Pagination.Prev onClick={() => handlePage(currentPage - 1)} />}
        {items}
        {currentPage < totalPageNumber && (
          <Pagination.Next onClick={() => handlePage(currentPage + 1)} />
        )}
        {totalPageNumber > 1 && <Pagination.Last onClick={() => handlePage(totalPageNumber)} />}
      </Pagination>
    </div>
  );
};

export default PaginationButton;
