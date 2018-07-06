<template>
  <div>
    <!--<pl-header ></pl-header>-->
    <!--<pl-layout class="layout-contianer" style="margin-top: 90px;" :show-left="false">-->
      <accreditation-view-component :contactorId="$route.params.contactorId" :cusId="$route.params.cusId"></accreditation-view-component>
    <!--</pl-layout>-->
  </div>
</template>
<script>
import accreditationViewComponent from './accreditation-view-component';
export default {
  components: {
    accreditationViewComponent
  },
  beforeMount () {
    let params = this.$route.params;
    if (!params.contactorId || !params.cusId) {
      this.$router.push({name: 'bsp.accreditation.step'});
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../../../../assets/scss/index";
@import "../../../../../assets/scss/variables";
@import './style.scss';

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
  padding-right: 30px;
  padding-bottom: 20px;
}

.card-content {
  max-width: 800px;
  margin: 0px auto;
  padding-right: 40px;
}
</style>



