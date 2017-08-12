APP.Modules.jsonOffers = (function (app, Private, Public) {
    'use strict';
    
        Private = {
        
        };
        
        
        Public = {
            configuration : {
                ID     :  'Home',
                NAME   :  'JsonOffers',
                ENGAGE : true
            }
        };
        
        Public.init = function() {
             Private.renderJsonOffers();
        };

        Private.renderJsonOffers = function() {

            var 
                template = $('#tplJsonOffers').html(),
                list     = $("#offersHome .content ul.list-products"),
                size     = jsonArrayOffers.length,
                html     = Mustache.render(template, jsonArrayOffers);
                
                if(size >= 8) {
                    list.addClass('of8');
                }

                list.html(html);

        };
        
        
        return Public;
        
        
}(APP, {}, {}));