import React from 'react';

const Layout = ({ isError, isLoading, children }: any) => {
    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (isError) {
        return <p>Error...</p>;
    }
    return <>{children}</>;
};

export default Layout;
