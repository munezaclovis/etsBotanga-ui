const InputErrors = (data: { errors?: string[] }) => {
    return (
        <>
            {data.errors && (
                <div className="text-danger font-14 text-start px-2">
                    {data?.errors?.map((error, index) => {
                        return <p key={index}>- {error}</p>;
                    })}
                </div>
            )}
        </>
    );
};

export default InputErrors;
