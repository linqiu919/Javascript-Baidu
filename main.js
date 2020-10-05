var head = document.head || document.getElementsByTagName('head')[0];
let device = /Android|webOS|iPhone|iPod|BlackBerry|iPad/i;
if (device.test(navigator.userAgent)) {
  var script = document.createElement('script');
  script.setAttribute("src", "mobile/script.js");
  head.appendChild(script);
  var link = document.createElement('link');
  link.href = "mobile/style.css";
  link.rel = 'stylesheet';
  link.type = 'text/css';
  head.appendChild(link);
} else {
  var script = document.createElement('script');
  script.setAttribute("src", "pc/script.js");
  head.appendChild(script);
  var link = document.createElement('link');
  link.href = "pc/style.css";
  link.rel = 'stylesheet';
  link.type = 'text/css';
  head.appendChild(link);
}
window.onload = function () {

  if (device.test(navigator.userAgent)) {

    document.getElementById("logo").src = "images/plus_logo_web.png";
    document.getElementById("search_input").value = "";
  } else {
    document.getElementById("logo").src = "images/bd_logo1.png";
    document.getElementById("search_input").focus();
    document.getElementById("search_input").value = "";
    document.getElementById("ret").style.display = "none";
    showSearchBoard(true);
  }
};

function checkKey(evt) {
  var keyID = (evt.charCode) ? evt.charCode : ((evt.which) ? evt.which : evt.keyCode);
  return keyID;
}

function setCookie(name, value, time) {
  var strsec = getsec(time);
  var exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

}

function getsec(str) {
  var str1 = str.substring(1, str.length) * 1;
  var str2 = str.substring(0, 1);
  if (str2 == "s") {
    return str1 * 1000;
  } else if (str2 == "h") {
    return str1 * 60 * 60 * 1000;
  } else if (str2 == "d") {
    return str1 * 24 * 60 * 60 * 1000;
  }
}

//读取cookies
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

//删除cookies
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function searchHistory(mode, value) {
  let history = new Array();
  let history_json = getCookie("history");

  if (mode === "add") {
    if (history_json !== null) {
      history = JSON.parse(history_json);
    }
    history.remove(value);
    history.unshift(value);

    if (history.length > 10) {
      history.splice(11, history.length - 11);
    }
    history_json = JSON.stringify(history);
//console.log(history_json);
    setCookie("history", history_json, "d30");
  }
  if (mode === "get") {
    history = JSON.parse(history_json);
//       console.log(history);
    return history;
  }

  if (mode === "del") {
    history = JSON.parse(history_json);
    history.remove(value);
    history_json = JSON.stringify(history);
    setCookie("history", history_json, "d30");
    //console.log(history_json);
  }

  if (mode === "del_all") {
    setCookie("history", "", "s0");
  }
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
