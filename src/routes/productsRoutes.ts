import { Request, Response, Router } from 'express';
import { router } from './';
import { writeToFs } from '../helpers'

const data = require('../mocks/volumes.json');

//Index route
router.get('/products', (req: Request, res: Response) => {
    res.send(data);
});

// Create route
router.post('/products', (req: Request, res: Response) => {
    res.send('Got a POST request');
    data.push(req.body);

    writeToFs('volumes', data);
});


// Delete  route
router.delete('/products/:id', (req: Request, res: Response) => {
    const index = req.query.index;
    data.splice(index, 1);

    writeToFs('volumes', data);

    res.send('delete request');
});


export const ProductsRoutes: Router = router;
