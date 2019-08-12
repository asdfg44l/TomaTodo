<template>
    <div class="todoGroup input-group">
        <input type="text" class="todoInput box-size-cancel form-control roboMono bg-secondary border-0" :disabled="Boolean(cacheKey)" v-model="input" @keyup.enter="addTodo" placeholder="Add new tasks">
        <div class="input-group-append">
            <button class="todoInputBtn btn btn-secondary" @click="addTodo">
                <i class="fas fa-plus text-deepRed"></i>
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: ["cacheKey"],
    data() {
        return {
            input: ''
        }
    },
    methods: {
        // push todo
        addTodo() {
            this.$store.dispatch('addTodo', this.input);
            this.input = '';
        },
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
}
</script>