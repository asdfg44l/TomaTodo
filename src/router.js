import Vue from 'vue'
import Router from 'vue-router'

// view
import index from "@/views/index"

// component
import todolist from "@/components/todoList"

Vue.use(Router)

export default new Router({
    routes:[
        {
            path: '*',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'index',
            component: index,
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