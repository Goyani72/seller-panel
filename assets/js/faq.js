(function(r){"use strict";var l={};l.defaults={accessibility:true,trigger:".beefup-head",content:".beefup-body",openClass:"is-open",animation:"slide",openSpeed:200,closeSpeed:200,scroll:false,scrollSpeed:400,scrollOffset:0,openSingle:false,stayOpen:null,selfBlock:false,selfClose:false,hash:true,breakpoints:null,onInit:null,onOpen:null,onClose:null,onScroll:null};l.id=0;l.methods={_getVars:function(e){var t=r.extend(true,{},e.data("beefup"),e.data("beefup-options"));return t.breakpoints?l.methods._getResponsiveVars(t):t},_getResponsiveVars:function(n){var i=window.innerWidth||r(window).width();n.breakpoints.sort(function(e,t){return e.breakpoint<t.breakpoint?-1:e.breakpoint>t.breakpoint?1:0});r.each(n.breakpoints,function(e,t){if(i>=t.breakpoint){n=r.extend({},n,t.settings)}});return n},_animation:function(e,t,n,i){switch(e){case"slideDown":t.slideDown(n,i);break;case"slideUp":t.slideUp(n,i);break;case"fadeIn":t.fadeIn(n,i);break;case"fadeOut":t.fadeOut(n,i);break;case"show":t.show(n,i);break;case"hide":t.hide(n,i);break}},_close:function(e,t){var n=e.find(t.content+":first"),i=e.find(t.trigger+":first");e.removeClass(t.openClass);n.hide().css("overflow","");if(t.accessibility){n.attr("hidden",true);i.attr("aria-expanded",false).removeAttr("aria-disabled")}},_open:function(e,t){var n=e.find(t.content+":first"),i=e.find(t.trigger+":first");e.addClass(t.openClass);n.show().css("overflow","hidden");if(t.accessibility){n.attr("hidden",false);i.attr("aria-expanded",true);if(t.selfBlock){i.attr("aria-disabled",true)}}},_getStayOpen:function(e,t){var n;if(typeof t==="number"){n=e.eq(t)}else if(typeof t==="string"){switch(t){case"first":n=e.first();break;case"last":n=e.last();break;default:n=e.filter(t)}}return n},_openSingle:function(e,t,n){if(!n.openSingle){return}var i=e.not(t);if(n.stayOpen!==null){i=i.not(l.methods._getStayOpen(e,n.stayOpen))}if(!i.length){return}e.close(i.filter(function(){return!r(this).find(t).length}))},_addSelfCloseEvent:function(n,i){if(!i.selfClose){return}r(document).on("click",function(e){if(r(e.target).closest(n).length){return}var t=n.filter("."+i.openClass);if(i.stayOpen!==null){t=t.not(l.methods._getStayOpen(n,i.stayOpen))}if(t.length){n.close(t)}})},_addHashchangeEvent:function(t,n){if(!n.hash){return}var e=function(){var e=t.filter(window.location.hash);if(e.length&&!e.hasClass(n.openClass)){t.click(e)}};e();r(window).on("hashchange",e)},_initAccessibility:function(e,t){var n=e.find(t.trigger+":first"),i="acc"+l.id++,o=i+"id",s=n.children("button");if(t.accessibility){if(n.is("button")||n.is("a")){s=n}else{if(!n.children("button").length){n.wrapInner('<button type="button" aria-controls="'+i+'" aria-expanded="false" id="'+o+'"></button>');s=n.children("button")}t.trigger+=" > button"}s.attr("aria-controls",i).attr("aria-expanded",false).attr("id",o);e.find(t.content+":first").attr("aria-labelledby",o).attr("id",i).attr("role","region")}return t}};r.fn.beefup=function(o){var a=this;this.open=function(o,s){if(!o||!o.length){o=a}o.each(function(){var e=r(this),t=l.methods._getVars(e),n=e.find(t.content+":first"),i=t.animation==="slide"?"slideDown":t.animation==="fade"?"fadeIn":"show";l.methods._openSingle(a,o,t);if(t.accessibility){n.attr("hidden",false)}l.methods._animation(i,n,t.openSpeed,function(){l.methods._open(e,t);if(t.scroll){a.scroll(o)}if(s&&typeof s==="function"){s(e)}if(t.onOpen&&typeof t.onOpen==="function"){t.onOpen(e)}})});return a};this.close=function(e,o){if(!e||!e.length){e=a}e.each(function(){var e=r(this),t=l.methods._getVars(e),n=e.find(t.content+":first"),i=t.animation==="slide"?"slideUp":t.animation==="fade"?"fadeOut":"hide";l.methods._animation(i,n,t.closeSpeed,function(){l.methods._close(e,t);if(o&&typeof o==="function"){o(e)}if(t.onClose&&typeof t.onClose==="function"){t.onClose(e)}})});return a};this.scroll=function(e){var t=l.methods._getVars(e);r("html, body").animate({scrollTop:e.offset().top+t.scrollOffset},t.scrollSpeed).promise().done(function(){if(t.onScroll&&typeof t.onScroll==="function"){t.onScroll(e)}});return a};this.click=function(e){var t=l.methods._getVars(e);if(!e.hasClass(t.openClass)){a.open(e)}else{if(!t.selfBlock){a.close(e)}}return a};return this.each(function(e,t){var n=r(t),i=l.methods._initAccessibility(n,r.extend({},l.defaults,o,n.data("beefup-options")));if(n.data("beefup")){return}n.data("beefup",i);if(i.breakpoints){i=l.methods._getResponsiveVars(i)}if(n.is("."+i.openClass)||i.stayOpen!==null&&n.is(l.methods._getStayOpen(a,i.stayOpen))){l.methods._open(n,i)}l.methods._close(n.not("."+i.openClass),i);if(i.onInit&&typeof i.onInit==="function"){i.onInit(n)}n.on("click",i.trigger+":first",function(e){e.preventDefault();a.click(n)});if(e===a.length-1){l.methods._addHashchangeEvent(a,i);l.methods._addSelfCloseEvent(a,i)}})}})(jQuery);