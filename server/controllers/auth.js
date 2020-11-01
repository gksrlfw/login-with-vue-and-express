
const bcrypt = require('bcrypt');

class UserService {
    #userModel;

    constructor(userModel) {
        this.#userModel = userModel;
    }
    async join(email, nick, password) {
        try {
            const exUser = await this.#userModel.findOne({ where: { email }});
            if(exUser) return { status: 404, message: '가입상태' };
            const hash = await bcrypt.hash(password, 12);
            await this.#userModel.create({
                email,
                nick,
                password: hash
            });
            return { status: 200, message: '가입성공' };
        }
        catch(err) {
            console.error(err);
            return { status: 500, message: err };
        }
    }
    async login(email, password) {
        try {
            const exUser = await this.#userModel.findOne({ where: { email }});
            if(!exUser) return { status: 404, message: '회원가입' };
            const result = await bcrypt.compare(password, exUser.password);
            if(result) return { status: 200, message: exUser };
            else return { status: 400, message: '비밀번호' };
        }
        catch(err) {
            console.error(err);
            return { status: 500, message: err };
        }
    }
    async follow(userId, followingId) {
        try {
            const user = await this.#userModel.findOne({ where: { id: userId }});
            if(user) {
                await user.addFollowings([parseInt(followingId, 10)]);  
                return 200;
            }
            return 404;
        }
        catch(error) {
            console.error(error);
            return 500;
        }
    }
    async unfollow(userId, followingId) {
        try {
            const user = await this.#userModel.findOne({ where: { id: userId }});
            if(user) {
                await user.removeFollowings([parseInt(followingId, 10)]); 
                return 200;
            }
            else return 404;
        }
        catch(error) {
            console.error(error);
            return 500;
        }
    }
    getMyUser(userId) {
        return this.userModel.findById(Id);
    }
}

module.exports = UserService;