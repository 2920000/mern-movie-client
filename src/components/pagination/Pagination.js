import React from 'react'
import { Link } from 'react-router-dom'

function Pagination(props) {
    const {type,pageNumber} =props
  return (
    <div>
        <div className="pagination">
          <Link to={`/${type}/page/${pageNumber - 1}`} className="pre-page">
            Trước
          </Link>
          <PaginationNumber
            className="pagination-number"
            type={type}
            pageNumber={pageNumber}
          />
          <Link
            to={`/${type}/page/${1 + +pageNumber}`}
            className="next-page"
          >
            Sau
          </Link>
        </div>
    </div>
  )
}

export default Pagination

export const PaginationNumber = ({ type, pageNumber, className }) => {
    let pNumber = [];
    if (pageNumber >= 3) {
      pNumber = [-2, -1, 0, 1, 2];
    } else if (pageNumber < 3 && pageNumber >= 2) {
      pNumber = [-1, 0, 1, 2, 3];
    } else if (pageNumber < 2) {
      pNumber = [0, 1, 2, 3, 4];
    }
    return (
      <ul className={className}>
        {pNumber.map((e, i) => {
          const nb = e + +pageNumber;
          if (nb > 0) {
            return (
              <li className={pageNumber == nb ? "active" : ""} key={i}>
                <Link to={`/${type}/page/${nb}`}>{nb}</Link>
              </li>
            );
          }
        })}
      </ul>
    );
  };
  