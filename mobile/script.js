function showSearchBoard(show)
{

    let history = searchHistory("get");

document.getElementById("search_box").classList.add("search_box_focus");
    document.getElementById("ret").classList.add("ret_focus");
    document.getElementById("history").classList.add("ret_focus");
    document.getElementById("logo").style.display="none";
    let wd = document.getElementById("search_input").value;
    if(wd === "") {
        document.getElementById("search_btn").innerText = "取消";
        document.getElementById("search_btn").classList.add("botton_cancel");

        if(history!== null  &&  history.length > 0 ) {
            document.getElementById("history").style.display = "block";
            document.getElementById("ret").style.display="none";
        }
    }else
    {
        document.getElementById("history").style.display = "none";
        document.getElementById("ret").style.display="block";


    }
    if(show)
    {
    showHistory();
        if(history!== null  &&  history.length > 0 ) {
            document.getElementById("history").style.display = "block";
        }
    }
}

function getRet()
{
    //https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=%E9%A5%BF&cb=
    let wd = document.getElementById("search_input").value;
    if(wd !== ""){
    let script = document.createElement("script");
    script.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+wd+"&cb=retResponse";
    document.body.insertBefore(script, document.body.firstChild);
    document.body.removeChild(script);


        document.getElementById("search_btn").innerText="百度一下";
        document.getElementById("search_btn").classList.remove("botton_cancel");
        document.getElementById("ret").style.display="block";
        document.getElementById("history").style.display="none";
        document.getElementById("clear").style.display="block";
    }else {
        document.getElementById("ret_caontainer").innerHTML="";
        document.getElementById("clear").style.display="none";
        document.getElementById("search_btn").innerText="取消";
        document.getElementById("search_btn").classList.add("botton_cancel");
        document.getElementById("ret").style.display="none";
        let history = searchHistory("get");

        if(history!==null  &&  history.length > 0 ) {
            document.getElementById("history").style.display = "block";
        }
    }
}
function retResponse(ret){
    let listHTML="";
    document.getElementById("ret_caontainer").innerHTML="";
    for(let i=0;i< ret.s.length;i++){
      //console.log(ret.s[i]);
        listHTML+="<li class='ret'>"+ret.s[i]+"</li>";
        document.getElementById("ret_caontainer").innerHTML=listHTML;
    }

    let list = document.getElementsByClassName("ret");
    for (var i = 0; i < list.length; i++) {

        list[i].addEventListener("click", function (e) {
            e.preventDefault();
            searchHistory("add",this.innerText);
            document.getElementById("search_input").value="";
            window.location = "https://www.baidu.com/s?wd="+this.innerText;
        });
    }

}

function searchWd()
{
    let wd = document.getElementById("search_input").value;
    if(wd !== "") {
        let wd = document.getElementById("search_input").value;
        searchHistory("add",wd);
        document.getElementById("search_input").value="";
        window.location = "https://www.baidu.com/s?wd=" + wd;
    }else
    {
        document.getElementById("search_box").classList.remove("search_box_focus");
        document.getElementById("ret").classList.remove("ret_focus");
        document.getElementById("history").classList.remove("ret_focus");
        document.getElementById("search_btn").innerText="百度一下";
        document.getElementById("logo").style.display="inline";
        document.getElementById("ret_caontainer").innerHTML="";
        document.getElementById("search_btn").classList.remove("botton_cancel");
        document.getElementById("history").style.display="none";
    }
}

function showHistory()
{

    let history = searchHistory("get");
    let listHTML = "";
    if(history!==null  &&  history.length > 0 ){


    for(let i=0;i< history.length;i++){
        listHTML+='<li class="history"><div class="history_wd">'+history[i]+'</div><span class="del"></span></li>';
        document.getElementById("history_caontainer").innerHTML=listHTML;
    }
    let list = document.getElementsByClassName("history_wd");

    for (var i = 0; i < list.length; i++) {

        list[i].addEventListener("click", function (e) {
            e.preventDefault();
            searchHistory("add",this.innerText);
            document.getElementById("search_input").value="";
           window.location = "https://www.baidu.com/s?wd="+this.innerText;
        });
    }

       list = document.getElementsByClassName("del");

        for (var i = 0; i < list.length; i++) {

            list[i].addEventListener("click", function (e) {
                e.preventDefault();
                let parent = this.parentNode;
                let parent_str = parent.innerText;
                searchHistory("del",parent_str);
                document.getElementById("history_caontainer").removeChild(parent);
                let history = searchHistory("get");
                if(history!== null  &&  history.length > 0 ) {


                }else
                {
                    document.getElementById("history").style.display = "none";
                }
            });
        }

    }else
    {

        document.getElementById("history").style.display="none";
    }
}




