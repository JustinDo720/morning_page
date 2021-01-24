<template>
  <div class="overlay" v-if="visibileModal">
    <!-- Weather -->
    <div
      id="weather_modal"
      class="modal_item white"
      v-if="currentCompName === 'weather'"
      style='width: 500px;'
    >
      <div class="right">
        <button class="btn-small red black-text" @click="removeModal">
          <i class="material-icons">
            clear
          </i>
        </button>
      </div>
      <div class="justify-center">
        <h4>
          Weather
        </h4>
      </div>
      <hr style="margin-top: 20px;" />
      <!-- Slots -->
      <div>
        <slot name="weather"></slot>
      </div>
    </div>
    <!-- Todo_Modal -->
    <div
      style='
        width:90%;
        height:90%;
      '
      id="todo-modal"
      class="modal_item white teal lighten-3"
      v-if="currentCompName == 'todo'"
    >
      <div>
        <div class="right">
          <button class="btn-small red black-text" @click="removeModal" style='margin: 10px; margin-top: 1px;'>
            <i class="material-icons">
              clear
            </i>
          </button>
        </div>
        <add_todo @finish='closeRefresh($event)'></add_todo>
      </div>
    </div>
  </div>
</template>
<script>
import add_todo from "@/components/home_child_component/add_todo"
export default {
  name: "Modal",
  components:{
    add_todo
  },
  props: {
    // We are going to use activeModal to control the Modal using v-if
    activeModal: {
      required: true,
      type: Boolean
    },
    // The comp name will allow us to reuse this component. For example, we are going to use this for weather and login
    compName: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      visibileModal: this.activeModal,
      currentCompName: this.compName,
    };
  },
  methods: {
    removeModal: function() {
      this.visibileModal = false;
      document.body.style.overflow = "";
    },
    closeRefresh: function(close){
      if(close){
        // If we are finished we need to tell the Modal to close but also tell the home page to run the init again
        this.removeModal();
        this.$emit('refresh-todo', true)
      }
    }
  },
  beforeCreate() {
    document.body.style.overflow = "hidden";
  }
};
</script>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden;
}

.modal_item {
  width: auto;
  box-shadow: 1px 2px 4px rgba(153, 155, 168, 0.12);
  border-raidus: 4px;
}

/*

.paperBG{
  background-image : url('../../assets/paper-bg.jpg');
}

 */
</style>
