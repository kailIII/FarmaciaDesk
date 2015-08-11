'use strict';

angular.module('farmaciaControllers', [])

.controller('DashboardCtrl', function (Api, $scope, $log) {
	$scope.datos = {};

	Api.get('dashboard/admin').then(function(data){
		$scope.datos = data[0];
	});

})

.controller('ProductosCtrl', function (Api, $scope, $log, $modal){

	$scope.productos = [];

	// Cargando los productos
		$scope.cargarDatos = function () {
			$log.info('Cargando...');
	    	Api.get('productos/ver').then(function(data){
				$scope.productos = data;
			});
		};

	// Muestra el formulario para crear productos.
		$scope.modalcrear = function (productos) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/productos/form.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
		     	controller:  function ($scope, $modalInstance, productos) {
		     		$scope.productos = productos;
		     	// Cargar Categorias
		     		Api.get('categorias').then(function(data){
		     			$scope.categorias = data;
		     		});
		     	// Buscar Subcategorias
		     		$scope.buscar_subcat = function(id){
		     			Api.get('subcategorias/'+ id).then(function(data){
		     				$scope.subcategorias = data;
		     			});
		     		};
		     	// Guardar producto
		     		$scope.Ok = function(producto){
		     			if (!formulario.$invalid) {
		     				$.growl('Guardando...', {type: 'info'});
 				  	 		Api.post('productos/guardar', producto).then(function(data){
 				  	 			add(producto);
 								$.growl('Proceso Exitoso', {type: 'success'});
 				  			}, function (data){
 								$.growl('Error: ' + data, {type: 'warning'}); 
 							});
				  	 	}
				  	};
				// Agregamos el producto
				  	function add(producto){
				  		$scope.productos.unshift(producto);
						$scope.producto = {};
						$scope.subcat = {};
						$scope.cat = {};
				  	}
				// Salir o cancelar
				  	$scope.Cancelar = function () {
					    $modalInstance.close();
					};
				},
				resolve: {
			        productos: function () {
			          return $scope.productos;
			        }
			    }
		    });
		};
	// Muestra el formulario para modificar productos.
		$scope.modalactualizar = function (producto) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/productos/form.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
		     	controller:  function ($scope, $modalInstance, producto) {
		     		$scope.producto = producto;
		     	// Carga categorias
		     		Api.get('categorias').then(function(data){
		     			$scope.categorias = data;
		     			$scope.cat = $scope.categorias[producto.categoria_id-1];
		     		});
		     	// Carga Subcategoria
		     		Api.get('subcategorias/0').then(function(data){
		     			$scope.subcategorias = data;
		     			$scope.subcat = $scope.subcategorias[producto.subcategoria_id-1];
		     		});
		     	// Busca subcategoria
		     		$scope.buscar_subcat = function(id){
		     			Api.get('subcategorias/'+ id).then(function(data){
		     				$scope.subcategorias = data;
		     			});
		     		};
		     	// Guarda el producto
		     		$scope.Ok = function(producto){
		     			if (!formulario.$invalid) {
		     				$.growl('Guardando...', {type: 'info'});
				  	 		Api.post('productos/guardar', producto).then(function(data){
 								$.growl('Proceso Exitoso', {type: 'success'});
 				  			}, function (data){
 								$.growl('Error: ' + data, {type: 'warning'}); 
 							});
				  	 	}
				  	};
				// Salir o cancelar
				  	$scope.Cancelar = function () {
					    $modalInstance.dismiss('cancelar');
					};
				},
				resolve: {
			        producto: function () {
			          return producto;
			        }
			    }
		    });
		};
	// Eliminar un producto
		$scope.eliminar = function(producto){
			if (confirm('¿Desea eliminar el Registro?')) {
				$.growl('Eliminando...', {type: 'info'});
				Api.post('productos/eliminar', producto).then(function(data){
	  	 			pop(producto.id);
					$.growl('Proceso Exitoso', {type: 'success'});
	  			}, function (data){
					$.growl('Error: ' + data, {type: 'warning'}); 
				});		
			}
			function pop(id){
				for (var i in $scope.productos ) {
					if ($scope.productos[i].id === id ){
						$scope.productos.splice(i, 1);
					}	
				}
			}
		};

})

.controller('FarmaciasCtrl', function (Api, $scope, $log, $modal){
	$scope.farmacias = [];

	// Cargar farmacias
		$scope.cargarDatos = function () {
			$log.info('Cargando..');
		    Api.get('farmacias/ver').then(function(data){
				$scope.farmacias = data;
			});
		};

	// Muestra el formulario para crear farmacias.
		$scope.modalcrear = function (farmacias) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/farmacias/form.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
		     	controller:  function ($scope, $modalInstance, Api, farmacias) {
		     		$scope.farmacias = farmacias;
		     		$scope.farmacia = {};
		     		$scope.farmacia.activa = 1;

		     	// Buscar departamentos
		     		Api.get('departamentos').then(function(data){
		     			$scope.departamentos = data;
		     		});
		     	// Buscar Municipios
		     		$scope.buscar_muni = function(id){
		     			Api.get('municipios/'+ id).then(function(data){
		     				$scope.municipios = data;
		     			});
		     		};
		     	// Guardar farmacia
		     		$scope.Ok = function(farmacia){
		     			if (!formulario.$invalid) {
				  			$.growl('Guardando...', {type: 'info'});
				  			Api.post('farmacias/guardar', farmacia).then(function(data){
								$.growl('Proceso Exitoso', {type: 'success'});
								add(farmacia);
				  			}, function (data){
									$.growl('Error: ' + data, {type: 'warning'}); 
							});
				  	 	}
				  	};
				// Agregar farmacia
					function add(farmacia){
						$scope.farmacias.unshift(farmacia);
						$scope.farmacia = {};
						$scope.municipios = [];
						$scope.departamentos = [];
					};
				  	$scope.Cancelar = function () {
					   $modalInstance.close();
					};
				},
				resolve: {
			        farmacias: function () {
			          return $scope.farmacias;
			        }
			    }
		    });
		};

	// Muestra el formulario para modificar farmacia.
		$scope.modalactualizar = function (farmacia) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/farmacias/form.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
		     	controller:  function ($scope, $modalInstance, farmacia) {
		     		$scope.farmacia = farmacia;
		     	// Cargando departamentos
		     		Api.get('departamentos').then(function(data){
		     			$scope.departamentos = data;
		     			$scope.dep = $scope.departamentos[farmacia.departamento_id-1];
		     		});
		     	// Cargando Municipios
		     		Api.get('municipios/0').then(function(data){
		     			$scope.municipios = data;
		     			$scope.muni = $scope.municipios[farmacia.municipio_id-1];
		     		});
		     		$scope.buscar_muni = function(id){
		     			Api.get('municipios/'+ id).then(function(data){
		     				$scope.municipios = data;
		     			});
		     		};
		     		$scope.Ok = function(farmacia){
		     			if (!formulario.$invalid) {
				  	 		$.growl('Guardando...', {type: 'info'});
				  			Api.post('farmacias/guardar', farmacia).then(function(data){
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
			        farmacia: function () {
			          return farmacia;
			        }
			    }
		    });
		};

	// Eliminar un farmacia
		$scope.eliminar = function(farmacia){
			if (confirm('¿Desea eliminar el Registro?')) {
				$.growl('Eliminando...', {type: 'info'});
	  			Api.post('farmacias/eliminar', farmacia).then(function(data){
					$.growl('Proceso Exitoso', {type: 'success'});
					pop(farmacia.id);
	  			}, function (data){
						$.growl('Error: ' + data, {type: 'warning'}); 
				});		
			}
			function pop(id){
				for (var i in $scope.farmacias ) {
					if ($scope.farmacias[i].id === id ){
						$scope.farmacias.splice(i, 1);
					}	
				}
			}
		};
})

.controller('UsuariosCtrl', function (Api, $scope, $log, $modal){
	$scope.usuarios = [];

	// Cargar usuarios
	    $scope.cargarDatos = function () {
	    	$log.info('Cargando..');
		    Api.get('usuarios/ver').then(function(data){
				$scope.usuarios = data;
			});
		};

	// Muestra el formulario para crear usuarios.
		$scope.modalcrear = function (usuarios) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/usuarios/form.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
		     	controller:  function ($scope, $modalInstance,$log,usuarios) {
		     		$scope.usuarios = usuarios;
		     		$scope.usuario = {};
		     		$scope.tipos = [{'id':'1','nombre':'Admon'},{'id':'2','nombre':'Farmacia'}];
		     		$scope.usuario.activa = 1;
		     	// Cargar farmacias
		     		$scope.bfarmacias = function(id){
		     			if(id==2){
		     				Api.get('farmacias/ver').then(function(data){
								$scope.farmacias = data;
							});
		     			} else{$scope.farmacias = [];$scope.usuario.sucursal_id="";}
		     		};
		     	// Guardar usuario
		     		$scope.Ok = function(usuario){
		     		$log.info(usuario);
		     			if (!formulario.$invalid) {
				  			$.growl('Guardando...', {type: 'info'});
				  			Api.post('usuarios/guardar', usuario).then(function(data){
								$.growl('Proceso Exitoso', {type: 'success'});
								add(usuario);
				  			}, function (data){
								$.growl('Error: ' + data, {type: 'warning'}); 
							});	
				  	 	}
				  	};
				// Agregar
					function add(usuario){
						$scope.usuarios.unshift(usuario);
						$scope.usuario = {};
						$scope.farmacias = [];
						$scope.usuario.activa = 1;
					};
				  	$scope.Cancelar = function () {
					   $modalInstance.close();
					};
				},
				resolve: {
			        usuarios: function () {
			          return $scope.usuarios;
			        }
			    }
		    });
		};

		$scope.modalactualizar = function (usuario) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/usuarios_admin/form_admin.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
		     	controller:  function ($scope, $modalInstance, usuario, $log) {
		     		$scope.usuario = usuario;
		     		$scope.Ok = function(usuario){
		     			if (!formulario.$invalid) {
				  	 		$.growl('Guardando...', {type: 'info'});
				  			Api.post('usuarios/guardar', usuario).then(function(data){
								$.growl('Proceso Exitoso', {type: 'success'});
								add(usuario);
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

.controller('CategoriasCtrl', function (Api, $scope, $log, $modal){
	$scope.categorias = [];

	$scope.cargarDatos = function () {
	    Api.get('categorias/ver').then(function(data){
			$scope.categorias = data;
		});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/admin/categorias/form.html',
	      	windowClass: 'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, Api) {
	     		var categorias = [];
	     		$scope.Ok = function(categoria){
	     			$log.info(categoria);
	     			if (!formulario.$invalid) {
	     				$.growl('Guardando...', {type: 'info'});
			  			Api.post('categorias/guardar', categoria).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
							categorias.unshift(categoria);
							$scope.categoria = {};
			  			},
							function (data){
								$.growl('Error: ' + data, {type: 'warning'});
							}
			  			);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				   $modalInstance.close(categorias);
				};
			}
	    });

	    modalInstance.result.then(function (categorias) {
  			for (var i = 0; i <= categorias.length - 1; i++) {
	    		$scope.categorias.unshift(categorias[i]);
	    	};
	    });
	};

	$scope.modalactualizar = function (categoria_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/admin/categorias/form.html',
	      	windowClass: 'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, categoria, $log) {
	     		$scope.categoria = categoria;
	     		$scope.Ok = function(categoria){
	     			if (!formulario.$invalid) {
	     				// Saber si es categoria o subcategoria
	     				var sub = '';
	     				if (categoria['categoria_id']) {
	     					sub = 'sub';
	     				}else{sub = '';};

	     				$.growl('Guardando...', {type: 'info'});
			  	 		Api.post('categorias/guardar' + sub, categoria).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
  	 		  			},
  	 						function (data){
								$.growl('Error: ' + data, {type: 'warning'});
  	 						}
  	 		  			);	
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        categoria: function () {
		          return categoria_id;
		        }
		    }
	    });
	};

});