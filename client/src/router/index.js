import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import User from '../views/Users.vue'
import Edit from '../views/Edit.vue'
import axios from 'axios';

function AdminAuth(to, from, next){
    if (localStorage.getItem('token') != undefined) {

        const request = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        }
        axios.get("http://localhost:8686/validade", request).then(() => {
            next();
        }).catch(err => {
            console.log(err);
            next("/login");
        });

        next();
    }
    else {
        next("/login"); //realiza um redirecinamento
    }
}

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/admin/users',
        name: 'Users',
        component: User,
        beforeEnter: AdminAuth
    },
    {
        path: '/admin/users/edit/:id',
        name: 'UserEdit',
        component: Edit,
        beforeEnter: AdminAuth
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
