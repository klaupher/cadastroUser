<template>
    <div style="margin-top: 3%">
        <h1 class="is-size-3">Edição de Usuário</h1>

        <div class="columns is-mobile is-centered">
        <div class="column is-half">
        <hr/>
            <div v-if="erro != undefined" style="margin-bottom: 2%">
                <div class="notification is-danger">
                    {{ this.erro }}
                </div>
            </div>
            <input type="hidden" v-model="id">
            <p>Nome</p>
            <input class="input" type="text" v-model="name" id="name" placeholder="Nome do Usuário">
            <p>Email</p>
            <input class="input" type="email" v-model="email" id="email" placeholder="Email de acesso do Usuário">
            <hr/>
            <button class="button is-primary is-outlined" @click="update">Atualizar</button>
            <router-link :to="{name: 'Users'}">
                <button class="button is-primary">Cancelar</button> 
            </router-link>
        </div>
        </div>

    </div>
</template>

<script>
import  axios from 'axios';

export default {
    data(){
        return {
            id: -1,
            name: '',
            email: '',
            erro: undefined,
            request: {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            },
        }
    },
    created(){
        axios.get("http://localhost:8686/user/" + this.$route.params.id, this.request).then((res) => {
            console.log(res);
            this.id = res.data.id;
            this.name = res.data.name;
            this.email = res.data.email;
        }).catch(() => {
            this.$router.push({name: 'Users'});
        }) 
    },
    methods: {
        update(){
            const corpo = {
                email: this.email,
                name: this.name,
                id: this.id,
            };
            console.log(this.email);
            axios.put("http://localhost:8686/user", corpo, this.request).then( () => {
                this.$router.push({name: 'Users'});
            }).catch( err => {
                const msgError = err.response.data;
                this.erro = msgError.err;
            }) 
        }
    }
}
</script>

<style>

</style>