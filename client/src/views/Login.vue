<template>
    <div style="margin-top: 3%">
        <h1 class="is-size-3">Login</h1>

        <div class="columns is-mobile is-centered">
        <div class="column is-half">
        <hr/>
            <div v-if="erro != undefined" style="margin-bottom: 2%">
                <div class="notification is-danger">
                    {{ this.erro }}
                </div>
            </div>
            <p>Email</p>
            <input class="input" type="email" v-model="email" id="email" placeholder="Email de acesso do Usuário">
            <p>Senha</p>
            <input class="input" type="password" v-model="password" id="password" placeholder="******">
            <hr/>
            <button class="button is-fullwidth is-primary is-outlined" @click="login">Logar</button>
        </div>
        </div>

    </div>
</template>

<script>
import  axios from 'axios';

export default {
    data(){
        return {
            password: '',
            email: '',
            erro: undefined
        }
    },
    methods: {
        login(){
            const corpo = {
                email: this.email,
                password: this.password
            };
            axios.post("http://localhost:8686/login", corpo).then( (res) => {
                console.log(res);                
                localStorage.setItem('token', res.data.token);
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