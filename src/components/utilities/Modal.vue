<template>
  <div class='overlay' v-if='visibileModal'>
    <div class='modal_item white'>
      <!-- Header -->
      <div class='flex items-center justify-between'>
        <span>Modal Title</span>
        <hr>
      </div>
      <!-- Body -->
      <div>
        <div>
          <slot name='weather'></slot>
        </div>
      </div>
      <!-- Footer -->
      <div>
        <div>
          <button @click='toggleModal'>
            close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'Modal',
  props: {
    activeModal:{ required: true,
      type: Boolean,
    }
  },
  data(){
    return{
      visibileModal: this.activeModal,
    }
  },
  methods:{
    toggleModal: function(){
      this.visibileModal = !this.visibileModal
    }
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
}

.modal_item{
  width:500px;
  box-shadow: 1px 2px 4px rgba(153,155,168, 0.12);
  border-raidus: 4px;
}
</style>