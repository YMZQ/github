<template>
      <input type="file" name="" @change="uploadIMG">
</template>

<script>
export default {
   props: {
    num: String,
    required: true
  },
  data() {
    return {
      imgUrl: null,
    };
  },
  created(){

  },
  methods: {
    uploadIMG(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picavalue = files[0];
      if (this.picavalue.size / 1024 > 1025) {
        console.log("大小不能超过1M");
        
      } else {
        this.imgPreview(this.picavalue);
      }
    },
    //获取图片
    imgPreview(file, callback) {
      let self = this;
      //判断支不支持FileReader
      if (!file || !window.FileReader) return;
      if (/^image/.test(file.type)) {
        //创建一个reader
        let reader = new FileReader();

        //将图片转成base64格式
        reader.readAsDataURL(file);
        //读取成功后的回调
        reader.onloadend = function() {
          let result = this.result;
          let img = new Image();
          img.src = result;
          // console.log(img.src);
          
          // console.log("********未压缩前的图片大小********");
          console.log(result.length);
          img.onload = function() {
            let data = self.compress(img);
            self.imgUrl = result;
            // console.log(self.imgUrl);
            var obj={id:self.num, data:self.imgUrl}
            self.$emit("childByValue",obj);

            // let blob = self.dataURItoBlob(data);

            // console.log("*******base64转blob对象******");
            // console.log(blob);

            // var formData = new FormData();
            // formData.append("file", blob);
            // console.log("********将blob对象转成formData对象********");
            // console.log(formData.get("file"));
            // let config = {
            //   headers: { "Content-Type": "multipart/form-data" }
            // };
            // 发送请求;
            // self.axios.post(self.uploadUrl.url, formData, config).then(res => {
            //   // console.log(res);
            //   // console.log(res.data.data.resultftphost)
            //   // console.log(res.data.data.resulturl)
            //   // this.$emit('')
            //   if (res.data.code == 200) {
            //     self.$emit(
            //       "getImgsrc",
            //       res.data.data.resultftphost,
            //       res.data.data.resulturl
            //     );
            //   } else {
            //     self.$message({
            //       message: "图片上传失败，请重试",
            //       type: "warning"
            //     });
            //   }
            // });
          };
        };
      }
    },
    // 压缩图片
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.1);
      // console.log("*******压缩后的图片大小*******");
      // console.log(ndata)
      console.log(ndata.length);
      return ndata;
    },
    // // base64转成bolb对象
    // dataURItoBlob(base64Data) {
    //   var byteString;
    //   if (base64Data.split(",")[0].indexOf("base64") >= 0)
    //     byteString = atob(base64Data.split(",")[1]);
    //   else byteString = unescape(base64Data.split(",")[1]);
    //   var mimeString = base64Data
    //     .split(",")[0]
    //     .split(":")[1]
    //     .split(";")[0];
    //   var ia = new Uint8Array(byteString.length);
    //   for (var i = 0; i < byteString.length; i++) {
    //     ia[i] = byteString.charCodeAt(i);
    //   }
    //   return new Blob([ia], { type: mimeString });
    // },
    // //删除事件
    // delImg() {
    //   this.imgUrl = null;
    // }
  }
};
</script>


<style scoped>


input {
    position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
}
</style>
