const router = require('express').Router();
const  { User, Post, Vote, Comment } = require('../../models');

// GET /api/users
router.get('/', (req, res) => {
    // access our model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
              model: Post,
              attributes: ['title'],
              through: Vote,
              as: 'voted_posts'
            }
          ]
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with this ID'});
            return;
        } else {
            res.json(dbUserData);
        };
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users/1
router.post('/', (req, res) => {
    // expects {username: usernameValue, email: emailValue, password: passwordValue }
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    //query operation
    //expects user email and password
    User.findOne({
        where: {
            email: req.body.email
        }
    }) .then(dbUserData => {
        if(!dbUserData) {
            res.status(500).json({ message: 'No user found with that email address'});
            return;
        } 
        //verify user 
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect Password' });
            return;
        }

        res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
});

// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects { username: 'gjfskal', email: 'fjksa@gfklg.com', password: 'gfgnlv;'}

    // if req.body has exact key/value pairs to match the model, you can just use req.body instead
    User.update(req.body, {
        individualHooks: true, // second requirement to hash user updated password 
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: 'No user found with this ID'});
            return;
        } else {
            res.json(dbUserData);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'No user found with this ID'});
            return;
        } else {
            res.json(dbUserData);
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;


