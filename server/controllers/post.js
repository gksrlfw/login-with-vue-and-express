
// const passport = require('passport');
const bcrypt = require('bcrypt');

class PostService {
    #postModel;

    constructor(postModel) {
        this.#postModel = postModel;
    }
    async uploadPost(content, url, id) {
        try {
            const post = await this.#postModel.create({
              content: content,
              img: url,
              UserId: id,
            });
            return 200;
        } 
        catch (error) {
            console.error(error);
            return 500;
        }
    }
    async deletePost(userId, postId) {
        try {
            console.log(userId, postId);
            await this.#postModel.destroy({ where: { id: postId, userId: userId }});
            return 200;
        }
        catch(err) {
            console.log(err);
            return 500;
        }
    }
    async getPostList() {
        try {
            const postList = await this.#postModel.findAll();
            return postList;
        }
        catch(err) {
            console.error(err);
            return 500;
        }
    }

}

module.exports = PostService;