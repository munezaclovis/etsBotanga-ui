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
                    <Modal.Title>Create Ingredient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="client" className="fs-6 mb-1">
                            Client Name
                        </label>
                        <input
                            type={"text"}
                            name="client"
                            className={`form-control`}
                            value={""}
                            placeholder={`Client name`}
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default IngredientsCreate;
