import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import user from 'App/Models/User'

export default class ProfilesController {


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
                const errorMessage = 'Senha atual inválida.';
                return view.render('profile/profile', { errorMessage });
            }

            // Faça a atualização do nome de usuário
            user.password = newPassword;
            await user.save();

            // Redirecione para a página de perfil com uma mensagem de sucesso
            return response.redirect().toRoute('profile/profile', { successMessage: 'Senha alterada com sucesso.' });
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

            const newUsername = request.input('new-username');
            const password = request.input('current-password-username');

            if (!(await auth.use('web').attempt(user.email, password))) {
                // A senha fornecida não coincide, exiba um erro
                const errorMessage = 'Senha atual inválida.';
                return view.render('profile/profile', { errorMessage });
            }

            // Faça a atualização do nome de usuário
            user.username = newUsername;
            await user.save();

            // Redirecione para a página de perfil com uma mensagem de sucesso
            return response.redirect().toRoute('profile.index', { successMessage: 'Nome de usuário alterado com sucesso.' });
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
