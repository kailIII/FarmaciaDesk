'use strict';

/* Directives */


angular.module('farmaciaDirectives', []).

directive('appVersion', ['version', function(version) {
return function(scope, elm, attrs) {
  elm.text(version);
};
}])

.directive('datetime', function() { 
	return { 
		restrict: 'A', 
		link: function(scope, element, attrs) 
		{ 
			$(element).datetimepicker({format:'YYYY-MM-DD H:mm:ss'});
		}
	}
})

.directive('toolbar',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/toolbar.html"
	}
})

.directive('opciones',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/opciones.html"
	}
})

.directive('ubicacion',function(){
	return {
		restrict: "E",
		scope: {
		    tabla: '=tabla'
		},
		templateUrl: "app/views/ubicacion.html"
	}
})

.directive('alertas',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/alertas.html"
	}
})

// Ventas
	.directive('venta',function(){
		return {
			restrict: "E",
			templateUrl: "app/views/sucursal/ventas/crear/venta.html"
		}
	})
	.directive('detalle',function(){
		return {
			restrict: "E",
			templateUrl: "app/views/sucursal/ventas/crear/detalle.html"
		}
	})
	.directive('listaventa',function(){
		return {
			restrict: "E",
			templateUrl: "app/views/sucursal/ventas/crear/listaventa.html"
		}
	})

// Compras
	.directive('compra',function(){
		return {
			restrict: "E",
			templateUrl: "app/views/farmacia/compras/crear/compra.html"
		}
	})
	.directive('detallecompra',function(){
		return {
			restrict: "E",
			templateUrl: "app/views/farmacia/compras/crear/detalle.html"
		}
	})
	.directive('listacompra',function(){
		return {
			restrict: "E",
			templateUrl: "app/views/farmacia/compras/crear/listacompra.html"
		}
	});