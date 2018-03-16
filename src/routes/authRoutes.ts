import { Router, Request, Response } from 'express';
import * as path from "path";
const passport = require("passport");

// Assign router to the express.Router() instance
import { router } from './';

router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }), (req: Request, res) => {
        console.log('logged in google', res);
    });

router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req: Request, res: Response) => {
        res.send({ok: 'fine'});
    }
);
router.get('/api/logout', (req: CustomRequest, res: Response) => {
    req.logout();
    res.redirect('/');
});
router.get('/api/current_user', (req: Request, res: Response) => {
    res.send(req['user']);
});
router.get('/', (req: Request, res: Response) => {
    res.send({hi: 'there'})
});


// Export the express.Router() instance
export const AuthRoutes: Router = router;


interface CustomRequest extends Request {
    logout();
}


/*
const passport = require('passport');

module.exports = (app) => {
  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    }), (req, res) => {
      console.log('logged in google', res);
    });

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.send({ok: 'fine'});
    }
  );

  // app.get('/auth-service/facebook',
  //   passport.authenticate('facebook', {
  //     scope: ['email']
  //   }));
  //
  // app.get('/auth-service/facebook/callback',
  //   passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  //     console.log('logged in facebook');
  //   });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
  app.get('/', (req, res) => {
    res.send({ hi: 'there' })
  });
};
 */
