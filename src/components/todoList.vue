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
            <div class="todoGroup input-group">
                <input type="text" class="todoInput box-size-cancel form-control roboMono bg-secondary border-0" :disabled="Boolean(cacheKey)" v-model="input" @keyup.enter="addTodo" placeholder="Add new tasks">
                <div class="input-group-append">
                    <button class="todoInputBtn btn btn-secondary" @click="addTodo">
                        <i class="fas fa-plus text-deepRed"></i>
                    </button>
                </div>
            </div>
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
                                <input type="text" v-if="key == cacheKey" @keyup.enter='updateTodo(key)' v-model="input">
                            </td>
                            <td class="border-0">
                                <div>
                                    <button class="btn p-0 mr-3" type="button">
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
                        <tr>
                            <td class="todo font-weight-bold text-primary border-0" width="160">mission</td>
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
var todoRef = firebase.database().ref("/worklist/");
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            input:'',
            todoDate: new Date(),
            cacheKey: '',
            // editMode: false
        }
    },
    methods: {
        // get todo
        getTodo() {
            this.$store.dispatch("getTodo");
        },
        // push todo
        addTodo() {
            this.$store.dispatch('addTodo', this.input);
            this.input = '';
        },
        // edit todo
        editTodo(key) {
            if(this.cacheKey == key){
                this.cacheKey = '';
            }else{
                this.cacheKey = key; 
            }   
        },
        // update todo
        updateTodo(key) {
            this.cacheKey = '';
            if(this.$store.state.Valid.inValid){
                return;
            }
            todoRef.child(key).update({
                work: this.input,
            }).then(() => this.$store.dispatch("getTodo"))  
            this.input = ''; 
        },
        // remove todo
        removeTodo(id) {
            this.$store.dispatch("removeTodo", id);
        }
    },
    computed: {
        ...mapGetters(["isLoading", "todoList", 'Valid'])
    },
    watch: {
        input(){
            var re = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g
            if(re.test(this.input)){
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
    created() {
        this.getTodo();
    },
}
</script>
