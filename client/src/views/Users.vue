<template>
    <div style="margin-top: 3%">
        <h1 class="is-size-3">Gerenciamento de Usuários</h1>
        <div class="table-container">
            <table class="table is-striped is-fullwidth">
                <thead>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>EMAIL</th>
                    <th>CARGO</th>
                    <th>AÇÕES</th>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role | processRole }}</td>
                        <td>
                            <router-link :to="{name: 'UserEdit', params:{id: user.id}}">
                                <button class="button is-primary">Editar</button> 
                            </router-link>
                            |
                            <button
                                class="button is-danger"
                                @click="showModalUser(user.id)"
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div :class="{ modal: true, 'is-active': showModal }">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">Exclusão de Usuário</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Você quer mesmo excluir esse usuário?
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a
                            href="#"
                            class="card-footer-item"
                            @click="hideModal()"
                            >Ops, me enganei!</a
                        >
                        <a
                            href="#"
                            class="card-footer-item"
                            @click="excluirUser()"
                            >Sim, quero excluir!</a
                        >
                    </footer>
                </div>
            </div>
            <button
                class="modal-close is-large"
                aria-label="close"
                @click="hideModal()"
            ></button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    created() {
        axios
            .get("http://localhost:8686/user", this.request)
            .then((res) => {
                this.users = res.data;
            })
            .catch((err) => console.log(err));
    },
    data() {
        return {
            users: [],
            showModal: false,
            userAtualId: -1,
            request: {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            },
        };
    },
    filters: {
        processRole: (value) => {
            if (value == 0) return "Usuário Comum";
            else if (value == 1) return "Administrador";
            else return value;
        },
    },
    methods: {
        hideModal() {
            this.showModal = false;
        },
        showModalUser(id) {
            this.userAtualId = id;
            this.showModal = true;
        },
        editarUser() {
            alert("Editar");
        },
        excluirUser() {
            axios
                .delete(
                    "http://localhost:8686/user/" + this.userAtualId,
                    this.request
                )
                .then(() => {
                    this.users = this.users.filter(
                        (u) => u.id != this.userAtualId
                    );
                    this.userAtualId = -1;
                    this.showModal = false;
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<style scoped></style>
