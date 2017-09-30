<template>
  <r-dialog
    class='importPlan'
    :title="title + typeName"
    :close-handle="closeHandle"
    :confirm-handle="confirmHandle">
    <p class="importPlan-text">请下载{{typeName}}模板，按格式填写后再上传导入</p>
    <div class="importPlan-content">
      <div class="box download">
        <span class="tip">1</span>
        <a :href="typeUrl">{{typeName}}模板下载</a>
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
      file: ''
    }
  },
  mounted() {
    // const obj = {
    //     g_time: "2017-09-27 10:08:27",
    //     g_token: "38c1924a9a1ec192ff0dbc55994528b4",
    //     g_userId: "35",
    //     shopId: this.$store.state.currentShop.id,
    //     y: this.$store.state.date.year,
    //     createUser: this.$store.state.userInfo.id,
    //     filePath: this.file
    //   }
    // console.log(this.$api.plans.importYearlyPlanStr(obj))
    // $('#fileupload').fileupload({
    //     dataType: 'json',
    //     url: 'http://10.8.97.156:8080/ROMSService/action/actionPlan/upLoadFile?g_userId=1&shopId=1',
    //     // url: 'http://10.8.97.156:8080/ROMSService/action/actionPlan/upLoadFile',
    //     add: function (e, data) {
    //         data.context = $('#submit')
    //             .click(function () {
    //                 //data.context = $('<p/>').text('Uploading...').replaceAll($(this));
    //                 data.submit();
    //             });
    //     },
    //     done: function (e, data) {
    //         data.context.text('Upload finished.');
    //     }
    // });
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
      const type = this.$props.type;
      formData.append("file", file);

      this.$api.active.importActivePlan(formData, {
        g_userId: 1,
        shopId: 1
      }).then(res => console.log(res))
    }
  },
  computed: {
    typeName: function() {
      const type = this.$props.type;
      switch(type){
        case 1: return '年度计划';
        case 2: return '每日计划';
        case 3: return '活动计划';
        default: return 'error';
      }
    },
    typeUrl: function() {
      const type = this.$props.type;
      switch(type) {
        case 1: return this.$api.download.yearlyPlanTemplate();
        case 2: return this.$api.download.dailyPlanTemplate();
        case 3: return this.$api.download.activeTemplate();
        default: return 'javascript:void(0);'
      }
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
