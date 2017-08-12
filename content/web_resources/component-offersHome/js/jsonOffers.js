// APP JSONOFFERS
// CODE BY: GABRIEL PADUA  |TH& COD&R STR@NG&|

var ModuleAPP = {} || null;

ModuleAPP.jsonOffers = (function(){

  var objAPP = new Object();

  objAPP.init = function(){
      console.log('INIT MODULE JSON OFFERS');
      objAPP.renderArray();
      objAPP.createList();
  }

// VERIFICA O TAMANHO DO ARRAY PARA RENDERIZAR A PRATELEIRA
objAPP.renderArray = function(){

      let size = jsonArrayOffers.length;
      let list = document.querySelector('#offersHome .content ul');

      console.log(size);
      console.log(list);

      // NO CASO DE OFERTAS IMPARES E ADCIONADA A CLASSE of6
      if(size >= 6 && size < 8 || size <= 3){
          list.className = list.className + ' of6';
      } else {
          // CASO SEJAM PARES ADCIONAR A CLASSE of8
          list.className = list.className + ' of8';
      }

  };

  // CRIA A LISTA DE OFERTAS
  objAPP.createList = function(){

      console.log('INIT ADD');

      for(let index in jsonArrayOffers){

          let html = '<li>'
              html +=  '<a href="'+jsonArrayOffers[index].link+'" title="">'
              html +=   '<figure>'
              html +=    '<figcaption>'
              html +=     '<div class="box02">'
              html +=      '<div class="boxtitle">'
              html +=       '<span>'+jsonArrayOffers[index].name+'<span>'
              html +=      '</div>'
              html +=     '</div>'
              html +=     '<div class="box02">'
              html +=      '<div class="boxPrice">'
              html +=       '<span class="top">'+jsonArrayOffers[index].priceTop+'</span>'
              html +=        '<div class="middle">'
              html +=         '<span class="coin">' +jsonArrayOffers[index].coin+'</span>'
              html +=         '<span class="price">' +jsonArrayOffers[index].price+'</span>'
              html +=         '<span class="cents">' +jsonArrayOffers[index].cents+'</span>'
              html +=        '</div>'
              html +=        '<span class="down">' +jsonArrayOffers[index].priceDown+'</span>'
              html +=      '</div>'
              html +=     '</div>'
              html +=     '</figcaption>'
              html +=     '<div class="img">'
              html +=       '<img src="'+jsonArrayOffers[index].img+'" title=""/>'
              html +=     '</div>'
              html +=   '</figure>'
              html +=  '</a>'
              html += '</li>'
              document.querySelector('#offersHome .content ul').innerHTML += html;
      }
  }

  objAPP.init();

}());
