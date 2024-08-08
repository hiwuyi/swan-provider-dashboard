<template>
  <div class="home-header flex-column flex-ai-center flex-jc-center">
    <div class="home-header-wallet header flex flex-ai-center flex-jc-center">
      <div class="header flex flex-ai-center flex-jc-between">
        <header-logo></header-logo>
        <w3m-button balance="hide" size="sm" />
      </div>
    </div>
    <div class="header flex flex-ai-center flex-jc-center mb-16">
      <div class="header-title font-38 font-bold font-weight-9 text-center">Swan Credit Token Faucet</div>
    </div>
    <div class="home-header-connect flex flex-jc-center">
      <div class="home-header-address font-16 mr-10">
        <el-input v-model="account_owner" placeholder="Connect your wallet" readonly @input="userInput" type="text" />
        <p class="error mt-4" v-show="addressError">Please enter a valid Ethereum address</p>
      </div>
      <div :class="`home-header-btn home-header-btnSend btn flex flex-ai-center font-16 ${chainId !== 254 || account_owner === '' || loaded ? 'btn-disabled' : ''}`" @click="start">{{loaded ? 'Loading...' : 'send me swan credit token'}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const web3 = new Web3((window as any).ethereum)
import HeaderLogo from './header-logo.vue'
import { ElMessage } from 'element-plus'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/vue'
import { reconnect, disconnect } from '@wagmi/core'
import { getChainId, getAccount, readContract, watchAccount } from '@wagmi/core'
import configJS from '@/utils/config'

const projectId = configJS.projectId
const config = configJS.config
reconnect(config)
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  themeVariables: {
    '--w3m-accent': '#447dff',
    '--w3m-border-radius-master': '14px',
  }
})

let account = reactive(getAccount(config))
const account_owner = ref('')
const addressError = ref(false)

function userInput () {
  addressError.value = !web3.utils.isAddress(account_owner.value)
}

watchAccount(config, {
  async onChange (account, prevAccount) {
    try {
      // console.log('watch', account)
      // console.log('prev', prevAccount)
      if (account?.isConnected) {
        account_owner.value = account.address ?? ''
      } else if (!account ?.isConnected && prevAccount ?.isConnected) {
        account_owner.value = ''
      }
    } catch(err: any) {
      console.log(err)
    }
  },
})

let beginTime = 0; 
window.onbeforeunload = function () {
  beginTime = new Date().getTime();
}
window.onunload = function () {
  let differTime = new Date().getTime() - beginTime;
  if (differTime <= 5) {
    disconnect(config)
  }
}

const chainId = getChainId(config)
const loaded = ref(false)

async function start() {
  const time = await throttle()
  if (!time) return false
  const tokenABI = [
    {
      inputs: [],
      name: 'claimTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ]
  try {
    const getnetID = await web3.eth.net.getId()
    const accountArray = await web3.eth.getAccounts()
    if(chainId !== 254 || getnetID !== 254 || account_owner.value === '' || addressError.value) return

    loaded.value = true
    const claimTokenContract = new web3.eth.Contract(
      tokenABI,
      import.meta.env.VITE_CONTRACT_ADDRESS
    )

    let gasLimit = await claimTokenContract.methods
      .claimTokens()
      .estimateGas({ from: account_owner.value })

    const tx = await claimTokenContract.methods
      .claimTokens()
      .send({
        from: account_owner.value,
        gasLimit: Math.floor(gasLimit * 1.5)
      })
      .on('transactionHash', async (transactionHash: any) => {
        console.log('claim transactionHash:', transactionHash)
      })
      .on('receipt', async (receipt: any) => {
        console.log('claim receipt:', receipt)
      })
      .on('error', () => {})
    loaded.value = false
  } catch (err: any) {
    loaded.value = false
    console.log('err', err.message)
    if (err?.message) {
      try { 
        const str = JSON.stringify(err.message)
        const jsonStr = str.match(/\{[\s\S]*?\}/g)[0]
        const cleanedString = removeSpecialChars(jsonStr)
        const obj = JSON.parse(cleanedString)
        ElMessage.error(obj.message)
      } catch (e) {
        ElMessage.error(err.message)
      }
    }
  }
}
function removeSpecialChars(str) {
  str = str.replace(/\\n/g, '')
  str = str.replace(/\\/g, '')
  return str
}

let lastTime = 0
async function throttle () {
  // Prevent multiple signatures
  let now = new Date().valueOf()
  if (lastTime > 0 && now - lastTime <= 2000) return false
  lastTime = now
  return true
}

// onMounted(() => {})
</script>

<style lang="less" scoped>
.home-header {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  &-wallet {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    padding: 0.1rem;
    border-bottom: 0.01042rem solid rgba(235, 239, 249, 0.3);
    z-index: 9;
    .header {
      width: 76%;
      max-width: 1460px;
      min-width: 320px;
    }
  }
  &-connect {
    max-width: 90%;
    padding: 0.32rem;
    @media screen and (max-width: 600px) {
      flex-wrap: wrap;
    }
  }
  &-btn {
    width: auto;
    height: 41px;
    padding: 0 0.24rem;
    line-height: 1;
    user-select: none;
    @media screen and (max-width: 600px) {
      height: 32px !important;
    }
  }
  &-btnSend {
    text-transform: capitalize;
  }
  &-address {
    :deep(.el-input) {
      width: 440px;
      border-radius: 14px !important;
      @media screen and (max-width: 600px) {
        width: 300px;
        margin: 0 0 16px;
      }
      .el-input__wrapper {
        height: 41px !important;
        padding: 0 0.16rem;
        @media screen and (max-width: 600px) {
          height: 32px !important;
        }
        .el-input__inner {
          font-family: inherit;
          cursor: no-drop;
        }
      }
    }
    .error {
      font-size: 12px;
      color: #eaeaea;
    }
  }
  .header {
    &-title {
      text-transform: uppercase;
    }
  }
}
</style>
