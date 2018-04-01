const passport = require("passport");
import { Request, Response, Router } from 'express';
import { AccessToken, User } from '../mongoModels';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { router } from './';
import { SECRET } from '../helpers/constants';

const keys = require('../config/keys').keys;
const cloudinary = require('cloudinary').v2;

const uploadImageToCloud = async (req, res) => {
    try {
        const {email} = req['user'];
        if (!req['files']) {
            return res.status(400).send('No files were uploaded.');
        }
        const file = req['files']['image'];

        const {name} = file;

        cloudinary.config({
            cloud_name: keys.cloudinaryName,
            api_key: keys.cloudinaryAPIKey,
            api_secret: keys.cloudinaryAPISecret
        });

        file.mv(`./${name}`, (err) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                const imageProps = {
                    crop: 'limit',
                    width: 200,
                    height: 200,
                    tags: ['special', 'for_homepage']
                };
                if (req['user'].imageURL) {
                    const splitURL = req['user'].imageURL.split('/');
                    const public_id = splitURL[splitURL.length-1];
                    cloudinary.uploader.destroy(public_id,
                        {invalidate: true }, (error, result) => {console.log(result)});
                }

                cloudinary.uploader.upload(name, imageProps, async (err, image) => {
                    if (err) {
                        console.warn(err);
                    }
                    const imageURL = `http://res.cloudinary.com/${keys.cloudinaryName}/image/upload/v1521574742/${image.public_id}`;
                    const newUser = await User.findOneAndUpdate({email}, {$set: {...req['user']}}, {new: true});
                    console.log('newUser', newUser);

                    fs.unlink(`./${name}`, (cb) => {
                        res.send('File uploaded!');
                    })
                });
            }
            }
        );
    } catch (err) {
        console.log('err', err);
    }
}
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }), (req: Request, res) => {
        console.log('logged in google', res);
    });

router.get('/auth/google/callback',
    passport.authenticate('google'),
    (req: Request, res: Response) => {
        res.send({ok: 'fine'});
    }
);
router.get('/auth/logout', (req: CustomRequest, res: Response) => {
    req.logout();
    res.redirect('/');
});

router.get('/auth/current_user',
    passport.authenticate('bearer', {session: false}), (req: Request, res: Response) => {
        res.send(req['user']);
    }
);

router.post('/auth/token',
    async (req, res) => {
        try {
            if (req.body) {
                console.log();
                const {email, password} = req.body;
                const currentUser = await User.findOne({email});
                if (currentUser) {
                    const {token} = await AccessToken.findOne({userId: currentUser._id});
                    if (token) {
                        res.json({token})
                    } else {
                        res.json({token: null});
                    }
                } else {
                    res.sendStatus(404)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
);

router.get('/auth/profile',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        const user = req['user'];
        console.log('req', req['user']);
        res.json(req['user']);
    });

router.get('/auth/login',
    passport.authenticate('bearer', {session: false}),
    async (req, res) => {
        try {
            const data = req['user'];
            const user = {
                username: data.username,
                imageURL: data.imageURL || '',
                dateOfRegistration: data.dateOfRegistration,
                isAdmin: data.isAdmin,
                orders: data.orders,
                wishes: data.wishes,
            };
            res.json({user})
        } catch (err) {
            console.log('err', err);
        }
    })
;

router.post('/auth/upload',
    passport.authenticate('bearer', {session: false}),
    async (req, res) => {
        await uploadImageToCloud(req, res);

        // try {
        //     const {email} = req['user'];
        //     if (!req['files']) {
        //         return res.status(400).send('No files were uploaded.');
        //     }
        //     const file = req['files']['image'];
        //
        //     const {name} = file;
        //
        //     cloudinary.config({
        //         cloud_name: keys.cloudinaryName,
        //         api_key: keys.cloudinaryAPIKey,
        //         api_secret: keys.cloudinaryAPISecret
        //     });
        //
        //     file.mv(`./${name}`, (err) => {
        //         if (err) {
        //             return res.status(500).send(err);
        //         } else {
        //             const imageProps = {
        //                 crop: 'limit',
        //                 width: 200,
        //                 height: 200,
        //                 tags: ['special', 'for_homepage']
        //             };
        //
        //             cloudinary.uploader.upload(name, imageProps, async (err, image) => {
        //                 if (err) {
        //                     console.warn(err);
        //                 }
        //                 const imageURL = `http://res.cloudinary.com/${keys.cloudinaryName}/image/upload/v1521574742/${image.public_id}`
        //                 const newUser = await User.findOneAndUpdate({email}, {$set: {imageURL}}, {new: true});
        //                 console.log('newUser', newUser);
        //                 fs.unlink(`./${name}`, (cb) => {
        //                     res.send('File uploaded!');
        //                 })
        //             });
        //         }
        //         }
        //     );
        // } catch (err) {
        //     console.log('err', err);
        // }
    });
router.patch('/auth/upload',
    passport.authenticate('bearer', {session: false}),
    async (req, res) => {
    await uploadImageToCloud(req, res);
        // try {
        //     const {email} = req['user'];
        //     if (!req['files']) {
        //         return res.status(400).send('No files were uploaded.');
        //     }
        //     const file = req['files']['image'];
        //
        //     const {name} = file;
        //
        //     cloudinary.config({
        //         cloud_name: keys.cloudinaryName,
        //         api_key: keys.cloudinaryAPIKey,
        //         api_secret: keys.cloudinaryAPISecret
        //     });
        //
        //     file.mv(`./${name}`, (err) => {
        //         if (err) {
        //             return res.status(500).send(err);
        //         } else {
        //             const imageProps = {
        //                 crop: 'limit',
        //                 width: 200,
        //                 height: 200,
        //                 tags: ['special', 'for_homepage']
        //             };
        //
        //             cloudinary.uploader.upload(name, imageProps, async (err, image) => {
        //                 if (err) {
        //                     console.warn(err);
        //                 }
        //                 const imageURL = `http://res.cloudinary.com/${keys.cloudinaryName}/image/upload/v1521574742/${image.public_id}`
        //                 const newUser = await User.findOneAndUpdate({email}, {$set: {imageURL}}, {new: true});
        //                 console.log('newUser', newUser);
        //                 fs.unlink(`./${name}`, (cb) => {
        //                     res.send('File uploaded!');
        //                 })
        //             });
        //         }
        //         }
        //     );
        // } catch (err) {
        //     console.log('err', err);
        // }
    });

router.post('/auth/register', async (req, res) => {
    try {
        const user = req.body;

        const token = jwt.sign({email: user.email, password: user.password}, SECRET, {expiresIn: 40000});
        const existingUser = await User.findOne({email: user.email});

        if (existingUser) {
            res.send('User is already exist');
        } else {
            const user = await User.create({
                email: req.body.email,
                username: req.body.username,
            });
            AccessToken.create({
                userId: user._id,
                token: token
            });
            res.json({token, user});
        }
    } catch (err) {
        console.log('err', err);
    }
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
