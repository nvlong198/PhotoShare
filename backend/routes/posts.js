const router = require("./user");
const {User, Post, Photo, Comment, Tag} = require("../models");

router.route("/:userID/posts")
    .get(function (req, res) {
        let userId = req.params.userID;
        User.findOne({
            where: {id: userId},
            include: [
                {
                    model: Post,
                    include: [
                        {
                            model: Photo,
                            include: [{
                                model: Tag,
                                attributes: ["name"],
                                through: {
                                    attributes: []
                                }
                            }]
                        },
                        {model: Comment},
                    ],
                }
            ],
            order: [
                [{model: Post}, 'createdAt', 'DESC']
            ]
        }).then((user) => {
            let posts = user.Posts;
            Promise.all(posts.map(function (post) {
                return post.countLikes();
            })).then(function (reactions) {
                let postsWithLikes = posts.map(function (post, index) {
                    post.dataValues.likes = reactions[index];
                    post.dataValues.photoCount = post.Photos.length;
                    return post;
                });
                let postCount = postsWithLikes.length;
                let photoCount = postsWithLikes.reduce((totalPhoto, post) => {
                    return totalPhoto + post.Photos.length;
                }, 0);
                res.json({user: {...user.toJSON(), photoCount, postCount}, posts: postsWithLikes});
            }).catch(error => {
               res.json({error})
            });
            return null;
        }).catch(error => {
            res.json({error});
        });
    });
module.exports = router;
