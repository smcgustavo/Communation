/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('hello')
})

Route.group(() => {
  Route.get('/', 'PostsController.index').as("index")
  Route.get('/:id', 'PostsController.show').as("show")
  Route.post('/', 'PostsController.create').as("create")
  Route.post('/:id', 'PostsController.comment').as("comment")
  Route.get('/delete/:id', 'PostsController.delete').as('delete')
  Route.post('/like/:id', 'PostsController.like').as("like")
})
  .prefix('/posts')
  .middleware('auth')
  .as('posts')
  
  
Route.get('/sessions', 'SessionsController.index').as("sessions.index")
Route.get('/logout', 'SessionsController.delete').as("sessions.delete")
Route.post('/sessions', 'SessionsController.store').as("sessions.store")

Route.get('/register', 'SessionsController.register')
Route.post('/register', 'SessionsController.create').as('sessions.create')


Route.get('/profile', 'ProfilesController.index').as('profile.index').middleware('auth')
Route.get('/user', 'ProfilesController.user').as('profile.user').middleware('auth')
//Route.post('/profile', 'ProfilesController.update').as('profile.update').middleware('auth')
Route.post('/profile/username', 'ProfilesController.updateUsername').as('profile.updateUsername').middleware('auth')
Route.post('/profile/password', 'ProfilesController.updatePassword').as('profile.updatePassword').middleware('auth')