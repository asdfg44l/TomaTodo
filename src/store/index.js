import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// workList
var todoRef = firebase.database().ref("/worklist/");
export default new Vuex.Store({
    state:{
        todoList: {},
        isLoading: false,
        Valid:{
            inValid: false,
            message: '',
        },
        input:'',
    },
    actions:{
        // get todo
        getTodo(context) {
            context.commit('ISLOADING', true);
            todoRef.once("value").then(function(snapshot){
                var value = snapshot.val();   
                return value;
            }).then((item) =>{
                // vm.todoList = Object.assign({},item)
                context.commit('TODOLIST', item);
            }).then(() => context.commit('ISLOADING', false));
        },
        // push todo
        addTodo(context, status) {
            if(context.state.Valid.inValid){ return }
            let sendData = status;
            if(sendData != ''){
                // 新增 timeStamp
                var date = new Date();
                var timeStamp = date.getTime();
                todoRef.child(`${timeStamp}`).set({
                    timeStamp,
                    work: sendData,
                    isComplete: false
                }).then(function(){
                    context.commit('INPUT', '')
                    context.dispatch('getTodo')
                }).catch(function(error){
                    alert(error)
                })
            }else{
                context.commit('VALID', {inValid: true, message:"內容不得為空"})
            }
        },
        // remove todo
        removeTodo(context, status) {
            todoRef.child(`${status}`).remove();
            context.dispatch('getTodo');
        },
        // complete todo
        completeTodo(context, status) {
            // 將該筆資料更新為 complete
            todoRef.child(`${status}`).update({
                isComplete: true
            }).then(() => context.dispatch("getTodo"))
        }
    },
    mutations:{
        ISLOADING(state, status){
            state.isLoading = status;
        },
        TODOLIST(state, status){
            state.todoList = status;
        },
        INPUT(state, status){
            state.input = status;
        },
        VALID(state, {inValid, message}){
            state.Valid.inValid = inValid;
            state.Valid.message = message;
        }
    },
    getters:{
        isLoading: state => state.isLoading,
        todoList: state => state.todoList,
        Valid: state => state.Valid,
    }
})