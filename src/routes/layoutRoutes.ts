import { Request, Response, Router } from 'express';
import {router} from './';

//Index route
router.get('/', function (req: Request, res: Response) {
    res.send({hi: 'there'});
});

// Create route
router.post('/', function (req: Request, res: Response) {
    res.send('Got a POST request');
});

export const LayoutRoutes: Router = router;
