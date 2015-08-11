<?php

class SVentaController extends BaseController {

    public function getVer()
    {
        $sucursal_id = Auth::user()->sucursal->id;

        $ventas = V_Venta::whereNull('deleted_at')->where('sucursal_id', $sucursal_id)->orderBy('id','dsc')->get();
        
        return Response::json($ventas, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();
        
        $data_venta =  $data[0];
        $data_venta['sucursal_id'] = Auth::user()->sucursal->id;

        $venta = new Venta;

        // Guardar Venta
        if($venta->guardar($data_venta)){
            for ( $i = 1; $i < count($data) ; $i++ ) {

                $detalleventa = new DetallesVenta;

                $detalles =  $data[$i];
                $detalles['venta_id'] = $venta->id;


                // Guardar Detalle
                if($detalleventa->guardar($detalles)){
                	// Disminuir Inventario
                	$this->inventario($detalleventa->producto_sucursal_id,$detalleventa->cantidad);

                }

            }
            
            // Disminuir Inventario
                $this->factura($data_venta['factura_id']);
            $data_venta['id'] = $venta->id;
            $data_venta['detalles'] = (count($data) - 1);
            return Response::json($data_venta, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        }

        $errores = "";
        foreach ($venta->errores->all() as $error) {
            $errores .= "<br> " . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

	public function inventario($id, $c)
    {
    	$producto = ProductosSucursal::find($id);
    	$producto->cantidad = ($producto->cantidad - $c);
    	$producto->save();
    }

    public function factura($id)
    {
    	$tipo_factura = TipoFactura::find($id);
    	$tipo_factura->actual = ($tipo_factura->actual + 1);
    	$tipo_factura->save();
    }
    
    public function getDetalles($id)
    {
        $detalles = V_VentaDetalles::where('venta_id', $id)->get();

        return Response::json($detalles, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

    public function getFactura($tipo){
    	switch ($tipo) {
    		case 1:
    			$tipo = "Ticket";
    			break;
    		case 2:
    			$tipo = "Factura";
    			break;
    		case 3:
    			$tipo = "Credito";
    			break;
    	}

    	$farmacia_id = Auth::user()->sucursal->farmacia->id;

        $tipo_factura = TipoFactura::where('nombre', $tipo)
        							->where('farmacia_id', $farmacia_id)->first();

        if ($tipo_factura->fin >= $tipo_factura->actual)
        	return Response::json($tipo_factura, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        
        return Response::json("Facturas Agotadas", 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }

}
