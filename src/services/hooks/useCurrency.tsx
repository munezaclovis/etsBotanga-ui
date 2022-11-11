const useCurrency = (amount: number | bigint) => {
    return new Intl.NumberFormat("fr-CD", {
        style: "currency",
        currency: "CDF",
    }).format(amount);
};

export default useCurrency;
