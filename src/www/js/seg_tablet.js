
/*u.js*/
var u, Util = u = new function() {}
u.version = 0.4;

/*u-debug.js*/
Util.testURL = function(url) {
	return true;
	return url.match(/http\:\/\/mkn\.|http\:\/\/w\.|\.local/i);
}
Util.debug = function(output) {
	if(Util.testURL(location.href)) {
		var element, br;
		if(Util.debugWindow && Util.debugWindow.document) {
			element = Util.debugWindow.document.createTextNode(output);
			br = Util.debugWindow.document.createElement('br');
			Util.debugWindow.document.body.appendChild(element);
			Util.debugWindow.document.body.appendChild(br);
			Util.debugWindow.scrollBy(0,1000);
		}
		else {
			Util.openDebugger();
			if(!Util.debugWindow) {
				alert("Disable popup blocker!");
			}
			else {
				Util.debug(output);
			}
		}
	}
}
Util.debugWindow = false;
Util.openDebugger = function() {
	Util.debugWindow = window.open("", "debugWindow", "width=600, height=400, scrollbars=yes, resizable=yes");
	Util.debugWindow.document.body.style.fontFamily = "Courier";
	var element = Util.debugWindow.document.createTextNode("--- new session ---");
	var br = Util.debugWindow.document.createElement('br');
	Util.debugWindow.document.body.appendChild(br);
	Util.debugWindow.document.body.appendChild(element);
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
	Util.debugWindow.document.body.appendChild(br.cloneNode(br));
}
Util.tracePointer = function(e) {
	if(Util.testURL(location.href)) {
		var position = document.createElement("div");
		document.body.appendChild(position);
		position.id = "debug_pointer";
		position.style.position = "absolute";
		position.style.backgroundColor = "#ffffff";
		position.style.color = "#000000";
		this.trackMouse = function(event) {
			u.ge("debug_pointer").innerHTML = event.pageX+"x"+event.pageY;
			u.ge("debug_pointer").style.left = 7+event.pageX+"px";
			u.ge("debug_pointer").style.top = 7+event.pageY+"px";
		}
		u.e.addEvent(e, "mousemove", this.trackMouse);
	}
}
Util.bug = function(target, message) {
	if(Util.testURL(location.href)) {
		var option, options = new Array(new Array(0, "auto", "auto", 0), new Array(0, 0, "auto", "auto"), new Array("auto", 0, 0, "auto"), new Array("auto", "auto", 0, 0));
		if(!message) {
			message = target;
			target = options[0];
		}
		if(!u.ge("debug_"+target)) {
			for(var i = 0; option = options[i]; i++) {
				if(!u.ge("debug_id_"+i)) {
					var d_target = document.createElement("div");
					document.body.appendChild(d_target);
					d_target.style.position = "absolute";
					d_target.style.zIndex = 100;
					d_target.style.top = option[0];
					d_target.style.right = option[1];
					d_target.style.bottom = option[2];
					d_target.style.left = option[3];
					d_target.style.backgroundColor = "#ffffff";
					d_target.style.color = "#000000";
					d_target.style.padding = "3px";
					d_target.id = "debug_id_"+i;
					d_target.className = "debug_"+target;
					break;
				}
			}
		}
		u.ge("debug_"+target).innerHTML += message+"<br>";
	}
}

/*u-url.js*/
Util.getVar = function(s) {
	var p = location.search;
	var start_index = (p.indexOf("&" + s + "=") > -1) ? p.indexOf("&" + s + "=") + s.length + 2 : ((p.indexOf("?" + s + "=") > -1) ? p.indexOf("?" + s + "=") + s.length + 2 : false);
	var end_index = (p.substring(start_index).indexOf("&") > -1) ? p.substring(start_index).indexOf("&") + start_index : false;
	var return_string = start_index ? p.substring(start_index,(end_index ? end_index : p.length)): "";
	return return_string;
}
Util.getHashVar = function(s) {
	var h = location.hash;
	var values, index, list;
	values = h.substring(1).split("&");
	for(index in values) {
		list = values[index].split("=");
		if(list[0] == s) {
			return list[1];
		}
	}
	return false;
}
Util.getUniqueId = function() {
	return ("id" + Math.random() * Math.pow(10, 17) + Math.random());
}
Util.getHashPath = function(n) {
	var h = location.hash;
	var values;
	if(h.length) {
		values = h.substring(2).split("/");
		if(n && values[n]) {
			return values[n];
		}
	}
	return values ? values : false;
}
Util.setHashPath = function(path) {
	location.hash = path;
	return Util.getHashPath();
}

/*u-dom.js*/
Util.ge = function(id, target) {
	var e, i, regexp, t;
	t = target ? target : document;
	if(document.getElementById(id)) {
		return document.getElementById(id);
	}
	regexp = new RegExp("(^|\\s)" + id + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			return e;
		}
	}
	return t.getElementsByTagName(id).length ? t.getElementsByTagName(id)[0] : false;
}
Util.ges = function(id, target) {
	var e, i, regexp, t;
	var elements = new Array();
	t = target ? target : document;
	regexp = new RegExp("(^|\\s)" + id + "(\\s|$|\:)");
	for(i = 0; e = t.getElementsByTagName("*")[i]; i++) {
		if(regexp.test(e.className)) {
			elements.push(e);
		}
	}
	return elements.length ? elements : t.getElementsByTagName(id);
}
Util.gs = function(e, direction) {
	try {
		var node_type = e.nodeType;
		var ready = false;
		var prev_node = false
		for(var i = 0; node = e.parentNode.childNodes[i]; i++) {
			if(node.nodeType == node_type) {
				if(ready) {
					return node;
				}
				if(node == e) {
					if(direction == "next") {
						ready = true;
					}
					else {
						return prev_node;
					}
				}
				else {
					prev_node = node;
				}
			}
		}
		return false;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.gs, called from: "+arguments.callee.caller);
	}
}
Util.qs = function(query, target) {
	t = target ? target : document;
	return t.querySelector(query);
}
Util.qsa = function(query, target) {
	t = target ? target : document;
	return t.querySelectorAll(query);
}
Util.previousSibling = u.ps = function(e, exclude) {
	var node = e.previousSibling;
	if(exclude) {
		while(node && (node.nodeType == 3 || node.className.match("(^|\\s)" + exclude + "(\\s|$)") || node.nodeName.match(exclude.toUpperCase()))) {
			node = node.previousSibling;
		}
	}
	else {
		while(node && node.nodeType == 3) {
			node = node.previousSibling;
		}
	}
	return node;
}
Util.nextSibling = u.ns = function(e, exclude) {
	var node = e.nextSibling;
	if(exclude) {
		while(node && (node.nodeType == 3 || node.className.match("(^|\\s)" + exclude + "(\\s|$)") || node.nodeName.match(exclude.toUpperCase()))) {
			node = node.nextSibling;
		}
	}
	else {
		while(node && node.nodeType == 3) {
			node = node.nextSibling;
		}
	}
	return node;
}
Util.ae = function(e, node_type, attributes) {
	try {
		var node = e.appendChild(document.createElement(node_type));
		if(attributes) {
			if(typeof(attributes) == "object") {
				for(attribute in attributes) {
					node.setAttribute(attribute, attributes[attribute]);
				}
			}
			else {
				u.addClass(node, attributes)
			}
		}
		node.e = e;
		return node;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.ae, called from: "+arguments.callee.caller.name);
	}
}
Util.ie = function(e, node_type, attributes) {
	var node = e.insertBefore(document.createElement(node_type), e.firstChild);
	if(attributes) {
		if(typeof(attributes) == "object") {
			for(attribute in attributes) {
				node.setAttribute(attribute, attributes[attribute]);
			}
		}
		else {
			u.addClass(node, attributes)
		}
	}
	node.e = e;
	return node;
}
Util.getIJ = function(e, id) {
	try {
		var regexp = new RegExp(id + ":[?=\\w/\\#~:.?+=?&%@!\\-]*");
		if(e.className.match(regexp)) {
			return e.className.match(regexp)[0].replace(id + ":", "");
		}
		return false;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
}
Util.setClass = u.sc = function(e, classname) {
	try {
		e.className = classname;
		e.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
}
Util.addClass = u.ac = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
			if(!regexp.test(e.className)) {
				e.className += e.className ? " " + classname : classname;
				e.offsetTop;
			}
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.addClass, called from: "+arguments.callee.caller);
	}
}
Util.removeClass = u.rc = function(e, classname) {
	try {
		if(classname) {
			var regexp = new RegExp(classname + " | " + classname + "|" + classname);
			e.className = e.className.replace(regexp, "");
			e.offsetTop;
		}
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
}
Util.toggleClass = u.tc = function(e, classname, second_classname) {
	try {
		var regexp = new RegExp("(^|\\s)" + classname + "(\\s|$|\:)");
		if(regexp.test(e.className)) {
			Util.removeClass(e, classname);
			if(second_classname) {
				Util.addClass(e, second_classname);
			}
		}
		else {
			Util.addClass(e, classname);
			if(second_classname) {
				Util.removeClass(e, second_classname);
			}
		}
		e.offsetTop;
	}
	catch(exception) {
		u.bug("Exception ("+exception+") in u.removeClass, called from: "+arguments.callee.caller);
	}
}
Util.applyStyle = u.as = function(e, style, value) {
	e.style[style] = value;
	e.offsetHeight;
}
Util.getComputedStyle = u.gcs = function(e, attribute) {
	e.offsetHeight;
	if(document.defaultView && document.defaultView.getComputedStyle) {
		return document.defaultView.getComputedStyle(e, null).getPropertyValue(attribute);
	}
	return false;
}
Util.wrapElement = u.we = function(e, wrap) {
	wrap = e.parentNode.insertBefore(document.createElement(wrap), e);
	wrap.appendChild(e);
	return wrap;
}

/*u-events.js*/
Util.Events = u.e = new function() {
	this.event_pref = typeof(document.ontouchmove) == "undefined" ? "mouse" : "touch";
	this.kill = function(event) {
		if(event) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	this.addEvent = function(e, type, action) {
		try {
			e.addEventListener(type, action, false);
		}
		catch(exception) {
			if(document.all) {
				u.bug("exception:" + e + "," + type + ":" + exception);
			}
			else {
				u.bug("exception:" + e + "," + type + ":" + exception);
			}
		}
	}
	this.removeEvent = function(e, type, action) {
		try {
			e.removeEventListener(type, action, false);
		}
		catch(exception) {
		}
	}
	this.onStart = this.onDown = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.removeOnStart = this.removeOnDown = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchstart" : "mousedown"), action);
	}
	this.onMove = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchmove" : "mousemove"), action);
	}
	this.onEnd = this.onUp = function(e, action) {
		u.e.addEvent(e, (this.event_pref == "touch" ? "touchend" : "mouseup"), action);
		if(e.snapback && u.e.event_pref == "mouse") {
			u.e.addEvent(e, "mouseout", this._snapback);
		}
		else if(e.drag && u.e.event_pref == "mouse") {
		}
	}
	this.transform = function(e, x, y) {
		if(typeof(e.style.MozTransition) != "undefined" || typeof(e.style.webkitTransition) != "undefined") {
			e.style.MozTransform = "translate("+x+"px, "+y+"px)";
			e.style.webkitTransform = "translate3d("+x+"px, "+y+"px, 0)";
			e.element_x = x;
			e.element_y = y;
		}
		else {
			e.style.position = "absolute";
			u.bug("duration:" + e.duration);
			if(!e.duration) {
				e.style.left = x+"px";
				e.style.top = y+"px";
				e.element_x = x;
				e.element_y = y;
			}
			else {
				e.transitions = 15;
				e.transition_progress = 0;
				e.element_x = e.element_x ? e.element_x : 0;
				e.element_y = e.element_y ? e.element_y : 0;
				e.transitionTo = function() {
						++this.transition_progress;
						this.style.left =  this.end_x-(this.distance_x - (this.interval_x*this.transition_progress))+"px";
						this.style.top =  this.end_y-this.distance_y - this.interval_y*this.transition_progress+"px";
						this.element_x = this.end_x-(this.distance_x - (this.interval_x*this.transition_progress));
						this.element_y = this.end_y-(this.distance_y - (this.interval_y*this.transition_progress));
				}
				e.end_x = x;
				e.end_y = y;
				if(e.end_x > e.element_x) {
					if(e.end_x > 0 && e.element_x >= 0 || e.end_x >= 0 && e.element_x < 0) {
						e.distance_x = e.end_x - e.element_x;
					}
					else {
						e.distance_x = e.element_x - e.end_x;
					}
				}
				else if(e.end_x < e.element_x) {
					if(e.end_x <= 0 && e.element_x > 0 || e.end_x < 0 && e.element_x <= 0) {
						e.distance_x = e.end_x - e.element_x;
					}
					else {
						e.distance_x = e.element_x - e.end_x;
					}
				}
				else {
					e.distance_x = 0;
				}
				if(e.end_y > e.element_y) {
					if(e.end_y > 0 && e.element_y >= 0 || e.end_y >= 0 && e.element_y < 0) {
						e.distance_y = e.end_y - e.element_y;
					}
					else {
						e.distance_y = e.element_y - e.end_y;
					}
				}
				else if(e.end_y < e.element_y) {
					if(e.end_y <= 0 && e.element_y > 0 || e.end_y < 0 && e.element_y <= 0) {
						e.distance_y = e.end_y - e.element_y;
					}
					else {
						e.distance_y = e.element_y - e.end_y;
					}
				}
				else {
					e.distance_y = 0;
				}
				e.interval_x = e.distance_x/e.transitions;
				e.interval_y = e.distance_y/e.transitions;
				for(var i = 0; i < e.transitions; i++) {
					u.t.setTimer(e, e.transitionTo, (e.duration/e.transitions)*i);
				}
				if(typeof(e.transitioned) == "function") {
					u.t.setTimer(e, e.transitioned, e.duration);
				}
			}
		}
	}
	this.transition = function(e, transition) {
		if(typeof(e.style.MozTransition) != "undefined" || typeof(e.style.webkitTransition) != "undefined") {
			e.style.MozTransition = transition;
			e.style.webkitTransition = transition;
			if(typeof(e.transitioned) == "function") {
				this.onTransitionEnd(e, e.transitioned);
			}
		}
		else {
			var duration = transition.match(/[0-9.]+[ms]/g) ? transition.match(/[0-9.]+[ms]/g).toString() : false;
			e.duration = duration ? (duration.match("ms") ? parseFloat(duration) : parseFloat(duration) * 1000) : false;
		}
	}
	this.overlap = function(element, target, strict) {
		if(target.constructor.toString().match("Array")) {
			var target_start_x = Number(target[0]);
			var target_start_y = Number(target[1]);
			var target_end_x = Number(target[2]);
			var target_end_y = Number(target[3]);
		}
		else {
			var target_start_x = target.element_x ? target.element_x : 0;
			var target_start_y = target.element_y ? target.element_y : 0;
			var target_end_x = Number(target_start_x + target.offsetWidth);
			var target_end_y = Number(target_start_y + target.offsetHeight);
		}
		var element_start_x = Number(element.element_x);
		var element_start_y = Number(element.element_y);
		var element_end_x = Number(element_start_x + element.offsetWidth);
		var element_end_y = Number(element_start_y + element.offsetHeight);
		if(strict && element_start_x >= target_start_x && element_start_y >= target_start_y && element_end_x <= target_end_x && element_end_y <= target_end_y) {
			return true;
		}
		else if(strict) {
			return false;
		}
		else if(element_end_x < target_start_x || element_start_x > target_end_x || element_end_y < target_start_y || element_start_y > target_end_y) {
			return false;
		}
		return true;
	}
	this.resetEvents = function(e) {
		u.t.resetTimer(e.t_held);
		u.t.resetTimer(e.t_clicked);
		this.removeEvent(e, "mouseup", this._dblclicked);
		this.removeEvent(e, "touchend", this._dblclicked);
		this.removeEvent(e, "mousemove", this._inputClickMove);
		this.removeEvent(e, "touchmove", this._inputClickMove);
		this.removeEvent(e, "mousemove", this._pick);
		this.removeEvent(e, "touchmove", this._pick);
		this.removeEvent(e, "mousemove", this._drag);
		this.removeEvent(e, "touchmove", this._drag);
		this.removeEvent(e, "mouseup", this._drop);
		this.removeEvent(e, "touchend", this._drop);
		this.removeEvent(e, "mouseout", this._snapback);
		this.removeEvent(e, "mouseout", this._drop);
	}
	this._inputStart = function(event) {
		this.event_var = event;
		this.input_timestamp = new Date().getTime();
		this.current_xps = 0;
		this.current_yps = 0;
		this.swiped = false;
		if(this.e_click || this.e_dblclick || this.e_hold) {
			u.e.onMove(this, u.e._inputClickMove);
			u.e.onEnd(this, u.e._dblclicked);
		}
		if(this.e_hold) {
			this.t_held = u.t.setTimer(this, u.e._held, 750);
		}
		if(this.e_drag || this.e_swipe) {
			u.e.onMove(this, u.e._pick);
			u.e.onEnd(this, u.e._drop);
		}
		if(typeof(this.inputStarted) == "function") {
			this.inputStarted(event);
		}
	}
	this._inputClickMove = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.clickMoved) == "function") {
			this.clickMoved(event);
		}
		if(typeof(this.moved) == "function") {
			this.moved(event);
		}
	}
	this.hold = function(e) {
		e.e_hold = true;
		u.e.onStart(e, this._inputStart);
	}
	this._held = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.held) == "function") {
			this.held(event);
		}
	}
	this.click = this.tap = function(e) {
		e.e_click = true;
		u.e.onStart(e, this._inputStart);
	}
	this._clicked = function(event) {
		u.e.resetEvents(this);
		if(typeof(this.clicked) == "function") {
			this.clicked(event);
		}
	}
	this.dblclick = this.doubletap = function(e) {
		e.e_dblclick = true;
		u.e.onStart(e, this._inputStart);
	}
	this._dblclicked = function(event) {
		if(u.t.valid(this.t_clicked) && event) {
			u.e.resetEvents(this);
			if(typeof(this.dblclicked) == "function") {
				this.dblclicked(event);
			}
			return;
		}
		else if(!this.e_dblclick) {
			this._clicked = u.e._clicked;
			this._clicked(event);
		}
		else if(!event) {
			this._clicked = u.e._clicked;
			this._clicked(this.event_var);
		}
		else {
			u.e.resetEvents(this);
			this.t_clicked = u.t.setTimer(this, u.e._dblclicked, 400);
		}
	}
	this.drag = function(e, target, strict, snapback) {
		e.e_drag = true;
		e.strict = strict ? true : false;
		e.allowed_offset = e.strict ? 0 : 250;
		e.elastica = 2;
		e.snapback = snapback ? true : false;
		if(target.constructor.toString().match("Array")) {
			e.start_drag_x = Number(target[0]);
			e.start_drag_y = Number(target[1]);
			e.end_drag_x = Number(target[2]);
			e.end_drag_y = Number(target[3]);
		}
		else {
			e.start_drag_x = target.element_x ? target.element_x : 0;
			e.start_drag_y = target.element_y ? target.element_y : 0;
			e.end_drag_x = Number(e.start_drag_x + target.offsetWidth);
			e.end_drag_y = Number(e.start_drag_y + target.offsetHeight);
		}
		e.element_x = e.element_x ? e.element_x : 0;
		e.element_y = e.element_y ? e.element_y : 0;
		e.locked = ((e.end_drag_x - e.start_drag_x == e.offsetWidth) && (e.end_drag_y - e.start_drag_y == e.offsetHeight));
		e.vertical = (!e.locked && e.end_drag_x - e.start_drag_x == e.offsetWidth);
		e.horisontal = (!e.locked && e.end_drag_y - e.start_drag_y == e.offsetHeight);
		u.e.onStart(e, this._inputStart);
	}
	this._pick = function(event) {
	    u.e.kill(event);
		this.move_timestamp = new Date().getTime();
		this.current_xps = 0;
		this.current_yps = 0;
		this.start_input_x = u.eventX(event) - this.element_x; // - u.absLeft(this);//(event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
		this.start_input_y = u.eventY(event) - this.element_y; // - u.absTop(this);//.targetTouches ? event.targetTouches[0].pageY : event.pageY);
		u.e.transition(this, "none");
		if(typeof(this.picked) == "function") {
			this.picked(event);
		}
		u.e.resetEvents(this);
		u.e.onMove(this, u.e._drag);
		u.e.onEnd(this, u.e._drop);
	}
	this._drag = function(event) {
			this.new_move_timestamp = new Date().getTime();
				var offset = false;
				this.current_x = u.eventX(event) - this.start_input_x;
				this.current_y = u.eventY(event) - this.start_input_y;
					this.current_xps = Math.round(((this.current_x - this.element_x) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
					this.current_yps = Math.round(((this.current_y - this.element_y) / (this.new_move_timestamp - this.move_timestamp)) * 1000);
				this.move_timestamp = this.new_move_timestamp;
				if(this.vertical) {
					this.element_y = this.current_y;
				}
				else if(this.horisontal) {
					this.element_x = this.current_x;
				}
				else if(!this.locked) {
					this.element_x = this.current_x;
					this.element_y = this.current_y;
				}
				if(!this.locked) {
					if(u.e.overlap(this, new Array(this.start_drag_x, this.start_drag_y, this.end_drag_x, this.end_drag_y), true)) {
						if(this.current_xps && (Math.abs(this.current_xps) > Math.abs(this.current_yps) || this.horisontal)) {
							if(this.current_xps < 0) {
								this.swiped = "left";
							}
							else {
								this.swiped = "right";
							}
						}
						else if(this.current_yps && (Math.abs(this.current_xps) < Math.abs(this.current_yps) || this.vertical)) {
							if(this.current_yps < 0) {
								this.swiped = "up";
							}
							else {
								this.swiped = "down";
							}
						}
						u.a.translate(this, this.element_x, this.element_y);
					}
					else {
						this.swiped = false;
						this.current_xps = 0;
						this.current_yps = 0;
						if(this.element_x < this.start_drag_x && !this.vertical) {
							offset = this.element_x < this.start_drag_x - this.allowed_offset ? - this.allowed_offset : this.element_x - this.start_drag_x;
							this.element_x = this.start_drag_x;
							this.current_x = this.element_x + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_x + this.offsetWidth > this.end_drag_x && !this.vertical) {
							offset = this.element_x + this.offsetWidth > this.end_drag_x + this.allowed_offset ? this.allowed_offset : this.element_x + this.offsetWidth - this.end_drag_x;
							this.element_x = this.end_drag_x - this.offsetWidth;
							this.current_x = this.element_x + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_x = this.element_x;
						}
						if(this.element_y < this.start_drag_y && !this.horisontal) {
							offset = this.element_y < this.start_drag_y - this.allowed_offset ? - this.allowed_offset : this.element_y - this.start_drag_y;
							this.element_y = this.start_drag_y;
							this.current_y = this.element_y + offset + (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else if(this.element_y + this.offsetHeight > this.end_drag_y && !this.horisontal) {
							offset = (this.element_y + this.offsetHeight > this.end_drag_y + this.allowed_offset) ? this.allowed_offset : (this.element_y + this.offsetHeight - this.end_drag_y);
							this.element_y = this.end_drag_y - this.offsetHeight;
							this.current_y = this.element_y + offset - (Math.round(Math.pow(offset, 2)/this.allowed_offset)/this.elastica);
						}
						else {
							this.current_y = this.element_y;
						}
						if(offset) {
							u.a.translate(this, this.current_x, this.current_y);
						}
					}
				}
			if(typeof(this.moved) == "function") {
				this.moved(event);
			}
	}
	this._drop = function(event) {
		u.e.resetEvents(this);
		if(this.e_swipe && this.swiped) {
			if(this.swiped == "left") {
				if(typeof(this.swipedLeft) == "function") {
					this.swipedLeft(event);
				}
			}
			else if(this.swiped == "right") {
				if(typeof(this.swipedRight) == "function") {
					this.swipedRight(event);
				}
			}
			else if(this.swiped == "down") {
				if(typeof(this.swipedDown) == "function") {
					this.swipedDown(event);
				}
			}
			else if(this.swiped == "up") {
				if(typeof(this.swipedUp) == "function") {
					this.swipedUp(event);
				}
			}
		}
		else if(!this.locked && this.start_input_x && this.start_input_y) {
			this.start_input_x = false;
			this.start_input_y = false;
			this.current_x = this.element_x + (this.current_xps/2);
			this.current_y = this.element_y + (this.current_yps/2);
			if(this.current_x < this.start_drag_x) {
				this.current_x = this.start_drag_x;
			}
			else if(this.current_x + this.offsetWidth > this.end_drag_x) {
				this.current_x = this.end_drag_x - this.offsetWidth;
			}
			if(this.current_y < this.start_drag_y) {
				this.current_y = this.start_drag_y;
			}
			else if(this.current_y + this.offsetHeight > this.end_drag_y) {
				this.current_y = this.end_drag_y - this.offsetHeight;
			}
			if(!this.strict && (this.current_xps || this.current_yps)) {
				u.a.transition(this, "all 1s cubic-bezier(0,0,0.25,1)");
			}
			else {
				u.a.transition(this, "all 0.1s cubic-bezier(0,0,0.25,1)");
			}
			u.a.translate(this, this.current_x, this.current_y);
		}
		if(typeof(this.dropped) == "function") {
			this.dropped(event);
		}
	}
	this.swipe = function(e, target, strict) {
		e.e_swipe = true;
		u.e.drag(e, target, strict);
	}
	this._swipe = function(event) {
	}
	this._snapback = function(event) {
	    u.e.kill(event);
		u.bug(2, "snap")
		if(this.start_input_x && this.start_input_y) {
			input_x = event.targetTouches ? event.targetTouches[0].pageX : event.pageX;
			input_y = event.targetTouches ? event.targetTouches[0].pageY : event.pageY;
			offset_x = 0;
			offset_y = 0;
			if(this.vertical) {
				offset_y = input_y - this.current_y;
			}
			else if(this.horisontal) {
				offset_x = input_x - this.current_x;
			}
			else {
				offset_x = input_x - this.current_x;
				offset_y = input_y - this.current_y;
			}
			u.e.transform(this, (this.element_x+offset_x), (this.element_y+offset_y));
		}
	}
}

/*u-timer.js*/
Util.Timer = u.t = new function() {
	this.actions = new Array();
	this.objects = new Array();
	this.timers = new Array();
	this.setTimer = function(object, action, timeout) {
		var id = this.actions.length;
		this.actions[id] = action;
		this.objects[id] = object;
		this.timers[id] = setTimeout("u.t.execute("+id+")", timeout);
		return id;
	}
	this.resetTimer = function(id) {
		clearTimeout(this.timers[id]);
		this.objects[id] = false;
	}
	this.execute = function(id) {
		this.objects[id].exe = this.actions[id];
		this.objects[id].exe();
		this.objects[id].exe = null;
		this.actions[id] = null;
		this.objects[id] = false;
		this.timers[id] = null;
	}
	this.valid = function(id) {
		return this.objects[id] ? true : false;
	}
}

/*u-position.js*/
Util.absoluteX = u.absX = function(e) {
	if(e.offsetParent) {
		return e.offsetLeft + u.absX(e.offsetParent);
	}
	return e.offsetLeft;
}
Util.absoluteY = u.absY = function(e) {
	if(e.offsetParent) {
		return e.offsetTop + u.absY(e.offsetParent);
	}
	return e.offsetTop;
}
Util.relativeOffsetX = u.relOffsetX = function(e) {
	if(e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absoute/) != null) {
		return u.absX(e.offsetParent); // - e.offsetLeft u.relOffsetX(e.offsetParent);
	}
	return 0; //u.absX(e) - e.offsetLeft;
}
Util.relativeOffsetY = u.relOffsetY = function(e) {
	if(e.offsetParent && u.gcs(e.offsetParent, "position").match(/relative|absoute/) != null) {
		return u.absY(e.offsetParent);
	}
	return 0; // u.absY(e) - e.offsetTop;
}
Util.actualWidth = function(e) {
	return parseInt(u.gcs(e, "width"));
}
Util.actualHeight = function(e) {
	return parseInt(u.gcs(e, "height"));
}
Util.eventX = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageX : event.pageX);
}
Util.eventY = function(event){
	return (event.targetTouches ? event.targetTouches[0].pageY : event.pageY);
}
Util.browserWidth = u.browserW = function() {
	return document.documentElement.clientWidth;
}
Util.browserHeight = u.browserH = function() {
	return document.documentElement.clientHeight;
}
Util.htmlWidth = u.htmlW = function() {
	return document.documentElement.offsetWidth;
}
Util.htmlHeight = u.htmlH = function() {
	return document.documentElement.offsetHeight;
}
Util.pageScrollX = u.scrollX = function() {
	return window.pageXOffset;
}
Util.pageScrollY = u.scrollY = function() {
	return window.pageYOffset;
}

/*u-animation.js*/
Util.Animation = u.a = new function() {
	this.variant = function(e) {
		if(this.implementation == undefined) {
			if(document.body.style.webkitTransition != undefined) {
				this.implementation = "webkit";
			}
			else if(document.body.style.MozTransition != undefined) {
				this.implementation = "Moz";
			}
			else if(document.body.style.oTransition != undefined) {
				this.implementation = "o";
			}
			else {
				this.implementation = "";
			}
		}
		return this.implementation;
	}
	this.translate = function(e, x, y) {
		e.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px)";
		e.element_x = x;
		e.element_y = y;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.rotate = function(e, deg) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg)";
		e.rotation = deg;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.scale = function(e, scale) {
		e.style[this.variant() + "Transform"] = "scale("+scale+")";
		e.scale = scale;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.rotateTranslate = function(e, deg, x, y) {
		e.style[this.variant() + "Transform"] = "rotate("+deg+"deg) translate("+x+"px, "+y+"px)";
		e.rotation = deg;
		e.element_x = x;
		e.element_y = y;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.translateRotate = function(e, x, y, deg) {
		e.style[this.variant() + "Transform"] = "translate("+x+"px, "+y+"px) rotate("+deg+"deg)";
		e.element_x = x;
		e.element_y = y;
		e.rotation = deg;
		e.transition_timestamp = new Date().getTime();
		e.offsetHeight;
	}
	this.transition = function(e, transition) {
		e.style[this.variant() + "Transition"] = transition;
		u.e.addEvent(e, this.variant() + "TransitionEnd", this._transitioned);
		u.e.addEvent(e, "transitionend", u.a._transitioned);
		var duration = transition.match(/[0-9.]+[ms]/g);
		if(duration) {
			var d = duration[0];
			e.duration = d.match("ms") ? parseFloat(d) : (parseFloat(d) * 1000);
		}
		else {
			e.duration = false;
		}
	}
	this._transitioned = function(event) {
		if(event.target == this && typeof(this.transitioned) == "function") {
			this.transitioned(event);
		}
	}
	this.fadeIn = function(e, duration) {
		duration = duration == undefined ? "0.5s" : duration;
		u.as(e, "opacity", 0);
		if(u.gcs(e, "display") == "none") {
			u.as(e, "display", "block");
		}
		u.a.transition(e, "all "+duration+" ease-in");
		u.as(e, "opacity", 1);
	}
}

/*u-init.js*/
Util.Objects = u.o = new Array();
Util.init = function() {
	var i, e, elements, ij_value;
	elements = u.ges("i\:([_a-zA-Z0-9])+");
	for(i = 0; e = elements[i]; i++) {
		while((ij_value = u.getIJ(e, "i"))) {
			u.removeClass(e, "i:"+ij_value);
			if(ij_value && typeof(u.o[ij_value]) == "object") {
				u.o[ij_value].init(e);
			}
		}
	}
}
window.onload = u.init;

/*u-ref.js*/
Util.ref = function(e, classname) {
	return;
	if(!u.ge("ref_layover")) {
		var ref_layover = u.ae(document.body, "div", {"id":"ref_layover"});
		ref_layover.innerHTML = u.ge("slide4").innerHTML;
		var bn = u.ae(ref_layover, "div", "close");
		u.e.click(bn);
		bn.clicked = function() {
			u.removeClass(document.body, "ref");
		}
	}
	classname = classname ? " "+classname : "";
	var ref = u.ae(e, "div", "ref" + classname);
	ref.ref_layover = u.ge("ref_layover");
	u.e.click(ref);
	ref.clicked = function() {
		u.addClass(document.body, "ref");
		if(!this.ref_layover.initiated) {
			var ref = u.ge("ref", this.ref_layover);
			var ref_drag = u.ge("ref_drag", this.ref_layover);
			u.e.drag(ref, new Array(0, ref_drag.offsetHeight-ref.offsetHeight, ref.offsetWidth, ref.offsetHeight))
			this.ref_layover.initiated = true;
		}
	}
}

/*i-swipe.js*/
Util.Objects["swipe"] = new function() {
	this.init = function(e) {
		var i, slide;
		u.addClass(e, "swipe");
		var list = u.ge("ul", e);
		var slides = u.ges("slide", list);
		var width = slides.length * slides[0].offsetWidth;
		list.style.width = width + "px";
		list.e = e;
		list.offsetHeight;
		if(e.offsetWidth < width) {
			for(i = 0; slide = slides[i]; i++) {
				slide.swiper = list;
			}
			u.e.swipe(list, new Array(e.offsetWidth - width, 0, width, e.offsetHeight));
			list.swipedLeft = function() {
				var next = Math.ceil(Math.abs(this.element_x/this.e.offsetWidth));
				u.e.transition(this, "all 0.5s ease-out");
				u.e.transform(this, -this.e.offsetWidth*next, 0);
				u.ge("header").navigation(u.ges("slide", this)[next].className.match(/slide[0-9_]+/)[0]);
			}
			list.swipedRight = function() {
				var prev = Math.floor(Math.abs(this.element_x/this.e.offsetWidth));
				u.e.transition(this, "all 0.5s ease-out");
				u.e.transform(this, -this.e.offsetWidth*prev, 0);
				u.ge("header").navigation(u.ges("slide", this)[prev].className.match(/slide[0-9_]+/)[0]);
			}
		}
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}

/*i-header.js*/
Util.Objects["header"] = new function() {
	this.init = function(e) {
		var list = u.ge("ul", e);
		list.e = e;
		u.e.swipe(list, new Array(e.offsetWidth - list.offsetWidth, 0, list.offsetWidth, list.offsetHeight));
		list.swipedLeft = function() {
			u.e.transition(list, "all 0.5s ease-out");
			u.e.transform(list, this.e.offsetWidth - this.offsetWidth, 0);
		}
		list.swipedRight = function() {
			u.e.transition(list, "all 0.5s ease-out");
			u.e.transform(list, 0, 0);
		}
		var buttons = u.ges("button", list);
		for(i = 0; button = buttons[i]; i++) {
			button.e = e;
			button.clicked = function() {
				this.e.navigation(u.getIJ(this, "id"));
			}
			u.e.click(button);
		}
		e.c = u.ge("content");
		e.navigation = function(page) {
			var i, slide;
			var sections = page.split("_");
			var page_title = u.ge("h2", u.ge(page)).innerHTML;
			page_title = page_title ? page_title : page;
			submitSlideEnter(page, page_title, page, document.title, false);
			u.saveCustomEvent();
			u.removeClass(document.body, "slide[0-9]+");
			u.addClass(document.body, sections[0]);
			var header_button = u.ge("id:"+page);
			var target = u.ge(sections[0], this.c.list);
			u.e.transform(this.c.list, -(target.offsetLeft), 0);
			if(target.className.match(/slide1[ $]/)) {
				u.addClass(document.body, "front");
			}
			else {
				u.removeClass(document.body, "front");
			}
			if(sections[1]) {
				var ul = u.ge("ul", target);
				u.e.transform(ul, -(u.ge(sections[0]+"_"+sections[1], this.c.list).offsetLeft), 0);
			}
			if(header_button && !header_button.className.match(/close/)) {
				list = u.ge("ul", this);
				if(list.offsetWidth - header_button.offsetLeft <= this.offsetWidth) {
					list.swipedLeft();
				}
				else {
					list.swipedRight();
				}
			}
			var nav = u.ge("ul", u.ge("footer"));
			var nav_slides = u.ges("nav", nav);
			var nav_item = u.ge(page, nav);
			for(i = 0; slide = nav_slides[i]; i++) {
				slide.style.opacity = 0.5;
			}
			nav_item.style.opacity = 1;
			var display_width = this.offsetWidth;
			var item_width = nav_item.offsetWidth;
			var start_item = nav_item.offsetLeft;
			var new_pos =  (display_width-item_width)/2 - start_item;
			u.e.transform(nav, new_pos, 0);
		}
	}
}

/*i-footer.js*/
Util.Objects["footer"] = new function() {
	this.init = function(e) {
		e.clicked = function() {
			u.t.resetTimer(e.t_autohide);
			u.toggleClass(e, "show");
		}
		u.e.click(e);
		var home = u.ae(e, "div", "home");
		u.e.click(home);
		home.clicked = function(event) {
			u.e.kill(event);
			u.ge("header").navigation("slide1");
		}
		var ref = u.ae(e, "div", "ref");
		u.e.click(ref);
		ref.clicked = function(event) {
			u.e.kill(event);
			if(!u.ge("ref_layover")) {
				var ref_layover = u.ae(u.qs("#page"), "div", {"id":"ref_layover"});
				ref_layover.innerHTML = u.ge("slide4").innerHTML;
				var bn = u.ae(ref_layover, "div", "close");
				u.e.click(bn);
				bn.clicked = function() {
					u.removeClass(document.body, "ref");
				}
			}
			this.ref_layover = u.ge("ref_layover");
			u.toggleClass(document.body, "ref");
			if(!this.ref_layover.initiated) {
				var ref = u.ge("ref", this.ref_layover);
				var ref_drag = u.ge("ref_drag", this.ref_layover);
				u.e.drag(ref, new Array(0, ref_drag.offsetHeight-ref.offsetHeight, ref.offsetWidth, ref.offsetHeight))
				this.ref_layover.initiated = true;
			}
		}
	}
}

/*no_monitor_alerts.js*/
if(typeof(submitSlideEnter) != "function") {
	submitSlideEnter = submitCustomEvent = function() {}
}

/*i-content.js*/
if(typeof(submitSlideEnter) != "function") {
	submitSlideEnter = submitCustomEvent = function() {}
}
if(typeof(openPDF) != "function") {
	openPDF = function() {alert("PDF viewer not included in this project")}
}
Util.Objects["content"] = new function() {
	this.init = function(e) {
		e.list = u.ge("ul", e);
		var slides = u.ges("pri", e.list);
		e.list.style.width = slides.length * slides[0].offsetWidth + "px";
		e.ready = function() {
			var i, slide, nested_list;
			if(u.ges("ready", this).length != u.ges("slide", this).length || e.initiated) {
				return;
			}
			else {
				var content = this.list.cloneNode(true);
				var nav = u.ge("footer").appendChild(content);
				var slides = u.ges("li", nav);
				for(i = 0; slide = slides[i]; i++) {
					if(!slide.className.match("swipe")) {
						u.addClass(slide, "nav");
						slide.innerHTML = "";
						slide.clicked = function() {
							u.ge("header").navigation(this.className.match(/slide[0-9_]+/)[0]);
						}
						u.e.click(slide);
					}
				}
				nav.slides = u.ges("nav", nav);
				var nav_width = nav.slides.length * slides[0].offsetWidth;
				nav.style.width = nav_width + "px";
				u.e.transform(nav, 0, 0);
				var nested_lists = u.ges("swipe", nav);
				for(i = 0; nested_list = nested_lists[i]; i++) {
					var nested_slides = u.ges("li", nested_list);
					nested_list.style.width = nested_slides.length * nested_slides[0].offsetWidth + "px";
				}
				u.e.drag(nav, new Array(this.offsetWidth - nav_width-((this.offsetWidth-slides[0].offsetWidth)/2), 0, nav_width + ((this.offsetWidth-slides[0].offsetWidth)/2), 125));
				var header = u.ge("header");
				header.navigation("slide1");
				u.a.transition(header, "all 1s ease-out");
				u.a.translate(header, 0, 0);
				e.initiated = true;
			}
		}
	}
}
Util.storeCustomEvent = function(category, label, value, type) {
	var monitor = u.ge("page").monitor;
	if(!monitor) {
		monitor = new Object();
	}
	if(typeof(monitor[category+label]) == "undefined" || !monitor[category+label].saved) {
		monitor[category+label] = new Object();
		monitor[category+label].category = category;
		monitor[category+label].label = label;
		monitor[category+label].value = value;
		monitor[category+label].type = type;
	}
	else {
	}
	u.ge("page").monitor = monitor;
}
Util.saveCustomEvent = function() {
	var monitor = u.ge("page").monitor;
	for(event in monitor) {
		if(!monitor[event].saved) {
			submitCustomEvent(monitor[event].category, monitor[event].label, monitor[event].value, monitor[event].type, null, null, null);
			monitor[event].saved = true;
		}
		else {
		}
	}
}

/*i-slides.js*/
Util.Objects["slide"] = new function() {
	this.init = function(e) {
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
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
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
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
			u.storeCustomEvent(this.e.title, "behandeld", new_width_value+"%", "String");
		}
		b.dropped = function() {
			new_width_value = Math.round(((this.bar.offsetWidth-26)/(634-26)) * 100);
			u.storeCustomEvent(this.e.title, "u behandeld", new_width_value+"%", "String");
		}
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
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
		}
		u.e.drag(knob, new Array (0, 0, range.offsetWidth, knob.offsetHeight), true, true);
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
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
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
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
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
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
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
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
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
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
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
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
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}
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
		u.addClass(e, "ready");
		u.ge("content").ready();
	}
}