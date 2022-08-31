//Start Toggle
(function ($) {

	$.fn.netlivaSwitch = function(settings, val)
	{
		let $input = this;
		let first = false;
		let $container, $label;
		let returnValue = null;

		if (typeof settings === "string")
		{
			if (typeof val === "undefined")
			{
				returnValue = settings;
				settings = {}
			}
			else
			{
				settings = {[settings] : val}
			}
		}
		if (typeof settings !== 'object')
			settings = {};

		if	($input.data("netlivaSwitch") === "initalized")
		{
			$container = $input.parent();
			$label = $input.next();
		}
		else
		{
			first = true;
			$container = $("<div/>");
			$label = $("<label/>");

			var id = $input.attr("id");
			if (!id)
			{
				id = "netliva-switch-"+ (Math.floor(Math.random() * 10000000000) + 1);
				$input.attr('id', id);
			}
			$label.attr("for",id);

			$container.addClass("netliva-switch");
			$input.clone().appendTo($container);
			$label.appendTo($container);
			$input.replaceWith($container);
			$input = $container.find("input");
			$input.on("change", function () {
				$(this).trigger( "netlivaSwitch.change", [ $(this).prop("checked"), $(this) ] );
			});

			settings = $.extend( {
				 "active-text": $input.data("active-text") ? $input.data("active-text") : null,
				 "passive-text": $input.data("passive-text") ? $input.data("passive-text") : null,
				 "width": $input.data("width") ? $input.data("width") : null,
				 "active-color": $input.data("active-color") ? $input.data("active-color") : null,
				 "passive-color": $input.data("passive-color") ? $input.data("passive-color") : null,
			 }, settings );

			if (typeof settings.width === 'undefined' || !settings.width)
			{
				var textsize = 3;

				if (settings["active-text"] && settings["active-text"].length > textsize)
					textsize = settings["active-text"].length;
				if (settings["passive-text"] && settings["passive-text"].length > textsize)
					textsize = settings["passive-text"].length;

				settings.width = (textsize*0.55 + 2.5)+"em";
			}
			else if (typeof settings.width !== 'string')
			{
				settings.width += "px";
			}

			$input.data("netlivaSwitch", "initalized");
		}

		$.each(settings, function (key, val) {
			if (val !== null)
			{
				switch(key) {
					case "active-text":
					case "passive-text":
						$label.attr("data-"+key, val);
						break;
					case "active-color":
					case "passive-color":
						if (val.substr(0,1) !== "#") val = 'var(--'+val+')';
						$label.css('--switch-'+key, val);
						break;
					case "disable":
					case "disabled":
						$input.prop("disabled", val);
						break;
					case "val":
					case "chacked":
					case "state":
						$input.prop("checked", val);
						break;
					case "width":
						$label.css("width", val);
						break;
				}
			}
		});

		if (returnValue)
		{
			switch(returnValue) {
				case "checked":
				case "state":
					return $input.prop("checked");
				case "disabled":
					return $input.prop("disabled");
				default:
					return undefined;
			}
		}

		return $input;

	};

	function init()
	{

		$("[netliva-switch]").each(function () {
			if ($(this).attr("netliva-switch") !== "OK")
			{
				$(this).attr("netliva-switch", "OK");
				$(this).netlivaSwitch({});
			}
		});
	}

	$(document).ajaxComplete(init);
	init();


})(jQuery);
//End Toggle
//Start india map chart
(async () => {

	const topology = await fetch(
	    'https://code.highcharts.com/mapdata/countries/in/custom/in-all-disputed.topo.json'
	).then(response => response.json());
 
	// Prepare demo data. The data is joined to map using value of 'hc-key'
	// property by default. See API docs for 'joinBy' for more info on linking
	// data and map.
	const data = [
	    ['madhya pradesh', 1000], ['uttar pradesh', 11], ['karnataka', 12],
	    ['nagaland', 13], ['bihar', 14], ['lakshadweep', 15],
	    ['andaman and nicobar', 16], ['assam', 17], ['west bengal', 18],
	    ['puducherry', 19], ['daman and diu', 20], ['gujarat', 21],
	    ['rajasthan', 22], ['dadara and nagar havelli', 23],
	    ['chhattisgarh', 24], ['tamil nadu', 25], ['chandigarh', 26],
	    ['punjab', 27], ['haryana', 28], ['andhra pradesh', 29],
	    ['maharashtra', 30], ['himachal pradesh', 31], ['meghalaya', 32],
	    ['kerala', 33], ['telangana', 34], ['mizoram', 35], ['tripura', 36],
	    ['manipur', 37], ['arunanchal pradesh', 38], ['jharkhand', 39],
	    ['goa', 40], ['nct of delhi', 41], ['odisha', 42],
	    ['jammu and kashmir', 43], ['sikkim', 44], ['uttarakhand', 45]
	];
 
	// Create the chart
	Highcharts.mapChart('marketing_view_click_chart',{
	    chart: {
		   map: topology
	    },
 
	    title: {
		   text: 'Highcharts Maps basic demo'
	    },
 
	    subtitle: {
		   text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/in/custom/in-all-disputed.topo.json">India with disputed territories</a>'
	    },
 
	    mapNavigation: {
		   enabled: true,
		   buttonOptions: {
			  verticalAlign: 'bottom'
		   }
	    },
 
	    colorAxis: {
		   min: 0
	    },
 
	    series: [{
		   data: data,
		   name: 'Random data',
		   states: {
			  hover: {
				 color: '#BADA55'
			  }
		   },
		   dataLabels: {
			  enabled: true,
			  format: '{point.name}'
		   }
	    }]
	});
 
 })();
 
//End india map chart



