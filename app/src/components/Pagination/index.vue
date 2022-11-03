<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>

    <button
      v-if="startNumendNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumendNum.start > 2">···</button>

    <!-- 中间结构 -->

    <button
      v-for="(page, index) in startNumendNum.end"
      :key="index"
      v-show="page >= startNumendNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumendNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumendNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      :class="{ active: pageNo == totalPage }"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  //计算属性
  computed: {
    //总共多少页
    totalPage() {
      //向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    //计算出连续页面的起始页码和结束页码[连续页码的数字：至少是5]
    startNumendNum() {
      //先定义两个变量，存储起始和结束数字
      let start = 0,
        end = 0;
      //连续页码数字5【就是至少五页】，如果出现不正常现象【数据不够五页】
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        //正常现象，总页数大于5
        start = this.pageNo - parseInt(this.continues / 2);
        //结束数字
        end = this.pageNo + parseInt(this.continues / 2);
        //把出现不正常现象【start数字0|负数】纠正
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        //把出现不正常现象【end大于总页码】纠正
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
