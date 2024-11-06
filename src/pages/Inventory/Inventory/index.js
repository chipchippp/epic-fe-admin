import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import { getInventory } from '~/services/Inventory/inventoryService';

function Inventory() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [numbers, setNumbers] = useState([]);
    const [status, setStatus] = useState('');

    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    useEffect(() => {
        let filteredData = data;

        if (search) {
            filteredData = filteredData.filter((item) =>
                item.productResponse.name.toString().toLowerCase().includes(search.toLowerCase()),
            );
        }

        if (status !== '') {
            filteredData = filteredData.filter((item) => item.status === status);
        }
        const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
        setNumbers(pagesArray);
        setSearchedData(filteredData);
    }, [search, data, totalPages, status]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await getInventory(currentPage, limit);
                setData(response.data.content);
                setSearchedData(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                toast.error(`Failed to fetch inventory: ${error.message}`);
            }
            setLoading(false);
        };
        fetchInventory();
    }, [currentPage, limit]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {loading ? (
                                    <div>Loading...</div>
                                ) : (
                                    <>
                                        <h3 className="font-weight-bold">Inventory</h3>
                                        <Link to="/inventory/create" className="float-left btn btn-primary">
                                            <i className="fas fa-plus"></i> New
                                        </Link>

                                        <div className="float-left ml-2">
                                            <select
                                                className="form-control selectric btn-primary"
                                                onChange={handleStatusChange}
                                            >
                                                <option value="">Sort Status</option>
                                                <option value="IN">In</option>
                                                <option value="OUT">Out</option>
                                            </select>
                                        </div>
                                        <Search className="float-left" setSearch={setSearch} />

                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Product</th>
                                                        <th>Quantity</th>
                                                        <th>Status</th>
                                                        <th>Note</th>
                                                        <th>Date</th>
                                                        {/* <th>Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {searchedData.map((item, index) => (
                                                        <tr key={item.id}>
                                                            <td>{(currentPage - 1) * limit + index + 1}</td>
                                                            <td>{item.productResponse.name}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.status}</td>
                                                            <td>{item.note}</td>
                                                            <td>{item.date}</td>
                                                            {/* <td>
                                                                <Link
                                                                    to={`/inventory/edit/${item.id}`}
                                                                    className="btn btn-primary mr-2"
                                                                >
                                                                    <i className="fas fa-pencil-alt"></i>
                                                                </Link>
                                                            </td> */}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <Pagination
                                            prePage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            nextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                            changeCPage={handlePageChange}
                                            currentPage={currentPage}
                                            numbers={numbers}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Inventory;
