import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import useApi from "./services/api/useApi";

const App = () => {
    const api = useApi();
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                suspense: true,
                retry: false,
                staleTime: 5 * 60 * 1000,
                retryOnMount: true,
                refetchOnMount: true,
                refetchOnWindowFocus: false,
                useErrorBoundary: true,
                queryFn: (ctx) =>
                    api.get(`${ctx.queryKey[0]}`).then((res) => res.data),
            },
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            {useRoutes(routes)}
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    );
};

export default App;
