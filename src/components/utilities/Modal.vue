<template>
  <div class='overlay' v-if='visibileModal'>
    <div class='modal_item white'>
      <!-- Header -->
      <div class='flex items-center justify-between'>
        <span>Modal Title</span>
        {{ app_name }}
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
          <button @click='this.visibileModal=false'>
            close
          </button>
        </div>
      </div>
    </div>
  </div>
  <button @click='visibileModal = !visibileModal'>
    Test
  </button>
  <h1>
    {{ app_name }}
  </h1>
</template>
<script>
export default{
  name: 'Modal',
  props: {
    app_name:{
      required: true,
      type: String,
    }
  },
  data(){
    return{
      visibileModal: false,
    }
  },
  methods:{
    toggleModal: function(){
      this.visibileModal = !this.visibileModal
    }
  },
  created(){
    console.log(this.app_name)
  }
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