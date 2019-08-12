import Vue from 'vue';
import Vuex from 'vuex';

// modules
import googleAuth from "./googleAuth";
// import starter from ""

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        user: {
            userName: '',
            userID: ''
        },
        todoList: {},
        completeList: {},
        isLoading: false,
        Valid:{
            inValid: false,
            message: '',
        },
        cacheKey: '',
        todoRef: firebase.database(),
    },
    actions:{
        // get todo
        getTodo({ state,commit }) {
            commit('ISLOADING', true);
            state.todoRef.ref(`${state.user.userID}`).once("value").then(function(snapshot){
                var value = snapshot.val();   

                // 存取 complete List
                commit('COMPLETELIST', value['complete List']);
                // 去除 complete List
                delete value['complete List'];
                // 存取 todo List
                commit('TODOLIST', value);
            }).then(() => commit('ISLOADING', false));
        },
        // push todo
        addTodo({state, commit, dispatch}, status) {
            if(state.Valid.inValid){ return }
            let sendData = status;
            if(sendData != ''){
                // 新增 timeStamp
                var date = new Date();
                var timeStamp = date.getTime();
                state.todoRef.ref(`${state.user.userID}`).child(`${timeStamp}`).set({
                    timeStamp,
                    work: sendData,
                    isComplete: false
                }).then(function(){
                    // 更新資料
                    dispatch('getTodo')
                }).catch(function(error){
                    alert(error)
                })
            }else{
                context.commit('VALID', {inValid: true, message:"內容不得為空"})
            }
        },
        // edit control 
        // 確保選定到目標 todo，切換功能
        editTodo({ state, commit } ,status) {
            // 重複按鈕可以取消編輯模式
            if(state.cacheKey == status){
                commit('CACHEKEY', '');
            }else{
                commit('CACHEKEY', status) 
            }   
        },
        // update todo
        updateTodo({ state, commit ,dispatch}, {key, userInput}) {
            commit('CACHEKEY', '');
            if(state.Valid.inValid){
                return;
            }
            state.todoRef.ref(`${state.user.userID}`).child(key).update({
                work: userInput,
            }).then(() => dispatch("getTodo"))  
        },
        // remove todo
        removeTodo({ state, dispatch}, status) {
            state.todoRef.ref(`${state.user.userID}`).child(`${status}`).remove();
            dispatch('getTodo');
        },
        // start todo
        startTodo(context, status) {
            // status 是準備執行的 todo
            // 將 status 放置於待執行位置
            // 開始執行當前 todo
            // 向使用者詢問任務是否已完成
               // 完成則使用 completeTodo
               // 則繼續留在待執行位置，並記錄一顆番茄
            // 開始休息
        },
        // complete todo
        completeTodo({state, dispatch}, status) {
            const workList = state.todoRef.ref(`${state.user.userID}`);
            // 將該筆資料更新為 complete (總覺得沒必要，不過先留著)
            workList.child(`${status}`).update({
                isComplete: true
            }).then(() => dispatch("getTodo"));

            // 把該筆資料塞進 complete List 中
            workList.child(`${status}`).once('value').then((sanpshot) => {
                let value = sanpshot.val();
                workList.child("complete List").push(value);
            }).then( () => {
                // 將該筆資料從 userwork List 中刪除
                dispatch("removeTodo", status);
            })    
        }
    },
    mutations:{
        ISLOADING(state, status){
            state.isLoading = status;
        },
        TODOLIST(state, status){
            state.todoList = status;
        },
        COMPLETELIST(state, status){
            state.completeList = status;
        },
        VALID(state, {inValid, message}){
            state.Valid.inValid = inValid;
            state.Valid.message = message;
        },
        USER(state, status) {
            state.user = status;
        },
        CACHEKEY(state, status) {
            state.cacheKey = status;
        }
    },
    getters:{
        isLoading: state => state.isLoading,
        todoList: state => state.todoList,
        completeList: state => state.completeList,
        Valid: state => state.Valid,
        user: state => state.user,
        cacheKey: state => state.cacheKey,
    },
    modules: {
        googleAuth,
    }
})