<template>
  <div id="todo-container">
    <div id="todo-title">
      <h1>
        {{title}}
      </h1>
    </div>
    <div class="todo-list display-todo" v-if="!view_completed_mode">
      <h2 class="display-todo-empty" v-if="todo_list.length === 0">
        You Currently do not have any tasks
      </h2>
      <!-- Setting task_done and using the var right on v-for actually works -->
      <div id="individual-task"
           v-for="(task, todo_id) in todo_list"
           :class="{'task_done':task.completed, 'task_neutral': task.neutral,'task_removed': task.removed}"
           :key="todo_id">
        <div>
          <ul>
            <li>
              <h2>
                {{ task.todo_item }}
                <button class='deleted'
                        @click="updateStatus(todo_id,'deleted','normal_mode')">
                  &cross;
                </button>
                <button class='completed'
                        @click="updateStatus(todo_id,'completed', 'normal_mode')">
                  &checkmark;
                </button>&nbsp;
              </h2>
              <span>
                {{task.task_date}}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="view-completed-todo" class="todo-list display-todo" v-else>
      <h2 class="display-todo-empty" v-if="todo_completed.length === 0">
        You currently have no completed tasks
      </h2>
      <div id="individual-completed-task" class="task_done" v-for="(task, task_id) in todo_completed" :key="task_id">
        <div>
          <ul>
            <li>
              <h2>
                {{ task.todo_item }}
                <button class='deleted'
                        @click="updateStatus(task_id,'deleted', 'completed_mode')">
                  &cross;
                </button>
                <button class="neutral"
                        @click="updateStatus(task_id,'undo', 'completed_mode')">
                  &#8635;
                </button>
              </h2>
              <span>
                {{task.task_date}}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="todo-list enter-todo">
      <h2 id="enter-todo-title">Add a To-Do item to your list!</h2>
      <input class='todo_input' placeholder="Add an item to your list" v-model="todo" @keyup.enter="add_todo"><br>
      <button v-if="!view_completed_mode" @click="view_completed_mode = !view_completed_mode">View completed</button>
      <button v-else @click="completedView">View To-Do List</button>
    </div>

  </div>
</template>
<script>
import axios from 'axios'

export default{
  name: 'todo',
  data(){
    return{
      title: 'To-Do-List',
      todo: '',
      todo_list: [],
      todo_completed: [],
      task_completed: false,
      task_removed: false,
      task_neutral: true,
      view_completed_mode: false,
      months : [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ],
      days_of_the_week : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      firebase_db_url: 'https://morningpage-aa0e4.firebaseio.com/post.json'
    }
  },
  methods:{
    add_todo: function(){
      //* Makes sure that the user input wasn't on accident
      if(this.todo !== ''){
        let task_date = new Date()
        let show_date = `
        ${this.days_of_the_week[task_date.getDay()]},
        ${task_date.getDate()}
        ${this.months[task_date.getMonth()]}
        ${task_date.getFullYear()}.
        ` // e.g Monday, 2 November 2020
        let show_time =`${task_date.getHours()}:${task_date.getMinutes()}`

        let todo_info = {
          'todo_item':this.todo,
          'completed': this.task_completed,
          'removed': this.task_removed,
          'neutral': this.task_neutral,
          'task_date': `${show_date} ${show_time}`,

        }
        this.todo_list.unshift(todo_info) // Unshift basically pushes the obj in front instead of behind
        axios.post(this.firebase_db_url, todo_info).then(obj =>{
          console.log('Success')
          console.log(obj.data.name)
        })
      }
      // Resets the input filed to become blank
      this.todo = ''
    },
    updateStatus: function(task_id, task_status, mode){
      let task_at_hand = this.todo_list[task_id]
      let task_completed = this.todo_completed[task_id]
      console.log(task_at_hand, task_completed)
      // This is the normal url for the firebase
      //const USER_FIREBASE_URL = `https://morningpage-aa0e4.firebaseio.com/post/${task_at_hand.todo_id}.json`

      if(task_status === 'completed'){
        //* So the idea is that we set the status to true then push this item to the completed task array
        const USER_FIREBASE_URL = `https://morningpage-aa0e4.firebaseio.com/post/${task_at_hand.todo_id}.json`
        task_at_hand.completed = true
        task_at_hand.neutral = false
        task_at_hand.removed = false
        this.todo_completed.unshift(task_at_hand)
        // Updates the completed, neutral, removed values in the modified todo item
        axios.put(USER_FIREBASE_URL, task_at_hand).then(data=>{
          console.log(data.data)
        })
        // Splice is used to delete some things in an array using the index,amount as parameter
        this.todo_list.splice(task_id,1)
      }else if(task_status === 'undo'){
        //* The undo button is only for the completed view so we use todo_completed list instead
        // const USER_FIREBASE_URL = `https://morningpage-aa0e4.firebaseio.com/post/${task_at_hand.todo_id}.json`
        task_completed.completed = false
        task_completed.neutral = true // resetting the status of the task
        task_completed.removed = false
        //! Note: If you unshift something keep them unshift or else the index will be messed up
        this.todo_list.unshift(task_completed) // So if this is undo we are going to push back the item
        this.todo_completed.splice(task_id, 1)
      }else{ // At this point the user just wants to remove the task
        // The idea behind this is that we use mode to see which array we need to edit
        if(mode === 'normal_mode'){
          const USER_FIREBASE_URL = `https://morningpage-aa0e4.firebaseio.com/post/${task_at_hand.todo_id}.json`
          task_at_hand.completed = false
          task_at_hand.neutral = false
          task_at_hand.removed = true
          this.todo_list.splice(task_id,1)
          axios.delete(USER_FIREBASE_URL)

        }else{ // We are in completed_mode
          const USER_FIREBASE_URL = `https://morningpage-aa0e4.firebaseio.com/post/${task_completed.todo_id}.json`
          task_completed.completed = false
          task_completed.neutral = false
          task_completed.removed = true
          this.todo_completed.splice(task_id,1)
          axios.delete(USER_FIREBASE_URL)
        }
      }
    },
    completedView() {
      // Refresh the page with new data which will add back on the new id
      let todo_completed_list = []
      axios.get(this.firebase_db_url).then(obj => {
        for (let firebase_id in obj.data) {
          // We only want completed items
          if (obj.data[firebase_id].completed) {
            obj.data[firebase_id].todo_id = firebase_id
            todo_completed_list.unshift(obj.data[firebase_id])
          }
        }
        this.view_completed_mode = !this.view_completed_mode
        this.todo_completed = todo_completed_list
      })
    }
  },
  created(){
    axios.get(this.firebase_db_url).then(obj=>{
      let todo_info = []
      for(let firebase_id in obj.data){

        if(obj.data[firebase_id].neutral){
          // Basically each time we are setting a key called todo_id to a value of the firebase id
          obj.data[firebase_id].todo_id = firebase_id
          todo_info.unshift(obj.data[firebase_id])
        }

      }
      this.todo_list = todo_info
      console.log(this.todo_list)
    })
  },
}
</script>
<style scoped>
/* Griding system*/
#todo-container{
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  margin: 10px;
}

#todo-container > div:nth-child(odd){
  background: gold;
}
#todo-title{
  text-align:center;
  grid-column: 1/span2; /* In the middle of col 1 and 2*/
  margin: 15px auto;
}
.display-todo{
  grid-column-start: 1;
  grid-row-start: 2;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1em;
}
.display-todo > div{
  background: whitesmoke;
  border: 1px solid black;
}
.enter-todo{
  grid-column-start: 2;
  grid-row-start: 2;
  margin: 0 auto;
  border: 1px solid black;
  height: 120px;
  width: 500px;
  max-height: 120px;
  text-align:center;
  padding: 10px;
}

/* Individual items */
.display-todo-empty{
  text-align:center;
  margin: 5px 20px;
  padding: 40px;
  background: whitesmoke;
  border: 1px solid black;
}
#enter-todo-title{
  text-align:center;
  text-decoration: underline
}
.todo_input:focus{
  box-shadow: 0 1px 5px 0, rgba(0,0,0,0.15);
  transform: translateY(-3px);
}
.todo_input{
  width: 400px;
  border: 1px solid;
  border-radius: 3px;
  font-size: 15px;
  padding: 0 20px;
  line-height: 30px;
  -moz-transition: all 0.4s ease; /* Transition for Mozilla! */
  -webkit-transition: all 0.4s ease; /* For other browsers */
}

.completed{
  background: transparent;
  color: green;
  float: right;
}

.deleted{
  background: transparent;
  color: darkred;
  float: right;
}

.neutral{
  background: transparent;
  color: orange;
  float: right;
}

.task_done div{
  background: lightgreen;
  /* MAKE SURE TO INCLUDE THE PADDING because it covers the WHOLE entire box */
  padding: 19px;
}
.task_removed div{
  background: lightcoral;
  /* MAKE SURE TO INCLUDE THE PADDING because it covers the WHOLE entire box */
  padding: 19px;
}
.task_neutral div{
  background: lightgray;
  padding: 19px;
}

/* Html Elements */
li{
  list-style: circle;
}
input{
  outline: none;
  margin: 0;
  width: 100%;
  font-family: inherit;
}
button{
  background: transparent;
  border: none;
  font-size: 18px
}
</style>