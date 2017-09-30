<template>
  <r-dialog
    class='importPlan'
    :title="title + typeTitle"
    :close-handle="closeHandle"
    :confirm-handle="confirmHandle">
    <p class="importPlan-text">请下载{{typeTitle}}模板，按格式填写后再上传导入</p>
    <div class="importPlan-content">
      <div class="box download">
        <span class="tip">1</span>
        <a :href="typeUrl">{{typeTitle}}模板下载</a>
      </div>
      <div class="box upload">
        <input type="file" name="file" id="fileupLoad" @change="getFile">
        <!-- <input id="fileupload" type="file" name="files[]" multiple> -->
        <input id="submit" type="submit" value="上传" @click="uploadHandle">
      </div>
    </div>
  </r-dialog>
</template>

<script>
import dialog from '../../common/notice/dialog'
import '@/assets/js/jquery-1.9.1.js';
import '@/assets/js/vendor/jquery.ui.widget.js';
import '@/assets/js/jquery.iframe-transport.js';
import '@/assets/js/jquery.fileupload.js';
export default {
  components:{
    'r-dialog': dialog,
  },
  name: 'importPlan',
  props: {
    closeHandle: {
      type: Function,
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      title: '导入',
      file: '',
      configList: [
        {
          id: 1,
          type: 1,
          title: '年度计划',
          downloadApi: 'yearlyPlanTemplate',
        },
        {
          id: 2,
          type: 2,
          title: '每日计划',
          downloadApi: 'dailyPlanTemplate',
        },
        {
          id: 2,
          type: 2,
          title: '活动计划',
          downloadApi: 'activeTemplate',
        }
      ],
      config: {}
    }
  },
  created(){
    const type = this.$props.type;
    this.config = this.$_.find(this.configList, {type})
  },
  mounted() {
  },
  methods: {
    confirmHandle: function() {
      console.log('biu')
    },
    getFile: function(e) {
      console.log(e.target.files);
      if(e.target.files.length > 0){
        this.file = e.target.files[0];
      }
    },
    uploadHandle: function(e) {
      e.preventDefault();
      const file = this.file;
      if(!file) return;
      const formData = new FormData();
      formData.append("file", file);
      const obj = {
        g_userId: 1,
        shopId: 1
      }
      switch(this.config.type){
        case 1: this.yearApi(formData, obj); break;
        case 2: this.dailyApi(formData, obj); break;
        case 3: this.activeApi(formData, obj); break;
        default: console.log('error');
      }
    },
    yearApi: function(formData, obj){
      return this.$api.plans.importYearlyPlan(formData, obj)
      .then(res => console.log(res))
    },
    dailyApi: function(formData, obj){
      return this.$api.active.importDailyPlan(formData, obj)
      .then(res => console.log(res))
    },
    activeApi: function(formData, obj){
      return this.$api.active.importActivePlan(formData, obj)
      .then(res => console.log(res))
    }
  },
  computed: {
    typeTitle: function() {
      return this.config.title;
    },
    typeUrl: function() {
      return this.$api.download[this.config.downloadApi]();
    }
  }
}
</script>

<style lang='scss' scoped>
.importPlan {
  .importPlan-text {

  }
  .importPlan-content {
    display: flex;
    align-items: center;
    .box {
      flex:1;
      margin: 10px;
      height:150px;
      border: 1px dashed #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .tip{
        position: absolute;
        top:0; left:0;
        width: 25px;
        height: 25px;
        text-align: center;
        font-size: 22px;
      }
    }
    .upload {
      padding: 10px;
      text-align: center;
      input[type=file] {
        display: inline-block;
        width: 170px;
      }
    }
  }
}
</style>
