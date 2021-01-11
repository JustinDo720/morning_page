<template>
  <div class='overlay' v-if='visibileModal'>
    <div id='weather_modal' class='modal_item white' v-if='currentCompName === "weather"'>
      <div class='right'>
        <button class='btn-small red black-text' @click='removeModal'>
          <i class='material-icons'>
            clear
          </i>
        </button>
      </div>
      <div class='justify-center'>
        <h4>
          Weather
        </h4>
      </div>
      <hr style='margin-top: 20px;'>
      <!-- Slots -->
      <div>
        <slot name='weather'></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'Modal',
  props: {
    // We are going to use activeModal to control the Modal using v-if
    activeModal:{
      required: true,
      type: Boolean,
    },
    // The comp name will allow us to reuse this component. For example, we are going to use this for weather and login
    compName:{
      required: true,
      type: String,
    }
  },
  data(){
    return{
      visibileModal: this.activeModal,
      currentCompName: this.compName,
    }
  },
  methods:{
    removeModal: function(){
      this.visibileModal = false
      document.body.style.overflow = ''
    }
  },
  beforeCreate(){
    document.body.style.overflow = 'hidden'
  },
}
</script>
<style scoped>
.overlay{
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0,0,0,0.1);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: hidden
}

.modal_item{
  width:500px;
  box-shadow: 1px 2px 4px rgba(153,155,168, 0.12);
  border-raidus: 4px;
}

</style>