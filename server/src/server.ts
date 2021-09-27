import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import app from './app';

// TODO: run app with native node http
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
