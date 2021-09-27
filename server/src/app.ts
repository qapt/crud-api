import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from './routes';
import {
    notFound,
    errorHandlerDev,
    //errorHandlerProd,
} from './middleware/errorHandler';

const app: Express = express();

// Middleware
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(routes);

// Error handlers, must be last middleware
/// catch 404 and forward to error handler
app.use(notFound);

// development error handler
// will print stacktrace
app.use(errorHandlerDev);

// TODO: add isProd check to use one or the other
// production error handler
// no stacktrace leaked to user
//app.use(errorHandlerProd);

export default app;
