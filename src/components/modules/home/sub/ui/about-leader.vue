<template>
  <div class="about-leader-wrapper">
    <div class="photo">
      <slot name="photo"></slot>
    </div>
    <div class="resume">
      <slot name="resume"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .about-leader-wrapper{
    display: flex;
    padding: 25px 0;
  }
  .photo{
    width: 180px;
    text-align: center;
  }
  .resume{
    flex: 1;
    padding-left: 20px;
  }

  /**
  *  mobile
  */
  @media only screen
    and (max-device-width: 1024px) {
    .about-leader-wrapper{
      display: block;
      padding: 0;
      text-align: center;
    }
    .photo{
      width: 100%;
      text-align: center;
      height: 120px;
    }
    .resume{
      padding-left: 20px;
      text-align: left;
    }
  }
</style>


