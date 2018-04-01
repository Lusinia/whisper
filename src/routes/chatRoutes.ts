import { Router } from 'express';
import { router } from './';
import { Chat } from '../mongoModels/Chat';

router.post('/setup', (req, res) => {

    const chatData = [{
        created: new Date(),
        content: 'Hi',
        username: 'Chris',
        room: 'php'
    }, {
        created: new Date(),
        content: 'Hello',
        username: 'Obinna',
        room: 'laravel'
    }, {
        created: new Date(),
        content: 'Ait',
        username: 'Bill',
        room: 'angular'
    }, {
        created: new Date(),
        content: 'Amazing room',
        username: 'Patience',
        room: 'socet.io'
    }];

    chatData.forEach(chat => {
        const newChat = new Chat(chat);
        newChat.save(function (err, savedChat) {
            console.log(savedChat);
        });
    });

    res.send('created');
});
router.get('/msg',  (req, res) => {
    Chat.find({
        'room': req.query.room.toLowerCase()
    }).exec(function (err, msgs) {
        res.json(msgs);
    });
});

export const ChatRoutes: Router = router;
