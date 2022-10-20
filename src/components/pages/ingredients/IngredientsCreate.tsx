import { Dispatch, FC } from "react";
import { Modal } from "react-bootstrap";

const IngredientsCreate: FC<{ show: boolean; setShow: Dispatch<boolean> }> = ({ show, setShow }) => {
    return (
        <>
            <Modal
                show={show}
                onHide={() => {
                    setShow(!show);
                }}
                className="theme-indigo"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Generate Registration Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>Test</Modal.Body>
            </Modal>
        </>
    );
};

export default IngredientsCreate;
