import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  public async index ({view, auth}: HttpContextContract ){
    await auth.authenticate()
    const posts = await Post.all()
    return view.render('posts/index', {posts : posts});
  }

  public async show ({view, params, auth} : HttpContextContract){
    await auth.authenticate()
    const post = await Post.find(params.id)
    return view.render('posts/show', {post : post});
  }

  public async create ({request, auth, response} : HttpContextContract){
    await auth.authenticate()
    const user = auth.user!
    await Post.create({content: request.input('postContent'), author: user.username, name: user.name, likes: 0, dislikes: 0})
    response.redirect().toRoute('/posts')
  }
}
