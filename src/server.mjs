import { app } from './app.mjs';
import errorHandler from './middleware/errorHandler.mjs';
import AppError from './models/error/appError.mjs';
import casinosRouter from './routes/casinosRoutes.mjs'
import { logger } from './middleware/logger.mjs';

import Blockchain from './models/blockchain/Blockchain.mjs';

export const blockchain = new Blockchain();

const PORT = process.env.PORT || 5010;

app.use(logger);


app.use('/api/v1/casinos', casinosRouter)


app.all( '*', ( req, res, next) => {

    next(new AppError(`Resursen du söker finns ej, ${req.originalUrl}`, 404 ))

});


app.use(errorHandler);


app.listen(PORT, () => {

console.log(`Servern är startad på adress: http://localhost:${PORT}`)

});