import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Like from 'App/Models/Like';
import Post from 'App/Models/Post';

export default class PostsController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.authenticate()
    const posts = await Post.all()
    return view.render('posts/index', { posts: posts });
  }

  public async show({ view, params, auth }: HttpContextContract) {
    await auth.authenticate()
    const post = await Post.find(params.id)
    let owner = false
    if (auth.user!.username == post?.author){
      owner = true
    }
    return view.render('posts/show', { post: post, owner: owner});
  }

  public async like({ params, auth, response }: HttpContextContract) {
    await auth.authenticate();
    const post = await Post.find(params.id);
    const user = auth.user!;
    const likeExists = await Like.query()
      .where('post_id', params.id)
      .where('user_id', user.id)
      .count('* as total')

    if (!post) {
      return response.status(404).json({ message: 'Post not found' })
    }
    if(likeExists[0].$extras.total == 0){
      await Like.create({userId : user.id, postId: params.id})
      post.likes = (await Like.query().where('post_id', params.id).count('* as total'))[0].$extras.total
      await post.save()
    }
    else if (likeExists[0].$extras.total > 0){
      await Like.query()
      .where('post_id', params.id)
      .where('user_id', user.id)
      .delete()
      post.likes = (await Like.query().where('post_id', params.id).count('* as total'))[0].$extras.total
      await post.save()
    }
    return response.continue()
  }

  public async create({ request, auth, response }: HttpContextContract) {
    await auth.authenticate()
    const user = auth.user!
    if(request.input('postContent') != null){
      await Post.create({ content: request.input('postContent'), author: user.username, name: user.name, likes: 0, dislikes: 0 })
    }
    response.redirect().toRoute('/posts')
  }

  public async delete({ params, auth, response }: HttpContextContract) {
    const user = auth.user;

    if (!user) {
      return response.redirect().toRoute('posts.index');
    }

    const postId = params.id;

    try {
      const post = await Post.findOrFail(postId);
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
