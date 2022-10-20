import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import IIngredient from "../../../models/ingredient/IIngredient";
import IPaginate from "../../../models/pagination/IPaginate";
import getApi from "../../../services/api/getApi";
import CreateBtn from "../../buttons/CreateBtn";
import BreadCrumb from "../../utilities/BreadCrumb";
import IngredientsCreate from "./IngredientsCreate";

const IngredientsIndex = () => {
    const [ingredients, setIngredients] = useState<IPaginate & { data: IIngredient[] }>();
    const api = getApi();
    const navigate = useNavigate();
    const [createModal, setCreateModal] = useState(false);
    useEffect(() => {
        // api.get<IPaginate & { data: IIngredient[] }>("ingredients?page=1")
        //     .then((e) => {
        //         setIngredients(e.data);
        //     })
        //     .catch((error: AxiosError) => {
        //         if (error.response?.status === 401) {
        //             navigate(-1);
        //         }
        //     });
    }, []);

    return (
        <>
            <div className="block-header">
                <div className="row clearfix">
                    <BreadCrumb title="Products" />
                    <div className="col-md-6 col-sm-12 text-right hidden-xs d-flex align-items-center justify-content-end">
                        <CreateBtn
                            onClick={() => {
                                setCreateModal(!createModal);
                            }}
                        />
                        {createModal && <IngredientsCreate show={createModal} setShow={setCreateModal} />}
                    </div>
                </div>
            </div>
            <div className="row clear-fix">
                {/* {ingredients &&
                    ingredients.data.map((ingredient, index) => {
                        return (
                            <>
                                <div key={index} className="col-md-6 col-lg-4">
                                    <div className="card c_grid c_indigo">
                                        <div className="body text-center d-flex flex-column">
                                            <div className="circle">
                                                <img
                                                    src="https://us.coca-cola.com/content/dam/nagbrands/us/coke/en/home/coca-cola-original-20oz.png"
                                                    className="rounded-circle"
                                                    style={{ height: "90px" }}
                                                    alt="Ingredient"
                                                />
                                            </div>
                                            <div className="m-t-20">{ingredient.name}</div>
                                            <div className="text-truncate">{ingredient.summary}</div>
                                            <div className="d-flex items-align-center justify-content-center gap-2 m-t-20">
                                                <Link
                                                    to={`${ingredient.id}`}
                                                    className="btn btn-outline-secondary btn-sm"
                                                >
                                                    Details
                                                </Link>
                                                <button className="btn btn-outline-danger btn-sm">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })} */}
                <div className="col mt-2 align-items-center justify-content-center">
                    <span className="fs-6">No records found!</span>
                </div>
            </div>
        </>
    );
};

export default IngredientsIndex;
