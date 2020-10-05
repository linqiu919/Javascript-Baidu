let isDel = false;
if(performance!=undefined && performance.navigation.type==2){
  setTimeout(function (){
    HideRet()
  },50)
}
function showSearchBoard(show) {
  let wd = document.getElementById("search_input").value;
  if (show) {
    document.getElementById("search_box").classList.add("search_box_focus");
    if (wd !== "") {
      HideHistory()
      ShowRet()
    } else {
      let history = searchHistory("get");
      let listHTML = "";
      // console.log(history);
      if (history !== null && history.length > 0) {
        ShowHistory()
        for (let i = 0; i < history.length; i++) {
          listHTML += '<li class="history">' + history[i] + '<span class="del">删除</span></li>';
          document.getElementById("history_caontainer").innerHTML = listHTML;
        }

        let list = document.getElementsByClassName("history");

        for (var i = 0; i < list.length; i++) {

          list[i].addEventListener("click", function (e) {
            e.preventDefault();
            if (isDel === false) {
              let parent_str = this.innerText.substr(0, this.innerText.length - 3);
              // console.log(parent_str);
              //searchHistory("add",parent_str);
              window.location = "https://www.baidu.com/s?wd=" + parent_str;
            }
          });
        }
        list = document.getElementsByClassName("del");
        for (var i = 0; i < list.length; i++) {
          list[i].addEventListener("click", function (e) {
            e.preventDefault();
            let parent = this.parentNode;
            let parent_str = parent.innerText.substr(0, parent.innerText.length - 3);
            // console.log(parent_str);
            searchHistory("del", parent_str);
            document.getElementById("history_caontainer").removeChild(parent);
            isDel = true;
          });
        }
      }
    }
  } else {
    document.getElementById("search_box").classList.remove("search_box_focus");
  }
}

function getRet() {
  let wd = document.getElementById("search_input").value;
  if (wd !== "") {
    let script = document.createElement("script");
    script.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + wd + "&cb=retResponse";
    document.body.insertBefore(script, document.body.firstChild);
    document.body.removeChild(script);
  } else {
    ShowHistory()
  }
}

document.body.addEventListener("click", function (e) {
  if (event.target.id !== "search_input") {
    HideRet()
    HideHistory()
  }
}, false);

search_input = document.getElementById('search_input');
search_input.addEventListener('blur', function() {
});

function retResponse(ret) {
  let listHTML = "";
  let wd = document.getElementById("search_input").value;
  document.getElementById("ret_caontainer").innerHTML = "";
  for (let i = 0; i < ret.s.length; i++) {
    //console.log(ret.s[i]);
    listHTML += "<li class='ret'>" + getStr(ret.s[i], wd) + "</li>";
    document.getElementById("ret_caontainer").innerHTML = listHTML;
  }
  let list = document.getElementsByClassName("ret");
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", function (e) {
      e.preventDefault();
      searchHistory("add", this.innerText);
      window.location = "https://www.baidu.com/s?wd=" + this.innerText;
    });
  }
  if (list.length === 0) {
    HideRet()
  } else {
    ShowRet()
  }
}

function getStr(str1, str2) {
  let str_before = str1.split(str2)[0];
  let str_after = str1.split(str2)[1];
  if (str1.search(str2) !== -1) {
    return '<span>' + str_before + '</span>' + str2 + '<span>' + str_after + '</span>';
  } else {
    if (str1.search(str2.toLowerCase()) !== -1) {
      let str_before = str1.split(str2.toLowerCase())[0];
      let str_after = str1.split(str2.toLowerCase())[1];
      if(str_before === undefined) str_before = ''
      if(str_after === undefined) str_after = ''
      return '<span>' + str_before + '</span>' + str2 + '<span>' + str_after + '</span>';
    } else {
      return str1;
    }
  }
}

function searchWd() {
  let wd = document.getElementById("search_input").value;
  if (wd !== "") {
    searchHistory("add", wd);
    window.location = "https://www.baidu.com/s?wd=" + wd;
  }
}

let item_id = 0;
document.getElementById("search_input").addEventListener("change", function (event) {
  if (this.value === '') {
    HideRet()
    ShowHistory()
  }
})

document.getElementById("search_input").addEventListener("keydown", function (event) {
  if (document.getElementById("ret_caontainer").innerHTML !== "") {
    for (let i = 0; i < document.getElementsByClassName("ret").length; i++) {
      document.getElementsByClassName("ret")[i].classList.remove("ret_hover");
    }
    if (checkKey(event) === 40) {
      if (item_id < document.getElementsByClassName("ret").length - 1) {
        item_id++;
      } else {
        item_id = 0;
      }
      document.getElementsByClassName("ret")[item_id].classList.add("ret_hover");
      document.getElementById("search_input").value = document.getElementsByClassName("ret")[item_id].innerText;
    }

    if (checkKey(event) === 38) {
      if (item_id > 0) {
        item_id--;
      } else {
        item_id = document.getElementsByClassName("ret").length - 1;
      }
      document.getElementsByClassName("ret")[item_id].classList.add("ret_hover");
      document.getElementById("search_input").value = document.getElementsByClassName("ret")[item_id].innerText;
    }
  }
  let wd = document.getElementById("search_input").value;
  if (wd === "") {
    document.getElementById("ret").style.display = "none";
  }
  if (this.value === '') {
    HideRet()
    ShowHistory()
  }
});


document.getElementById("ret_caontainer").addEventListener("mouseover", function (event) {
  for (let i = 0; i < document.getElementsByClassName("ret").length; i++) {
    document.getElementsByClassName("ret")[i].classList.remove("ret_hover");
  }
});

function ShowRet() {
  let list = document.getElementsByClassName("ret");
  if (list.length === 0) return
  HideHistory()
  document.getElementById("ret").style.display = "block";
  document.getElementById("search_input").style.borderRadius = "10px 0 0 0";
  document.getElementById("search_input").style.borderBottom = "none";
  document.getElementById("search_input").style.borderColor = "#4e6ef2";
}

function HideRet() {
  document.getElementById("ret").style.display = "none";
  document.getElementById("search_input").style.borderRadius = "";
  document.getElementById("search_input").style.borderColor = "";
  document.getElementById("search_input").style.borderBottom = "";
}

function ShowHistory() {
  let wd = document.getElementById("search_input").value;
  if (wd === '')  HideRet()
  let history = searchHistory("get");
  if (history !== null && history.length > 0) {
    document.getElementById("history").style.display = "block";
    document.getElementById("search_input").style.borderRadius = "10px 0 0 0";
    document.getElementById("search_input").style.borderBottom = "none";
    document.getElementById("search_input").style.borderColor = "#4e6ef2";
  }
}

function HideHistory() {
  document.getElementById("history").style.display = "none";
  document.getElementById("search_input").style.borderRadius = "";
  document.getElementById("search_input").style.borderBottom = "";
  document.getElementById("search_input").style.borderColor = "";
}
