import {
    CircularProgress,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { usePaginatedPosts } from '../../api/posts';
import Posts from '../../components/Posts';
import Wrapper from '../../components/Wrapper';

const Test = () => {
    const [totalPosts, setTotalPosts] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<number>(1);
    const [nextSkip, setNextSkip] = useState<number>(0);
    const take = 5;
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [input, setInput] = useState<string>('');

    const { data, error, isLoading, isError }: any = usePaginatedPosts(
        searchTerm,
        nextSkip,
        page
    );

    useEffect(() => {
        setTotalPosts(data?.totalPosts);

        totalPosts % 5 === 0
            ? setPages(Math.floor(totalPosts / take))
            : setPages(Math.floor(totalPosts / take) + 1);
        page > 1 ? setNextSkip((page - 1) * take) : setNextSkip(0);
    }, [nextSkip, page, data?.totalPosts, totalPosts, searchTerm]);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setSearchTerm(input);
    };

    if (isLoading) {
        return (
            <Wrapper>
                <CircularProgress />
            </Wrapper>
        );
    }
    if (isError) {
        return (
            <Wrapper>
                <p>{error.message}</p>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    name='search'
                    label='Search'
                    type='text'
                    id='search'
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
            </form>

            {data.posts.length !== 0 ? (
                <>
                    <Posts posts={data.posts} />
                    <Grid container justify='center'>
                        <Pagination
                            count={pages}
                            shape='rounded'
                            page={page}
                            onChange={handlePageChange}
                        />
                    </Grid>
                </>
            ) : (
                <Typography>No posts found</Typography>
            )}
        </Wrapper>
    );
};

export default Test;
