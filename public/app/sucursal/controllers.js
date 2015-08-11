'use strict';

angular.module('farmaciaControllers', [])

.controller('DashboardCtrl', function (Api, $scope, $log, $modal) {
				
	// Cajas
	$scope.cajas = [{nombre:'Ventas', valor:'23', url:'ventas', clase:'bg-aqua', icono:'ion-stats-bars'},
					{nombre:'Compras', valor:'253', url:'compras', clase:'bg-green', icono:'ion-bag'},
					{nombre:'Requisiciones', valor:'253', url:'requisiciones', clase:'bg-yellow', icono:'ion-arrow-return-left'}
					];


	/* Graficos */
 	$scope.barventas = [{ y: "2006", a: 100, b: 90 }, { y: "2007", a: 75,  b: 65 }, { y: "2008", a: 50,  b: 40 },
			    		 { y: "2009", a: 75,  b: 65 }, { y: "2010", a: 50,  b: 40 }, { y: "2011", a: 75,  b: 65 },
			    		 { y: "2012", a: 100, b: 90 } ];

})

.controller('ProductosCtrl', function (Api, $scope, $log, $modal){
	$scope.productos = [];

	$scope.vencimiento = function(v){
		if (Date.parse(v) < Date.now())
			return true
		return false
	};

	$scope.cargarDatos = function () {
    	Api.get('s_productos/ver').then(function(data){
			$scope.productos = data;
		});
    };

	$scope.modalcrear = function (productos) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/sucursal/productos/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, productos) {
	     		$scope.productos = productos;
	     		var selects = [];
	     		
     			Api.get('s_productos/productosf').then(function(data){
     				$scope.items = data;
     			});

     			$scope.select = function (p) {
				 	var idx = selects.indexOf(p);
				 	if (idx > -1) {
				      	selects.splice(idx, 1);
				    }
				    else{
				    	selects.push(p);
				    }
				};
				$scope.all = function(){
					$('input[name=productos]').each(function () {
					    this.checked = !this.checked;
					    if(!this.checked){
					    	selects = [];
					    }
					    else{
					    	selects.push(p);
					    }
					});
				}
	     		$scope.Ok = function(){
	     			if (!formulario.$invalid) {
	     				$.growl('Guardando...', {type: 'info'});
	     				for (var i = 0; i <= selects.length - 1; i++) {
				  	 		Api.post('s_productos/guardar', selects[i]).then(function(data){
				  	 			$scope.productos.unshift(data);
								$scope.producto = {};
								$.growl('Proceso Exitoso', {type: 'success'});
				  			}, function (data){
								$.growl('Error: ' + data, {type: 'warning'}); 
							});
	     				};
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close();
				};
			},
			resolve: {
				productos: function(){
					return $scope.productos;
				}
			}
	    });
	};

	$scope.detalles = function (producto) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/sucursal/productos/ver.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, producto, productos) {
	     		$scope.producto = producto;
	     		
	     		$scope.lotes = productos.filter(function (el) {
				  return (el.id === producto.id);
				});

			  	$scope.Cancelar = function () {
				    $modalInstance.close();
				};
			},
			resolve: {
				producto: function(){
					return producto;
				},
				productos: function(){
					return $scope.productos;
				}
			}
	    });
	};

	$scope.eliminar = function(producto){
		if (confirm('¿Desea eliminar el Registro?')) {
			Api.post('s_productos/eliminar/'+ producto.id).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				for (var i in $scope.productos ) {
					if ($scope.productos[i].id === data.id ){
						$scope.productos.splice(i, 1);
					}
				}
  			},
				function (data){
					$scope.alertas = data;
				}
  			);
  				
		}
	};

})

.controller('ClientesCrtl', function (Api, $scope, $modal, $log){
	$scope.clientes = [];

	// Cardar datos
	$scope.cargarDatos = function(){
	    Api.get('s_clientes/ver').then(function(data){
			$scope.clientes = data;
		});
	};

	// Crear
	$scope.modalcrear = function (clientes) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/clientes/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, clientes) {
	     		$scope.clientes = clientes;
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     		$scope.Ok = function(cliente){
	     			if (!formulario.$invalid) {
	     				$.growl('Guardando...', {type: 'info'});
			  			Api.post('s_clientes/guardar', cliente).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
							$scope.clientes.unshift(cliente);
							$scope.cliente = {};
							$scope.municipios = [];
							$scope.departamentos = [];
			  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'}); 
						});
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close();
				};
			},
			resolve: {
				clientes: function(){
					return $scope.clientes;
				}
			}
	    });
	};

	// Modificar
	$scope.modalactualizar = function (cliente) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/clientes/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, cliente) {
	     		$scope.cliente = cliente;
	     	// Cargar datos
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     			$scope.dep = $scope.departamentos[cliente.departamento_id-1];
	     		});
	     		Api.get('municipios/0').then(function(data){
	     			$scope.municipios = data;
	     			$scope.muni = $scope.municipios[cliente.municipio_id-1];
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     	// Guardar
	     		$scope.Ok = function(cliente){
	     			if (!formulario.$invalid) {
	     				$.growl('Guardando...', {type: 'info'});
			  	 		Api.post('s_clientes/guardar', cliente).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
  	 		  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'}); 
  	 					});
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        cliente: function () {
		          return cliente;
		        }
		    }
	    });
	};

	// Eliminar
	$scope.eliminar = function(cliente){
		if (confirm('¿Desea eliminar el Registro?')) {
			$.growl('Guardando...', {type: 'info'});
			Api.post('s_clientes/eliminar/'+ cliente.id).then(function(data){
				$.growl('Proceso Exitoso', {type: 'success'});
				for (var i in $scope.clientes ) {
					if ($scope.clientes[i].id === data.id ){
						$scope.clientes.splice(i, 1);
					}
				}
  			}, function (data){
				$.growl('Error: ' + data, {type: 'warning'}); 
			});
		}
	};

})

.controller('VentasCtrl', function (Api, $scope, $modal, $log){
	$scope.ventas = [];

	$scope.cargarDatos = function(){
	    Api.get('s_ventas/ver').then(function(data){
			$scope.ventas = data;
		});
	};

	$scope.modalcrear = function (ventas) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/sucursal/ventas/form.html',
	      	windowClass:'full',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, ventas) {
	     		$scope.ventas = ventas;
	     		
	     	// Inicializar variables
	     		$scope.iniciar = function(){
	     			var ventas = [];
	     			$scope.venta = {};
	     			$scope.venta.fecha = new moment().format('YYYY-MM-DD H:mm:ss');
		     		$scope.venta.cliente_id = 1;
		     		$scope.txtcliente = "Normal";
	     			$scope.view = false;
		     		$scope.btnclass = ['default','default','default'];
		     		$scope.detalles = [];
		     		$scope.detalle = {};
		     		$scope.total = 0;
		     		$scope.detalles = [];
		     		$scope.detalle = {};
		     		$scope.detalle.cantidad = 1;
	     		};
	     	// Agregar venta
	     		$scope.AddVenta = function(venta){
	     			if (!form_venta.$invalid) {

	     				Api.get('s_ventas/factura/'+ $scope.venta.tipo_factura_id).then(function(data){
				  			$scope.venta.factura = data['actual']  + 1;
				  			$scope.venta.factura_id = data['id'];
				  	 		ventas = [];
				  	 		ventas.push(venta);
				  	 		$scope.view = true;
				  	 		switch(venta.tipo_factura_id){
				  	 			case 1:
				  	 				$scope.btnclass = ['primary','default','default'];
				  	 				break;
				  	 			case 2:
				  	 				$scope.btnclass = ['default','primary','default'];
				  	 				break;
				  	 			case 3:
				  	 				$scope.btnclass = ['default','default','primary'];
				  	 				break;
				  	 		}
				  	 		$log.info(ventas);
				  		}, function (data){
  							$.growl('Error: ' + data, {type: 'warning'});
  						});
			  	 	}
			  	};
			// Buscar Producto
			  	$scope.buscarProducto = function(codigo){
			  		$scope.resultsp = [];
			  		if (codigo != "") {
				  		Api.get('s_productos/producto/'+ codigo).then(function(data){
				  			if (data.length > 0) {selectProducto(data[0]);};
				  		}, function (data){
  							$.growl('Error: ' + data, {type: 'warning'});
  						});
				  	}else{$scope.detalle.producto_sucursal_id = "";};
			  	};
			  	function selectProducto(producto){
			  		$scope.detalle.producto_sucursal_id = producto.id;
			  		$scope.detalle.producto = producto.nombre;
			  		$scope.detalle.precio = producto.precio;
			  		$scope.AddDetalle($scope.detalle);
			  	};
			// Agregar detalle
			  	$scope.AddDetalle = function(detalle){
	     			if (!form_detalle.$invalid) {
	     				//Verifica si el producto ya fue ingresado para aumentar cantidad.
	     				if ($scope.detalles.length > 0) {
	     					var existe = false;
		     				for (var i = $scope.detalles.length - 1; i >= 0; i--) {
		     					if ($scope.detalles[i].producto_sucursal_id == detalle.producto_sucursal_id) {
		     						$scope.detalles[i].cantidad = $scope.detalles[i].cantidad + 1;
		     						existe = true;
				     			}
		     				};
		     				if (!existe) {$scope.detalles.push(detalle);};
		     			}
		     			else{
		     				$scope.detalles.push(detalle);
	     				};
	     				//Inicializar variables
	     				$scope.total = $scope.total + (detalle.precio * detalle.cantidad);
			  	 		$scope.detalle = {};
			  	 		$scope.detalle.laboratorio_id = detalle.laboratorio_id;
			  	 		$scope.detalle.cantidad = 1;
			  	 		$scope.txtproducto = "";
			  	 	};
			  	 	$log.info($scope.detalles);
			  	};
			// Elimiar
			  	$scope.eliminar = function(id){
			  		if (confirm('¿Desea eliminar el Registro?')) {
				  		$log.info(id);
				  		$scope.detalles.splice(id, 1);
				  	}
			  	};
			// Cliente
		  		Api.get('s_clientes/ver').then(function(data){
		  			$scope.clientes = data;
		  		});
			// Guardar Venta
			  	$scope.Ok = function(){
				  	if ($scope.detalles.length > 0) {
				  		var ventaTotal = ventas.concat($scope.detalles);
				  		$.growl('Guardando...', {type: 'info'});
	  		  			Api.post('s_ventas/guardar', ventaTotal).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
					  		$scope.ventas.unshift(data);
					  		$scope.iniciar();
	  		  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'}); 
	  					});
	  		  		}else{ 
	  		  			$.growl('No hay productos ingresados!', {type: 'warning'})
	  		  		};
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close($scope.ingresados);
				};
			},
			resolve:{
				ventas: function(){
					return $scope.ventas;
				}
			}
	    });
	};

	$scope.modalDetalle = function (venta) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/sucursal/ventas/factura.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, $log, venta) {
	     		$scope.venta = venta;
	     		$scope.detalles = [];
	     		$scope.total = 0;

     		    Api.get('s_ventas/detalles/' + venta.id).then(function(data){
     				$scope.detalles = data;
     			});

     		    $scope.sumar = function(v){
     		    	$scope.total = $scope.total + v;
     		    };
	     		$scope.Cancelar = function(){
			  	 	$modalInstance.dismiss('cancelar');
			  	};
			  	$scope.Imprimir = function(){
			  	 	$log.info('imprimir');
			  	};
			},
			resolve: {
		        venta: function () {
		          return venta;
		        }
		    }
	    });
	};

})

.controller('RequisicionesCtrl', function (Api, $scope, $modal, $log, $interval){
	$scope.requisiciones = [];
	
	// Msjs
	$interval(function(){
		$log.info('cargando msjs');
	    Api.get('s_requisiciones/estado/Enviado').then(function(data){
			$scope.msjs = data;
		});
	}, 5000);

	$scope.cargarDatos = function(){
	    Api.get('s_requisiciones/ver').then(function(data){
			$scope.requisiciones = data;
		});
	};

	$scope.modalcrear = function (requisiciones) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/sucursal/requisiciones/form.html',
	      	windowClass:'full',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, requisiciones) {
	     		$scope.requisiciones = requisiciones;
	     		iniciar();

	     		function iniciar(){
	     			var requisiciones = []
		     		$scope.requisicion = {};
		     		$scope.detalles = [];
		     		$scope.detalle = {};
		     		$scope.detalle.cantidad = 1;
		     		$scope.f = new moment().format('YYYY-MM-DD H:mm:ss');
		     		$scope.view = false;
	 				Api.get('s_sucursales/sucursales').then(function(data){
						$scope.sucursales = data;
					});
	     		};

			// Agregar requisicion
				$scope.guardarRequisicion = function(f,s){
					requisiciones = [];
					$scope.requisicion.fecha = f;
					$scope.requisicion.sucursal2_id = s.id;
					$scope.requisicion.sucursal2 = s.nombre;
					$scope.view = !$scope.view;
					requisiciones.push($scope.requisicion);
					$log.info(requisiciones);
				};

 			// Buscar Producto
			  	$scope.buscarProducto = function(codigo){
			  		$scope.resultsp = [];
			  		if (codigo != "") {
				  		Api.get('s_productos/producto/'+ codigo).then(function(data){
				  			if (data.length > 0) {selectProducto(data[0]);};
				  		}, function (data){
  							$.growl('Error: ' + data, {type: 'warning'});
  						});
				  	}else{$scope.detalle.producto_sucursal_id = "";};
			  	};
			  	function selectProducto(producto){
			  		$scope.detalle.producto_sucursal_id = producto.id;
			  		$scope.detalle.producto = producto.nombre;
			  		$scope.detalle.precio = producto.precio;
			  		$scope.AddDetalle($scope.detalle);
			  	};
			// Agregar detalle
			  	$scope.AddDetalle = function(detalle){
	     			if (!form_detalle.$invalid) {
	     				//Verifica si el producto ya fue ingresado para aumentar cantidad.
	     				if ($scope.detalles.length > 0) {
	     					var existe = false;
		     				for (var i = $scope.detalles.length - 1; i >= 0; i--) {
		     					if ($scope.detalles[i].producto_sucursal_id == detalle.producto_sucursal_id) {
		     						$scope.detalles[i].cantidad = $scope.detalles[i].cantidad + 1;
		     						existe = true;
				     			}
		     				};
		     				if (!existe) {$scope.detalles.push(detalle);};
		     			}
		     			else{
		     				$scope.detalles.push(detalle);
	     				};
	     				//Inicializar variables
	     				$scope.total = $scope.total + (detalle.precio * detalle.cantidad);
			  	 		$scope.detalle = {};
			  	 		$scope.detalle.laboratorio_id = detalle.laboratorio_id;
			  	 		$scope.detalle.cantidad = 1;
			  	 		$scope.txtproducto = "";
			  	 	};
			  	 	$log.info($scope.detalles);
			  	};
			// Elimiar
			  	$scope.eliminar = function(id){
			  		if (confirm('¿Desea eliminar el Registro?')) {
				  		$log.info(id);
				  		$scope.detalles.splice(id, 1);
				  	}
			  	};

			// Guardar
	     		$scope.Ok = function(){
	     			if($scope.detalles.length > 0){
	     				var total = requisiciones.concat($scope.detalles);
	     				$log.info(total);
	     				$.growl('Guardando...', {type: 'info'});
			  	 		Api.post('s_requisiciones/guardar', total).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
							$scope.requisiciones.unshift(data);
							iniciar();
			  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'});
						});
					}else{ 
	  		  			$.growl('No hay productos ingresados!', {type: 'warning'})
	  		  		};
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close();
				};
			},
			resolve: {
				requisiciones: function(){
					return $scope.requisiciones;
				}
			}
	    });
	};

	$scope.modalDetalle = function (requisicion) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/sucursal/requisiciones/listarequisiciones.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, $log, requisicion) {
	     		$scope.requisicion = requisicion;
	     		$scope.detalles = [];
	     		$scope.total = 0;

     		    Api.get('s_requisiciones/detalles/' + requisicion.id).then(function(data){
     				$scope.detalles = data;
     			});

	     		$scope.Cancelar = function(){
			  	 	$modalInstance.dismiss('cancelar');
			  	};
			  	$scope.Aceptar = function(){
			  		if (confirm('¿Acepta la requisición?')) {
	     				$.growl('Precesando...', {type: 'info'});
			  	 		Api.post('s_requisiciones/enproceso', requisicion).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
							$scope.requisicion.estado = "En Proceso";
							$scope.requisicion = data;
							$modalInstance.dismiss('cancelar');
			  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'});
						});
			  	 	}
			  	};
			},
			resolve: {
		        requisicion: function () {
		          return requisicion;
		        }
		    }
	    });
	};
})

.controller('UsuariosCtrl', function (Api, $scope, $log, $modal){
	$scope.usuarios = [];

	$scope.cargarDatos = function () {
	    Api.get('s_usuarios/ver').then(function(data){
			$scope.usuarios = data;
		});
	};

	$scope.modalcrear = function (usuarios) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/usuarios/form.html',
	      	windowClass: 'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, $log, usuarios) {
	     		$scope.usuarios = usuarios;
	     		$scope.tipos = [{'id':'3','nombre':'Sucursal'},{'id':'4','nombre':'Vendedor'}];

	     		$scope.Ok = function(usuario){
	     			if (!formulario.$invalid) {
	     				$log.info(usuario);
	     				$.growl('Guardando...', {type: 'info'});
			  			Api.post('s_usuarios/guardar', usuario).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
							$scope.usuarios.unshift(usuario);
							$scope.usuario = {};
							$scope.sucursales = [];
			  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'});
						});
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				   $modalInstance.close(usuarios);
				};
			},
			resolve:{
				usuarios: function(){
					return $scope.usuarios;
				}
			}
	    });
	};

	$scope.modalactualizar = function (usuario) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/usuarios/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, usuario, $log) {
	     		$scope.usuario = usuario;
	     		$scope.Ok = function(usuario){
	     			if (!formulario.$invalid) {
			  	 		$.growl('Guardando...', {type: 'info'});
			  			Api.post('s_usuarios/guardar', usuario).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
			  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'});
						});
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        usuario: function () {
		          return usuario;
		        }
		    }
	    });
	};
})

.controller('SucursalCtrl', function (Api, $scope, $log, $modal){
	$scope.sucursal = [];

	// Cargar datos
	    Api.get('s_sucursales/sucursal').then(function(data){
			$scope.sucursal = data[0];
		});
	
	    Api.get('departamentos').then(function(data){
			$scope.departamentos = data;
			$scope.dep = $scope.departamentos[$scope.sucursal.departamento_id - 1];
		});

		Api.get('municipios/0').then(function(data){
			$scope.municipios = data;
			$scope.muni = $scope.municipios[$scope.sucursal.municipio_id - 1];
		});
		$scope.buscar_muni = function(id){
			Api.get('municipios/'+ id).then(function(data){
				$scope.municipios = data;
			});
		};

	$scope.Ok = function(sucursal){
		if (!formulario.$invalid) {
			$.growl('Guardando...', {type: 'info'});
			Api.post('s_sucursales/guardar', sucursal).then(function(data){
				$.growl('Proceso Exitoso', {type: 'success'});
			}, function (data){
				$.growl('Error: ' + data, {type: 'warning'});
			});
	 	}
	};

});