// JavaScript Document
var el = wp.element.createElement,
	registerBlockType = wp.blocks.registerBlockType,
	ServerSideRender = wp.components.ServerSideRender,
	TextControl = wp.components.TextControl,
	TextareaControl = wp.components.TextareaControl,
	SelectControl = wp.components.SelectControl,
	InspectorControls = wp.editor.InspectorControls;

/* Icon for Inventory Block */
var cdInventoryIcon = el ("img", {
	src: "/wp-content/plugins/car-demon/blocks/images/cars-inventory.svg",
	width: "24px",
	height: "24px"
});

/* Block for Vehicle Inventory */
registerBlockType( 'car-demon/cd-inventory', {
	title: cdBlocksParams.strings.block_title_inventory,
	category: 'embed',
	icon: {
		src: cdInventoryIcon
	},

	edit: function( props ) {
		var atts = [
			el( ServerSideRender, {
				block: 'car-demon/cd-inventory',
				attributes: props.attributes,
			} ),
			el( InspectorControls, {},
				el( TextControl, {
					label: cdBlocksParams.strings.stock,
					value: props.attributes.stock,
					onChange: ( value ) => { props.setAttributes( { stock: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.year,
					value: props.attributes.year,
					onChange: ( value ) => { props.setAttributes( { year: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.make,
					value: props.attributes.make,
					onChange: ( value ) => { props.setAttributes( { make: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.model,
					value: props.attributes.model,
					onChange: ( value ) => { props.setAttributes( { model: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.location,
					value: props.attributes.location,
					onChange: ( value ) => { props.setAttributes( { location: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.body_style,
					value: props.attributes.body_style,
					onChange: ( value ) => { props.setAttributes( { body_style: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.mileage,
					value: props.attributes.mileage,
					onChange: ( value ) => { props.setAttributes( { mileage: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.min_price,
					value: props.attributes.min_price,
					onChange: ( value ) => { props.setAttributes( { min_price: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.max_price,
					value: props.attributes.max_price,
					onChange: ( value ) => { props.setAttributes( { max_price: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.transmission,
					value: props.attributes.transmission,
					onChange: ( value ) => { props.setAttributes( { transmission: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.vehicle_tag,
					value: props.attributes.vehicle_tag,
					onChange: ( value ) => { props.setAttributes( { vehicle_tag: value } ); },
				} ),
				el( SelectControl, {
					label: cdBlocksParams.strings.show_sold,
					value: props.attributes.show_sold,
					options: [
						{ label: cdBlocksParams.strings.no, value: '' },
						{ label: cdBlocksParams.strings.yes, value: cdBlocksParams.strings.yes },
					],
					onChange: ( value ) => { props.setAttributes( { show_sold: value } ); },
				} ),
				el( SelectControl, {
					label: cdBlocksParams.strings.show_only_sold,
					value: props.attributes.show_only_sold,
					options: [
						{ label: cdBlocksParams.strings.no, value: '' },
						{ label: cdBlocksParams.strings.yes, value: cdBlocksParams.strings.yes },
					],
					onChange: ( value ) => { props.setAttributes( { show_only_sold: value } ); },
				} ),
				el( SelectControl, {
					label: cdBlocksParams.strings.hide_sort,
					value: props.attributes.hide_sort,
					options: [
						{ label: cdBlocksParams.strings.no, value: '' },
						{ label: cdBlocksParams.strings.yes, value: cdBlocksParams.strings.yes },
					],
					onChange: ( value ) => { props.setAttributes( { hide_sort: value } ); },
				} ),
				el( SelectControl, {
					label: cdBlocksParams.strings.hide_nav,
					value: props.attributes.hide_nav,
					options: [
						{ label: cdBlocksParams.strings.no, value: '' },
						{ label: cdBlocksParams.strings.yes, value: cdBlocksParams.strings.yes },
					],
					onChange: ( value ) => { props.setAttributes( { hide_nav: value } ); },
				} ),
				el( SelectControl, {
					label: cdBlocksParams.strings.hide_results_found,
					value: props.attributes.hide_results_found,
					options: [
						{ label: cdBlocksParams.strings.no, value: '' },
						{ label: cdBlocksParams.strings.yes, value: cdBlocksParams.strings.yes },
					],
					onChange: ( value ) => { props.setAttributes( { hide_results_found: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.cars_per_page,
					value: props.attributes.cars_per_page,
					onChange: ( value ) => { props.setAttributes( { cars_per_page: value } ); },
				} ),
			),
		];

		/* If Template Builde is installed then add the options for it */
		if ( cdBlocksParams.template_builder_installed ) {
			var selectTemplateID = el( TextControl, {
						label: cdBlocksParams.strings.template_builder_label,
						value: props.attributes.template_id,
						onChange: ( value ) => { props.setAttributes( { template_id: value } ); },
					} );
			atts[1].props.children.push( selectTemplateID );
			var selectProSort = el( SelectControl, {
						label: cdBlocksParams.strings.pro_sort_label,
						value: props.attributes.pro_sort,
						options: [
							{ label: cdBlocksParams.strings.no, value: '' },
							{ label: cdBlocksParams.strings.yes, value: cdBlocksParams.strings.yes },
						],
						onChange: ( value ) => { props.setAttributes( { pro_sort: value } ); },
					} );
			atts[1].props.children.push( selectProSort );
			var selectSwitchStyle = el( SelectControl, {
						label: cdBlocksParams.strings.switch_styles_label,
						value: props.attributes.switch_style,
						options: [
							{ label: cdBlocksParams.strings.no, value: '' },
							{ label: cdBlocksParams.strings.yes, value: cdBlocksParams.strings.yes },
						],
						onChange: ( value ) => { props.setAttributes( { switch_style: value } ); },
					} );
			atts[1].props.children.push( selectSwitchStyle );
		}
		return atts;
	},
	
	save: function(props) {
		return null;
	}
});

/* Icon for Search Block */
var cdSearchIcon = el ("img", {
	src: "/wp-content/plugins/car-demon/blocks/images/search-vehicles.svg",
	width: "24px",
	height: "24px"
});

/* Block for Vehicle Search Form */
registerBlockType( 'car-demon/cd-search', {
	title: cdBlocksParams.strings.block_title_vehicle_search,
	category: 'embed',
	icon: {
		src: cdSearchIcon
	},

	edit: function( props ) {
		return [
			el( ServerSideRender, {
				block: 'car-demon/cd-search',
				attributes: props.attributes,
			} ),
			el( InspectorControls, {},
				el( TextControl, {
					label: cdBlocksParams.strings.search_title,
					value: props.attributes.title,
					onChange: ( value ) => { props.setAttributes( { title: value } ); },
				} ),
				el( SelectControl, {
					label: cdBlocksParams.strings.search_size,
					value: props.attributes.size,
						options: [
							{ label: cdBlocksParams.strings.search_type_small, value: 1 },
							{ label: cdBlocksParams.strings.search_type_large, value: 2 },
						],
					onChange: ( value ) => { props.setAttributes( { size: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.search_result_page,
					value: props.attributes.result_page,
					onChange: ( value ) => { props.setAttributes( { result_page: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.search_button,
					value: props.attributes.button_text,
					onChange: ( value ) => { props.setAttributes( { button_text: value } ); },
				} ),
			),
		];
	},
	
	save: function(props) {
		return null;
	}
});

/* Icon for Calculator Block */
var cdCalculatorIcon = el ("img", {
	src: "/wp-content/plugins/car-demon/blocks/images/calculator.svg",
	width: "24px",
	height: "24px"
});

/* Block for Vehicle Finance Calculator Form */
registerBlockType( 'car-demon/cd-calculator', {
	title: cdBlocksParams.strings.block_title_finance_calculator,
	category: 'embed',
	icon: {
		src: cdCalculatorIcon
	},

	edit: function( props ) {
		return [
			el( ServerSideRender, {
				block: 'car-demon/cd-calculator',
				attributes: props.attributes,
			} ),
			el( InspectorControls, {},
				el( TextControl, {
					label: cdBlocksParams.strings.finance_title,
					value: props.attributes.title,
					onChange: ( value ) => { props.setAttributes( { title: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.finance_price,
					value: props.attributes.price,
					onChange: ( value ) => { props.setAttributes( { price: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.finance_apr,
					value: props.attributes.apr,
					onChange: ( value ) => { props.setAttributes( { apr: value } ); },
				} ),
				el( TextControl, {
					label: cdBlocksParams.strings.finance_term,
					value: props.attributes.term,
					onChange: ( value ) => { props.setAttributes( { term: value } ); },
				} ),
				el( TextareaControl, {
					label: cdBlocksParams.strings.finance_disclaimer_1,
					value: props.attributes.disclaimer1,
					onChange: ( value ) => { props.setAttributes( { disclaimer1: value } ); },
				} ),
				el( TextareaControl, {
					label: cdBlocksParams.strings.finance_disclaimer_2,
					value: props.attributes.disclaimer2,
					onChange: ( value ) => { props.setAttributes( { disclaimer2: value } ); },
				} ),
			),
		];
	},
	
	save: function(props) {
		return null;
	}
});