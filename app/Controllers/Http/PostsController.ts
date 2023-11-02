import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const posts = [
  {
    'id' : 0,
    'Content' : 'Seja bem vindo ao communation',
    'Autor' : 'Gustavo'
  },
  {
    'id' : 1,
    'Content' : 'Rafael não entrou no chat',
    'Autor' : 'Rafael'
  },
  {
    'id' : 2,
    'Content' : 'Alguém kicka o rafael',
    'Autor' : 'Desconhecido'
  },
  {
    'id' : 3,
    'Content' : 'Alguém kicka o desconhecido',
    'Autor' : 'Guilherme'
  },
  {
    'id' : 4,
    'Content' : 'To no processo já aqui',
    'Autor' : 'Gustavo'
  },
  {
    'id' : 5,
    'Content' : 'Ele é muito poderoso, está resistindo ao meu poder de admin aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    'Autor' : 'Gustavo'
  },
  {
    'id' : 6,
    'Content' : 'Seja bem vindo ao communation',
    'Autor' : 'Gustavo'
  }
];

export default class PostsController {
  public async index ({view}: HttpContextContract ){
    return view.render('posts/index', {posts : posts});
  }

  public async show ({view, params} : HttpContextContract){
    const post = posts[params.id];
    return view.render('posts/show', {post : post});
  }
}
