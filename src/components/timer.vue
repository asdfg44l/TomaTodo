<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-10">
                    <div class="timer display-3 roboMono text-center wordSpacing">
                        {{ currentTime | timer }}
                    </div>
                    <div v-if="!statusSwitch" class="timerControll d-flex justify-content-center align-items-center mt-5">
                        <div class="w-50">
                            <button class="btn btn-block btn-tomaRed roboMono rounded-pill" @click="countDown" v-if="!running"><span class="wordSpacing text-center">start</span></button>
                            <button class="btn btn-block btn-tomaRed roboMono rounded-pill" @click="pause" v-else><span class="wordSpacing text-center">pause</span></button>
                        </div>
                        <div class="refresh">
                            <button class="btn" type="button" @click="timerReset">
                                <i class="fas fa-redo fa-2x text-tomaRed"></i>
                            </button>
                        </div>
                    </div>
                    <div v-else class="todoStatus container mt-5">
                        <div class="row">
                            <div class="col-6">
                                <button class="btn btn-block btn-tomaRed roboMono" type="button" @click="todoContinue">continue</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-block btn-tomaRed roboMono" type="button" @click="todoFinish">finish</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            workTime: 10,
            restTime: 5,    
            currentTime: 10,
            running: false,
            statusSwitch: false
        }
    },
    methods: {
        // 時間倒數
        countDown() {
            const vm = this;
            vm.running = setInterval(count, 1000)
            function count() {
                vm.currentTime -= 1;
                if(vm.currentTime === 0) {
                    clearInterval(vm.running)
                    vm.running = false;

                    // statusSwitch 代表 "現在" 正在執行的時間狀態
                    // false 代表工作狀態， true 代表休息狀態
                    // 當 statusSwitch 為 true 時，重設為工作時間
                    // 反之重設為休息時間
                    vm.timerReset(vm.statusSwitch);
                    vm.statusSwitch = !vm.statusSwitch;
                }
            }
        },
        // 暫停計時
        pause() {
            const vm = this;
            clearInterval(vm.running)
            vm.running = false;
        },
        // 重設計時器
        timerReset(status) {
            if(status) {
                this.currentTime = this.workTime;
            }else {
                this.currentTime = this.restTime;
            }    
        },
        // todo finish
        todoFinish() {
            // add one tomato to current todo
            // remove current todo
            this.countDown();
        },
        // todo continue
        todoContinue() {
            // add one tomato to current todo
            this.countDown();
        }
    },
    filters: {
        timer(second) {
            let min = Math.floor(second / 60);
            let sec = second % 60;
            //修正格式
            if(min < 10) {
                min = "0" + min;
            }
            if(sec < 10) {
                sec = "0" + sec;
            }
            let str = min + ":" + sec;
            return str
        }
    }
}
</script>