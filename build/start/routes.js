"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async ({ view }) => {
    return view.render('hello');
});
Route_1.default.group(() => {
    Route_1.default.get('/', 'PostsController.index').as("index");
    Route_1.default.get('/:id', 'PostsController.show').as("show");
    Route_1.default.post('/', 'PostsController.create').as("create");
    Route_1.default.post('/:id', 'PostsController.comment').as("comment");
    Route_1.default.get('/delete/:id', 'PostsController.delete').as('delete');
    Route_1.default.post('/like/:id', 'PostsController.like').as("like");
})
    .prefix('/posts')
    .middleware('auth')
    .as('posts');
Route_1.default.get('/sessions', 'SessionsController.index').as("sessions.index");
Route_1.default.get('/logout', 'SessionsController.delete').as("sessions.delete");
Route_1.default.post('/sessions', 'SessionsController.store').as("sessions.store");
Route_1.default.get('/register', 'SessionsController.register');
Route_1.default.post('/register', 'SessionsController.create').as('sessions.create');
Route_1.default.get('/profile', 'ProfilesController.index').as('profile.index').middleware('auth');
Route_1.default.get('/user', 'ProfilesController.user').as('profile.user').middleware('auth');
Route_1.default.post('/profile/username', 'ProfilesController.updateUsername').as('profile.updateUsername').middleware('auth');
Route_1.default.post('/profile/password', 'ProfilesController.updatePassword').as('profile.updatePassword').middleware('auth');
//# sourceMappingURL=routes.js.map