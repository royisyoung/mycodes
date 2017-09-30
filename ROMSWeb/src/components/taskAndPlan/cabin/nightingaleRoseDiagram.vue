<template>
  <section class='nightingale' ref="nightingale">
  </section>
</template>

<script>
export default {
  name: 'nightingale',
  props: {
    width: {
      type: String,
      require: true
    },
    height: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      option: {
        // title : {
        //   text: '南丁格尔玫瑰图',
        //   x:'center',
        //   textStyle: {
        //     fontWeight: 'normal',
        //     fontSize: 16
        //   }
        // },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   type: 'scroll',
        //   x : 'left',
        //   y : 30,
        //   data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
        // },
        legend: {
          x : 'left',
          data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
        },
        // grid: {
        //   show: false,
        //   top: 0,
        //   bottom: 80,
        //   left: 0,
        //   right: 0
        // },
        toolbox: {
          show : false,
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
              show: true,
              type: ['pie', 'funnel']
            },
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : true,
        series : [
          {
            name:'面积模式',
            type:'pie',
            radius : [20, 110],
            center : ['50%', '60%'],
            roseType : 'area',
            label: {
                normal: {
                  show: false,
                  position: 'inner'
                },
                emphasis: {
                  show: false
                }
            },
            data:[
              {value:10, name:'rose1'},
              {value:5, name:'rose2'},
              {value:15, name:'rose3'},
              {value:25, name:'rose4'},
              {value:20, name:'rose5'},
              {value:35, name:'rose6'},
              {value:30, name:'rose7'},
              {value:40, name:'rose8'}
            ]
          }
        ],
      }
    }
  },
  mounted() {
    this.$refs.nightingale.style.width = this.$props.width;
    this.$refs.nightingale.style.height = this.$props.height;
    const charts = this.$echarts.init(this.$refs.nightingale);
    charts.setOption(this.option);
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.nightingale {
}
</style>
