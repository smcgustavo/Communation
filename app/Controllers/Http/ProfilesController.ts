import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfilesController {


    public async index({ auth, view }: HttpContextContract) {
        // Obtém o usuário autenticado
        const user = auth.user
        //return view.render('sessions/profile')
        return view.render('profile/profile', { user })    
    }

    public async update({ auth, request, response }: HttpContextContract) {
        const user = auth.user!
        const data = request.only(['name', 'password'])

        // Atualize as informações do usuário
        user.merge(data)
        await user.save()

        return response.redirect().toRoute('profile.index')
    }

}
