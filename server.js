const express = require('express');
const app = express();
app.use(express.json());

/* Lista de usuários */

const users = [];

/* Cadastrar um novo usuário */

app.post("/users", (req, res) => {
    const name = req.body.name;
    const username = req.body.username

    const user = {
        id: Math.floor(Math.random() * 1000),
        name,
        username,
        listaTarefas: []

    };
    users.push(user);
    res.status(201).json(user);
});

/* Lista todos os usuários */

app.get("/users", (req, res) => {
    res.status(200).json(users)
}

)

/* Lista o usuário pelo Id */

app.get("/user/:id", (req, res) => {
    const id = req.params.id
    const user = users.find(user => id == user.id)
    res.status(200).json(user)
})
/* Atualiza um usuário existente */

app.put("/users/:id", (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const username = req.body.username
    const user = users.find(user => id == user.id)
    user.name = name
    user.username = username
    res.status(200).json(user)
})
/* Deletar usuarios  */
app.delete("/user/:id", (req, res) => {
    const id = req.params.id
    const userIndex = users.findIndex(user => id == user.id)
    users.splice(userIndex)
    res.status(200).json("Usuário deletado")
})
/* Criando tarefas para um usuário */
app.post("/listas/:user_id", (req, res) => {
    const user_id = req.params.user_id
    const titulo = req.body.titulo
    const descricao = req.body.descricao

    const user = users.find(user => user_id == user.id)
    const tarefa = {
        id: Math.floor(Math.random() * 100),
        titulo,
        descricao,
        status: false
    }
    user.listaTarefas.push(tarefa)
    res.status(200).json(tarefa)
})
/* Listar a tarefa por Id */
app.get("/lista/:user_id", (req, res) => {
    const user_id = req.params.id
    const user = users.find(user => user_id == user_id)
    const listaTarefas = user.listaTarefas

    res.status(200).json(listaTarefas)
})
/* Atualizar a tarefa por Id */
app.put("/lista/:user_id", (req, res) => {
    const user_id = req.params.user_id
    const titulo_tarefa = req.query.titulo_tarefa
    const titulo = req.body.titulo
    const descricao = req.body.descricao
    const status = req.body.status
    const user = users.find(user => user_id == user_id)
    const tarefa = user.listaTarefas.find(tarefa => tarefa.titulo.includes(titulo_tarefa))
    tarefa.titulo = titulo
    tarefa.descricao = descricao
    tarefa.status = status
    res.status(200).json(tarefa)
})
/* Deletar lista */
app.delete("/lista/:user_id", (req, res) => {
    const user_id = req.params.user_id
    const tarefas_id = req.query.tarefas_id
    const user = users.find(user => user_id == user_id)
    const tarefa = user.listaTarefas.findIndex(tarefa => tarefa.id == tarefas_id)
    user.listaTarefas.splice(tarefa)
    res.status(200).json("Tarefa deletada com sucesso")
})
app.listen(3000);