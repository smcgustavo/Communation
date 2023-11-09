"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
class PostsController {
    async index({ view, auth }) {
        await auth.authenticate();
        const posts = await Post_1.default.all();
        return view.render('posts/index', { posts: posts });
    }
    async show({ view, params, auth }) {
        await auth.authenticate();
        const post = await Post_1.default.find(params.id);
        return view.render('posts/show', { post: post });
    }
    async create({ request, auth, response }) {
        await auth.authenticate();
        const user = auth.user;
        await Post_1.default.create({ content: request.input('postContent'), author: user.username, name: user.name, likes: 0, dislikes: 0 });
        response.redirect().toRoute('/posts');
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map