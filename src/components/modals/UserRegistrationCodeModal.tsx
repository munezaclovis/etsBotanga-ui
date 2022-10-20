import { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import IRole from "../../models/role/IRole";
import getApi from "../../services/api/getApi";
import { SET_REGISTRATION_KEY_MODAL } from "../../store/theme/actions";
import { ThemeContext } from "../../store/theme/context";
import { VscLoading } from "react-icons/vsc";
import LoadingSpinner from "../utilities/LoadingSpinner";
import InputErrors from "../form/InputErrors";

const UserRegistrationCodeModal = () => {
    const {
        theme: { registrationKeyModal },
        setTheme,
    } = useContext(ThemeContext);

    const api = getApi();
    const [roles, setRoles] = useState<IRole[]>();
    const [data, setData] = useState({ role: "" });
    const [errors, setErrors] = useState<{ role: string[] }>();
    const [generatedCode, setGeneratedCode] = useState<string>();
    const [loading, setLoading] = useState(false);

    const onClose = () => {
        setRoles(undefined);
        setErrors(undefined);
        setGeneratedCode(undefined);
        setTheme(SET_REGISTRATION_KEY_MODAL(false));
    };

    useEffect(() => {
        if (!roles) {
            api.get<any, AxiosResponse<IRole[]>>("roles?all=true").then((response) => {
                setRoles(response.data);
            });
        }
    }, []);

    const onSubmit = () => {
        setLoading(true);
        setErrors(undefined);
        setGeneratedCode(undefined);
        api.post<{ role: string }, AxiosResponse<{ code: string }>>("registration-code", data)
            .then((response) => {
                setGeneratedCode(response.data.code);
            })
            .catch((error: AxiosError<{ errors: { role: string[] } }>) => {
                //@ts-ignore
                setErrors({ role: error.response?.data.errors.role });
            })
            .finally(() => {
                setLoading(false);
                setData({ role: "" });
            });
    };

    return (
        <>
            <Modal show={registrationKeyModal} onHide={onClose} className="theme-indigo">
                <Modal.Header closeButton>
                    <Modal.Title>Generate Registration Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">
                                User Role
                            </label>
                            <select
                                className={`form-control selectpicker ${errors?.role ? "border-danger" : ""}`}
                                name="role"
                                value={data.role}
                                onChange={(e) => {
                                    setData({ role: e.target.value });
                                }}
                            >
                                <option value="">Choose User Role</option>
                                {roles &&
                                    roles?.map((role, index) => {
                                        return (
                                            <option key={index} data-tokens={role.name}>
                                                {role.name}
                                            </option>
                                        );
                                    })}
                            </select>
                            <InputErrors errors={errors?.role} />
                        </div>
                    </form>

                    {generatedCode && (
                        <div className="alert alert-success" role={"alert"}>
                            Code Generated: {generatedCode}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        {loading && <LoadingSpinner />} Generate
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserRegistrationCodeModal;
