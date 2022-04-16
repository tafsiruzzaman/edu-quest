import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import EditForm from '../EditForm/EditForm';

const Edit = () => {
    const {id} = useParams();
    const [qName, setQName] = useState('');
    const [quiz, setQuiz] = useState({});
    const [answer, setAnswer] = useState({});
    useEffect( () => {
        fetch(`http://localhost:5000/quiz/${id}`)
        .then(res => res.json())
        .then(data => {
            setQuiz(data);
            setQName(data.name);
        })
    },[])

    useEffect( () => {
        fetch(`http://localhost:5000/answer/${id}`)
        .then(res => res.json())
        .then(data => {
            setAnswer(data);
        })
    },[])


    return (
        <div className='container'>
            {
                qName === '' ? 
                <Button variant="danger mt-5" disabled>
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    Loading...
                </Button>
                :
                <div>
                    <h1 className='mt-4 mb-5 fw-bold'>Edit Quiz</h1>
                    <div className='text-start'>
                        <EditForm quiz={quiz} answer={answer}></EditForm>
                    </div>
                </div>
            }
        </div>
    );
};

export default Edit;