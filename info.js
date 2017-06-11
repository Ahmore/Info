/**
 *	Project		Info with jQuery
 *	Build 		1 May, 2014
 * 	Author		Dariusz Szymczyk 
 */

(function($) {
	$.info = function(options) {
		var settings = $.extend({
			top		: 10,
			right	: 100
		}, options),
		
		config = {
			infoContainerClass	: "plugin-info-container",
			infoClass			: "plugin-info-info"
		},
		
		InfoCollection = function() {
			this.container = this.addContainer();
			
			return this;
		};
		
		InfoCollection.prototype.addContainer = function() {
			var container = $("<div/>").addClass(config.infoContainerClass),
				css = {};
			
			if (settings.bottom) {
				css.bottom = settings.bottom;
			}
			else {
				css.top = settings.top;
			}

			if (settings.left) {
				css.left = settings.left;
			}
			else {
				css.right = settings.right;
			}
			
			container.css(css).appendTo($("body"));
			
			return container;
		};
		
		InfoCollection.prototype.push = function(options) {
			var settings = $.extend({
				color		: "#0D789F",
				textColor	: "white",
				content		: "Some informations.",
				width		: 200,
				height		: "auto",
				fadeOut		: 500,
				autoHide	: true,
				delay		: 3000
			}, options);
			
			new Info(settings, this);
			
			return this;
		};
		
		var Info = function(settings, collection) {
			this.settings = settings;
			this.collection = collection;
			this.addStructure();
			this.addEvents();
			this.addExtraProperties();
			
			this.info.animate({
				opacity: 1
			}, 500);
			
			return this;
		};
		
		Info.prototype.addStructure = function() {
			var that = this,
				info = $("<div/>").addClass(config.infoClass).html(that.settings.content).appendTo(that.collection.container);
			
			this.info = info;
		};
		
		Info.prototype.addEvents = function() {
			var that = this,
				timeout;
			
			that.info.on("click", function(e) {
				e.stopPropagation();
				that.close();
			}).on("mouseover", function() {
				clearTimeout(timeout);
				that.info.stop().animate({
					opacity	: 1
				}, 100);
			}).on("mouseout", function() {
				timeout = that.setTimeout();
			});
			
			timeout = that.setTimeout();
		};
		
		Info.prototype.setTimeout = function() {
			var that = this;
			
			return setTimeout(function() {
				that.close();
			}, that.settings.delay);
		};
		
		Info.prototype.close = function() {
			var that = this;
			
			that.info.fadeOut(that.settings.fadeOut, function() {
				that.info.remove();
			});
		};
		
		Info.prototype.addExtraProperties = function() {
			var that = this;
			
			that.info.css({
				backgroundColor	: that.settings.color,
				color			: that.settings.textColor,
				height			: that.settings.height,
				width			: that.settings.width
			});
		};
		
		return new InfoCollection();
	};
})(jQuery);