$(document).ready(function(){

	// easings
	jQuery.extend( jQuery.easing,
	{
		easeInQuart: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		easeOutQuart: function (x, t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOutQuart: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	});


	// layout
	if ($(".footer").length && $(".side").length) {
		function layout(){
			var delta = $(window).scrollTop() + $(window).height() - $(".footer").offset().top,
				shift = delta > 0 ? delta : 0;
   
			$(".side").height( $(window).height() - 170 - shift );
		}
		layout();
		$(window).bind("load resize scroll", layout);
	}


	// search
	$(".nav .search").each(function(){
		var o = $(this),
			input = $(".text", this),
			others = o.parent().find(".sms, .nav__i UL"),
			minw = o.width()
			maxw = 0;
			
		function maxwRecalc(){
			maxw = o.parent().width() - 40;
			others.each(function(){maxw -= $(this).outerWidth();})
		}
		maxwRecalc()
			
		input.focus(function(){
			maxwRecalc()
			o.addClass("search_focus").stop(true).animate({width:maxw}, 400, "easeOutQuart");
		});
		input.blur(function(){
			o.removeClass("search_focus").stop(true).animate({width:minw}, 400, "easeOutQuart");
		});
	});

	
	// nav
	$(".nav__i").each(function(){
		var o = $(this),
			els = $("LI", this),
			em = $(".nav__i__em", this);

		els.click(function(){
			if (!$(this).hasClass("cur")) {
				navSet($(this).prevAll().length, 300)
			}
			return false;
		});

		navSet(els.filter(".cur:eq(0)").prevAll().length, 0)
		$(window).bind("load", function(){
			navSet(els.filter(".cur:eq(0)").prevAll().length, 0)
		})

		function navSet(n, dur) {
			var cur = els.filter(".cur"),
				next = els.eq(n);

			cur.removeClass("cur");
			next.addClass("cur");

			em.animate({
				marginLeft:next.position().left-16,
				width:next.outerWidth()-14
				}, dur, "easeOutQuart", function(){
				})
		}
	});

	// sidenav
	$(".sidenav").each(function(){
		var o = $(this),
			els = $("LI", this),
			em = $(".sidenav__em", this);

		els.click(function(){
			if (!$(this).hasClass("cur")) {
				navSet($(this).prevAll().length, 200)
			}
			return false;
		});

		navSet(els.filter(".cur:eq(0)").prevAll().length, 0)
		$(window).bind("load", function(){
			navSet(els.filter(".cur:eq(0)").prevAll().length, 0)
		})

		function navSet(n, dur) {
			var cur = els.filter(".cur"),
				next = els.eq(n);

			cur.removeClass("cur");
			next.addClass("cur");

			em.animate({
				top:next.position().top
				}, dur, "easeOutQuart", function(){
				})
		}
	});
	
	
	// rlist folders
	$(".rlist_folders").each(function(){
		var o = $(this)
			inputs = $("> LI > LABEL :radio", this);
			
		inputs.bind("change click", function(){
			var li = $(this).closest("LI");
			if (this.checked && !li.hasClass("cur")){
				li.addClass("cur").siblings(".cur").removeClass("cur");
			}
		});		
	});
	
	
	// field focus
	$(".field :text,.field :password,.field TEXTAREA").each(function(){
		var field = $(this).closest(".field");
		$(this).focus(function(){
			field.addClass("field_focus");
		});
		$(this).blur(function(){
			field.removeClass("field_focus");
		});
	});
	
	
	// nice-chk
	$(".nice-chk").each(function(){
		var o = $(this),
			input = $("INPUT", this).get(0),
			bt_on = $(".nice-chk__on", this),
			bt_off = $(".nice-chk__off", this),
			cur_bg = $("I", this);
			
		bt_on.click(function(){
			if (!o.hasClass("nice-chk_checked")) {
				o.addClass("nice-chk_checked");
				input.checked = true;
			}
			return false;
		})

		bt_off.click(function(){
			if (o.hasClass("nice-chk_checked")) {
				o.removeClass("nice-chk_checked");
				input.checked = false;
			}
			return false;
		})
			
	});
	
	
	// idrops
	if ($(".idrop").length) {
		var drop = $('<div class="idrop__pop"><i class="idrop__pop__t"></i><i class="idrop__pop__arr"></i><div class="idrop__pop__i"></div></div>').appendTo("body"),
			drop_back = drop,
			drop_i = $(".idrop__pop__i", drop);
			
		$(".idrop").each(function(){
			var o = $(this),
				head = $(".idrop__head", this),
				body = $(".idrop__body", this);
				
			head.click(function(){
				if (o.hasClass("idrop_open")) {
					dropHide();
				}
				else {
					dropHide();
					//alert(1);
					if (o.hasClass("idrop_self")) {
						drop = $(".idrop__pop", o);
						body.show();
						//alert('body.show')
					}
					else {
						drop = drop_back;
						body.hide();
					}
				
					drop_i.html(body.html());
					o.addClass("idrop_open");
					o.hasClass("idrop_fixed") ? drop.addClass("idrop__pop_fixed") : drop.removeClass("idrop__pop_fixed");
					o.hasClass("idrop_select") ? drop.addClass("idrop__pop_select") : drop.removeClass("idrop__pop_select");

					if (!o.hasClass("idrop_select")) {
					    //alert('move1');
						drop.css({left:0,top:0}).show().css({
							left:head.offset().left + head.outerWidth() - 134 - drop.offset().left,
							top:head.offset().top + head.outerHeight() + 15 - drop.offset().top
						});
						o.hasClass("idrop_up") ? drop.addClass("idrop__pop_up").css({top:head.offset().top - drop.outerHeight() + 10}) : drop.removeClass("idrop__pop_up");
					}
					else {
						drop.css({left:0,top:0}).show().css({
							left:head.offset().left + (head.outerWidth()/2) - 67,
							top:head.offset().top + 2 - drop.offset().top
						});
						o.hasClass("idrop_up") ? drop.addClass("idrop__pop_up").css({top:0}).css({top:head.offset().top - drop.outerHeight() + 43 - drop.offset().top}) : drop.removeClass("idrop__pop_up");
					}

				}
				return false;
			});
		});
		
		drop.add(".idrop").hover(
			function () {if (hideDropTO) clearTimeout(hideDropTO)},
			function () {hideDropTO = setTimeout("dropHide()", 500)}
			);
		$(document).click(dropHide);
	
	}
	
	
	// field drop
	if ($(".field_drop").length) {
		var fdrop = $('<div class="field_drop__pop"><ul></ul></div>').appendTo("body"),
			fdrop_back = fdrop,
			fdrop_i = $("UL", fdrop);

		$(".field_drop").each(function(){
			var o = $(this),
				head = $(".field__h SPAN", this),
				items = $("OPTION", this);

			head.text(items.filter(":selected").text());
		
			o.click(function(){
				if (o.hasClass("field_drop_open")) {
					dropHide();
				}
				else {
   					o.addClass("field_drop_open");
					fdrop_i.html("");
					items.each(function(){
						if (this.selected) {
							$('<li class="cur"><a href="#">'+$(this).text()+'</a></li>').appendTo(fdrop_i);
						}
						else {
							$('<li><a href="#">'+$(this).text()+'</a></li>').appendTo(fdrop_i);
						}					
					});
					
					$("A", fdrop_i).click(function(){
						var li = $(this).closest("LI");
						if (!li.hasClass("cur")) {
							li.addClass("cur").siblings(".cur").removeClass("cur");
							items.eq(li.prevAll().length).attr("selected", "selected");
							head.text($(this).text());
						}
						dropHide();
						return false;
					});
   
					fdrop.css({left:0,top:0}).show().css({
						left:o.offset().left - fdrop.offset().left,
						top:o.offset().top + o.outerHeight() - fdrop.offset().top,
						width:o.width()
					});

				}
				
				return false;
			});
		});
		fdrop.add(".field_drop").hover(
			function () {if (hideDropTO) clearTimeout(hideDropTO)},
			function () {hideDropTO = setTimeout("dropHide()", 500)}
			);
		$(document).click(dropHide);
	}
			
	
	
	
	// t-contacts
	$(".t-contacts .tr-folder").each(function(){
		var o = $(this),
			items = $(this).nextUntil(".tr-folder"),
			bt_edit = $(".tr-folder__ctrls__edit", this),
			bt_del = $(".tr-folder__ctrls__del", this),
			bt_save = $(".tr-folder__edit .bt-enter", this),
			title = $("h3 span", this),
			edit_input = $(".tr-folder__edit :text", this);
		
		if (!o.hasClass("tr-folder_open")) {
			items.hide();
		}
		
		o.click(function(){
			if (o.hasClass("tr-folder_edit")) {
				return false;
			}
			
			if (!o.hasClass("tr-folder_open")) {
				items.show();
				o.addClass("tr-folder_open");
			}
			else {
				items.hide();
				o.removeClass("tr-folder_open");
			}
			layout();
			return false;
		});
		
		bt_edit.click(function(){
			o.addClass("tr-folder_edit").siblings(".tr-folder_edit").removeClass("tr-folder_edit");
			edit_input.val(title.text());
			return false;
		});
		
		bt_del.click(function(){
			alert("delete");
			return false;
		});
		
		bt_save.click(function(){
			alert("save");
			o.removeClass("tr-folder_edit");
			title.text(edit_input.val());
			return false;
		});


	});

	
	// t-workh
	$(".t-workh").each(function(){
		var o = $(this),
			chks = $(".td-day INPUT", this);
			
		chks.bind("change click", function(){
			if (this.checked) {
				$(this).closest("TR").addClass("tr-active");
			}
			else {
				$(this).closest("TR").removeClass("tr-active");
			}
		});

		$("TR", this).each(function(){
			var drag = $(".drag__i", this),
				val_l = $(".td-hours :text:eq(0)", this),
				val_r = $(".td-hours :text:eq(1)", this),
				step = 30; // 30 mins
				
			
			drag.slider({
				range: true,
				min: 0,
				max: 48,
				values: [19, 37],
				slide: function( event, ui ) {
					var time_from = parseInt(ui.values[0])*step,
						time_to = parseInt(ui.values[1])*step;
					val_l.val(minToNice(time_from));
					val_r.val(minToNice(time_to));
				}
			});
			
		});

	});
	
	
	// time-tune
	$("body").delegate(".link-time", "click", function(){
		$(this).closest(".time-tune").toggleClass("time-tune_closed");
		return false;
	});
	
	// sms
	$("body").delegate(".nav .sms__head", "click", function(){
		var pop_bt = $(this),
			pop = $(".pop-grey_sms");
		
		if (pop.is(":visible")) {
			pop.hide();
		}
		else {
			pop.css({left:0,top:0}).show().css({
				left:pop_bt.offset().left-pop.offset().left-274,
				top:pop_bt.offset().top-pop.offset().top+37
			})
		}
		return false;
	});
	
	$("body").delegate(".pop-grey_sms .greyfield_sms TEXTAREA", "click change keyup", function(){
		$(this).closest(".pop-grey_sms").find(".xfield_sms__chars STRONG").text(parseInt($(this).attr("maxlength")) - this.value.length);
	});
	
	
	
	// greyfield focus
	$(".greyfield :text,.greyfield TEXTAREA").each(function(){
		var field = $(this).closest(".greyfield");
		$(this).focus(function(){
			field.addClass("greyfield_focus");
		});
		$(this).blur(function(){
			field.removeClass("greyfield_focus");
		});
	});
	
	
	// phone
	$(".phone").each(function(){
		var phone = $(this);
		
		phone
			.delegate(".phone__btns__numpad", "click", function(){	
				phone.removeClass("phone_settings");
				phone.toggleClass("phone_numpad");
				return false;
			})
			.delegate(".phone__btns__settings", "click", function(){	
				phone.removeClass("phone_numpad");
				phone.toggleClass("phone_settings");
				return false;
			});
		
	});
	
	
	// isel
	if ($(".isel").length) {
		var isels = $(".isel"),
			drop = $('<div class="isel__pop"><ul class="isel__pop__i"></ul></div>').appendTo("body"),
			drop_i = $(".isel__pop__i", drop);


		isels.each(function(){
			var isel = $(this),
				items = $("OPTION", this),
				wrap = isel.wrap('<div class="isel__wrap"></div>').parent(),
				head = $('<a href="#" class="isel__head"><em>'+isel.val()+'</em><i></i></a>').appendTo(wrap);


			head.click(function(){
				if (wrap.hasClass("isel__wrap_open")) {
					dropHide();
				}
				else {
					dropHide();
					wrap.addClass("isel__wrap_open");
					drop_i.html("");

					items.each(function(){
						if ($(this).attr("selected") || this.selected) {
							$('<li class="cur"><a href="#">'+$(this).text()+'</a></li>').appendTo(drop_i);
						}
						else {
							$('<li><a href="#">'+$(this).text()+'</a></li>').appendTo(drop_i);
						}					
					});

					$("A", drop_i).click(function(){
						var li = $(this).closest("LI");
						if (!li.hasClass("cur")) {
							li.addClass("cur").siblings(".cur").removeClass("cur");
							items.eq(li.prevAll().length).get(0).selected = true;
							head.find("EM").text($(this).text());
						}
						dropHide();
						return false;
					});

					drop.css({left:0,top:0}).show().css({
						left:wrap.offset().left - drop.offset().left,
						top:wrap.offset().top + wrap.outerHeight() - drop.offset().top - 1,
						minWidth:wrap.width() - 2
					});

				}

				return false;
			});

		});

		$(document).click(dropHide);
	}

	/* ALEX FITISKIN, 17.04.2012. */
	/* Downloads menu */
	$($('.b-downloads_menu').attr('item')).click(function () {
		
		var $active = $(this).parent().find('.js-downloads_menu_item_active');
		$active.prev('.b-downloads_menu_sep').show();
		$active.next('.b-downloads_menu_sep').show();
		$active.removeClass('js-downloads_menu_item_active');
		
		$(this).prev('.b-downloads_menu_sep').hide();
		$(this).next('.b-downloads_menu_sep').hide();
		$(this).addClass('js-downloads_menu_item_active');
		
		$($('.b-downloads_menu').attr('block')).hide();
		$($(this).attr('for')).show();
		return false;
	});
	if ($('.js-downloads_menu_item_active').get(0)) {
		$('.js-downloads_menu_item_active').click();
	} else {
		$($('.b-downloads_menu_item').get(0)).click();
	}
	
	/* faq social menu */
	$('.b-faq_menu_social').css('top', $('.b-faq').height() - $('.b-faq_menu_social').height() - 30);
	$('.b-faq_menu_item').click(function () {
		$(this).toggleClass('b-faq_menu_item_active');
	});
}); // dom ready

// globals for dropdown timeout
var hideDropTO = true
function dropHide(){
	$(".idrop__pop").fadeOut(200);
	$(".idrop_open").removeClass("idrop_open");
	$(".field_drop__pop").fadeOut(200);
	$(".field_drop_open").removeClass("field_drop_open");
	$(".isel__pop").hide();
	$(".isel__wrap_open").removeClass("isel__wrap_open");
}

function minToNice(min){
	var res = Math.floor(min/60) + ":" + min%60;
	if (res.indexOf(":") == 1) {
		res = "0" + res;
	}
	if (res.length == 4) {
		res = res + "0";
	}
	return res;	
}