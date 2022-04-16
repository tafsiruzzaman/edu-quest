import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import Question from '../Question/Question';
import logo from '../../../images/logo_edu.png';

const Quiz = () => {
    let mark = 0;
    const { register, reset, handleSubmit } = useForm();
    const {id} = useParams();
    const history = useHistory();
    const [name, setName] = useState('');
    const [host, setHost] = useState('');
    const [studentId, setStudentId] = useState('');
    const [status, setStatus] = useState(false);
    const [displayModal, setDisplayModal] = useState(true);
    const [displayQuestion, setDisplayQuestion] = useState(false);
    const [questions, setQuestions] = useState({});
    const [answer, setAnswer] = useState({});
    const url = `https://stormy-brook-59213.herokuapp.com/quiz/${id}`;
    useEffect(()=> {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setHost(data.host);
            setName(data.name);
            setStatus(data.status);
            setQuestions(data.questions);
        })
    }, []);

    useEffect(()=> {
        fetch(`https://stormy-brook-59213.herokuapp.com/answer/${id}`)
        .then(res => res.json())
        .then(data => {
            setAnswer(data);
        })
    }, []);

    const handleIDChange = e => {
        setStudentId(e.target.value);
    };

    const handleSubmission = e => {
        e.preventDefault();
        setStudentId(studentId);
        setDisplayModal(false);
        setDisplayQuestion(true);
    };

    const handleBack = ()=> {
        setDisplayModal(true);
        setDisplayQuestion(false);
        reset();
    }

    const onSubmit = data => {
        mark = 0;
        if(data.a1 === answer.a1) mark++;
        if(data.a2 === answer.a2) mark++;
        if(data.a3 === answer.a3) mark++;
        if(data.a4 === answer.a4) mark++;
        if(data.a5 === answer.a5) mark++;

        const result = {
            quizId: id,
            name: name,
            host: host,
            studentId: studentId,
            mark: mark
        }
        fetch('https://stormy-brook-59213.herokuapp.com/results', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(result)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                reset();
                swal({
                    title: `Your score ${mark * 2} / 10`,
                    text: "Your quiz submitted successfully!",
                    icon: "success",
                });
                history.push('/')
            }
        })
    };
    //"Confirmation!"
    return (
        <div>
            {
                !status ?
            
                <div className='my-5 fw-bold' >
                    <h2 style={{marginTop: '250px'}}>The quiz is over or</h2>
                    <h2>Not started yet</h2>
                </div>
            :
                <div>
                    {
                        displayModal && 
                        <div className="root_container py-5" style={{height: '915px'}}>
                            <div className="container">
                                <div className="box">
                                    <div className="box-container">
                                        <img src={logo} className="img-fluid w-25" alt="" />
                                        <div className="bg-white p-3 mt-5">
                                            <form onSubmit={handleSubmission}>
                                                <h2 className="fw-bold text-title">Enter Student ID</h2>
                                                <div className="w-75 mx-auto mt-3">
                                                    <input onBlur={handleIDChange} required type="text" className="form-control w-100" placeholder="Student ID"/>
                                                    <div className="btn-colour">
                                                        <Button type="submit" variant="rounded-0 text-white px-5 mt-3">Next</Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        displayQuestion && 
                        <div className='root_container py-5'>
                            <h2 className='fw-bold mb-4'>{name}</h2>
                            <div className='box'>
                                <div className="box-containerr text-start">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {
                                            questions.map(question => <Question key={question.sl} question={question} register={register}></Question>)
                                        }
                                        <div className='d-flex'>
                                            <div className="btn-colour mt-4">
                                                <Button onClick={handleBack} variant="rounded-0 text-white me-2 px-3">
                                                    Back
                                                </Button>
                                            </div>
                                            <div className="btn-colour mt-4">
                                                <Button variant="rounded-0 text-white me-5 px-3" type='submit'>
                                                    Submit
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default Quiz;