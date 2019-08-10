import Vue from 'vue';
import Vuex from 'vuex';

// modules
import googleAuth from "./googleAuth";

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        user: {
            userName: '',
            userID: ''
        },
        todoList: {},
        isLoading: false,
        Valid:{
            inValid: false,
            message: '',
        },
        input:'',
        todoRef: firebase.database(),
    },
    actions:{
        // get todo
        getTodo(context) {
            context.commit('ISLOADING', true);
            context.state.todoRef.ref(`${context.state.user.userID}`).once("value").then(function(snapshot){
                var value = snapshot.val();   
                return value;
            }).then((item) =>{
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
                context.state.todoRef.ref(`${context.state.user.userID}`).child(`${timeStamp}`).set({
                    timeStamp,
                    work: sendData,
                    isComplete: false
                }).then(function(){
                    // 清空輸入欄位
                    context.commit('INPUT', '')
                    // 更新資料
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
            context.state.todoRef.ref(`${context.state.user.userID}`).child(`${status}`).remove();
            context.dispatch('getTodo');
        },
        // complete todo
        completeTodo(context, status) {
            // 將該筆資料更新為 complete
            context.state.todoRef.ref(`${context.state.user.userID}`).child(`${status}`).update({
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
        },
        USER(state, status) {
            state.user = status;
        }
    },
    getters:{
        isLoading: state => state.isLoading,
        todoList: state => state.todoList,
        Valid: state => state.Valid,
        user: state => state.user,
    },
    modules: {
        googleAuth,
    }
})