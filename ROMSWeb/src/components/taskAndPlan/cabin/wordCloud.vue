<template>
  <section class='wordCloud' ref="wordCloud">
  </section>
</template>

<script>
require('echarts-wordcloud');
export default {
  name: 'wordCloud',
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
        tooltip : {
          show: true
        },
        series : [
          {
            // name:'面积模式',
            type:'wordCloud',
            // shape:'smooth',
            // gridSize : 2,
            // size: ['80%', '80%'],
            sizeRange : [ 14, 40 ],
            textRotation : [0, 45, 90, -45],
            // rotationRange : [ -90, 90 ],
            textPadding: 0,
            textStyle : {
                normal : {
                    color : ()=>'rgb(' + [ Math.round(Math.random() * 160),Math.round(Math.random() * 160),Math.round(Math.random() * 160) ].join(',') + ')',
                },  
                emphasis : {
                    shadowBlur : 10,
                    shadowColor : '#333'
                }
            },
            autoSize: {
            enable: true,
            minSize: 14
            },
            data:[
              {value:10, name:'rose1',itemStyle: {
                normal: {
                  color: '#000'
                }
              }},
              {value:5, name:'rose2'},
              {value:15, name:'rose3'},
              {value:25, name:'rose4'},
              {value:20, name:'rose5'},
              {value:35, name:'rose6'},
              {value:30, name:'rose7'},
              {value:40, name:'rose8'}
            ]
          }
        ]
      }
    }
  },
  mounted() {
    this.$refs.wordCloud.style.width = this.$props.width;
    this.$refs.wordCloud.style.height = this.$props.height;
    const charts = this.$echarts.init(this.$refs.wordCloud);
    charts.setOption(this.option);
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.wordCloud {
}
</style>
