<template>
  <section id="container">
    <div class="swan-logo flex flex-ai-center nowrap">
      <div class="flex flex-ai-center flex-jc-between swan-icon">
        <img :src="swanLogo" @click="openPage('https://www.swanchain.io/')" />

        <div class="flex flex-ai-center mobileShow">
          <!-- @change="handleClick" -->
          <el-select v-model="explorerList.value" placeholder="Select" size="small" @change="currentMethod">
            <template #prefix>
              <div class="flex flex-ai-center font-16">
                <i class="icon icon-swanProxima"></i>
                {{explorerList.value}}
              </div>
            </template>
            <el-option v-for="item in explorerList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="flex flex-ai-center font-16">
                <i class="icon icon-swanProxima"></i>
                {{item.label}}
              </div>
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="flex flex-ai-center nowrap swan-right font-16">
        <div class="flex flex-ai-center pcShow">
          <!-- @change="handleClick" -->
          <el-select v-model="explorerList.value" placeholder="Select" size="small" @change="currentMethod">
            <template #prefix>
              <div class="flex flex-ai-center font-16">
                <i class="icon icon-swanProxima"></i>
                {{explorerList.value}}
              </div>
            </template>
            <el-option v-for="item in explorerList.options" :key="item.value" :label="item.label" :value="item.value">
              <div class="flex flex-ai-center font-16">
                <i class="icon icon-swanProxima"></i>
                {{item.label}}
              </div>
            </el-option>
          </el-select>
        </div>

        <!-- <div class="web3Modal-style">
          <web3-modal />
        </div> -->

        <!-- <div class="header-right flex flex-ai-center nowrap pcShow" v-if="token !== ''">
          <div class="set">
            <el-dropdown popper-class="menu-style" @command="handleSelect" placement="bottom-end">
              <div class="el-dropdown-link setting-style loginImg flex flex-ai-center">
                <el-icon>
                  <Avatar />
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="apiKey">
                    <div class="profile router-link b">Show API-Key</div>
                  </el-dropdown-item>
                  <el-dropdown-item command="cpCollateral">
                    <div class="profile router-link b">CP Collateral</div>
                  </el-dropdown-item>
                  <el-dropdown-item command="cpCollateralCheck">
                    <div class="profile router-link b">CP Collateral Check</div>
                  </el-dropdown-item>
                  <el-dropdown-item command="sign_out">
                    <span class="link">Sign Out</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div> -->

        <div class="header-right flex flex-ai-center nowrap">
          <div class="set mobileShow">
            <el-dropdown popper-class="menu-style" @command="handleSelect" placement="bottom-end">
              <div class="el-dropdown-link setting-style loginImg flex flex-ai-center">
                <el-icon>
                  <Menu />
                </el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="overview">
                    <div class="profile router-link b">
                      <div class="flex flex-ai-center font-16">
                        <i class="icon icon-Overview"></i>
                        <span>Overview</span>
                      </div>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item command="rankings-fcp">
                    <div class="profile router-link b">
                      <div class="flex flex-ai-center font-16">
                        <i class="icon icon-Rankings-fcp"></i>
                        <span>FCP List</span>
                      </div>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item command="rankings-ecp">
                    <div class="profile router-link b">
                      <div class="flex flex-ai-center font-16">
                        <i class="icon icon-Rankings-ecp"></i>
                        <span>ECP List</span>
                      </div>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item command="accountInfo" v-if="metaAddress && token">
                    <div class="profile router-link b">
                      <div class="flex flex-ai-center font-16">
                        <i class="icon icon-AccountInfo"></i>
                        <span>CP Profile</span>
                      </div>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item command="resource">
                    <div class="profile router-link b">
                      <div class="flex flex-ai-center font-16">
                        <i class="icon icon-Resource"></i>
                        <span>Resource</span>
                      </div>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item command="aar" divided>
                    <div class="profile router-link b">
                      <div class="flex flex-ai-center font-16">
                        <i class="icon icon-AAR"></i>
                        <span>Swan Chain Mainnet Campaign
                          <i class="icon icon-new"></i>
                        </span>
                      </div>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item command="aar-fcp">
                    <div class="profile router-link b">
                      <div class="flex flex-ai-center font-16">
                        <i class="icon icon-AAR"></i>
                        <span>FCP Ranking</span>
                      </div>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item command="aar-ecp">
                    <div class="profile router-link b">
                      <div class="flex flex-ai-center font-16">
                        <i class="icon icon-AAR"></i>
                        <span>ECP Ranking</span>
                      </div>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item command="sign_out" v-if="token !== ''">
                    <span class="link">Sign Out</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="centerDialogVisible" title="API Keys" custom-class="apikey_body" class="apikey_body">
      <div class="cont" v-loading="tokenShow">
        <el-button type="primary" class="add-button" @click="createCom">New API Key</el-button>
        <el-input v-show="toolData !== ''" v-model="toolData" type="text" readonly placeholder=" ">
          <template #append>
            <div class="action flex flex-ai-center">
              <!-- <i class="icon" @click="tokenShow=!tokenShow">
                <View />
              </i> -->
              <i class="icon flex flex-ai-center" @click="copyContent(toolData, 'Copied')">
                <DocumentCopy />
              </i>
              <i class="icon flex flex-ai-center" @click="deleteToken(toolData)">
                <Delete />
              </i>
            </div>
          </template>
        </el-input>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">OK</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="CP Collateral" v-model="cpCollateralCont.diagle" :append-to-body="false" :width="bodyWidth" custom-class="wrongNet" class="wrongNet">
      <div v-loading="cpCollateralCont.show">
        <label v-if="cpCollateralCont.tx_hash !== ''">TransactionHash:
          <b @click="openPage(`${txLink}/tx/${cpCollateralCont.tx_hash}`)">{{cpCollateralCont.tx_hash}}</b>
        </label>
        <div v-else>
          <div class="area flex flex-ai-center">
            <div class="fast width">
              <label>CP Address</label>
              <!-- <div class="address">{{cpCollateralCont.address}}</div> -->
              <el-input v-model="metaAddress" class="is-disabled" type="text" placeholder=" " readonly />
              <p class="error" v-show="cpCollateralCont.tip">Please enter a valid Ethereum address</p>
            </div>
          </div>
          <br />
          <div class="area flex flex-ai-center">
            <div class="fast width">
              <label>Amount</label>
              <el-input-number v-model="cpCollateralCont.amount" controls-position="right" @change="cpCollateralCont.tip_amount=false" />
              <!-- <p class="error" v-show="cpCollateralCont.tip_amount">The minimum amount is 1</p> -->
            </div>
          </div>
          <br />
          <el-button type="primary" class="add-button" @click="cpCollateral">OK</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="CP Collateral Check" v-model="cpCheckCont.diagle" :append-to-body="false" :width="bodyWidth" custom-class="wrongNet" class="wrongNet">
      <div class="area flex flex-ai-center" v-loading="cpCheckCont.show">
        <div class="fast width">
          <label>Available Collateral </label>
          <div class="address">{{cpCheckCont.balance}} sETH</div>
        </div>
        <div class="fast width">
          <label>Hold Collateral</label>
          <div class="address">{{cpCheckCont.taskBalance}} sETH</div>
        </div>
        <div class="fast width">
          <label>Total Collateral</label>
          <div class="address">{{AddFormat(cpCheckCont.balance, cpCheckCont.taskBalance)}} sETH</div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<script setup lang="ts">
import web3Modal from "../web3-modal.vue"
import {
  DocumentCopy, Avatar, Delete, View, Menu
} from '@element-plus/icons-vue'
import * as echarts from "echarts"
import SpaceTokenABI from '@/utils/abi/SwanToken.json'
import CollateralABI from '@/utils/abi/CollateralContract.json'
import { currentNetwork, metaAddress, token } from "@/utils/storage"
import swanLogo from "@/assets/images/logo-white.png"
import { openPage } from "@/hooks/router"
import { AddFormat, copyContent, messageTip, signOutFun } from "@/utils/common"
import { apiTokenData, apiTokenDelete, cpCollateralData, getApiTokenData } from "@/api/header"
import web3Init, { checkNetwork } from "@/utils/login"

    
    const bodyWidth = ref(document.body.clientWidth > 600 ? '450px' : '95%')
    const route = useRoute()
    const router = useRouter()
    const centerDialogVisible = ref(false)
    const tokenShow = ref(false)
    const toolData = ref('')
    const paginKey = reactive({
      pageSize: 12,
      pageNo: 1,
      total: 0,
      sort: 'updated'
    })
    const ruleForm = reactive({
      name: ''
    })
    const cpCheckCont = reactive({
      diagle: false,
      show: true,
      tip: '',
      status: 'success',
      balance: 0,
      taskBalance: 0,
    })
    const cpCollateralCont = reactive({
      diagle: false,
      show: false,
      tip: false,
      tip_amount: false,
      address: '',
      amount: NaN,
      tx_hash: ''
    })
    const explorerList = reactive({
      value: 'Swan Chain Mainnet',
      options: [
        {
          value: 'Swan Chain Mainnet',
          label: 'Swan Chain Mainnet'
        },
        // {
        //   value: 'Proxima',
        //   label: 'Swan Chain Proxima'
        // }
      ]
    })
    const txLink = import.meta.env.VITE_ATOMBLOCKURL
    const tokenAddress = import.meta.env.VITE_OPSWAN_SWANTOKEN_ADDRESS
    let tokenContract
    const collateralAddress = import.meta.env.VITE_COLLATERAL_CONTACT
    let collateralContract


    async function handleKeyChange (currentPage) {
      paginKey.pageNo = currentPage
      getdataList()
    }
    async function createCom () {
      tokenShow.value = true
      const listRes = await apiTokenData()
      if (listRes && listRes.status === 'success') {
        messageTip('success', listRes.message ? listRes.message : 'Success!')
        getdataList()
        return
      } else messageTip('error', listRes.message ? listRes.message : 'Failed!')
      tokenShow.value = false
    }
    async function deleteToken (tokenName) {
      tokenShow.value = true
      let formData = new FormData()
      formData.append('api_token', tokenName)
      const listRes = await apiTokenDelete(formData)
      if (listRes && listRes.status === 'success') messageTip('success', listRes.message ? listRes.message : 'Delete successfully!')
      else messageTip('error', listRes.message ? listRes.message : 'Delete failed!')
      getdataList()
    }
    async function getdataList () {
      centerDialogVisible.value = true
      tokenShow.value = true
      toolData.value = ''

      try {
        const keysRes = await getApiTokenData()

        if (keysRes && keysRes.status === 'success') {
          // Assuming the 'data' field in response contains the required token
          if (keysRes.data) toolData.value = keysRes.data.token.token || ''
          else messageTip('error', 'No token found, please generate a new token')
        } else if (keysRes.message) {
          messageTip('error', keysRes.message)
        }
      } catch (error) {
        messageTip('error', error.message || 'Error fetching data')
      }

      tokenShow.value = false
    }
    function handleSizeChange (val) { }
    let lastTime = 0
    async function throttle () {
      // Prevent multiple signatures
      let now = new Date().valueOf();
      if (lastTime > 0 && (now - lastTime) <= 2000) return false
      lastTime = now
      return true
    }
    async function handleSelect (key, keyPath) {
      // console.log(key, keyPath) //  
      if (key === 'apiKey') getdataList()
      else if (key === 'cpCollateral') {
        const net = await checkNetwork()
        if (net) return
        cpCollateralCont.tip = false
        cpCollateralCont.tx_hash = ''
        cpCollateralCont.diagle = true
      } else if (key === 'cpCollateralCheck') cpCheck()
      else if (key === 'sign_out') {
        await signOutFun()
        window.location.reload()
      } else if (key === 'overview') router.push({ path: '/overview' })
      else if (key === 'rankings-fcp') router.push({ name: 'rankingsFCP' })
      else if (key === 'rankings-ecp') router.push({ name: 'rankingsECP' })
      else if (key === 'aar' || key === 'aar-fcp') router.push({ name: 'aarFCP' })
      else if (key === 'aar-ecp') router.push({ name: 'aarECP' })
      else if (key === 'accountInfo') router.push({ name: 'accountInfo', params: { type: 'FCP' } })
      else if (key === 'resource') router.push({ name: 'resource' })
    }
    async function cpCollateral () {
      cpCollateralCont.show = true
      try {
        if (Number(cpCollateralCont.amount) >= 0) cpDeposit()
        else {
          cpCollateralCont.tip_amount = true
          cpCollateralCont.show = false
        }

        // const isAddress = web3Init.utils.isAddress(cpCollateralCont.address)
        // if (!isAddress) {
        //   cpCollateralCont.tip = true
        //   cpCollateralCont.show = false
        //   return
        // } else cpCollateralCont.tip = false

        // if (cpCollateralCont.address !== metaAddress.value) {
        //   ElMessageBox.confirm(
        //     'Detected that the currently filled wallet address does not match the login wallet address, continue？',
        //     'Warning',
        //     {
        //       confirmButtonText: 'OK',
        //       cancelButtonText: 'Cancel',
        //       type: 'warning',
        //     }
        //   )
        //     .then(async () => {
        //       cpDeposit()
        //     })
        //     .catch(() => {
        //       cpCollateralCont.show = false
        //     })
        // } else cpDeposit()
      } catch (err) {
        console.log('err', err)
        if (err && err.message) messageTip('error', err.message)
        cpCollateralCont.show = false
      }
      // cpCollateralCont.diagle = false
    }
    async function cpDeposit () {
      try {
        const amount = web3Init.utils.toWei(String(cpCollateralCont.amount), 'ether')

        // let approveMethod = tokenContract.methods.approve(collateralAddress, amount)
        // let approveGasLimit = await approveMethod.estimateGas({ from: metaAddress.value })
        // const approve_tx = await approveMethod.send({
        //   from: metaAddress.value, gasLimit: approveGasLimit
        // })

        let payMethod = collateralContract.methods.deposit(metaAddress.value)
        let payGasLimit = await payMethod.estimateGas({ from: metaAddress.value })
        const tx = await payMethod.send({ from: metaAddress.value, gasLimit: Math.floor(payGasLimit * 5), value: amount })
          .on('transactionHash', async (transactionHash) => {
            console.log('transactionHash:', transactionHash)
            cpCollateralCont.tx_hash = transactionHash
            cpCollateralCont.show = false
          })
          .on('error', () => cpCollateralCont.show = false)
      } catch (err) {
        console.log('err', err)
        if (err && err.message) messageTip('error', err.message)
        cpCollateralCont.show = false
      }
    }
    async function cpCheck () {
      const net = await checkNetwork()
      if (net) return
      cpCheckCont.diagle = true
      cpCheckCont.show = true
      try {
        const taskBalance = await collateralContract.methods.frozenBalance(metaAddress.value).call()
        const balances = await collateralContract.methods.balances(metaAddress.value).call()
        cpCheckCont.balance = web3Init.utils.fromWei(String(balances), 'ether') || 0
        cpCheckCont.taskBalance = web3Init.utils.fromWei(String(taskBalance), 'ether') || 0
      } catch{ }
      // const cpRes = await cpCollateralData()
      // if (cpRes) {
      //   messageTip(cpRes.status, cpRes.message)
      //   cpCheckCont.tip = cpRes.message
      //   cpCheckCont.balance = cpRes.data.balance ? web3Init.utils.fromWei(String(cpRes.data.balance), 'ether') : 0
      //   cpCheckCont.status = cpRes.status
      // }
      cpCheckCont.show = false
    }
    async function currentMethod(key) {
      currentNetwork.value = key
      window.location.reload()
    }
    onMounted(async () => { })
    watch(route, (to, from) => {
      window.scrollTo(0, 0)
    })
</script>

<style lang="less" scoped>
#container {
  font-size: var(--font-16);
  line-height: 1.6;
  .flex {
    display: flex;
    align-items: center;
  }
  :deep(.el-button) {
    border: 0;
    border-radius: 0.08rem;
    background-color: #88acff;
    // background: linear-gradient(45deg, #025bd5, #3c73ec);
    color: white;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    font-family: inherit;
  }
  .swan-logo {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0;
    .swan-icon {
      @media screen and (max-width: 600px) {
        width: 100%;
      }
      img {
        height: 0.45rem;
        margin: 0 0.2rem 0 0;
        @media screen and (max-width: 767px) {
          height: 30px;
        }
      }
    }
    .swan-right {
      @media screen and (max-width: 600px) {
        flex-wrap: wrap;
        justify-content: flex-end;
        width: 100%;
        margin: 6px 0 0;
      }
    }
    .pcShow {
      display: block !important;
      @media screen and (max-width: 768px) {
        display: none !important;
      }
    }
    .mobileShow {
      display: none !important;
      @media screen and (max-width: 768px) {
        display: block !important;
      }
    }
    :deep(.el-select) {
      width: auto;
      margin: 0 0.1rem 0 0;
      font-size: inherit;
      .el-tooltip__trigger {
        margin: 0;
        width: auto;
        height: auto;
        padding: 0.04rem 0.22rem 0.04rem 0.12rem;
        background-color: transparent;
        font-size: inherit;
        font-family: inherit;
        border: 1px solid var(--color-light);
        border-radius: 0.3rem;
        box-shadow: none;
        @media screen and (max-width: 767px) {
          padding: 0.04rem 0.1rem;
        }
        .el-select__prefix {
          margin: 0 0.06rem 0 0;
          line-height: 1.2;
          color: var(--color-light);
          .icon {
            width: 0.3rem;
            height: 0.3rem;
            margin: 0 0.07rem 0 0;
            @media screen and (max-width: 1024px) {
              width: 20px;
              height: 20px;
              margin: 0 0.03rem 0 0;
            }
            &.icon-swanProxima {
              background: url(../../assets/images/logo-swan.png) no-repeat center;
              background-size: 90%;
            }
          }
        }
        .el-select__selection {
          display: none;
          .el-select__selected-item {
            position: relative;
            top: auto;
            margin: 0 0.06rem 0 0;
            transform: translateY(0px);
            line-height: 1.2;
            color: #000;
            &.is-hidden {
              display: none;
            }
          }
        }
        .el-select__suffix {
          .el-select__icon {
            background: url(../../assets/images/icons/icon-02.png) no-repeat center;
            background-size: 90%;
            svg {
              display: none;
            }
          }
        }
      }
    }
    .nav {
      color: var(--color-light);
      @media screen and (max-width: 599px) {
        width: 100%;
        margin: 0 0 6px;
      }
      a {
        padding: 6px;
        margin: 0 0.05rem;
        color: inherit;
        border-radius: 8px;
        &:hover,
        &.active {
          background-color: rgb(21, 23, 28);
          color: var(--color-primary);
        }
        @media screen and (max-width: 599px) {
          padding: 6px 2px;
        }
      }
    }
    .web3Modal-style {
      button {
        background-color: var(--color-primary) !important;
      }
    }
    .header-right {
      .setting-style {
        width: 30px;
        height: 30px;
        padding: 0;
        margin: 0 0 0 0.1rem;
        background-color: var(--color-light);
        // background: linear-gradient(45deg, #025bd5, #3c73ec) !important;
        cursor: pointer;
        border-radius: 0.08rem;
        transition: all 0.2s;
        outline: none;
        @media screen and (max-width: 767px) {
          width: 28px;
          height: 28px;
        }
        &:hover {
          // background-color: transparent !important;
        }
        * {
          cursor: pointer;
        }
        i,
        svg,
        path {
          width: 18px;
          height: 18px;
          margin: 0 auto;
          color: var(--color-primary);
        }
        .el-sub-menu__icon-arrow {
          display: none;
        }
        .el-sub-menu__title {
          padding: 0;
        }
      }
      .set {
        align-items: center;
        vertical-align: middle;
        * {
          vertical-align: middle;
        }
        .el-button-group > .el-button {
          border-radius: 7px;
          &:first-child {
            padding-left: 10px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          &:last-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
        .el-icon {
          margin: auto;
          cursor: pointer;
          color: #fff;
          svg {
            width: 1em;
            cursor: pointer;
            path {
              cursor: pointer;
            }
          }
        }
      }
    }
    .el-button {
      font-family: inherit;
      font-size: inherit;
    }
  }
}

:deep(.el-overlay-dialog) {
  display: flex;
  align-items: center;
  .wrongNet {
    padding: 0;
    margin: auto !important;
    box-shadow: 0 0 13px rgba(128, 128, 128, 0.8);
    border-radius: 0.2rem;
    text-align: left;
    .el-dialog__header {
      padding: 0.1rem 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #dfdfdf;
      color: #000;
      font-size: 0.2rem;
      font-weight: 500;
      line-height: 1;
      text-transform: capitalize;
      @media screen and (max-width: 479px) {
        padding: 0.3rem 0.2rem;
      }
      .el-dialog__headerbtn {
        position: relative;
        top: auto;
        right: auto;
        font-size: inherit;
        i {
          font-size: inherit;
          * {
            cursor: pointer;
          }
          &:hover {
            color: #7405ff;
          }
        }
      }
      .el-dialog__title {
        font-size: inherit;
      }
    }
    .el-dialog__body {
      position: relative;
      padding: 0.2rem 0.4rem 0.3rem;
      font-size: 0.16rem;
      @media screen and (max-width: 540px) {
        padding: 0.2rem;
      }
      label {
        word-break: break-word;
        line-height: 1;
        color: #666;
        font-size: inherit;
      }
      .address {
        background: rgba(233, 233, 233, 1);
        padding: 8px;
        margin: 10px 0 12px;
        border-radius: 8px;
        font-size: inherit;
      }
      .area {
        flex-wrap: wrap;
        justify-content: space-between;
        .fast {
          width: 48%;
          &.width {
            width: 100%;
          }
          .address {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .error {
            font-size: 12px;
            color: firebrick;
          }
          .el-input-number {
            width: 100%;
            .el-input-number__decrease,
            .el-input-number__increase {
              display: none;
            }
            .el-input__inner {
              text-align: left;
            }
          }
        }
      }
    }
  }
}
:deep(.apikey_body) {
  width: 570px;
  border-radius: 0.23rem;
  text-align: left;
  color: #000;
  word-break: break-word;
  @media screen and (max-width: 600px) {
    width: 94%;
  }
  .el-dialog__body {
    .add-button {
      height: auto;
      margin: 0 0 0.2rem;
      padding: 0.1rem 0.15rem;
      background-color: var(--color-primary);
      border-color: var(--color-primary);
      border-radius: 4px;
      font-size: 14px;
      @media screen and (max-width: 768px) {
        font-size: 13px;
      }
    }
    .el-input {
      border-color: #ececed;
      .el-input__inner {
        height: auto;
        padding: 0.12rem 0.15rem;
        background-color: #fff !important;
        border-right: 0;
        border-color: inherit;
        line-height: 1;
      }
      .el-input-group__append {
        padding: 0 0.15rem;
        background-color: #fff;
        border-left: 0;
        border-color: inherit;
      }
      .action {
        height: 100%;
      }
      .icon {
        width: 16px;
        height: 16px;
        margin: 0 3px;
        cursor: pointer;
        @media screen and (min-width: 1800px) {
          width: 18px;
          height: 18px;
        }
        &:hover {
          opacity: 0.7;
        }
      }
      .el-input__suffix {
        right: 0;
        .el-icon {
          font-size: 0.2rem;
          cursor: pointer;
          svg,
          path {
            cursor: pointer;
          }
        }
      }
    }
    .el-table {
      border-top: 1px solid #f1f1f1;
      border-bottom: 1px solid #cacaca;
      .el-table__header-wrapper {
        .has-gutter {
          tr {
            background-color: #f2f2f2;
          }
        }
      }
      tr {
        font-size: 12px;
        line-height: 1.2;
        border-radius: 0.08rem;
        th {
          height: 0.4rem;
          padding: 0;
          text-align: center;
          border-bottom: 1px solid #f1f1f1;
          .cell {
            word-break: break-word;
            font-weight: 500;
            color: #565656;
            text-transform: uppercase;
            line-height: 1.2;
          }
        }
        th:first-child {
          border-top-left-radius: 0.08rem;
          border-bottom-left-radius: 0.08rem;
        }
        th:last-child {
          border-top-right-radius: 0.08rem;
          border-bottom-right-radius: 0.08rem;
        }
        td {
          border-top: 1px solid #f1f1f1;
          .cell {
            padding: 0;
            word-break: break-word;
            color: #000;
            text-align: center;
            line-height: 1.4;
            .el-rate__icon {
              font-size: 0.16rem;
              margin-right: 0;
              @media screen and (max-width: 768px) {
                font-size: 14px;
              }
            }
            .revoke {
              .el-button {
                width: auto;
                height: auto;
                min-width: 0.5rem;
                padding: 5px 0;
                background: var(--color-primary);
                border-color: var(--color-primary);
                font-family: inherit;
                font-size: inherit;
                border: 0;
                color: var(--color-light);
                line-height: 1.2;
                cursor: pointer;
              }
            }
            .el-button.el-icon-upload {
              padding: 0 0.1rem;
              line-height: 0.25rem;
              font-size: 0.1372rem;
            }
            .bot {
              justify-content: center;
              p {
                font-size: 0.1372rem;
                padding: 0 0.08rem;
                margin: 0 0.05rem;
                border: 1px solid #0b318f;
                border-radius: 0.05rem;
                cursor: pointer;
              }
              p.color {
                background: #0b318f;
                color: var(--color-light);
              }
              .el-radio {
                margin: 0;
                .el-radio__input {
                  display: none;
                }
                .el-radio__label {
                  display: block;
                  font-size: 0.1372rem;
                  padding: 0 0.04rem;
                  margin: 0 0.01rem;
                  border: 1px solid #0b318f;
                  border-radius: 0.05rem;
                  cursor: pointer;
                  line-height: 1.8;
                }
                .el-radio__input.is-checked + .el-radio__label {
                  background: #0b318f;
                  color: var(--color-light);
                }
              }
            }
            .icon_copy {
              width: 16px;
              height: 16px;
              margin: -1px 0 0 0.07rem;
              cursor: pointer;
              @media screen and (min-width: 1800px) {
                width: 18px;
                height: 18px;
              }
              svg,
              path {
                width: 100%;
                height: 100%;
              }
              &:hover {
                opacity: 0.7;
              }
            }
          }
        }
        td.el-table_1_column_1 {
          .cell {
            // color:#0c3090
          }
        }
      }
    }
  }
}
:deep(.add_body) {
  width: 40%;
  max-width: 770px;
  min-width: 310px;
  border-radius: 0.13rem;
  text-align: left;
  @media screen and (max-width: 768px) {
    width: 60%;
  }
  @media screen and (max-width: 441px) {
    width: 90%;
  }
  .el-dialog__header {
    padding: 0.17rem 0.25rem 0.1rem;
    font-size: 17px;
    color: #000;
    @media screen and (max-width: 768px) {
      font-size: 15px;
    }
    @media screen and (min-width: 1800px) {
      font-size: 18px;
    }
  }
  .el-dialog__body {
    padding: 0;
    .el-form {
      padding: 0.15rem 0.25rem 0;
      .el-form-item {
        .el-form-item__content {
          .label {
            color: #000;
            font-size: 15px;
            @media screen and (max-width: 768px) {
              font-size: 14px;
            }
            @media screen and (min-width: 1800px) {
              font-size: 17px;
            }
          }
          .flex {
            width: 100%;
          }
          .el-input {
            .el-input__inner {
              // background: linear-gradient(180deg, #fefefe, #f0f0f0);
            }
          }
        }
      }
    }
  }
  .el-dialog__footer {
    padding: 0 0.25rem 0.25rem;
    text-align: left;
    .el-button {
      width: auto;
      height: auto;
      padding: 0.07rem 0.15rem;
      margin: 0 0.15rem 0 0;
      background: linear-gradient(180deg, #fefefe, #f0f0f0);
      font-family: inherit;
      font-size: 16px;
      line-height: 1;
      color: #000;
      border-radius: 0.07rem;
      @media screen and (max-width: 1600px) {
        font-size: 14px;
      }
      &:hover {
        opacity: 0.9;
        span {
          cursor: pointer;
        }
      }
      &.is-disabled {
        opacity: 0.5;
        border-color: #e3e6eb;
      }
    }
  }
}
</style>

<style lang="less">
.menu-style {
  border-radius: 0.1rem;
  border-top-right-radius: 0.05rem;
  .el-dropdown-menu {
    position: relative;
    border-radius: 0.1rem;
    border-top-right-radius: 0.05rem;
    &:first-child {
      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 12px;
        right: 12px;
        height: 1px;
        background-color: #e7e7e7;
      }
    }
    .el-dropdown-menu__item {
      min-width: 170px;
      padding: 2px 12px;
      &:hover,
      &:focus {
        background-color: #fbfbfc;
        color: #000;
        // background-color: rgba(116, 5, 255, 0.1);
        // color: rgba(116, 5, 255, 1);
        .link {
          text-decoration: underline;
        }
      }
      .link {
        padding: 5px 0;
        cursor: pointer;
      }
      .profile {
        width: 100%;
        padding: 0;
        margin: 0;
        // &.router-link {
        //   display: block;
        //   width: 100%;
        //   height: auto;
        //   padding: 3px 3px 3px 22px;
        //   &:hover {
        //     text-decoration: underline;
        //   }
        // }
        // &.b {
        // }
        cursor: pointer;
        * {
          cursor: pointer;
        }
        .tit {
          font-size: 12px;
          color: #989898;
          line-height: 1.5;
        }
        .flex {
          img {
            margin-right: 7px;
            border-radius: 100%;
          }
          .link {
            padding: 2px 0;
          }
          .icon {
            width: 0.23rem;
            height: 0.23rem;
            margin: 0 0.1rem 0 0;
            @media screen and (max-width: 1024px) {
              width: 14px;
              height: 14px;
            }
            &.icon-Overview {
              background: url(../../assets/images/menu-01.png) no-repeat;
              background-size: 100%;
            }
            &.icon-Rankings-fcp {
              background: url(../../assets/images/menu-03.png) no-repeat;
              background-size: 100%;
            }
            &.icon-Rankings-ecp {
              background: url(../../assets/images/menu-02.png) no-repeat;
              background-size: 100%;
            }
            &.icon-AccountInfo {
              background: url(../../assets/images/menu-04.png) no-repeat;
              background-size: 100%;
            }
            &.icon-Resource {
              background: url(../../assets/images/menu-05.png) no-repeat;
              background-size: 100%;
            }
            &.icon-AAR {
              background: url(../../assets/images/menu-06.png) no-repeat;
              background-size: 100%;
            }
            &.icon-new {
              display: inline-block;
              width: 0.35rem;
              height: 0.15rem;
              margin: 0.03rem 0 0;
              background: url(../../assets/images/new.png) no-repeat center;
              background-size: auto 100%;
            }
          }
        }
      }
      .set {
        vertical-align: middle;
        * {
          vertical-align: middle;
        }
        .el-button-group > .el-button {
          border-radius: 7px;
          &:first-child {
            padding-left: 10px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          &:last-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
        .el-icon {
          margin: auto;
          cursor: pointer;
          svg {
            width: 1em;
            cursor: pointer;
            path {
              cursor: pointer;
            }
          }
        }
        .loginImg {
          cursor: pointer;
          img {
            width: 23px;
            height: 23px;
            margin: 0 5px 0 0;
            cursor: pointer;
            background-color: #fff;
            border: 1px solid #b9b9b9;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
