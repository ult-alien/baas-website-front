<template>
  <el-form class="static-form" label-width="150px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="企业名称">
          <pl-content-item-text>{{cusRecord.cusName}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="法人/股东姓名">
          <pl-content-item-text>{{cusRecord.lrName}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="企业编码">
          <pl-content-item-text>{{cusRecord.cusCode}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="法人/股东证件类型">
          <pl-content-item-text>{{cusRecord.lrIdType | dictionary('id_type')}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12" v-if="cusRecord.idType === 'ent_id_type_1'">
        <el-form-item label="企业类型">
          <pl-content-item-text>{{cusRecord.cusType | constant('CustomerConstants.CusType')}}</pl-content-item-text>
        </el-form-item>
      </el-col>

       <el-col :span="12" v-if="cusRecord.idType === 'ent_id_type_1'">
        <el-form-item label="法人/股东证件号码">
          <pl-content-item-text>{{cusRecord.lrLisNo}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12" v-if="cusRecord.idType === 'ent_id_type_1'">
        <el-form-item label="统一社会信用代码">
          <pl-content-item-text>{{cusRecord.socCrCode}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12" v-if="cusRecord.idType === 'ent_id_type_2'">
        <el-form-item label="营业执照">
          <pl-content-item-text>{{cusRecord.lisNo}}</pl-content-item-text>
        </el-form-item>
      </el-col>

       <el-col :span="12" v-if="cusRecord.idType === 'ent_id_type_2'">
        <el-form-item label="法人/股东证件号码">
          <pl-content-item-text>{{cusRecord.lrLisNo}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12" v-if="cusRecord.idType === 'ent_id_type_3'">
        <el-form-item label="企业类型">
          <pl-content-item-text>{{cusRecord.cusType | constant('CustomerConstants.CusType')}}</pl-content-item-text>
        </el-form-item>
      </el-col>

       <el-col :span="12" v-if="cusRecord.idType === 'ent_id_type_3'">
        <el-form-item label="法人/股东证件号码">
          <pl-content-item-text>{{cusRecord.lrLisNo}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12" v-if="cusRecord.idType === 'ent_id_type_2'">
        <el-form-item label="组织机构代码">
          <pl-content-item-text>{{cusRecord.orgCode}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12" v-if="cusRecord.idType === 'ent_id_type_3'">
        <el-form-item label="证件名称">
          <pl-content-item-text>{{cusRecord.idName}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="12" v-if="cusRecord.idType === 'ent_id_type_3'">
        <el-form-item label="证件号码">
          <pl-content-item-text>{{cusRecord.idNo}}</pl-content-item-text>
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="企业地址">
          <pl-content-item-text>
            {{cusRecord.province}}{{cusRecord.city}}{{cusRecord.address}}
          </pl-content-item-text>
        </el-form-item>
      </el-col>

      <!--
      <el-col :span="24">
        <el-form-item label="区块链地址">
          <pl-content-item-text class="link" style="color: #00c2c2;" @click.native="toStellar">
            {{cusRecord.chainAddr}}
          </pl-content-item-text>
        </el-form-item>
      </el-col>
      -->
    </el-row>
  </el-form>
</template>
<script>
  export default {
    props: ['cusRecord'],
    data () {
      return {
      };
    },
    methods: {
      toStellar () {
        window.open('http://120.78.184.87:7020');
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>



