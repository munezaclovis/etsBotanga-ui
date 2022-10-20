import IPaginate from "../../models/pagination/IPaginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
interface IPaginationLinks {
    data: IPaginate;
    setPage: (page: number) => void;
}

const PaginationLinks = (props: IPaginationLinks) => {
    if (props.data.current_page === undefined) {
        return <></>;
    }

    const linksRange = () => {
        var current = props.data.current_page ?? 1,
            last = props.data.last_page ?? 1,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || (i >= left && i < right)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push("...");
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const prev = (enable: boolean | undefined) => {
        if (enable === true) {
            return (
                <li
                    onClick={() => props.setPage((props.data.current_page ?? 1) - 1)}
                    className="paginate_button page-item previous"
                >
                    <a className="page-link" role={"button"}>
                        Previous
                    </a>
                </li>
            );
        }
        return (
            <li className="paginate_button page-item previous disabled">
                <a className="page-link">Previous</a>
            </li>
        );
    };

    const next = (enable: boolean | undefined) => {
        if (enable === true) {
            return (
                <li
                    onClick={() => props.setPage((props.data.current_page ?? 1) + 1)}
                    className="paginate_button page-item next"
                >
                    <a className="page-link" role={"button"}>
                        Next
                    </a>
                </li>
            );
        }
        return (
            <li className="paginate_button page-item next disabled">
                <a className="page-link">Next</a>
            </li>
        );
    };

    return (
        <div className="d-flex justify-content-between">
            <div>
                <span>
                    Showing <span className="fs-6">{props.data.from}</span> to{" "}
                    <span className="fs-6">{props.data.to}</span> of <span className="fs-6">{props.data.total}</span>{" "}
                    results
                </span>
            </div>
            <div>
                <ul className="pagination" aria-label="Pagination">
                    {prev(props.data.current_page !== 1)}
                    {linksRange().map((page, key) => {
                        if (typeof page === "undefined") {
                            return null;
                        }
                        if (typeof page === "string") {
                            return (
                                <li key={key} className="paginate_button page-item">
                                    <span className="page-link text-muted" role={"button"}>
                                        {page}
                                    </span>
                                </li>
                            );
                        }
                        return (
                            <li
                                onClick={() => props.setPage(page)}
                                key={key}
                                aria-current="page"
                                className={`paginate_button page-item${
                                    page === props.data.current_page ? " active" : ""
                                }`}
                            >
                                <span className="page-link" role={"button"}>
                                    {page}
                                </span>
                            </li>
                        );
                    })}
                    {next(props.data.last_page !== props.data.current_page)}
                </ul>
            </div>
        </div>
    );
};

export default PaginationLinks;
