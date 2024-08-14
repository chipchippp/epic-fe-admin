import React from 'react';
import { Link } from 'react-router-dom';

function Pagination({ prePage, nextPage, changeCPage, currentPage, numbers = [] }) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return null; 
    }

    return (
        <div className="float-right">
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Previous" onClick={prePage}>
                            «
                        </Link>
                    </li>

                    {numbers.map((n, i) => (
                        <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                            <Link className="page-link" to="#" onClick={() => changeCPage(n)}>
                                {n}
                            </Link>
                        </li>
                    ))}
                    <li className="page-item">
                        <Link className="page-link" to="#" aria-label="Next" onClick={nextPage}>
                            »
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
