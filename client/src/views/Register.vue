<template>
    <div style="margin-top: 3%">
        <h1 class="is-size-3">Registro de Usuário</h1>

        <div class="columns is-mobile is-centered">
        <div class="column is-half">
        <hr/>
            <div v-if="erro != undefined" style="margin-bottom: 2%">
                <div class="notification is-danger">
                    {{ this.erro }}
                </div>
            </div>
            <p>Nome</p>
            <input class="input" type="text" v-model="name" id="name" placeholder="Nome do Usuário">
            <p>Email</p>
            <input class="input" type="email" v-model="email" id="email" placeholder="Email de acesso do Usuário">
            <p>Senha</p>
            <input class="input" type="password" v-model="password" id="password" placeholder="******">
            <hr/>
            <button class="button is-fullwidth is-primary is-outlined" @click="register">Registrar</button>
        </div>
        </div>

    </div>
</template>

<script>
import  axios from 'axios';

export default {
    data(){
        return {
            name: '',
            password: '',
            email: '',
            erro: undefined
        }
    },
    methods: {
        register(){
            const corpo = {
                email: this.email,
                name: this.name,
                password: this.password
            };
            axios.post("http://localhost:8686/user", corpo).then( () => {
                this.$router.push({name: 'Home'});
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