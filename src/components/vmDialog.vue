<template>
  <div class="flex flex-ai-center flex-jc-center">
    <el-dialog v-model="props.centerDrawerVisible" :show-close="true" :close-on-click-modal="true" :close-on-press-escape="false" @before-close="closeHandle()" @close="closeHandle()" align-center class="dialog-body">
      <template #header>
        <div class="flex flex-ai-center font-24 header-title">
          <span v-if="props.list.type === 'claimAccount'">Signature Verifcation</span>
          <span v-else-if="props.list.type === 'Sequencer'">Add Sequencer</span>
          <span v-else>{{`${props.list.type} Collateral`}}</span>
        </div>
      </template>

      <div class="dialog-content font-14">
        <div v-if="props.list.type === 'claimAccount'">
          <el-form ref="ruleAddRef" :model="ruleForm" :rules="rules" label-position="top" class="demo-ruleForm font-14" status-icon @submit.native.prevent>
            <el-form-item prop="owner_address">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">Owner Address</div>
              </template>
              <label class="label">
                <div class="flex flex-ai-center">
                  {{metaAddress || '-'}}
                </div>
              </label>
            </el-form-item>
            <el-form-item prop="name">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">Account Name
                  <span class="red">*</span>
                </div>
              </template>
              <label class="label" for="name">
                <div class="flex flex-ai-center">
                  <el-input v-model="ruleForm.name" placeholder=" " />
                </div>
              </label>
            </el-form-item>
            <el-form-item prop="email">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">Email Address
                  <span class="red">*</span>
                </div>
              </template>
              <label class="label" for="email">
                <div class="flex flex-ai-center">
                  <el-input v-model="ruleForm.email" placeholder=" " />
                </div>
              </label>
            </el-form-item>
            <el-form-item prop="message">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">message</div>
              </template>
              <div class="server font-14">
                <!--  {{sortanow}} -->
                <p class="flex flex-ai-center flex-jc-center">Signing message for CP Account {{metaAddress}} on Swan Provider Dashboard at {{sortanow}}</p>
              </div>
            </el-form-item>
            <el-form-item prop="sign_code">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">Sign code</div>
              </template>
              <div class="flex flex-ai-center nowrap copy-style width">
                <div class="server sign-code font-14">{{'computing-provider wallet sign Owner Address'}}{{props.list.owner_address}}</div>
                <svg @click="copyContent('computing-provider wallet sign XXXX XXXXXXXXXXXXXXXXXXXXXXXX', 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16"
                  height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
            </el-form-item>
            <el-form-item prop="signature">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">signature
                  <span class="red">*</span>
                </div>
              </template>
              <label class="label" for="signature">
                <div class="flex flex-ai-center">
                  <el-input v-model="ruleForm.signature" placeholder="Copy the above sign code, sign it and enter the signature" />
                </div>
              </label>
            </el-form-item>
          </el-form>
        </div>
        <el-row class="font-14 note" v-else-if="props.list.type === 'Sequencer'" v-loading="ruleForm.show">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p>Available Balance:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p class="color"><span class="blue">0.9984</span> SWANC</p> 
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p>Sequencer Balance:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p class="color"><span class="blue">0.9984</span> SWANC</p> 
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p>Add Amount:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <div class="flex flex-ai-center nowrap">
              <el-input-number v-model="ruleForm.amount" :min="0" :step="0.25" controls-position="right" />
              <span class="text-white">&nbsp;&nbsp;SWANC</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="font-14 note" v-else v-loading="ruleForm.show">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p>Available Balance:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p class="color"><span class="blue">0.9984</span> SWANC</p> 
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p>{{props.list.type}} Collateral Balance:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p class="color"><span class="blue">0.9984</span> SWANC</p> 
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p>{{props.list.type}} Locked Balance:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p class="color"><span class="blue">0.9984</span> SWANC</p> 
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p>Collateral Amount:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <div class="flex flex-ai-center nowrap">
              <el-input-number v-model="ruleForm.amount" :min="0" :step="0.25" controls-position="right" />
              <span class="text-white">&nbsp;&nbsp;SWANC</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <div class="dialog-footer flex flex-ai-center flex-end font-14">
          <el-button @click="closeHandle()">Cancel</el-button>
          <el-button @click="cpCollateral" :disabled="!ruleForm.amount" type="primary">Submit</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  Warning
} from '@element-plus/icons-vue'
import * as echarts from "echarts"
import CollateralABI from '@/utils/abi/CollateralContract.json'
import { metaAddress } from '@/utils/storage';
import { copyContent, getDateTime, messageTip } from '@/utils/common';
import web3Init from '@/utils/login';

const props = withDefaults(
  defineProps<{
    list?: any
    centerDrawerVisible?: boolean
  }>(),
  {
    list: {
      type: Object,
      default: {
        type: 'FCP'
      }
    },
    centerDrawerVisible: false
  }
)
  
    const cpLoad = ref(false)
    const sortanow = ref('')
    const ruleForm = reactive({
      name: '',
      email: '',
      sign_code: '',
      signature: '',
      amount: 0.25,
      show: false,
      tx_hash: ''
    })
    const rules = reactive({
      name: [
        { required: true, message: 'This field is required.', trigger: 'blur' },
      ],
      email: [
        { required: true, message: 'This field is required.', trigger: 'blur' },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        }
      ],
      signature: [
        { required: true, message: 'This field is required.', trigger: 'blur' },
      ]
    })
    const collateralAddress = import.meta.env.VITE_COLLATERAL_CONTACT
    const collateralContract = new web3Init.eth.Contract(CollateralABI, collateralAddress)

    function closeHandle (type) {
      context.emit('hardClose', false, type)
    }
    function cpCollateral () {
      ruleForm.show = true
      try {
        if (Number(ruleForm.amount) >= 0) cpDeposit()
        else ruleForm.show = false
      } catch{
        ruleForm.show = false
      }
    }
    async function cpDeposit () {
      try {
        const amount = web3Init.utils.toWei(String(ruleForm.amount), 'ether')

        let payMethod = collateralContract.methods.deposit(metaAddress.value)
        let payGasLimit = await payMethod.estimateGas({ from: metaAddress.value })
        const tx = await payMethod.send({ from: metaAddress.value, gasLimit: Math.floor(payGasLimit * 5), value: amount })
          .on('transactionHash', async (transactionHash) => {
            console.log('transactionHash:', transactionHash)
            ruleForm.tx_hash = transactionHash
            ruleForm.show = false
          })
          .on('error', () => ruleForm.show = false)
      } catch (err) {
        console.log('err', err)
        if (err && err.message) messageTip('error', err.message)
        ruleForm.show = false
      }
    }
    onMounted(async () => {
      // const rightnow = (Date.now() / 1000).toFixed(0)
      // sortanow.value = rightnow - (rightnow % 600)
      sortanow.value = getDateTime()
    })
</script>

<style lang="less">
.el-overlay {
  .dialog-body {
    width: 35%;
    max-width: 900px;
    min-width: 320px;
    padding-top: 5px;
    border-radius: 6px;
    word-break: break-word;
    color: #6c6f72;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      .dialog-content {
        padding: 0.12rem 0;
        line-height: 1.4;
        cursor: text;
        .note {
          padding: 0.12rem 0.25rem;
          margin: 0.16rem 0;
          border: 1px solid var(--color-border);
          border-radius: 0.1rem;
          &.b {
            border-radius: 0.2rem;
          }
          .el-col {
            margin: 0.08rem 0;
            p {
              color: #000;
              &.color {
                .green {
                  color: #8dd565;
                }
                .orange {
                  color: #ff9413;
                }
                .blue {
                  color: #6067f5;
                }
              }
            }
            .badge {
              display: flex;
              align-items: center;
              white-space: normal;
              word-break: break-word;
              img {
                width: 30px;
                height: 30px;
                margin-right: 5px;
                @media screen and (max-width: 1260px) {
                  width: 25px;
                  height: 25px;
                }
              }
            }
            .chart-trends {
              width: 100%;
              margin: 0 auto 0.24rem;
              height: 2.3rem;
              @media screen and (max-width: 768px) {
                height: 250px;
              }
              @media screen and (max-width: 600px) {
                height: 200px;
              }
            }
            .el-input-number {
              .el-input{
                font-size: inherit;
              }
            }
          }
        }
        .el-form {
          width: 100%;
          padding: 0;
          .el-form-item {
            margin: 0 0 0.15rem;
            --font-size: inherit;
            &:last-child {
              margin-bottom: 0.1rem;
            }
            .el-form-item__label {
              margin: 0 0 0.04rem;
              &:before {
                display: none;
              }
              .red {
                padding: 0 0 0 0.1rem;
                color: #f56c6c;
              }
            }
            .el-form-item__content {
              line-height: 1.2;
              @media screen and (max-width: 768px) {
                width: 100%;
              }
              @media screen and (max-width: 600px) {
                width: 100%;
                flex: auto;
              }
              .spacing {
                width: 25px;
              }
              .label {
                width: 100%;
                text-align: left;
                color: #606060;
                .unit {
                  margin: 0 0 0 8px;
                  white-space: nowrap;
                }
              }
              .el-input,
              .el-textarea,
              .el-select {
                width: 100%;
                margin: 0;
                font-family: inherit;
                font-size: inherit;
                &.is-disabled {
                  background-color: #e5e7ed;
                  border-radius: 5px;
                  .el-input__wrapper,
                  .el-textarea__inner,
                  .el-select__wrapper {
                    border-color: #e5e7ed;
                  }
                }
                .el-input__wrapper,
                .el-textarea__inner,
                .el-select__wrapper {
                  width: 100%;
                  height: auto;
                  padding: 8px 12px;
                  background-color: transparent;
                  font-family: inherit;
                  font-size: inherit;
                  line-height: 1.2;
                  border-radius: 5px;
                  border: 1px solid var(--color-primary);
                  box-shadow: none;
                  &.el-select__wrapper {
                    padding: 11px 12px;
                  }
                  @media screen and (max-width: 768px) {
                    width: 100%;
                  }
                  .el-input__inner {
                    height: auto;
                    color: var(--color-dark);
                    line-height: 1.2;
                  }
                }
              }
              .el-form-item__error {
                font-size: 12px;
              }
            }
          }
        }
        .copy-style {
          cursor: pointer;
          flex-wrap: wrap;
          svg {
            margin: 0 0 0 0.05rem;
          }
        }
        .server {
          width: 100%;
          padding: 13px 10px;
          margin: 0;
          background-color: #e5e7ed;
          border-radius: 6px;
          color: #7f828c;
          &.sign-code {
            width: calc(100% - 50px);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: text;
          }
          b {
            padding: 0 0 0 6px;
          }
        }
      }
    }
    .el-dialog__footer {
      padding: 0;
      .dialog-footer {
        .el-button {
          font-family: inherit;
          font-size: inherit;
        }
      }
    }
  }
}
</style>
