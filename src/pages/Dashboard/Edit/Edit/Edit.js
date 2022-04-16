import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import EditForm from '../EditForm/EditForm';
import NotFound from '../../../NotFound/NotFound';
import useAuth from '../../../../hooks/useAuth';

const Edit = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const [qName, setQName] = useState('');
    const [quiz, setQuiz] = useState({});
    const [host, setHost] = useState('');
    const [answer, setAnswer] = useState({});
    useEffect( () => {
        fetch(`https://stormy-brook-59213.herokuapp.com/quiz/${id}`)
        .then(res => res.json())
        .then(data => {
            setQuiz(data);
            setHost(data.host);
            setQName(data.name);
        })
    },[])

    useEffect( () => {
        fetch(`https://stormy-brook-59213.herokuapp.com/answer/${id}`)
        .then(res => res.json())
        .then(data => {
            setAnswer(data);
        })
    },[])


    return (
        <div className='container'>
            {
                user.email === host ?
                <div>
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
               :
               <div>
                    <NotFound></NotFound>  
                </div>
            }
        </div>
    );
};

export default Edit;