


(function ($) {

	$.fn.diagram = function (params) {

		function rotate(angle) {
			return {
				"-webkit-transform": "rotate(" + angle + "deg)",
				"-moz-transform": "rotate(" + angle + "deg)",
				"-ms-transform": "rotate(" + angle + "deg)",
				"-o-transform": "rotate(" + angle + "deg)",
				"transform": "rotate(" + angle + "deg)"
			};
		}

		var defaults = {
			size: "100",
			borderWidth: "10",
			bgFill: '#E6E9ED',
			frFill: '#3BAFDA',
			textSize: 1.4 + 'em',
			textColor: '#FFF'
		};

		var options = $.extend({}, defaults, params);

		var $this = $(this);
		var dataAttr = $this.data("name");
		var data = parseFloat($this.data("percent"));

		var cssMain = {
			"position": "relative",
			"width": options.size + "px",
			"height": options.size + "px",
			"border": options.borderWidth + "px " + "solid" + options.bgFill,
			"border-radius": "50%",
			"z-index": "1"
		};

		var cssElems = {
			"position": "absolute",
			"top": -options.borderWidth + "px",
			"right": -options.borderWidth + "px",
			"bottom": -options.borderWidth + "px",
			"left": -options.borderWidth + "px",
			"border": options.borderWidth + "px " + "solid",
			"border-radius": "50%"
		};

		$this.css(cssMain);

		var text = $('<span class="diag"></span>')
				.appendTo($this)
				.css({
					"display": "block",
					"position": "relative",
					"z-index": "2",
					"text-align": "center",
					"font-size": options.textSize,
					"height": (options.size - options.borderWidth * 2) + "px",
					"line-height": (options.size - options.borderWidth * 2) + "px",
					"color": options.textColor,
					"font-weight": "300"
				})
				.text(dataAttr);

		var bg = $('<div class="diag"></div>')
				.appendTo($this)
				.css(cssElems)
				.css({
					"border-color": options.frFill,
					"border-left-color": "transparent",
					"border-bottom-color": "transparent",
					"z-index": "1"
				});

		var fill = $('<div class="diag"></div>')
				.appendTo($this)
				.css(cssElems)
				.css({
					"border-color": options.bgFill,
					"border-left-color": "transparent",
					"border-bottom-color": "transparent",
					"z-index": "1"
				});

		var angle;
		if (data >= 0 && data <= 50) {
			angle = (225 - 45) / 50 * data + 45;
		} else {
			angle = (405 - 225) / 50 * data + 225;
			fill.css({
				"border-color": options.frFill,
				"border-left-color": "transparent",
				"border-bottom-color": "transparent",
				"z-index": "1"
			});
		}

		bg.css(rotate(45));
		fill.css(rotate(angle));

		return this;
	};

})(jQuery);