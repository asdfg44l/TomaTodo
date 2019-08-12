<template>
  <div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-10">
                <p class="currentTime mb-0">{{ now | formatTime}}</p>
                <p class="completeCount mb-0 text-center">{{ lenthData.completedLength }}/{{ lenthData.totalLength }} completed</p>
            </div>
        </div>   
        <div class="row mt-2">
            <div class="col-6">
                <tomato-clock></tomato-clock>
                <timer></timer>
            </div>
            <div class="col-4 pt-5 ml-5">
                <task-list></task-list>
            </div>
        </div>
    </div>  
    <div class="sideBox d-flex bg-white">
        <div class="controlBox bg-tomaRed">
            <div class="list-group mt-5" id="list-tab" role="tablist">
                <button class="functionBtn closeBox btn btn-block mt-4 rounded-0" type="button" data-toggle="list" role="tab">
                    <i class="far fa-clock fa-3x"></i>
                </button>
                <button class="functionBtn openBox btn btn-block mt-4 rounded-0" type="button" data-toggle="list" role="tab" data-set="todolist">
                    <i class="far fa-list-alt fa-3x"></i>
                </button>
                <button class="functionBtn openBox btn btn-block mt-4 rounded-0" type="button" data-toggle="list" role="tab">
                    <i class="far fa-chart-bar fa-3x"></i>
                </button>
            </div>     
        </div>
        
        <div class="sideTable">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-10">
                        <todo-list></todo-list>    
                    </div>
                </div>   
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import timer from '../components/timer'
import taskList from '../components/taskList'
import todoList from '../components/todoList'
import tomatoClock from '../components/tomatoClock'

import $ from "jquery";
export default {
    data() {
        return{
            now: new Date(),
        }
    },
    mounted() {
        $('.openBox').on("click", function(){
            $('.sideBox').toggleClass('active');
            // dynamic components
        });
        $('.closeBox').on('click', function(){
            $('.sideBox').removeClass('active');
        });
    },
    components: {
        timer,
        taskList,
        todoList,
        tomatoClock
    },
    computed: {
        lenthData() {
            var todoLength = Object.keys(this.$store.getters.todoList).length
            var completedLength = Object.keys(this.$store.getters.completeList).length
            var totalLength = todoLength + completedLength;
            return { completedLength, totalLength };
        },
    },
    filters: {
        formatTime(time) {
            var date = time.toLocaleDateString();
            var hour = time.getHours();
            var minutes = time.getMinutes();
            var tag;
            if( hour < 12) {
                tag = 'Am'
            }else {
                tag = 'Pm'
            }
            return `${date} ${tag} ${hour}:${minutes}`
        }
    },
    created() {
        var data = JSON.parse(localStorage.getItem('user'));
        this.$store.commit('USER', data);
        this.$store.dispatch("getTodo");
    },
}
</script>
<style lang="scss" scope>
    body {
        overflow:hidden;
        height: 100vh;
    }
</style>