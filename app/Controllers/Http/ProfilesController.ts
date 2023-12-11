import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Like from 'App/Models/Like'
import Post from 'App/Models/Post'

export default class ProfilesController {

  public async user({ auth, view }: HttpContextContract) {
    // Obtém o usuário autenticado
    const user = auth.user
    if (!user) {
      return view.render('posts/index')
    }
    const posts = await Post.query().where('author', user.username).where('commented_to', 0).orderBy('created_at', 'desc')
    const likedPosts = await Post
      .query()
      .whereIn(
        'id',
        Like.query()
          .where('user_id', user.id)
          .select('post_id')
      )
      .select('*').orderBy('created_at', 'desc')

    if (!posts) {
      return view.render('posts/index')
    }

    return view.render('user/user', { user, posts, likedPosts })
  }

  public async index({ auth, view }: HttpContextContract) {
    // Obtém o usuário autenticado
    const user = auth.user
    //return view.render('sessions/profile')
    return view.render('profile/profile', { user })
  }
  public async updatePassword({ auth, request, response, view }: HttpContextContract) {
    try {
      await auth.use('web').authenticate();
      const user = auth.user;
      if (!user) {
        // Usuário não autenticado, redirecione ou lide com a situação de acordo
        return response.redirect().toRoute('profile/profile');
      }

      const newPassword = request.input('new-password');
      const newPasswordC = request.input('confirm-new-password');
      const password = request.input('current-password');

      if (!(await auth.use('web').attempt(user.email, password)) && newPassword === newPasswordC) {
        // A senha fornecida não coincide, exiba um erro
        const errorMessage2 = 'Invalid password.';
        return view.render('profile/profile', { errorMessage: errorMessage2 });
      }

      // Faça a atualização do nome de usuário
      user.password = newPassword;
      await user.save();

      // Redirecione para a página de perfil com uma mensagem de sucesso
      return response.redirect().toRoute('profile/profile', { successMessage: 'Password changed sucessfully' });
    } catch (error) {
      // Lidar com outros erros, talvez exibir uma mensagem de erro
      return response.redirect().back();
    }
  }
  public async updateUsername({ auth, request, response, view }: HttpContextContract) {
    try {
      await auth.use('web').authenticate();
      const user = auth.user;
      if (!user) {
        // Usuário não autenticado, redirecione ou lide com a situação de acordo
        return response.redirect().toRoute('sessions.index');
      }
      const usernames = await Database.from('users').select('username')
      const newUsername = request.input('new-username');
      const password = request.input('current-password-username');
      if (usernames.includes(newUsername)) {
        const errorMessage = 'Already exists a profile with that username.';
        return view.render('profile/profile', { errorMessage: errorMessage });
      }

      if (!(await auth.use('web').attempt(user.email, password))) {
        // A senha fornecida não coincide, exiba um erro
        const errorMessage = 'Invalid password.';
        return view.render('profile/profile', { errorMessage });
      }

      // Faça a atualização do nome de usuário
      user.username = newUsername;
      await user.save();

      // Redirecione para a página de perfil com uma mensagem de sucesso
      return response.redirect().toRoute('profile.index', { successMessage: 'Username changed sucessfully.' });
    } catch (error) {
      // Lidar com outros erros, talvez exibir uma mensagem de erro
      return response.redirect().back();
    }
  }
  /*
  public async update({ auth, request, response }: HttpContextContract) {
      const user = auth.user!
      const data = request.only(['name', 'password'])

      // Atualize as informações do usuário
      user.merge(data)
      await user.save()

      return response.redirect().toRoute('profile.index')
  }
  */
}
