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
}
