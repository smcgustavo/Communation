import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class SessionsController {
  
  public async index({view}: HttpContextContract ){
    return view.render('sessions/create');
  }
  public async store({ auth, request, response, view }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');

    try {
        await auth.use('web').attempt(email, password);
        response.redirect().toRoute('posts.index');
    } catch {
        // Defina a mensagem de erro
        const errorMessage = 'Invalid User or Password.';

        // Passe a mensagem de erro para a view
        return view.render('sessions/create', { errorMessage });
    }
  }
  public async delete({auth, response} : HttpContextContract){
    await auth.use('web').logout()
    return response.redirect().toRoute('/')
  }
  public async register({view}: HttpContextContract ){
    return view.render('sessions/register');
  }
  public async create({request, response, view}: HttpContextContract ){
    const name = request.input('name');
    const username = request.input('username');
    const email = request.input('email');
    const emailC = request.input('emailC');
    const passwd = request.input('password');
    const passwdC = request.input('passwordC');
    
    if(email === emailC && passwd === passwdC){
      User.create({email: email, password: passwd, name: name, username:username})
      return response.redirect().toRoute('/');
    }
    else{
      return view.render('sessions/register', { errorMessage: "Email or Password doesn't match." });
    }

  }
}