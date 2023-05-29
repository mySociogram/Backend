import createError, { HttpError } from 'http-errors';
import express,{Response, Request } from'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import postRouter from './routes/post' ;
import usersRouter from './routes/users' ;
import groupRouter from './routes/group' ;
import commentRouter from './routes/comment' ;
import { dbConnect, sequelize } from './config/database';

const app = express();

import dotenv from 'dotenv';

dotenv.config();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', postRouter);
app.use('/users', usersRouter);
app.use('/', groupRouter);
app.use('/',commentRouter);


//database conection
const syncDatabase = async () => {
  await dbConnect();
  await sequelize.sync({});
  console.log('Connected to Database Successfully');
};

syncDatabase();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:HttpError, req:Request, res:Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
