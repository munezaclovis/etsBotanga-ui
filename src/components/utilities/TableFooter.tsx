const TableFooter = (data: { columns: string[] }) => {
    return (
        <tfoot>
            <tr>
                {data.columns.map((item, i) => {
                    return <th key={i}>{item}</th>;
                })}
            </tr>
        </tfoot>
    );
};

export default TableFooter;
