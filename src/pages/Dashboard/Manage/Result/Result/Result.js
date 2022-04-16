import React, { useEffect, useState } from 'react';
import SingleRow from '../SingleRow/SingleRow';
import './Result.css';

const Result = (props) => {
    const id = props.id;
    const [results, setResults] = useState([]);
    useEffect( () => {
        fetch(`https://stormy-brook-59213.herokuapp.com/results/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setResults(data);
        })
    }, [])
    return (
        <div className='text-center'>
            <h2 className="mt-4 mb-3 fw-bold modal_text">Scoreboard</h2>
            <div className="container table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" className="fs-4">Student ID</th>
                            <th scope="col" className="fs-4">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results.map(result => <SingleRow key={result._id} result={result}></SingleRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Result;