import { Request, Response, Router } from 'express';
import { router } from './';
import { writeToFs } from '../helpers'

const data = require('../mocks/users.json');

//Index route
router.get('/users', (req: Request, res: Response) => {
    res.send(data);
});

// Create route
router.post('/users', (req: Request, res: Response) => {
    res.send('Got a POST request');
    data.push(req.body);

    writeToFs('volumes', data);
});


// Delete  route
router.delete('/users/:id', (req: Request, res: Response) => {
    const index = req.query.index;
    data.splice(index, 1);

    writeToFs('users', data);

    res.send('delete request');
});


export const UsersRoutes: Router = router;
