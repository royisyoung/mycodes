<template>
  <section class="rangeSlider">
    <div class="range-block range-header"></div>
    <div class="range-bar" ref="rangeBar">
      <div class="range-circ left-btn" ref="leftCirc" v-drag>
        <span class="range-label">{{leftVal}}</span>
      </div>
      <div class="range-circ right-btn" ref="rightCirc" v-drag>
        <span class="range-label">{{rightVal}}</span>
      </div>
    </div>
    <div class="range-block range-footer">
      <span class="left">{{startVal}}</span>
      <span class="right">{{endVal}}</span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      barOffsetWidth: 0,
      startVal: 0,
      endVal: 100,
      circLeft: 0,
      circRight: 0,
    }
  },
  mounted() {
    
  },
  methods: {
    // drag: function(e) {
      
    //   return false;
    // }
  },
  computed: {
    leftVal: function() {

      return 0
    },
    rightVal: function() {

      return 0
    }
  },
  directives: {
    drag: {
      inserted: function (el) {
        let oDiv = el;
        // const bar = this.$refs.rangeBar;
        // const marginLeft = this.$refs.rangeBar.style.marginLeft;
        const radius = oDiv.offsetWidth / 2;
        const barWidth = oDiv.parentNode.offsetWidth;
        const leftCirc = oDiv.parentNode.children[0];
        const rightCirc = oDiv.parentNode.children[1];
        oDiv.onmousedown = function(e) {
          let l = e.clientX - oDiv.offsetLeft;
          document.onmousemove = function(e) {
            const leftCircLeft = leftCirc.offsetLeft;
            const rightCircLeft = rightCirc.offsetLeft;
            // console.log(leftCircLeft, rightCircLeft)
            // console.log(leftCircLeft + oDiv.offsetWidth);
            if(leftCircLeft + oDiv.offsetWidth >  rightCircLeft) {
              document.onmousemove = null;
              if(oDiv.className.indexOf('left') > -1){
                oDiv.style.left = (rightCircLeft - oDiv.offsetWidth) + 'px'
              }else if(oDiv.className.indexOf('right') > -1){
                oDiv.style.left = (leftCircLeft + oDiv.offsetWidth) + 'px'
              }
            }else {
              const toL = e.clientX-l
              if(toL < - radius ) oDiv.style.left = - radius + 'px'
              else if(toL > barWidth + radius) oDiv.style.left = (barWidth - radius) + 'px'
              else oDiv.style.left = toL + 'px'
            }
          };
          document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
          }
          return false;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$barColor: #483D8B;
$barBorderWidth: 2px;
$rangeBarHeight: 8px;

$btnSize: 22px;
$btnBorderWidth: 2px;
$dis: $btnSize / 2 - $rangeBarHeight / 2; //按钮和bar的高度差

$blockHeight: 20px;
.rangeSlider{
  display: inline-block;
  width: 250px;
  position: relative;
  padding: 0 20px;
  .range-bar {
    position: relative;
    height: $rangeBarHeight;
    background: $barColor;
    border-radius: $rangeBarHeight;
    margin: $dis $dis;
    .range-circ {
      position: absolute;
      top: - $dis;
      background: #fff;
      width: $btnSize;
      height: $btnSize;
      border-radius: $btnSize;
      border: $btnBorderWidth solid #E8E8E8;
      box-shadow: 2px 2px 5px rgba(0,0,0, .29), inset 1px 1px 2px rgba(255,255,255, .44);
      transition: all 0.15s ease;
      cursor: pointer;
      .range-label {
        width: 40px;
        text-align: center;
        position: absolute;
        top: -20px; left: -11px;
      }
    }
    .left-btn {
      left: - $dis;
    }
    .right-btn {
      right: - $dis;
    }
  }
  .range-block {
    height: $blockHeight;
    padding: 0 $dis;
  }
  .range-header {
    vertical-align: bottom;
  }
  .range-footer {
    vertical-align: top;
    position: relative;
    span {
      width: 24px;
      position: absolute;
      text-align: center;
    }
    .left {
      left: -1px;
    }
    .right {
      right:-1px;
    }
  }
}
</style>
