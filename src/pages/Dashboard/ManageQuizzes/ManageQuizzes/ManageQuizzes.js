import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import SingleQuiz from '../SingleQuiz/SingleQuiz';

const ManageQuizzes = () => {
    const { user } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const url = `http://localhost:5000/quizzes/${user.email}`;
    useEffect(()=> {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setQuizzes(data)
        })
    },[])
    return (
        <div className='container my-5 text-start'>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {
                quizzes.map(quiz => <SingleQuiz key={quiz._id} quiz={quiz} ></SingleQuiz>)
            }
            </div>
        </div>
    );
};

export default ManageQuizzes;