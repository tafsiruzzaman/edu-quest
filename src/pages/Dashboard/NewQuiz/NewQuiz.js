import React from 'react';
import { Button, Col, Form} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import swal from '@sweetalert/with-react';
import { useHistory } from 'react-router-dom';


const NewQuiz = () => {
    const {user} = useAuth();
    const history = useHistory();
    const { register, reset, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = info => {
        const data = {
            name: info.name,
            host: user.email,
            status: false,
            questions: [
                {
                    sl: 1,
                    question: info.q1,
                    option1: info.q1o1,
                    option2: info.q1o2,
                    option3: info.q1o3,
                    option4: info.q1o4,
                },
                {
                    sl: 2,
                    question: info.q2,
                    option1: info.q2o1,
                    option2: info.q2o2,
                    option3: info.q2o3,
                    option4: info.q2o4,
                },
                {
                    sl: 3,
                    question: info.q3,
                    option1: info.q3o1,
                    option2: info.q3o2,
                    option3: info.q3o3,
                    option4: info.q3o4,
                },
                {
                    sl: 4,
                    question: info.q4,
                    option1: info.q4o1,
                    option2: info.q4o2,
                    option3: info.q4o3,
                    option4: info.q4o4,
                },
                {
                    sl: 5,
                    question: info.q5,
                    option1: info.q5o1,
                    option2: info.q5o2,
                    option3: info.q5o3,
                    option4: info.q5o4,
                }
            ]
        }
        fetch('https://stormy-brook-59213.herokuapp.com/quizzes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                const answer = {
                    quizId: data.insertedId,
                    a1: info.a1,
                    a2: info.a2,
                    a3: info.a3,
                    a4: info.a4,
                    a5: info.a5
                }
                console.log(answer);
                fetch('https://stormy-brook-59213.herokuapp.com/answers', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(answer)
                })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        reset();
                        swal({
                            title: "Good news!",
                            text: "Quiz added successfully!",
                            icon: "success",
                        });
                        history.push('/dashboard')
                    }
                })
            }
        })
        console.log(data);
    };
    return (
        <div className='container'>
            <h1 className='my-4 fw-bold'>Launch A Quiz!</h1>
            <div className='text-start'>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className="col-12 col-lg-6 px-2">
                            <Form.Group className="mb-4">
                            <Form.Label className='fs-3'>Quiz Name</Form.Label>
                                <Form.Control type='text' placeholder="Enter Quiz Name" {...register("name", { required: true })}/>
                                {errors.name && <span className='text-danger mt-3'>This field is required *</span>}
                            </Form.Group>
                            <div className='mb-5'>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2" className='fw-bold'>
                                        Question 1
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Enter Question" {...register("q1", { required: true })}/>
                                        {errors.q1 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 1
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 1" {...register("q1o1", { required: true })}/>
                                        {errors.q1o1 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 2
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 2" {...register("q1o2", { required: true })}/>
                                        {errors.q1o2 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 3
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 3" {...register("q1o3", { required: true })}/>
                                        {errors.q1o3 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 4
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 4" {...register("q1o4", { required: true })}/>
                                        {errors.q1o4 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='mb-5'>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2" className='fw-bold'>
                                        Question 2
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Enter Question" {...register("q2", { required: true })}/>
                                        {errors.q2 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 1
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 1" {...register("q2o1", { required: true })}/>
                                        {errors.q2o1 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 2
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 2" {...register("q2o2", { required: true })}/>
                                        {errors.q2o2 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 3
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 3" {...register("q2o3", { required: true })}/>
                                        {errors.q2o3 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 4
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 4" {...register("q2o4", { required: true })}/>
                                        {errors.q2o4 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='mb-5'>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2" className='fw-bold'>
                                        Question 3
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Enter Question" {...register("q3", { required: true })}/>
                                        {errors.q3 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 1
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 1" {...register("q3o1", { required: true })}/>
                                        {errors.q3o1 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 2
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 2" {...register("q3o2", { required: true })}/>
                                        {errors.q3o2 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 3
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 3" {...register("q3o3", { required: true })}/>
                                        {errors.q3o3 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 4
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 4" {...register("q3o4", { required: true })}/>
                                        {errors.q3o4 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 px-2">
                            <div className='mb-5'>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2" className='fw-bold'>
                                        Question 4
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Enter Question" {...register("q4", { required: true })}/>
                                        {errors.q4 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 1
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 1" {...register("q4o1", { required: true })}/>
                                        {errors.q4o1 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 2
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 2" {...register("q4o2", { required: true })}/>
                                        {errors.q4o2 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 3
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 3" {...register("q4o3", { required: true })}/>
                                        {errors.q4o3 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 4
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 4" {...register("q4o4", { required: true })}/>
                                        {errors.q4o4 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                            </div>
                            <div className='mb-5'>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2" className='fw-bold'>
                                        Question 5
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Enter Question" {...register("q5", { required: true })}/>
                                        {errors.q5 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 1
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 1" {...register("q5o1", { required: true })}/>
                                        {errors.q5o1 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 2
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 2" {...register("q5o2", { required: true })}/>
                                        {errors.q5o2 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 3
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 3" {...register("q5o3", { required: true })}/>
                                        {errors.q5o3 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group className="mb-3 row">
                                    <Form.Label column sm="2">
                                        Option 4
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="Option 4" {...register("q5o4", { required: true })}/>
                                        {errors.q5o4 && <span className='text-danger mt-3'>This field is required *</span>}
                                    </Col>
                                </Form.Group>
                            </div>
                            <div>
                               <div>
                                    <span>Answer 1 : </span>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a1" id="q1a" value="a" {...register("a1", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q1a"> A </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a1" id="q1b" value="b" {...register("a1", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q1b"> B </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a1" id="q1c" value="c" {...register("a1", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q1c"> C </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a1" id="q1d" value="d" {...register("a1", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q1d"> D </label>
                                    </div>
                                    {errors.a1 && <p className='text-danger m-0'>This field is required *</p>}
                               </div>
                               <div>
                                    <span>Answer 2 : </span>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a2" id="q2a" value="a" {...register("a2", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q2a"> A </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a2" id="q2b" value="b" {...register("a2", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q2b"> B </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a2" id="q2c" value="c" {...register("a2", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q2c"> C </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a2" id="q2d" value="d" {...register("a2", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q2d"> D </label>
                                    </div>
                                    {errors.a2 && <p className='text-danger m-0'>This field is required *</p>}
                               </div>
                               <div>
                                    <span>Answer 3 : </span>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a3" id="q3a" value="a" {...register("a3", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q3a"> A </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a3" id="q3b" value="b" {...register("a3", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q3b"> B </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a3" id="q3c" value="c" {...register("a3", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q3c"> C </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a3" id="q3d" value="d" {...register("a3", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q3d"> D </label>
                                    </div>
                                    {errors.a3 && <p className='text-danger m-0'>This field is required *</p>}
                               </div>
                               <div>
                                    <span>Answer 4 : </span>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a4" id="q4a" value="a" {...register("a4", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q4a"> A </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a4" id="q4b" value="b" {...register("a4", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q4b"> B </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a4" id="q4c" value="c" {...register("a4", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q4c"> C </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a4" id="q4d" value="d" {...register("a4", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q4d"> D </label>
                                    </div>
                                    {errors.a4 && <p className='text-danger m-0'>This field is required *</p>}
                               </div>
                               <div>
                                    <span>Answer 5 : </span>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a5" id="q5a" value="a" {...register("a5", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q5a"> A </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a5" id="q5b" value="b" {...register("a5", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q5b"> B </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a5" id="q5c" value="c" {...register("a5", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q5c"> C </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="a5" id="q5d" value="d" {...register("a5", { required: true })}/>
                                        <label className="form-check-label" htmlFor="q5d"> D </label>
                                    </div>
                                    {errors.a5 && <p className='text-danger m-0'>This field is required *</p>}
                               </div>
                            </div>
                            <div className="btn-colour mt-4">
                                <Button variant="rounded-0 text-white me-5 px-3" type='submit'>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default NewQuiz;