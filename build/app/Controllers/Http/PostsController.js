"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const posts = [
    {
        'Title': 'Hello',
        'Content': 'Seja bem vindo ao communation',
        'Autor': 'Gustavo'
    },
    {
        'Title': 'aaaa',
        'Content': 'Rafael entrou no  chat',
        'Autor': 'Rafael'
    },
    {
        'Title': 'aaa',
        'Content': 'Alguém kicka o rafael',
        'Autor': 'Desconhecido'
    },
    {
        'Title': 'aaa',
        'Content': 'Alguém kicka o desconhecido',
        'Autor': 'Guilherme'
    },
    {
        'Title': 'aaa',
        'Content': 'To no processo já aqui',
        'Autor': 'Gustavo'
    },
    {
        'Title': 'aaa',
        'Content': 'Ele é muito poderoso, está resistindo ao meu poder de admin aaaaaaa',
        'Autor': 'Gustavo'
    }
];
class PostsController {
    async index({ view }) {
        return view.render('posts/index', { posts: posts });
    }
    async show({ view, params }) {
        const post = posts[params.id];
        return view.render('posts/show', { post: post });
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map