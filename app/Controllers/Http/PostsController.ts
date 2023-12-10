import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.authenticate()
    const posts = await Post.all()
    return view.render('posts/index', { posts: posts });
  }

  public async show({ view, params, auth }: HttpContextContract) {
    await auth.authenticate()
    const post = await Post.find(params.id)
    return view.render('posts/show', { post: post });
  }

  public async like({ params, auth, response }: HttpContextContract) {
    await auth.authenticate()
    const post = await Post.find(params.id)

    if (!post) {
      return response.status(404).json({ message: 'Post not found' })
    }
    post.likes += 1;
    await post.save()
  }

  public async create({ request, auth, response }: HttpContextContract) {
    await auth.authenticate()
    const user = auth.user!
    await Post.create({ content: request.input('postContent'), author: user.username, name: user.name, likes: 0, dislikes: 0 })
    response.redirect().toRoute('/posts')
  }

  public async delete({ params, auth, response }: HttpContextContract) {
    const user = auth.user;

    if (!user) {
      // Usuário não autenticado, redirecione ou lide com a situação de acordo
      return response.redirect().toRoute('posts.index');
    }

    const postId = params.id;

    try {
      // Tente encontrar o post pelo ID
      const post = await Post.findOrFail(postId);

      if (post.author !== user.username) {
        // O post não pertence ao usuário, redirecione ou lide com a situação de acordo
        return response.redirect().toRoute('posts.index');
      }

      // O post pertence ao usuário, exclua-o
      await post.delete();

      // Redirecione para a página de perfil com uma mensagem de sucesso
      return response.redirect().toRoute('posts.index', { successMessage: 'Post deletado com sucesso.' });
    } catch (error) {
      console.error("Error deleting post with ID ${ postId }:", error);

      // Redirecione para uma página de erro ou faça algo apropriado
      return response.redirect().toRoute('posts.index');
    }
  }
}
