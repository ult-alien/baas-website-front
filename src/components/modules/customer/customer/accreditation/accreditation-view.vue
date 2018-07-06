<template>
  <pl-content-box>
    <pl-page-nav :show-previous="true">
    </pl-page-nav>
    <accreditation-view-component :contactorId="$route.params.contactorId" :cusId="$route.params.cusId" userType="approver"></accreditation-view-component>
  </pl-content-box>
</template>
<script>
import accreditationViewComponent from './accreditation-view-component';
export default {
  components: {
    accreditationViewComponent
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



