<template>
  <div class="login">
    <el-row
      class="min-h-screen"
    >
      <el-col :lg="16" :md="12" class="flex items-center justify-center" style="
        background-image: url('/images/2.jpg');
        background-size: 100% 100%;
      ">
        <!-- 填充背景蓝色 -->
        <div>
          <!-- <div class="font-bold text-3xl text-light-200 mb-4">欢迎光临</div>
          <div>Mark框架学习</div> -->
        </div>
      </el-col>
      <el-col
        :lg="8"
        :md="12"
        class="bg-light-300 flex items-center justify-center flex-col"
      >
        <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
        <div
          class="flex items-center justify-center my-5 text-gray-300 space-x-2"
        >
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span class="font-bold">账号密码登录</span>
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>

        <el-form
          ref="formRef"
          class="w-[250px]"
          :model="ruleForm"
          :rules="rules"
        >
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon class="el-input__icon"><user /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              placeholder="请输入密码"
              show-password
            >
              <template #prefix>
                <el-icon class="el-input__icon"><lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <!-- 验证邮箱 -->
          <el-form-item prop="emailcode">
            <el-input
              type="text"
              v-model="ruleForm.emailcode"
              placeholder="请输入邮箱验证码"
              style="width: 155px"
            >
              <template #prefix>
                <el-icon class="el-input__icon"><message /></el-icon>
              </template>
            </el-input>
            <!-- 验证码按钮  -->
            <el-button
              round
              type="primary"
              style="width: 80px; margin-left: 8px"
              :class="{ canClick: !canClick }"
              @click="countDown"
              >{{ content }}</el-button
            >
          </el-form-item>

          <el-form-item>
            <el-button
              round
              color="#626aef"
              class="w-[250px]"
              type="primary"
              :loading="loading"
              @click="submitForm()"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<script setup>
import { reactive, ref } from "vue";
import { login, sendEmailcode } from "@/api/manager";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useCookies } from "@vueuse/integrations/useCookies";
import { onMounted, onBeforeUnmount } from "vue";

const ruleForm = reactive({
  username: "",
  password: "",
  emailcode: "",
});

const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" },
  ],
  emailcode: [
    { required: true, message: "请输入邮箱验证码", trigger: "blur" },
    // { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' },
  ],
});

const formRef = ref(null);
const loading = ref(false);
const router = useRouter();
const store = useStore();

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (!valid) return false;
    loading.value = true;
    login(ruleForm.username, ruleForm.password, ruleForm.emailcode)
      .then((res) => {
        // console.log(res)
        ElNotification({
          message: "登入成功",
          type: "success",
          duration: 3000,
        });
        // 存储用户信息
        const cookie = useCookies();
        cookie.set("admin-token", res.token);
        // 获取用户信息
        // getUserInfo().then(res2=>{
        //   // console.log(res2.data.permissions)
        //   store.commit('SET_USERINFO', res2.permissions)
        // })
        // 跳转到首页
        router.push("/index");
      })
      .finally(() => {
        loading.value = false;
      });
  });
};

const content = ref("发送验证码");
const totalTime = ref(60);
const durationnextTime = ref(60);
const canClick = ref(true);

function debounce() {
  if (!canClick.value) {
    return;
  }
  canClick.value = false;
  content.value = totalTime.value + "秒";
  let clock = window.setInterval(() => {
    totalTime.value--;
    content.value = totalTime.value + "秒";
    if (totalTime.value < 0) {
      window.clearInterval(clock);
      content.value = "发送验证码";
      totalTime.value = durationnextTime.value; // 将持续时间重置为10s
      canClick.value = true; //这里重新开启
    }
  }, 1000);
}

// 发送邮箱验证码，倒计时
const countDown = () => {
  // console.log("发送邮件");
  debounce();
  sendEmailcode(ruleForm.username, ruleForm.password).then((res) => {
    // console.log(res)
    ElNotification({
      message: res.message,
      type: "success",
      duration: 3000,
    });
  });
};

// 回车登录
function enterkey(e) {
  // 监听回车事件
  if (e.keyCode == 13) {
    submitForm();
  }
}

onMounted(() => {
  // 监听键盘enter事件
  document.addEventListener("keyup", enterkey);
});

onBeforeUnmount(() => {
  //移除键盘enter事件
  document.removeEventListener("keyup", enterkey);
});
</script>

<style scoped>
</style>