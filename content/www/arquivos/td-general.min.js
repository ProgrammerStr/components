// PLUGIN SCROLLING TOP - BOTAO PARA IR DE VOLTA AO TOPO
// CODE BY - GABRIEL PADUA |TH& COD&R STR@NGE|

// OBJ EXTERNO
var ModulePlugins = {} || null;

// MODULE
ModulePlugins.scrollingTop = (function(){

  var objScroll = new Object();

  objScroll.init = function(){
      console.log("INIT MODULE");
      console.log("----Scrolling Top---");
      objScroll.render();
      objScroll.cssStyle();
      objScroll.listen();
  };

  objScroll.listen = function(){
    let button = document.getElementById('scrollButtonTop');
    button.addEventListener('click', objScroll.go);
    $(document).on('scroll', objScroll.show);
  }

  objScroll.show = function(){
     let heigh = $(document).scrollTop();
     let link = document.getElementById("scrollButtonTop");
     if(heigh > 400){
       $("#scrollButtonTop").show(600);
       link.style.opacity = "0.8";
     } else {
       $("#scrollButtonTop").hide(600);
     }
  }

  //RENDERIZANDO O BOTÃO
  objScroll.render = function(){
     let body = document.body;
     let html =  '<a href="#" id="scrollButtonTop">'
         html +=   '<i class="fa fa-chevron-up" aria-hidden="true"></i>'
         html +=  '</a>';
    body.innerHTML += html;
  };

   // ESTILIZANDO OS BOTÕES
  objScroll.cssStyle = function(){
    let link = document.getElementById("scrollButtonTop");
    let icon = document.querySelector("#scrollButtonTop i");

    link.style.position = "fixed";
    link.style.top = "75%";
    link.style.right = "5px";
    link.style.backgroundColor = "red";
    link.style.borderRadius = "50px";
    link.style.width = "50px";
    link.style.height = "50px";
    link.style.zIndex = "99";
    link.style.opacity = "0.7";
    link.style.display = "none";
    link.style.boxShadow = "6px 8px 12px #000";

    icon.style.color = "#fff";
    icon.style.fontSize = "2.5rem";
    icon.style.textAlign = "center";
    icon.style.marginLeft = "4px";
  }

  // QUANDO CLICANDO VAI PARA POSIÇÃO 0 DO BODY
  objScroll.go = function(){
    let link = document.getElementById("scrollButtonTop");
    let doc = "html, body";
    let top = 0;
    $(doc).animate({
        scrollTop: top
    }, 900);

    link.style.opacity = "0";
  }

  // INICIA O MODULO
  objScroll.init();

}());
