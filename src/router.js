import Vue from 'vue'
import Router from 'vue-router'

// view
import index from "@/views/index"
// import auth from "@/views/authorization"
import auth from "@/views/test"

// component
import todolist from "@/components/todoList"


Vue.use(Router)

export default new Router({
    routes:[
        {
            path: '*',
            redirect: '/auth'
        },
        {
            path: '/auth',
            name: 'auth',
            component: auth,
        },
        {
            path: '/index',
            name: 'index',
            component: index,
            meta: { requiresAuth: true },
            children:[
                {
                    path: '/todolist',
                    name: 'todolist',
                    component: todolist,
                }
            ]
        },
    ]
})