import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import CustomSpinner from "./CustomSpinner";
import { Suspense } from "react";

const CustomErrorBoundary: React.FC<{
    FallbackComponent: React.ComponentType<FallbackProps>;
    SkeletonComponent?: () => JSX.Element;
    children: React.ReactNode;
}> = ({ FallbackComponent, children, SkeletonComponent = CustomSpinner }) => {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    FallbackComponent={FallbackComponent}
                    onReset={reset}
                >
                    <Suspense fallback={<SkeletonComponent />}>
                        {children}
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
};

export default CustomErrorBoundary;
