import React from 'react';

const SingleRow = ({result}) => {
    return (
        <tr className="table-warning">
            <td>{result.studentId}</td>
            <td>{result.mark*2}/10</td>
        </tr>
    );
};

export default SingleRow;