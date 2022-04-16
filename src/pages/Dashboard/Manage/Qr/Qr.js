import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {QRCodeSVG} from 'qrcode.react';

const Qr = ({id}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const url = `https://quest-edu.web.app/quiz/${id}`
    return (
        <div>
            <div className="btn-colour">
                <Button variant="rounded-0 text-white px-3" onClick={handleShow}>
                    <i className="fas fa-qrcode"></i> QR
                </Button>
            </div>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Body className='text-center'>
                    <QRCodeSVG value={url} />
                    <div className='mt-2'>
                        <small>Quiz link: <a href={url} target="blank">{url}</a></small>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="btn-colour">
                        <Button variant="rounded-0 text-white px-3" onClick={handleClose}>
                            <i className="fas fa-times"></i> Close
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Qr;