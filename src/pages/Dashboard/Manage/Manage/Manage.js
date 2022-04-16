import swal from '@sweetalert/with-react';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Result from '../Result/Result/Result';
import useAuth from '../../../../hooks/useAuth';
import NotFound from '../../../NotFound/NotFound';

const Manage = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const [quiz, setQuiz] = useState([]);
    const [status, setStatus] = useState(false);
    const [host, setHost] = useState('');
    useEffect( () => {
        fetch(`https://stormy-brook-59213.herokuapp.com/quiz/${id}`)
        .then(res => res.json())
        .then(data => {
            setQuiz(data);
            setHost(data.host);
            setStatus(data.status);
        })
    }, [])

    const handleStart = () => {
        const quizUpdate = {
            status : true
        }
        const url = `https://stormy-brook-59213.herokuapp.com/quizz/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(quizUpdate)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                setStatus(true);
                swal("Conformation!", "Quiz Started", "success");
            }
        })
    }

    const handlePause = () => {
        const quizUpdate = {
            status : false
        }
        const url = `https://stormy-brook-59213.herokuapp.com/quizz/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(quizUpdate)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                setStatus(false);
                swal("Conformation!", "Quiz Paused", "success");
            }
        })
    }
    return (
        <div className='contaienr my-5'>
            {
                user.email === host ?
                <div>
                    <div className='px-5'>
                        <h2 className='pb-3 fw-bold modal_text'>{quiz.name}</h2>
                        <div className='d-flex justify-content-end align-items-center pe-4'>
                            {
                                !status ? 
                                <div className="btn-colour">
                                    <Button onClick={handleStart} variant="rounded-0 text-white me-3 px-3">
                                        <i className="fas fa-play"></i> Start
                                    </Button>
                                </div>
                                :
                                <div className="btn-colour">
                                    <Button onClick={handlePause} variant="rounded-0 text-white me-3 px-3">
                                    <i className="fas fa-pause"></i> Pause
                                    </Button>
                                </div>
                            }
                            <div className="btn-colour">
                                <Button variant="rounded-0 text-white px-3">
                                    <i className="fas fa-qrcode"></i> QR
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Result id={id}></Result>
                </div>
                :
                <div>
                    <NotFound></NotFound>
                </div>
            }
        </div>
    );
};

export default Manage;