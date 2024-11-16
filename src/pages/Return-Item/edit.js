import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { editReturn, updateReturn, updateReturnStatus } from '~/services/Orders/returnService';
import { Table, Modal, Button, Container, Row, Col } from 'react-bootstrap';

function ReturnItemEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editShow, setEditShow] = useState(false);
    const [showMarkAsCompleted, setShowMarkAsCompleted] = useState(false);
    const [tempStatus, setTempStatus] = useState('');
    const [statusNote, setStatusNote] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        id: '',
        orderDetail: null,
        quantityReturned: '',
        reason: '',
        reasonNote: '',
        refundAmount: '',
        refundPercentage: '',
        conditionNote: '',
        postalCode: '',
        conditionItem: '',
        statusNote: '',
        isAddStockQty: '',
        status: '',
        createdAt: '',
        updatedAt: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await editReturn(id);
                setData(result.data);
                setTempStatus(result.data.status);
                setStatusNote(result.data.statusNote || '');
                setLoading(false);

                if (result.data.status === 'REFUNDED') {
                    setEditShow(true);
                    setShowMarkAsCompleted(true);
                }
            } catch (error) {
                toast.error('Failed to fetch return item data');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateReturnStatus(id, tempStatus, statusNote);
            toast.success('Return item status updated successfully');
            if (tempStatus === 'REFUNDED') {
                setEditShow(true);
                setShowMarkAsCompleted(true);
            }
            navigate(`/return-item/edit/${id}`);
            window.location.reload();
        } catch (error) {
            toast.error('Failed to update return-item status');
        }
    };

    const handleMarkAsCompleted = async () => {
        try {
            await updateReturnStatus(id, 'COMPLETED', statusNote);
            setTempStatus('COMPLETED');
            toast.success('Return item marked as Completed');
            setEditShow(false);
            setShowMarkAsCompleted(false);
        } catch (error) {
            toast.error('Failed to mark return item as Completed');
        }
    };

    const handleUpdate = () => {
        const updatedData = {
            ...data,
            status: 'REFUNDED',
        };

        updateReturn(id, updatedData)
            .then(() => {
                handleClose();
                toast.success('Return has been updated');
                setShowMarkAsCompleted(true);
            })
            .catch((error) => {
                toast.error('Failed to update Return', error);
            });
    };

    const getSelectableOptions = () => {
        const options = [
            { value: 'PENDING', label: 'Pending' },
            { value: 'APPROVED', label: 'Approved' },
            { value: 'REJECTED', label: 'Rejected' },
            { value: 'REFUNDED', label: 'Refunded' },
            { value: 'COMPLETED', label: 'Completed' },
        ];

        switch (data.status) {
            case 'PENDING':
                return options.filter((option) => ['PENDING', 'APPROVED', 'REJECTED'].includes(option.value));
            case 'APPROVED':
                return options.filter((option) => ['APPROVED', 'REFUNDED'].includes(option.value));
            case 'REFUNDED':
                return options.filter((option) => ['REFUNDED', 'COMPLETED'].includes(option.value));
            default:
                return options;
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleClose = () => {
        setEditShow(false);
    };

    return (
        <>
            <div className="content-wrapper">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="font-weight-bold">Return Item</h3>
                            <Link to="/return-item" className="btn btn-primary mb-3">
                                <i className="fas fa-arrow-left"></i> Back
                            </Link>
                            <hr />
                            <div className="row">
                                <div className="col-md-4">
                                    <address>
                                        <strong>Return Item:</strong>
                                        <p>ReturnItemEditId: {data.orderDetail ? data.orderDetail.id : 'null'}</p>
                                        <p>QuantityReturned: {data.quantityReturned || 'null'}</p>
                                        <p>Status: {data.status}</p>
                                        <p>StatusNote: {data.statusNote || 'null'}</p>
                                    </address>
                                </div>
                                <div className="col-md-4">
                                    <address>
                                        <strong>Reason:</strong>
                                        <p>Reason: {data.reason || 'null'}</p>
                                        <p>ReasonNote: {data.reasonNote || 'null'}</p>
                                    </address>
                                </div>
                                <div className="col-md-4">
                                    <address>
                                        <strong>Refund:</strong>
                                        <p>RefundPercentage: {data.refundPercentage || 'null'}</p>
                                        <p>RefundAmount: {data.refundAmount || 'null'}</p>
                                        <p>ConditionItem: {data.conditionItem || 'null'}</p>
                                        <p>ConditionNote: {data.conditionNote || 'null'}</p>
                                    </address>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-4">
                                    <strong>Images:</strong>
                                    <div>
                                        {data.images && data.images.length > 0 ? (
                                            <img
                                                src={data.images[0]}
                                                alt="Return Item"
                                                style={{ width: '140px', height: '120px', borderRadius: '0px' }}
                                            />
                                        ) : (
                                            'No Image'
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <>
                                                <div className="col-md-6">
                                                    <label className="col-form-label">Status</label>
                                                    <select
                                                        className="form-control"
                                                        id="status"
                                                        value={tempStatus}
                                                        onChange={(e) => {
                                                            setTempStatus(e.target.value);
                                                            if (e.target.value === 'REFUNDED') {
                                                                setEditShow(true);
                                                            }
                                                        }}
                                                        disabled={
                                                            data.status === 'COMPLETED' || data.status === 'REJECTED'
                                                        }
                                                    >
                                                        {getSelectableOptions().map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {tempStatus === 'REJECTED' && (
                                                    <div className="col-md-6">
                                                        <label className="col-form-label">StatusNote</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="StatusNote"
                                                            required
                                                            value={statusNote}
                                                            onChange={(e) => setStatusNote(e.target.value)}
                                                        />
                                                    </div>
                                                )}
                                                <div className="col-md-12 mt-3">
                                                    <button className="btn btn-primary" type="submit">
                                                        Update Status
                                                    </button>
                                                </div>
                                            </>
                                            {/* {showMarkAsCompleted && (
                                                <div className="col-md-6 mt-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-success ml-2"
                                                        onClick={handleMarkAsCompleted}
                                                    >
                                                        Mark as Completed
                                                    </button>
                                                </div>
                                            )} */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {tempStatus === 'REFUNDED' && (
                <Modal
                    show={editShow}
                    onHide={handleClose}
                    // size="lg"
                    // style={{ width: '1500px', height: '1000px', }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Return Item</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Condition Item"
                                        value={data.conditionItem}
                                        onChange={(e) => setData({ ...data, conditionItem: e.target.value })} 
                                        style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Condition Note"
                                        value={data.conditionNote}
                                        onChange={(e) => setData({ ...data, conditionNote: e.target.value })}
                                        style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Refund Percentage"
                                        value={data.refundPercentage}
                                        onChange={(e) => setData({ ...data, refundPercentage: e.target.value })}
                                        style={{ width: '100%', padding: '10px', fontSize: '1rem' }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <select
                                        name="size"
                                        className="form-control"
                                        value={data.isAddStockQty}
                                        onChange={(e) => setData({ ...data, isAddStockQty: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select Is Add Stock Qty
                                        </option>
                                        <option value="True">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            <ToastContainer />
        </>
    );
}

export default ReturnItemEdit;