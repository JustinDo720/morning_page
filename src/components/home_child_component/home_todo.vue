<template>
  <todo_list @todo-list="logTodo($event)"></todo_list>
</template>
<script>
import todo_list from '@/components/todo-list'

export default{
  name:'home_todo',
  components:{
    todo_list
  },
  data(){
    return{
      title: 'Home Todo'
    }
  },
  methods:{
    logTodo(event){
      console.log(event)
    }
  }
}
</script>