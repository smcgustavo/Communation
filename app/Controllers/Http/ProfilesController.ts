import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProfilesController {


    public async index({ auth, view }: HttpContextContract) {
        // Obtém o usuário autenticado
        const user = auth.user
        //return view.render('sessions/profile')
        return view.render('profile/profile', { user })
    }
    public async updatePassword({ auth, request, response }: HttpContextContract) {
        const user = auth.user!
        const newPassword = request.input('new-password')
        // Faça a validação e atualização da senha aqui
        
        return response.redirect().toRoute('profile.index')
    }
    public async updateUsername({ auth, request, response }: HttpContextContract) {
        const user = auth.user!
        const newUsername = request.input('new-username')
        // Faça a validação e atualização do nome de usuário aqui

        return response.redirect().toRoute('profile.index')
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
