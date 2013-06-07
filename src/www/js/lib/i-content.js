// monitor presence detection
if(typeof(submitSlideEnter) != "function") {
	submitSlideEnter = submitCustomEvent = function() {}
}
if(typeof(openPDF) != "function") {
	openPDF = function() {alert("PDF viewer not included in this project")}
}


Util.Objects["content"] = new function() {
	this.init = function(e) {

		// list
		e.list = u.ge("ul", e);
		// primary slides
		var slides = u.ges("pri", e.list);

		// set list width
		e.list.style.width = slides.length * slides[0].offsetWidth + "px";

		// wait for ready
		e.ready = function() {
			var i, slide, nested_list;
			
			if(u.ges("ready", this).length != u.ges("slide", this).length || e.initiated) {
				return;
			}
			else {

				// set footernavigation
				var content = this.list.cloneNode(true);
				var nav = u.ge("footer").appendChild(content);

				// prepare navigation slides
				var slides = u.ges("li", nav);
				for(i = 0; slide = slides[i]; i++) {
					// some slides are subslide containers, we don't use them
					if(!slide.className.match("swipe")) {
						// mark slide, to ease query later
						u.addClass(slide, "nav");
						// empty slide, to avoid content issues
						slide.innerHTML = "";
						// add link
						slide.clicked = function() {
							u.ge("header").navigation(this.className.match(/slide[0-9_]+/)[0]);
						}
						u.e.click(slide);
					}
				}

				// set navigation width
				nav.slides = u.ges("nav", nav);
				var nav_width = nav.slides.length * slides[0].offsetWidth;
				nav.style.width = nav_width + "px";

				u.e.transform(nav, 0, 0);
				// correct width of nested slide swipers
				var nested_lists = u.ges("swipe", nav);
				for(i = 0; nested_list = nested_lists[i]; i++) {
					var nested_slides = u.ges("li", nested_list);
					nested_list.style.width = nested_slides.length * nested_slides[0].offsetWidth + "px";
				}
				// enable drag of navigation bar
				u.e.drag(nav, new Array(this.offsetWidth - nav_width-((this.offsetWidth-slides[0].offsetWidth)/2), 0, nav_width + ((this.offsetWidth-slides[0].offsetWidth)/2), 125));

//				u.a.transition(header, "none");
				// set navigation
				var header = u.ge("header");
				header.navigation("slide1");
				// show header
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

	// has this event already been submitted?
	if(typeof(monitor[category+label]) == "undefined" || !monitor[category+label].saved) {
//		u.bug("update value:" + category +","+ label + "," + value + "," + type)
		monitor[category+label] = new Object();
		monitor[category+label].category = category;
		monitor[category+label].label = label;
		monitor[category+label].value = value;
		monitor[category+label].type = type;
	}
	else {

//		u.bug("skip value:" + value)

	}
	
	// save monitor object
	u.ge("page").monitor = monitor;

}

Util.saveCustomEvent = function() {

	var monitor = u.ge("page").monitor;

	// look for unsaved events
	for(event in monitor) {
		if(!monitor[event].saved) {

//			u.bug("submitting:" + monitor[event].category+","+ monitor[event].label+","+ monitor[event].value+","+ monitor[event].type)
			submitCustomEvent(monitor[event].category, monitor[event].label, monitor[event].value, monitor[event].type, null, null, null);

			// remeber - only save once
			monitor[event].saved = true;
		}
		else {

//			u.bug("nothing to save")

		}
	}

}
