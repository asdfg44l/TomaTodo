<template>
  <div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-10">
                <p class="currentTime mb-0">2019/8/2. Am 12:25</p>
                <p class="completeCount mb-0 text-center">1/5 completed</p>
            </div>
        </div>   
        <div class="row mt-2">
            <div class="col-6">
                <div class="tomato">
                </div>
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
                        <router-view></router-view>
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

import $ from "jquery";
export default {
    data() {
        return{

        }
    },
    mounted() {
        const vm = this;
        $('.openBox').on("click", function(){
            $('.sideBox').toggleClass('active');
            const path = "/" + $(this)[0].dataset.set;
            vm.$router.push(path);
        });
        $('.closeBox').on('click', function(){
            $('.sideBox').removeClass('active');
        })
    },
    components: {
        timer,
        taskList
    }
}
</script>
<style lang="scss" scope>
    body {
        overflow:hidden;
        height: 100vh;
    }
</style>