// slide prototype
Util.Objects["slide"] = new function() {
	this.init = function(e) {

		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}

/*
Util.Objects["sliderefx1"] = new function() {
	this.init = function(e) {
		u.ref(e, "a");
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
Util.Objects["sliderefx2"] = new function() {
	this.init = function(e) {
		u.ref(e, "a");
		u.ref(e, "b");
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
Util.Objects["sliderefx3"] = new function() {
	this.init = function(e) {
		u.ref(e, "a");
		u.ref(e, "b");
		u.ref(e, "c");
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
Util.Objects["sliderefx4"] = new function() {
	this.init = function(e) {
		u.ref(e, "a");
		u.ref(e, "b");
		u.ref(e, "c");
		u.ref(e, "d");
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
*/
// slide prototype
Util.Objects["slide2"] = new function() {
	this.init = function(e) {
		var bar_area = u.ae(e, "div", "bar_area");
		var boxes = u.ae(e, "div", "boxes");
		var number1 = u.ae(e, "div", "numbers number1");
		var number2 = u.ae(e, "div", "numbers number2");
		var number3 = u.ae(e, "div", "numbers number3");
		var number4 = u.ae(e, "div", "numbers number4");
		var number5 = u.ae(e, "div", "numbers number5");
		var canvas = u.ae(e, "div", "canvas");

		u.e.click(canvas);
		canvas.clicked = function() {
			u.toggleClass(e, "bars");
		}

		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}


Util.Objects["slide4"] = new function() {
	this.init = function(e) {
		var ref = u.ge("ref", e)
		u.e.drag(ref, new Array(0, u.ge("ref_drag", e).offsetHeight-ref.offsetHeight, ref.offsetWidth, ref.offsetHeight))

		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}


Util.Objects["slide5"] = new function() {
	this.init = function(e) {
		var ref = u.ge("ref", e)
		u.e.drag(ref, new Array(0, u.ge("ref_drag", e).offsetHeight-ref.offsetHeight, ref.offsetWidth, ref.offsetHeight))

		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}


// slide prototype
Util.Objects["slide6_1"] = new function() {
	this.init = function(e) {
		var graph = u.ae(e, "div", "graph");
		var bar_left = u.ae(e, "div", "bar bar_left");
		var bar_middle = u.ae(e, "div", "bar bar_middle");
		var bar_right = u.ae(e, "div", "bar bar_right");
		
		var canvas = u.ae(e, "div", "canvas");
		u.e.click(canvas);
		canvas.clicked = function() {
			u.toggleClass(e, "play");
		}
		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}

// slide prototype
Util.Objects["slide6_2"] = new function() {
	this.init = function(e) {

		var a = u.ae(e, "div", "a");
		var b = u.ae(e, "div", "b");
		a.e = e;
		b.e = e;
		e.title = u.ge("h2", e).innerHTML;

		a.num = u.ae(e, "div", "numa");
		b.num = u.ae(e, "div", "numb");
		a.num.innerHTML = 0;
		b.num.innerHTML = 0;


		var bar_a = u.ae(a, "div", "bar");
		a.bar = bar_a;
		var bar_b = u.ae(b, "div", "bar");
		b.bar = bar_b;

		var bar_a_body = u.ae(bar_a, "div", "body");
		var bar_b_body = u.ae(bar_b, "div", "body");

		u.e.drag(a, a, true);
		u.e.drag(b, b, true);
		a.picked = b.picked = function() {
			u.e.resetEvents(this.e.swiper);
		}
		a.moved = function(event) {
			new_width = (event.targetTouches ? event.targetTouches[0].pageX : event.pageX) - this.offsetLeft;
			new_width = new_width > 11 ? new_width : 11;
			new_width = new_width < 619 ? new_width : 619;
			this.bar.style.width = new_width + "px";

			new_width_value = Math.round(((this.bar.offsetWidth-26)/(634-26)) * 200);
			this.num.innerHTML = new_width_value;
		}
		b.moved = function(event) {
			new_width = (event.targetTouches ? event.targetTouches[0].pageX : event.pageX) - this.offsetLeft;
			new_width = new_width > 11 ? new_width : 11;
			new_width = new_width < 619 ? new_width : 619;
			this.bar.style.width = new_width + "px";

			new_width_value = Math.round(((this.bar.offsetWidth-26)/(634-26)) * 100);
			this.num.innerHTML = new_width_value;
		}

		a.dropped = function() {
			new_width_value = Math.round(((this.bar.offsetWidth-26)/(634-26)) * 200);

//			submitCustomEvent(this.e.title, "behandeld", new_width_value, "String", null, null, null);
			u.storeCustomEvent(this.e.title, "behandeld", new_width_value+"%", "String");
		}
		b.dropped = function() {
			new_width_value = Math.round(((this.bar.offsetWidth-26)/(634-26)) * 100);

//			submitCustomEvent(this.e.title, "u behandeld", new_width_value+"%", "String", null, null, null);
			u.storeCustomEvent(this.e.title, "u behandeld", new_width_value+"%", "String");
		}

		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();

	}
}

// slide prototype
Util.Objects["slide6_3"] = new function() {
	this.init = function(e) {

		var canvas = u.ae(e, "div", "canvas");
		var a = u.ae(canvas, "div", "a");
		var b = u.ae(canvas, "div", "b");
		var bar = u.ae(canvas, "div", "bar");

		u.e.click(canvas);
		canvas.clicked = function() {
			u.toggleClass(canvas, "play");
		}


		var link = u.ae(e, "div", "link");
		u.e.click(link);
		link.clicked = function() {
			u.ge("header").navigation("slide6_4");
		}

		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}

// slide prototype
Util.Objects["slide6_5"] = new function() {
	this.init = function(e) {

		e.title = u.ge("h2", e).innerHTML;

		var a = u.ae(e, "div", "a");
		var b = u.ae(e, "div", "b");
		var range = u.ae(e, "div", "range");
		var knob = u.ae(range, "div", "knob");

		knob.a = a;
		knob.b = b;
		knob.e = e;
		
		u.e.transform(knob, 415, 0);

		knob.picked = function() {
			u.e.resetEvents(this.e.swiper);
		}

		knob.moved = function() {
			var progress = Math.round(this.element_x / (this.end_drag_x - this.start_drag_x - this.offsetWidth)*100);
			if(progress < 50) {
				if(progress > 40) {
					var fade_in = (progress-40)*(0.7/10);
					knob.a.style.backgroundColor = "rgba(255,255,255,"+fade_in+")";
					knob.b.style.backgroundColor = "rgba(255,255,255,0.7)";
				}
				else {
					knob.a.style.backgroundColor = "rgba(255,255,255,0)";
					knob.b.style.backgroundColor = "rgba(255,255,255,0.7)";
				}
			}
			else {
				if(progress < 60) {
					var fade_in = (60-progress)*(0.7/10);
					knob.a.style.backgroundColor = "rgba(255,255,255,0.7)";
					knob.b.style.backgroundColor = "rgba(255,255,255,"+fade_in+")";
				}
				else {
					knob.a.style.backgroundColor = "rgba(255,255,255,0.7)";
					knob.b.style.backgroundColor = "rgba(255,255,255,0)";
				}
			}
		}
		knob.dropped = function() {

			var progress = Math.round(this.element_x / (this.end_drag_x - this.start_drag_x - this.offsetWidth)*100);
			if(progress > 50) {
				u.storeCustomEvent(this.e.title, "Strategie", "innovative", "String");
			}
			else {
				u.storeCustomEvent(this.e.title, "Strategie", "traditional", "String");
			}
//			u.storeCustomEvent(this.e.title, "u behandeld", new_width_value+"%", "String");

//			submitCustomEvent(category, label, value, valueType, categoryId, labelId, valueId);
//			submitCustomEvent("Pie", u.ge("h1", this.e).innerHTML, (this.current_value*100)+"% erhalten keine Chemotherapie", "String", null, null, null);
//			submitCustomEvent("Pie", u.ge("h1", this.e).innerHTML, (100-(this.current_value*100))+"% erhalten eine Chemotherapie", "String", null, null, null);
		}

		u.e.drag(knob, new Array (0, 0, range.offsetWidth, knob.offsetHeight), true, true);

		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}

// slide prototype
Util.Objects["slide6_6"] = new function() {
	this.init = function(e) {
		var bio = u.ae(e, "div", "bio");
		var cal = u.ae(e, "div", "cal");
		var com = u.ae(e, "div", "com");
		
		bio.e = e;
		bio.clicked = function() {
			u.removeClass(document.body, "front");
			u.ge("header").navigation("slide7_1");
		}
		u.e.click(bio);
		
		cal.e = e;
		cal.clicked = function() {
			u.removeClass(document.body, "front");
			u.ge("header").navigation("slide8_1");
		}
		u.e.click(cal);

		com.e = e;
		com.clicked = function() {
			u.removeClass(document.body, "front");
			u.ge("header").navigation("slide9_1");
		}
		u.e.click(com);

		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
// slide prototype
Util.Objects["slide7_1"] = new function() {
	this.init = function(e) {
		var green_numbers_box = u.ae(e, "div", "green_numbers_box");
		var purple_numbers_box = u.ae(e, "div", "purple_numbers_box");
		var green_box = u.ae(e, "div", "box green_box");
		var purple_box = u.ae(e, "div", "box purple_box");
		var green_left = u.ae(e, "div", "green_bars green_left");
		var green_middle = u.ae(e, "div", "green_bars green_middle");
		var green_right = u.ae(e, "div", "green_bars green_right");
		var purple_left = u.ae(e, "div", "purple_bars purple_left");
		var purple_middle = u.ae(e, "div", "purple_bars purple_middle");
		var purple_right = u.ae(e, "div", "purple_bars purple_right");
		var green_button = u.ae(e, "div", "button green_button");
		var purple_button = u.ae(e, "div", "button purple_button");
		var canvas = u.ae(e, "div", "canvas");

		u.e.click(green_button);
		green_button.clicked = function() {
			u.toggleClass(e, "show_green");
		}
		u.e.click(purple_button);
		purple_button.clicked = function() {
			u.toggleClass(e, "show_purple");
		}
		
		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
// slide prototype
Util.Objects["slide7_2"] = new function() {
	this.init = function(e) {
		var fos = u.ae(e, "div", "cover fos");
		var mim = u.ae(e, "div", "cover mim");
		var arrow_left = u.ae(e, "div", "arrows arrow_left");
		var arrow_right = u.ae(e, "div", "arrows arrow_right");
		var number_left = u.ae(e, "div", "numbers number_left");
		var number_right = u.ae(e, "div", "numbers number_right");
		var canvas = u.ae(e, "div", "canvas");
		u.e.click(canvas);
		canvas.clicked = function() {
			if (e.className.match(/left_play/) != null){
				u.toggleClass(e, "right_play");
			}
			if (e.className.match(/right_play/) == null) {
				u.toggleClass(e, "left_play");
			}
		}
		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}

Util.Objects["slide8_1"] = new function() {
	this.init = function(e) {
		var green_number = u.ae(e, "div", "numbers green");
		var green_bar = u.ae(e, "div", "bars green");
		var purple_number = u.ae(e, "div", "numbers purple");
		var purple_bar = u.ae(e, "div", "bars purple");
		var green = u.ae(e, "div", "buttons green");
		var purple = u.ae(e, "div", "buttons purple");

		u.e.click(green);
		green.clicked = function() {
			u.toggleClass(e, "green");
		}
		u.e.click(purple);
		purple.clicked = function() {
			u.toggleClass(e, "purple");
		}
		
		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}


// slide prototype
Util.Objects["slide8_2"] = new function() {
	this.init = function(e) {
		var graph_green = u.ae(e, "div", "graph_green");
		var graph_purple = u.ae(e, "div", "graph_purple");
		var green_button = u.ae(e, "div", "buttons green_button");
		var purple_button = u.ae(e, "div", "buttons purple_button");

		u.e.click(green_button);
		green_button.clicked = function() {
			u.toggleClass(e, "show_green");
		}
		u.e.click(purple_button);
		purple_button.clicked = function() {
			u.toggleClass(e, "show_purple");
		}
		
		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}

// slide prototype
Util.Objects["slide9_1"] = new function() {
	this.init = function(e) {
		var header_left = u.ae(e, "div", "header header_left");
		var header_middle = u.ae(e, "div", "header header_middle");
		var header_right = u.ae(e, "div", "header header_right");
		var para_left = u.ae(e, "div", "para para_left");
		var para_middle = u.ae(e, "div", "para para_middle");
		var para_right = u.ae(e, "div", "para para_right");

		u.e.click(header_left);
		header_left.clicked = function() {
			u.toggleClass(e, "show_left");
		}
		u.e.click(header_middle);
		header_middle.clicked = function() {
			u.toggleClass(e, "show_middle");
		}
		u.e.click(header_right);
		header_right.clicked = function() {
			u.toggleClass(e, "show_right");
		}
		
		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
// slide prototype
Util.Objects["slide9_2"] = new function() {
	this.init = function(e) {
		var bar_left = u.ae(e, "div", "bar bar_left");
		var bar_right = u.ae(e, "div", "bar bar_right");
		var number_left = u.ae(e, "div", "numbers number_left");
		var number_right = u.ae(e, "div", "numbers number_right");
		var canvas = u.ae(e, "div", "canvas");

		u.e.click(canvas);
		canvas.clicked = function() {
			u.toggleClass(e, "play");
		}
		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
Util.Objects["slide9_3"] = new function() {
	this.init = function(e) {
		var a = u.ae(e, "div", "a");
		var b = u.ae(e, "div", "b");
		var c = u.ae(e, "div", "c");

		u.e.click(a);
		a.clicked = function() {
			u.toggleClass(e, "a");
		}
		u.e.click(b);
		b.clicked = function() {
			u.toggleClass(e, "b");
		}
		u.e.click(c);
		c.clicked = function() {
			u.toggleClass(e, "c");
		}

		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}

// slide prototype
Util.Objects["slide10"] = new function() {
	this.init = function(e) {
		var box_left = u.ae(e, "div", "box box_left");
		var box_right = u.ae(e, "div", "box box_right");
		var box_bottom = u.ae(e, "div", "box box_bottom");

		u.e.click(box_left);
		box_left.clicked = function() {
			u.toggleClass(e, "show_right");
		}
		u.e.click(box_right);
		box_right.clicked = function() {
			u.toggleClass(e, "show_bottom");
		}
		if (e.className.match(/show_right/) == null){
			u.removeClass(e, "show_bottom");
		}

		// whatever
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}