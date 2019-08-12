<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="mt-4">
            <div class="todoTitle">
                <div class="row justify-content-between mb-3">
                    <div class="col-4"><p class="font-weight-bold mb-0">To do List</p></div>
                    <div class="col-6">
                        <div class="input-group justify-content-end mb-0">
                            <p class="mb-0 mr-1 font-weight-bold">{{ todoDate | dateTime}}</p>
                            <div class="input-group-append">
                            <v-date-picker
                                color="red"
                                locale="en"
                                class="Vcalendar"
                                v-model="todoDate"
                                :popover="{ placement: 'bottom', visibility: 'click' }">
                                    <button type="button" class="bg-white">
                                        <img src="~@/assets/image/edit.svg" width="20" height="20">
                                    </button>
                                </v-date-picker>
                            </div>
                        </div> 
                    </div>
                </div>       
            </div>
            <todo-input :cacheKey="cacheKey"></todo-input>
            <p class="text-danger mb-0" v-if="Valid.inValid">{{ Valid.message }}</p>
            <div class="card border-0 my-4">
                <div class="card-head p-3 bg-info">
                    <h5 class="card-title text-white font-md mb-0">To do</h5>
                </div>
                <div class="card-body bg-lightRed p-0">
                    <table class="table mt-2">
                        <tr v-for="(todo, key) in todoList" :key="key">
                            <td class="todo border-0" width="250">
                                <span class="font-weight-bold text-primary" :class="{'d-none': key == cacheKey}">{{ todo.work }}</span>
                                <input type="text" v-if="key == cacheKey" @keyup.enter='updateTodo(key)' v-model="editInput">
                            </td>
                            <td class="border-0">
                                <div>
                                    <button class="btn p-0 mr-3" type="button" @click="startTodo(key)">
                                        <i class="far fa-play-circle text-primary"></i>
                                    </button>
                                    <button class="btn p-0 mr-3" type="button" @click="removeTodo(key)">
                                        <i class="fas fa-trash-alt text-primary"></i>
                                    </button>
                                    <button class="btn p-0 mr-3" type="button" @click="editTodo(key)">
                                        <i class="fas fa-edit text-primary"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>   
            <div class="card border-0">
                <div class="card-head p-3 bg-info">
                    <h5 class="card-title text-white font-md mb-0">Done</h5>
                </div>
                <div class="card-body bg-lightRed p-0">
                    <table class="table mt-2">
                        <tr v-for="item in completeList">
                            <td class="todo font-weight-bold text-primary border-0" width="250">{{ item.work }}</td>
                            <td class="todo font-weight-bold text-primary border-0">25min</td>
                        </tr>
                    </table>
                </div>
            </div> 
        </div> 
    </div>
  
</template>


<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import todoInput from './todoInput.vue'

export default {
    data() {
        return {
            editInput:'',
            todoDate: new Date(),
            // editMode: false
        }
    },
    components: {
        todoInput
    },
    methods: {
        // get todo
        getTodo() {
            this.$store.dispatch("getTodo");
        },
        
        // edit control 
        editTodo(key) {
            this.$store.dispatch("editTodo", key); 
        },
        // update todo
        updateTodo(key) {
            const vm = this;
            const userInput = vm.editInput;
            vm.$store.dispatch('updateTodo', {key, userInput}).then( () => {
                vm.editInput = ''; 
            })    
        },
        // remove todo
        removeTodo(id) {
            this.$store.dispatch("removeTodo", id);
        },
        startTodo(id) {
            this.$store.dispatch("completeTodo", id);
        }
    },
    computed: {
        ...mapGetters(["isLoading", "todoList", "completeList", 'Valid', 'cacheKey'])
    },
    watch: {
        editInput(){
            var re = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g
            if(re.test(this.editInput)){
                this.$store.commit('VALID', { inValid:true, message:"格式不符"})
            }else{
                this.$store.commit('VALID', { inValid:false, message:""})
            }
        }
    },
    filters: {
        ISOtime(time) {
            time= time*1000;
            let date= new Date(time);
            date=date.toISOString().split("T")[0];
            return date;
        },
        dateTime(date) {
            var newDate = date.toDateString();
            var dateArray = newDate.split(' ');
            var str = dateArray[1] + ' ' + dateArray[3];
            return str;
        }
    },
}
</script>
