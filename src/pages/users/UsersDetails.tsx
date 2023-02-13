import { useParams } from "react-router-dom";

const UsersDetails = () => {
    const params = useParams();
    return <div>{params.id}</div>;
};

export default UsersDetails;
