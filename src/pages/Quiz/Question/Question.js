import React from 'react';

const Question = (props) => {
    const register = props.register;
    const question = props.question;
    const name = `a${question.sl}`;
    const id1 = `q${question.sl}a`;
    const id2 = `q${question.sl}b`;
    const id3 = `q${question.sl}c`;
    const id4 = `q${question.sl}d`;
    return (
        <div className='mb-3 bg-white px-5 py-3 rounded'>
            <h6 className='mb-2 fw-bold'>{question.sl}. {question.question}</h6>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={name} value="a" id={id1} {...register(`${name}`)}/>
                <label className="form-check-label" htmlFor={id1}>
                    {question.option1}
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={name} value="b" id={id2} {...register(`${name}`)}/>
                <label className="form-check-label" htmlFor={id2}>
                    {question.option2}
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={name} value="c" id={id3} {...register(`${name}`)}/>
                <label className="form-check-label" htmlFor={id3}>
                    {question.option3}
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name={name} value="d" id={id4} {...register(`${name}`)}/>
                <label className="form-check-label" htmlFor={id4}>
                    {question.option4}
                </label>
            </div>
        </div>
    );
};

export default Question;