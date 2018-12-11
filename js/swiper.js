
var swiper = (function() {
  var start, end;
  return {
    init: function() {
      this.timer = null;
      this.index = 0;
      this.$box = document.querySelector(".box");
      this.$left = this.$box.querySelector(".left");
      this.$right = this.$box.querySelector(".right");
      this.$imag = this.$box.querySelector(".imag");

      this.$imag_li = document.querySelectorAll("li");
      this.$index = this.$box.querySelector(".index");
      this.$index_li = this.$index.querySelectorAll("li");

      //添加自定义属性
      for (var i = 0; i < this.$index_li.length; i++) {
        this.$index_li[i].index = i;
        //console.log(this.$index_li[i].index)
      }
      //增加两张图片放置在前后实现无限轮播
      var $first = this.$imag.firstElementChild;
      var $last = this.$imag.lastElementChild.cloneNode(true);
      this.$imag.insertBefore($last, $first);
      this.$imag.appendChild($first.cloneNode(true));
      this.$imag.style.left = "-600px";
      this.event();
      this.showImage();
    },
    //触发事件
    event: function() {
      //console.log(0)
      var _this = this;
      this.$index.onclick = function(ev) {
        ev.ev || window;
        var target = ev.target || ev.srcElement;
        if (target.nodeName == "LI") {
          _this.index = target.index;
          _this.showImage(target.index);
        }
      };
      this.$left.onmousedown = function() {
        _this.showImage(--_this.index);
      };
      this.$right.onmousedown = function() {
        _this.showImage(++_this.index);
      };
     
      this.$box.onmousedown = function(ev) {
        ev = ev || window.event;
        ev.preventDefault();
        start = ev.offsetX;
        document.onmousemove = function(ev) {
          ev = ev || window.event;
          // console.log(ev.clientX,ev.clientY);
          end = ev.clientX;
        };
      };

      //当滑动大于200就调用showImage方法;
      document.onmouseup = () => {
        if (start - end > 200) {
          this.showImage(++this.index);
        } else if (start - end < -200) {
          this.showImage(--this.index);
        }
        document.onmousemove = "";
      };
    },
    //显示图片,
    showImage: function(index) {
      index = index || 0;
      if (index > 4) {
        index = 0;
        this.$imag.style.left = 0;
      } else if (index < 0) {
        index = 4;
        this.$imag.style.left = 5 * 600 + "px";
      }
      this.index = index;
      
      for (var i = 0; i < this.$index_li.length; i++) {
        this.$index_li[i].className = "";
      }
      this.$index_li[index].className = "active";
      this.$imag.style.left = -600 * (index + 1) + "px";
    },
  };
})();

