import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  
  public async index({view}: HttpContextContract ){
    return view.render('sessions/create');
  }
  public async store({auth, request, response, view}: HttpContextContract ){
    const email = request.input('email')
    const password = request.input('password')

    console.log(email)
    console.log(password)

    try{
      await auth.use('web').attempt(email,password)
      response.redirect().toRoute('posts.index')
    } 
    catch {
      return view.render('sessions/createError')
    }
  }
  public async delete({auth, response} : HttpContextContract){
    await auth.use('web').logout()
    return response.redirect().toRoute('/')
  }
  public async register({view}: HttpContextContract ){
    return view.render('sessions/register');
  }
}