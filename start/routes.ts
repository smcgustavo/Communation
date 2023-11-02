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
})
  .prefix('/posts')
  .middleware('auth')
  .as('posts')

Route.get('/sessions', 'SessionsController.index').as("sessions.index")
Route.get('/logout', 'SessionsController.delete').as("sessions.delete")
Route.post('/sessions', 'SessionsController.store').as("sessions.store")

Route.get('/register', 'SessionsController.register')