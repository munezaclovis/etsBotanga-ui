const TableHeader = (data: { columns: string[] }) => {
    return (
        <thead>
            <tr>
                {data.columns.map((item, i) => {
                    return <th key={i}>{item}</th>;
                })}
            </tr>
        </thead>
    );
};

export default TableHeader;
