<template>
  <el-row class="search-container font-14">
    <el-col :xs="24" :sm="12" :md="24" :lg="7" :xl="7">
      <div class="flex flex-ai-center nowrap child">
        <span class="font-14">Message ID: </span>
        <el-input class="zk-input" v-model="networkZK.contract_address" placeholder="please enter Message ID" />
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :md="24" :lg="4" :xl="4">
      <div class="flex flex-ai-center nowrap child">
        <el-button type="info" :disabled="!networkZK.contract_address ? true:false" round @click="clearProvider">Clear</el-button>
        <el-button type="primary" :disabled="!networkZK.contract_address ? true:false" round @click="searchZKProvider">
          <el-icon>
            <Search />
          </el-icon>
          Search
        </el-button>
      </div>
    </el-col>
  </el-row>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Message ID" />
    <el-table-column prop="name" label="Height" />
    <el-table-column prop="address" label="Time" />
    <el-table-column prop="address" label="From" />
    <el-table-column prop="address" label="To" />
    <el-table-column prop="address" label="Method" />
    <el-table-column prop="address" label="Value" />
    <el-table-column prop="address" label="Status" />
  </el-table>
</template>

<script setup lang="ts">
const tableData = ref([])
const networkZK = reactive({
  contract_address: ''
})

function clearProvider() {}
function searchZKProvider() {}
</script>

<style scoped lang="less">
.child {
  height: 100%;
  span {
    white-space: nowrap;
  }
}
.el-input {
  width: 100%;
  // max-width: 250px;
  // min-width: 150px;
  margin: 0 0.16rem 0 0.1rem;
  font-size: inherit;
  .el-input__wrapper {
    background-color: var(--color-light);
    border: 1px solid var(--color-border);
    border-radius: 0.08rem;
    box-shadow: none;
    .el-input__inner {
      width: 100%;
      height: 0.3rem;
      line-height: 0.3rem;
      color: #333;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      &:hover,
      &:active,
      &:focus {
        border-color: var(--color-primary);
      }
    }
  }
}
.el-button {
  height: 0.3rem;
  padding: 0 0.1rem;
  font-family: inherit;
  font-size: inherit;
  border: 0;
  line-height: 0.3rem;
  .el-icon {
    width: 0.2rem;
    height: 0.2rem;
    margin: 0 0.08rem 0 0;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  &.el-button--info {
    background-color: #d0dcf9;
    border-color: #d0dcf9;
    color: var(--color-primary);
  }
  &:hover,
  &.is-disabled {
    opacity: 0.9;
  }
}
</style>
