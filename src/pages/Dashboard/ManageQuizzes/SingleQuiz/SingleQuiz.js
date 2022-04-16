import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SingleQuiz = (props) => {
    const history = useHistory();
    const quiz = props.quiz;
    const handleEdit = () => {
        history.push(`/dashboard/edit/${quiz._id}`);
    }
    const handleManage = () => {
        history.push(`/dashboard/manage/${quiz._id}`);
    }
    return (
        <div className="col">
            <div className="card h-100">
                <div className="card-body">
                    <h3 className="card-title fw-bold mb-2">{quiz.name}</h3>
                    <div className='d-flex'>
                        <div className="btn-colour mt-4">
                            <Button onClick={handleEdit} variant="rounded-0 text-white me-2 px-3">
                                <i className="far fa-edit"></i> Edit
                            </Button>
                        </div>
                        <div className="btn-colour mt-4">
                            <Button onClick={handleManage} variant="rounded-0 text-white px-3">
                                <i className="fas fa-cog"></i> Manage
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleQuiz;