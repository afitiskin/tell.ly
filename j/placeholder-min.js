/*
*
* Placeholder.js minified version 1.0
* Creates a placeholder for browsers that don't support it
*
* @ Created by Guillaume Gaubert
* @ http://widgetulous.com/placeholderjs/
* @ © 2011 Guillaume Gaubert
*
* @ Default use :
* 	Placeholder.init();
*
*/

Placeholder={defaultSettings:{normal:'#000000',placeholder:'#C0C0C0'},init:function(a){if(a){for(var b in a){Placeholder.defaultSettings[b]=a[b]}}var c=document.getElementsByTagName("input");for(var i=0;i<c.length;i++){var d=c[i].getAttribute("placeholder");if(d&&c[i].type=="text"){c[i].onfocus=function(){Placeholder.onSelected(this)};c[i].onblur=function(){Placeholder.unSelected(this)};c[i].style.color=Placeholder.defaultSettings.placeholder;c[i].value=d}};var e=document.getElementsByTagName("textarea");for(var i=0;i<e.length;i++){var d=e[i].getAttribute("placeholder");if(d){e[i].onfocus=function(){Placeholder.onSelected(this)};e[i].onblur=function(){Placeholder.unSelected(this)};e[i].style.color=Placeholder.defaultSettings.placeholder;e[i].value=d}}},onSelected:function(a){if(a.value==a.getAttribute('placeholder')){a.value=''}a.style.color=Placeholder.defaultSettings.normal},unSelected:function(a){if(a.value.length<=0){a.style.color=Placeholder.defaultSettings.placeholder;a.value=a.getAttribute("placeholder")}}};