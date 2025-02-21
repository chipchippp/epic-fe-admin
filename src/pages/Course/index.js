import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import debounce from 'lodash.debounce';
import * as XLSX from 'xlsx';

function ClassList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState('');
    const [filteredClasses, setFilteredClasses] = useState([]);
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({
        name: '',
        startDate: '',
        endDate: '',
        price: '',
        teacherId: '',
        courseId: '',
    });
    const [editingClass, setEditingClass] = useState(null);

    // Dữ liệu giả lập
    useEffect(() => {
        const fakeClasses = [
            {
                id: 1,
                name: 'Math 101',
                startDate: '2024-03-01',
                endDate: '2024-06-01',
                price: 200,
                teacherId: 1,
                courseId: 1,
            },
            {
                id: 2,
                name: 'Science 102',
                startDate: '2024-03-05',
                endDate: '2024-06-05',
                price: 250,
                teacherId: 2,
                courseId: 2,
            },
            {
                id: 3,
                name: 'History 201',
                startDate: '2024-03-10',
                endDate: '2024-06-10',
                price: 180,
                teacherId: 3,
                courseId: 3,
            },
            {
                id: 4,
                name: 'Physics 301',
                startDate: '2024-03-15',
                endDate: '2024-06-15',
                price: 300,
                teacherId: 4,
                courseId: 4,
            },
            {
                id: 5,
                name: 'Chemistry 401',
                startDate: '2024-03-20',
                endDate: '2024-06-20',
                price: 270,
                teacherId: 5,
                courseId: 5,
            },
            {
                id: 6,
                name: 'Chemistry 401',
                startDate: '2024-03-20',
                endDate: '2024-06-20',
                price: 270,
                teacherId: 5,
                courseId: 5,
            },
        ];
        setClasses(fakeClasses);
        setFilteredClasses(fakeClasses);
    }, []);

    useEffect(() => {
        const filteredData = classes.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
        setFilteredClasses(filteredData);
    }, [search, classes]);

    const handleSearch = useCallback(
        debounce((value) => {
            setSearch(value);
        }, 500),
        [],
    );

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredClasses);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Classes');
        XLSX.writeFile(wb, 'Classes.xlsx');
    };

    const exportToCSV = () => {
        const ws = XLSX.utils.json_to_sheet(filteredClasses);
        const csv = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csv], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'Classes.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClass((prev) => ({ ...prev, [name]: value }));
    };

    const addClass = () => {
        const newEntry = { ...newClass, id: classes.length + 1 };
        setClasses([...classes, newEntry]);
        setNewClass({ name: '', startDate: '', endDate: '', price: '', teacherId: '', courseId: '' });
    };

    const editClass = (cls) => {
        setEditingClass(cls);
        setNewClass(cls);
    };

    const saveEdit = () => {
        setClasses(classes.map((cls) => (cls.id === editingClass.id ? newClass : cls)));
        setEditingClass(null);
        setNewClass({ name: '', startDate: '', endDate: '', price: '', teacherId: '', courseId: '' });
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="font-weight-bold">Class List</h3>
                                <Link to="/create/product" className="btn btn-primary">
                                    <i className="fas fa-plus"></i> Create
                                </Link>
                                <Search className="float-left ml-2" setSearch={handleSearch} />
                                &nbsp;
                                <button className="btn btn-success float-right ml-2" onClick={exportToExcel}>
                                    Export Excel
                                </button>
                                <button className="btn btn-primary float-right" onClick={exportToCSV}>
                                    Export CSV
                                </button>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Price</th>
                                                <th>Teacher ID</th>
                                                <th>Course ID</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredClasses.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.startDate}</td>
                                                    <td>{item.endDate}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.teacherId}</td>
                                                    <td>{item.courseId}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            onClick={() => editClass(item)}
                                                        >
                                                            Edit
                                                        </button>
                                                        &nbsp;
                                                        <button className="btn btn-danger btn-sm">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination
                                    prePage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    nextPage={() =>
                                        setCurrentPage((prev) =>
                                            Math.min(prev + 1, Math.ceil(filteredClasses.length / limit)),
                                        )
                                    }
                                    changeCPage={setCurrentPage}
                                    currentPage={currentPage}
                                    numbers={Array.from(
                                        { length: Math.ceil(filteredClasses.length / limit) },
                                        (_, i) => i + 1,
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default ClassList;
