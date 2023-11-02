import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  
  public async index({view, auth, response}: HttpContextContract ){
    await auth.use('web').authenticate()
    if(auth.use('web').isLoggedIn || auth.use('web').isAuthenticated){
      response.redirect().toRoute('posts.index')
    }
    else{
      return view.render('sessions/create');
    }
  }
  public async store({auth, request, response}: HttpContextContract ){
    const email = request.input('email')
    const password = request.input('password')

    console.log(email)
    console.log(password)

    try{
      await auth.use('web').attempt(email,password)
      response.redirect().toRoute('posts.index')
    } 
    catch {
      return response.badRequest('Invalid')
    }
  }
}