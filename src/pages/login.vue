<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h4>智能运维预警平台</h4>
      <div class="login">
  <div>
    <div class="header">
      <!-- <h1 style="font-size: 3em;">CooCaa</h1>
      <h3>Login</h3>-->
      <canvas></canvas>
    </div>
    <div style="background: #ff5300;padding-bottom: 100px;">
      <div class="container">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <h4>检测系统</h4>
        <div class="login">
          <el-form-item label="账户" prop="acount">
            <el-input type="text" v-model="ruleForm.acount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    </div>
    <div class="canvas-wrap">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
let cvs, ctx;
let waves = [];
let waveHeight = 200;
let colours = ["#f2531c", "#ffffff", "#ff4f00"];
export default {
  name: "Login",
  data() {
    var validateAcount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账户"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        acount: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        acount: [{ validator: validateAcount }],
        pass: [{ validator: validatePass }],
        checkPass: [{ validator: validatePass2 }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.$router.push("/index");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    canvasBg: function() {
      this.init(colours);
      this.randomColour();
      document.addEventListener("DOMContentLoaded", this.init, false);
      // this.hidePassword();
    },
    init: function(colours) {
      cvs = document.getElementById("canvas");
      ctx = cvs.getContext("2d");
      ctx.rotate((120 * Math.PI) / 180);
      this.resizeCanvas(cvs); //重置
      for (let i = 0; i < 3; i++) {
        let temp = new this.wave(colours[i], 1, 5);
      }
      var temp = setInterval(()=>{
        try {
          this.update()
        } catch (error) {
          clearInterval(temp)
        }
      }, 16);
    },
    randomColour: function() {
      // body...
      var h = Math.round(Math.random() * 360);
      return "hsl(" + h + ",100%,50%)";
    },
    update: function(array) {
      // body...
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      var fill = window
        .getComputedStyle(document.querySelector(".header"), null)
        .getPropertyValue("background-color");
      ctx.fillStyle = fill;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.globalCompositeOperation = "screen";
      for (var i = 0; i < waves.length; i++) {
        for (var j = 0; j < waves[i].nodes.length; j++) {
          this.bounce(waves[i].nodes[j]);
        }
        this.drawWave(waves[i]);
        // this.drawLine(waves[i].nodes);
        // this.drawNodes(waves[i].nodes);
      }
      ctx.globalCompositeOperation = "hue";
      ctx.fillStyle = fill;
      //ctx.fillRect(0,0,cvs.width,cvs.height);
    },
    wave: function(colour, lambda, nodes) {
      // body...
      this.colour = colour;
      this.lambda = lambda;
      this.nodes = [];
      var tick = 1;
      for (var i = 0; i <= nodes + 2; i++) {
        var temp = [((i - 1) * cvs.width) / nodes, 0, Math.random() * 200, 0.3]; //this.speed*plusOrMinus
        this.nodes.push(temp);
      }
      waves.push(this);
    },
    bounce: function(node) {
      node[1] = (waveHeight / 2) * Math.sin(node[2] / 20) + cvs.height / 2;
      node[2] = node[2] + node[3];
    },
    drawWave: function(obj) {
      var diff = function(a, b) {
        return (b - a) / 2 + a;
      };
      ctx.fillStyle = obj.colour;
      ctx.beginPath();
      ctx.moveTo(0, cvs.height);
      ctx.lineTo(obj.nodes[0][0], obj.nodes[0][1]);
      for (var i = 0; i < obj.nodes.length; i++) {
        if (obj.nodes[i + 1]) {
          ctx.quadraticCurveTo(
            obj.nodes[i][0],
            obj.nodes[i][1],
            diff(obj.nodes[i][0], obj.nodes[i + 1][0]),
            diff(obj.nodes[i][1], obj.nodes[i + 1][1])
          );
        } else {
          ctx.lineTo(obj.nodes[i][0], obj.nodes[i][1]);
          ctx.lineTo(cvs.width, cvs.height);
        }
      }
      ctx.closePath();
      ctx.fill();
    },
    resizeCanvas: function(canvas, width, height) {
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
      } else {
        if (window.innerHeight > 1920) {
          canvas.width = window.innerWidth;
        } else {
          canvas.width = 1920;
        }

        canvas.height = waveHeight;
      }
    }
  },
  mounted() {
    this.canvasBg();
  }
};
</script>

<style>
.header {
    background-color: #ff5300;
    /* padding: 1rem; */
    color: #fff;
    text-align: center;
    position: relative;
  }
.container {
  user-select: none;
  background: #fff;
  width: 25%;
  min-width: 350px;
  margin: 0 auto;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 3px 3px 5px #bbb;
}
.login {
  margin-right: 40px;
}
.canvas-wrap {
  z-index: -999;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  top: 30%;
}
canvas {
  display: block;
  height: 100%;
}
</style>
