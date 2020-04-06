<template>
  <el-dialog
    :title="addFundDialog.title"
    :visible.sync="isVisible"
    :close-on-click-modal='false'
    :close-on-press-escape='false'
    :modal-append-to-body="false"
    @close="closeDialog"
  >
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        :rules="form_rules"
        :label-width="dialog.formLabelWidth"
        style="margin:10px;width:auto;"
      >
        <el-form-item prop='incomePayType' label="收支类型">
          <el-select v-model="form.incomePayType" placeholder="收支类型">
            <el-option
              v-for="item in payType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop='username' label="用户名:">
          <el-input type="text" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="address" label="籍贯:">
          <el-cascader
            ref="cascaderAddr"
            :options="areaData"
            v-model="form.address"
            :props="{ expandTrigger: 'hover'}"
            placeholder="请选择地区"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="income" label="收入:">
          <el-input v-model="form.income"></el-input>
        </el-form-item>
        <el-form-item prop="pay" label="支出:">
          <el-input v-model="form.pay"></el-input>
        </el-form-item>
        <el-form-item prop="accoutCash" label="账户现金:">
          <el-input v-model="form.accoutCash"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item class="text_right">
          <el-button @click="isVisible = false">取 消</el-button>
          <el-button type="primary" @click='onSubmit("form")'>提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import { addMoney, updateMoney } from "@/api/money"
import AreaJson from "@/assets/datas/area.json"

export default {
  name: "addFundDialogs",
  props: {
    isShow: Boolean,
    dialogRow: Object
  },
  data() {
    let validateData = (rule, value, callback) => {
      if(value === "") {
        let text = "";
        if(rule.field === "income") {
          text = "收入"
        } else if(rule.field === "pay") {
          text = "支出"
        } else if(rule.field === "accoutCash") {
          text = "账户现金"
        }
        callback(new Error(text + "不能为空"))
      } else {
        let numReg = /^([1-9][0-9]*)$/;
        if(numReg.test(Number(value))) {
          callback()
        } else {
          callback(new Error("请输入整数值"))
        }
      }
    }
    return {
      areaData: [], // 地区列表
      isVisible: this.isShow,
      form: {
        incomePayType: "", // 收支类型
        username: "", // 用户名
        address: [],  // 籍贯
        tableAddress: "",
        income: "", // 收入
        pay: "", // 支出
        accoutCash: "", // 账户现金
        remarks: "" // 备注
      },
      payType: [
        { label:'提现',value:'0' },
        { label:'提现手续费',value:'1' },
        { label:'提现锁定',value:'2' },
        { label:'理财服务退出',value:'3' },
        { label:'购买宜定盈',value:'4' },
        { label:'充值',value:'5' },
        { label:'优惠券',value:'6' },
        { label:'充值礼券',value:'7' },
        { label:'转账',value:'8' }
      ],
      // 验证规则
      form_rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        income: [
          {
            required: true,
            validator: validateData,
            trigger: "blur"
          }
        ],
        pay: [
          {
            required: true,
            validator: validateData,
            trigger: "blur"
          }
        ],
        accoutCash: [
          {
            required: true,
            validator: validateData,
            trigger: "blur"
          }
        ],
        incomePayType: [
          {
            required: true,
            message: "请选择收支类型",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            message: "请选择籍贯",
            trigger: "change"
          }
        ]
      },
      // 弹框信息
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      }
    }
  },
  created() {
    this.areaData = AreaJson
  },
  computed: {
    ...mapGetters(["addFundDialog"])
  },
  methods: {
    // 过滤数据
    getCascaderObj(val, opt) {
      return val.map(function (value, index, array) {
        for(var item of opt) {
          if(item.value === value) {
            opt = item.children;
            return item.label
          }
        }
      })
    },
    // 用户选择地区的时候触发
    handleChange(value) {
      this.form.address = [...value]
      let vals = this.getCascaderObj([...value], this.areaData)
      this.form.tableAddress = vals.join(',').replace(/,/g, "")
    },
    // 关闭弹窗
    closeDialog() {
      this.$emit("closeDialog")
    },
    // 提交表单
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if(valid) {
          let forData = this[form]
          const para = Object.assign({}, forData)
          console.log(para)
          if(this.addFundDialog.type === "edit") {
            updateMoney(para)
              .then(res => {
                this.$message({
                  message: "修改成功",
                  type: "success"
                })
                this.$refs[form].resetFields()
                this.isVisible = false
                this.$emit("getFundList")
              })
          } else {
            addMoney(para)
              .then(res => {
                this.$message({
                  message: "新增成功",
                  type: "success"
                })
                this.$refs[form].resetFields()
                this.isVisible = false
                this.$emit("getFundList")
              })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search_container {
  margin-bottom: 20px;
}
.btnRight {
  float: right;
  margin-right: 0px !important;
}
.searchArea {
  background-color: #fff;
  border-radius: 2px;
  padding: 18px 18px 0;
}
</style>
