import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Search from '~/layouts/components/Search';
import Pagination from '~/layouts/components/Pagination';
import debounce from 'lodash.debounce';
import * as XLSX from 'xlsx';

function CourseList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        lessons: '',
        term: '',
        languageId: '',
        levelId: '',
        categoryId: '',
        description: '',
    });
    const [editingCourse, setEditingCourse] = useState(null);

    // Dữ liệu giả lập
    useEffect(() => {
        const fakeCourses = [
            {
                id: 1,
                lessons: 10,
                term: 'Spring',
                languageId: 1,
                levelId: 1,
                categoryId: 1,
                description: 'Basic course',
            },
            {
                id: 2,
                lessons: 15,
                term: 'Summer',
                languageId: 2,
                levelId: 2,
                categoryId: 2,
                description: 'Intermediate course',
            },
            {
                id: 3,
                lessons: 20,
                term: 'Fall',
                languageId: 3,
                levelId: 3,
                categoryId: 3,
                description: 'Advanced course',
            },
            {
                id: 4,
                lessons: 25,
                term: 'Winter',
                languageId: 4,
                levelId: 4,
                categoryId: 4,
                description: 'Expert course',
            },
        ];
        setCourses(fakeCourses);
        setFilteredCourses(fakeCourses);
    }, []);

    useEffect(() => {
        const filteredData = courses.filter((item) => item.term.toLowerCase().includes(search.toLowerCase()));
        setFilteredCourses(filteredData);
    }, [search, courses]);

    const handleSearch = useCallback(
        debounce((value) => {
            setSearch(value);
        }, 500),
        [],
    );

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredCourses);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Courses');
        XLSX.writeFile(wb, 'Courses.xlsx');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse((prev) => ({ ...prev, [name]: value }));
    };

    const addCourse = () => {
        const newEntry = { ...newCourse, id: courses.length + 1 };
        setCourses([...courses, newEntry]);
        setNewCourse({ lessons: '', term: '', languageId: '', levelId: '', categoryId: '', description: '' });
    };

    const editCourse = (course) => {
        setEditingCourse(course);
        setNewCourse(course);
    };

    const saveEdit = () => {
        setCourses(courses.map((course) => (course.id === editingCourse.id ? newCourse : course)));
        setEditingCourse(null);
        setNewCourse({ lessons: '', term: '', languageId: '', levelId: '', categoryId: '', description: '' });
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="font-weight-bold">Course List</h3>
                                <Link to="/create/product" className="btn btn-primary">
                                    <i className="fas fa-plus"></i> Create
                                </Link>
                                <Search className="float-left ml-2" setSearch={handleSearch} />
                                <button className="btn btn-success float-right" onClick={exportToExcel}>
                                    Export Excel
                                </button>

                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Lessons</th>
                                                <th>Term</th>
                                                <th>Language ID</th>
                                                <th>Level ID</th>
                                                <th>Category ID</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCourses.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.lessons}</td>
                                                    <td>{item.term}</td>
                                                    <td>{item.languageId}</td>
                                                    <td>{item.levelId}</td>
                                                    <td>{item.categoryId}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            onClick={() => editCourse(item)}
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
                                            Math.min(prev + 1, Math.ceil(filteredCourses.length / limit)),
                                        )
                                    }
                                    changeCPage={setCurrentPage}
                                    currentPage={currentPage}
                                    numbers={Array.from(
                                        { length: Math.ceil(filteredCourses.length / limit) },
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

export default CourseList;
