// COMPONENTE JSON-OFFERS 2.0
// CODE BY GABRIEL PADUA |C#D&R STR@G&|
// FRAMEWORK - BRUNO SAMPAIO

// INIT MODULE
APP.Modules.jsonOffers = (function (app, Private, Public) {

    'use strict';

    Private = {
        skull : document.querySelector("#offersHome .content ul.list-products"),
    };

    Public = {
        configuration : {
            ID     :  'Home',
            NAME   :  'JsonOffers',
            ENGAGE : true
        }
    };

    // INIT 
    Public.init = function() {
        var array = Private.getJsonArray();

        if(array) {
            Private.renderArray();  
        } 

        return true;
    };

    // GET AND VERIFY IF EXIST THE OBJECT
    Private.getJsonArray = function() {
        if(typeof jsonArrayOffers === 'object') {
            return jsonArrayOffers;
        } else {
            return false;
        }
    };

    // VERIFY THE SIZE OF THE ARRAY
    Private.renderArray = function() {

        let qtdOffers = Private.getJsonArray();

        if(qtdOffers.length >= 6 && qtdOffers.length < 8 || qtdOffers.lenght <=3) {
            Private.createJsonOffers('of6');
        } else {
            Private.createJsonOffers('of8');
        }

        return false;

    };

    // CREATES THE SHELF OF OFFERS
    Private.createJsonOffers = function(shelfSize) {

        Private.skull.classList.add(shelfSize);
        let array = Private.getJsonArray();

        array.forEach(function(element) {
            let li = document.createElement('li');
            let a  = document.createElement('a');
            a.setAttribute('href', element.link);
            a.setAttribute('title', element.name);
            let figure = document.createElement('figure');
            let figcaption = document.createElement('figcaption');


            let bloco01 = document.createElement('div');
            bloco01.setAttribute('class', 'box02');
            let boxtitle = document.createElement('div');
            boxtitle.setAttribute('class', 'boxtitle');
            let name = document.createElement('span');
            name.textContent = element.name;

            boxtitle.appendChild(name);
            bloco01.appendChild(boxtitle);

            let bloco02 = document.createElement('div');
            bloco02.setAttribute('class', 'box02');
            let boxPrice = document.createElement('div');
            boxPrice.setAttribute('class', 'boxPrice');
            let top = document.createElement('span');
            top.setAttribute('class', 'top');
            top.textContent = element.priceTop;
            let middle = document.createElement('div');
            middle.setAttribute('class', 'middle');
            let coin = document.createElement('span');
            coin.setAttribute('class', 'coin');
            coin.textContent = element.coin;
            let price = document.createElement('span');
            price.setAttribute('class', 'price');
            price.textContent = element.price;
            let cents = document.createElement('span');
            cents.setAttribute('class', 'cents');
            cents.textContent = element.cents;
            let down = document.createElement('span');
            down.setAttribute('class', 'down');
            down.textContent = element.priceDown;

            middle.appendChild(coin);
            middle.appendChild(price);
            middle.appendChild(cents);
            boxPrice.appendChild(top);
            boxPrice.appendChild(middle);
            boxPrice.appendChild(down);
            bloco02.appendChild(boxPrice);
            


            let divImg = document.createElement('div');
            divImg.setAttribute('class', 'img');
            let img = document.createElement('img');
            img.setAttribute('src', element.img);
            img.setAttribute('title', element.name);
            divImg.appendChild(img);

            figcaption.appendChild(bloco01);
            figcaption.appendChild(bloco02);
            figure.appendChild(figcaption);
            figure.appendChild(divImg);
            a.appendChild(figure);
            li.appendChild(a);

            Private.skull.appendChild(li);

        });

    };


    return Public;


}(APP, {}, {}));