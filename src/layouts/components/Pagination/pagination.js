import React from 'react';
import { Link } from 'react-router-dom';

function Pagination({ prePage, nextPage, changeCPage, currentPage, totalPages }) {
    const getPageNumbers = () => {
        const maxPagesToShow = 3; // Number of pages to show at a time
        const pages = [];

        // Always include the first page
        pages.push(1);
        pages.push(2);
        pages.push(3);

        // Calculate the range of pages around the current page
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        if (startPage > 2) {
            pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < totalPages - 1) {
            pages.push('...');
        }

        // Always include the last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPageNumbers();

    if (totalPages <= 1) return null;

    return (
        <div className="float-right">
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <Link className="page-link" to="#" aria-label="Previous" onClick={prePage}>
                            «
                        </Link>
                    </li>

                    {pages.map((page, index) => (
                        <li
                            key={index}
                            className={`page-item ${page === currentPage ? 'active' : ''} ${
                                page === '...' ? 'disabled' : ''
                            }`}
                        >
                            <Link className="page-link" to="#" onClick={() => page !== '...' && changeCPage(page)}>
                                {page}
                            </Link>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
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
