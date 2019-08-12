<template>
  <div class="mt-4">
    <h3 class="text-center">MY FIRST TASK</h3>
    <div class="card waitingWrap mt-3">
      <div class="card-body">
        <ul class="waitingList pl-2">
          <li class="first mb-3"><i class="fas fa-play-circle"></i>{{ firstTask.work }}</li>
        <template v-for="list in otherTask">
          <li class="others mb-3">{{ list.work }}</li>
        </template>   
        </ul>
      </div>
    </div>
    <todo-input class="mt-4"></todo-input>
  </div>
</template>

<script>
import todoInput from './todoInput.vue'
export default {
    data() {
        return{
          firstTask: {},
          otherTask: {},
        }
    },
    components: {
      todoInput
    },
    methods: {
      startTodo(id) {
        
      }
    },
    computed: {
      todoList() {
        var todoList = this.$store.state.todoList;
        this.firstTask = Object.values(todoList)[0];
        this.otherTask = Object.values(todoList).slice(1);
        return todoList;
      }
    },
    created() {
      this.firstTask = Object.values(this.todoList)[0];
      this.otherTask = Object.values(this.todoList).slice(1);
    },
}
</script>