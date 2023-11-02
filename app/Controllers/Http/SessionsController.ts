import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
    public async index ({view}: HttpContextContract ){
        return view.render('sessions/create');
      }
}
