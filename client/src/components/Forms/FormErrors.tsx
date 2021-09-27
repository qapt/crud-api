import { Typography } from '@material-ui/core';

type ErrorProps = {
    errors: string[];
};

const FormErrors = ({ errors }: ErrorProps) => {
    return (
        <>
            {errors && (
                <div style={{ marginTop: '20px' }}>
                    {errors.map((err, i) => (
                        <Typography color='error' key={i}>
                            {err}
                        </Typography>
                    ))}
                </div>
            )}
        </>
    );
};

export default FormErrors;
