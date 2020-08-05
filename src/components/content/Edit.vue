<template>
  <div class="home-edit">
    <div class="edit_left">
      <input type="text" v-model="content.title" placeholder="输入标题" />
      <input type="text" v-model="content.introduction" placeholder="输入简介" />

      <el-upload
        action
        list-type="picture-card"
        :before-upload="uploadBefore"
        :http-request="picUpload"
        :on-success="successFunc"
        :on-preview="handlePictureCardPreview"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <div>
        <div class="markdown">
          <my-editor v-model="content.code" />
        </div>
      </div>

      <el-button type="primary" @click="saveContent">发布</el-button>
    </div>
    <div class="edit_right">
      <span>帖子发布在</span>
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item._id"
          :label="item.typename"
          :value="item.typename"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
let Base64 = require("js-base64").Base64;
//import { MarkdownPro } from "vue-meditor";
export default {
  // components: {
  //   MarkdownPro,
  // },
  created() {
    this.getTypes();
  },
  data() {
    return {
      options: [],
      content: {
        title: "",
        introduction: "",
        code: "",
        pic: "",
      },
      typename: "",
      value: "",
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  methods: {
    async getTypes() {
      const { data } = await this.$http.get("/content/findtypes");

      this.options = data;
      this.setType();
    },
    async saveContent() {
      if (!this.content.title || !this.content.code) {
        return this.$message({
          showClose: true,
          message: "标题或内容不能为空",
          type: "error",
        });
      }
      if (!this.value) {
        return this.$message({
          showClose: true,
          message: "请选择分类",
          type: "error",
        });
      }
      let content = {
        title: this.content.title,
        author: this.$store.state.username,
        introduction: this.content.introduction,
        sendtype: "",
        contenttype: this.value,
        contenttype_name: "",
        content: this.content.code,
        pic: this.content.pic,
      };

      const { data } = await this.$http.post("/content/createcontent", content);

      if (data.status !== 200)
        return this.$message({
          showClose: true,
          message: "系统繁忙",
          type: "error",
        });

      this.$router.push({ name: "Post", query: { pageid: data.content._id } });
      this.$message({
        showClose: true,
        message: "发帖成功",
        type: "success",
      });
    },
    uploadBefore() {},
    async picUpload(file) {
      const { data } = await this.$http.get("/secret/policy");
      let param = new FormData();

      param.append("OSSAccessKeyId", data.OSSAccessKeyId);
      param.append("policy", data.policy);
      param.append("key", data.startsWith + data.saveName + file.file.name);
      param.append("success_action_status", 200);
      param.append("signature", data.signature);
      param.append("file", file.file, data.saveName);

      this.$http2
        .post("http://" + data.host, param, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.status !== 200)
            return this.$message({
              showClose: true,
              message: "上传失败",
              type: "error",
            });

          this.$message({
            showClose: true,
            message: "上传照片成功",
            type: "success",
          });
          this.content.pic = `https://ganxx.oss-cn-shenzhen.aliyuncs.com/${
            data.startsWith + data.saveName + file.file.name
          }`;
        })
        .catch((error) => {});
    },
    successFunc() {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    setType() {
      if (this.$route.params.typeid) {
        let type = this.options.filter(
          (item) => item._id == this.$route.params.typeid
        );
        this.value = type[0].typename;
      } else if (this.$route.params.typename) {
        this.value = this.$route.params.typename;
      }
    },
  },
};
</script>

<style lang="less">
.home-edit {
  margin: 0 auto;
  display: flex;
  .edit_left {
    flex: 5;
    input:first-child {
      height: 4rem;
      width: 100%;
      border: 0;
      color: #666;
      font-size: 2rem;
      font-weight: 700;
      background-color: #f7f9fa;
      outline: none;
      border-bottom: 2px solid #ffffff;
      margin-bottom: 1rem;
    }

    input:nth-child(2) {
      height: 2rem;
      width: 80%;
      border: 0;
      color: #666;
      font-size: 1rem;
      font-weight: 700;
      background-color: #f7f9fa;
      outline: none;
      border-bottom: 2px solid gray;
      margin-bottom: 1rem;
    }

    input::-webkit-input-placeholder {
      color: #aab2bd;
    }
    .el-button {
      width: 8rem;
      margin-top: 1rem;
      margin-left: calc(50% - 4rem);
    }

    .el-upload {
      margin-bottom: 1rem;
    }

    .content_marked {
      opacity: 1;
      transition: opacity 2s;
    }

    .markdown {
      width: 100%;
      max-width: 766px;
    }
  }
  .edit_right {
    flex: 2.2;
    margin-left: 1rem;
    background-color: #ffffff;
    height: 14rem;
    padding-top: 2rem;
    display: flex;
    flex-direction: column;

    align-items: center;
    span {
      display: block;
      margin-bottom: 1rem;
    }
    .el-select {
      width: 60%;
    }
  }
}

@media screen and (min-width: 1201px) {
  .home-edit {
    width: 1120px;
  }
}

@media screen and (max-width: 1201px) {
}

@media screen and (max-width: 768px) {
  .home-edit {
    flex-direction: column;
    .edit_left {
      order: 2;
    }
    .edit_right {
      order: 1;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      span {
      }
      .el-select {
        margin-left: 1rem;
      }
    }
  }
}

@media screen and (max-width: 500px) {
}
</style>