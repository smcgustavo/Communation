"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Like_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Like"));
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
class PostsController {
    async index({ view, auth }) {
        await auth.authenticate();
        const posts = await Post_1.default.query().where('commented_to', 0).select('*').orderBy('created_at', 'desc');
        return view.render('posts/index', { posts: posts });
    }
    async show({ view, params, auth, response }) {
        await auth.authenticate();
        const post = await Post_1.default.find(params.id);
        let owner = false;
        if (auth.user.username == post?.author) {
            owner = true;
        }
        if (!post) {
            return response.status(404).json({ message: "Post not found" });
        }
        const commentsPost = await Post_1.default.query().where('commented_to', post.id).select('*').orderBy('likes', 'desc');
        return view.render('posts/show', { post, owner, commentsPost });
    }
    async like({ params, auth, response }) {
        await auth.authenticate();
        const post = await Post_1.default.find(params.id);
        const user = auth.user;
        const likeExists = await Like_1.default.query()
            .where('post_id', params.id)
            .where('user_id', user.id)
            .count('* as total');
        if (!post) {
            return response.status(404).json({ message: 'Post not found' });
        }
        if (likeExists[0].$extras.total == 0) {
            await Like_1.default.create({ userId: user.id, postId: params.id });
            post.likes = (await Like_1.default.query().where('post_id', params.id).count('* as total'))[0].$extras.total;
            await post.save();
        }
        else if (likeExists[0].$extras.total > 0) {
            await Like_1.default.query()
                .where('post_id', params.id)
                .where('user_id', user.id)
                .delete();
            post.likes = (await Like_1.default.query().where('post_id', params.id).count('* as total'))[0].$extras.total;
            await post.save();
        }
        return response.redirect('back');
    }
    async create({ request, auth, response }) {
        await auth.authenticate();
        const user = auth.user;
        if (request.input('postContent') != null) {
            await Post_1.default.create({ content: request.input('postContent'), author: user.username, name: user.name, likes: 0, comments: 0, commented_to: 0 });
        }
        response.redirect().toRoute('/posts');
    }
    async comment({ request, auth, response, params }) {
        await auth.authenticate();
        const user = auth.user;
        if (request.input('postContent') != null && params.id == null) {
            await Post_1.default.create({ content: request.input('postContent'), author: user.username, name: user.name, likes: 0, comments: 0, commented_to: 0 });
        }
        else if (request.input('postContent') != null && params.id != null) {
            await Post_1.default.create({ content: request.input('postContent'), author: user.username, name: user.name, likes: 0, comments: 0, commented_to: params.id });
            const post = await Post_1.default.find(params.id);
            if (!post) {
                return response.status(404).json({ message: 'Post not found' });
            }
            post.comments = (await Post_1.default.query().where('commented_to', params.id).count('* as total'))[0].$extras.total;
            await post.save();
        }
        response.redirect('back');
    }
    async delete({ params, auth, response }) {
        const user = auth.user;
        if (!user) {
            return response.redirect().toRoute('posts.index');
        }
        const postId = params.id;
        try {
            const post = await Post_1.default.findOrFail(postId);
            if (post.author !== user.username) {
                return response.redirect().toRoute('posts.index');
            }
            await post.delete();
            return response.redirect().toRoute('posts.index', { successMessage: 'Post deletado com sucesso.' });
        }
        catch (error) {
            console.error("Error deleting post with ID ${ postId }:", error);
            return response.redirect().toRoute('posts.index');
        }
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map