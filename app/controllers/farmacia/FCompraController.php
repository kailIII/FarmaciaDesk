<?php

class FCompraController extends BaseController {

    public function getVer()
    {
        $farmacia_id = Auth::user()->farmacia->id;

        $compras = V_Compra::whereNull('deleted_at')->where('farmacia_id', $farmacia_id)->orderBy('id','dsc')->get();

        return Response::json($compras, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();
        
        $errores = [];
        $data_compra =  $data[0];
        $data_compra['farmacia_id'] = Auth::user()->farmacia->id;
        
        $compra = new Compra;
        
        if($compra->guardar($data_compra)){
            for ( $i = 1; $i < count($data) ; $i++ ) {

                $detallecompra = new DetallesCompra;

                $detalles =  $data[$i];
                $detalles['compra_id'] = $compra->id;
 				
 				// Guardar Detalle
                if($detallecompra->guardar($detalles)){
                	// Disminuir Inventario
                	$this->inventario($detallecompra->producto_farmacia_id,$detallecompra->cantidad);
                }
            }

            $data_compra['id'] = $compra->id;
            $data_compra['detalles'] = (count($data) - 1);
            return Response::json($data_compra, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        }

        $errores = "";
        foreach ($compra->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

   	public function getDetalles($id)
   	{
        $detalles = V_CompraDetalles::where('compra_id', $id)->get();

        return Response::json($detalles, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

   	}


	function getProducto($codigo){

		$farmacia = Auth::user()->farmacia->id;

		$producto = V_ProductosFarmacia::where('farmacia_id', $farmacia)
									  ->where('codigo', $codigo)->get();
		if(!is_null($producto)) 
			return Response::json($producto, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

		return Response::json("Codigo no Existe", 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

   	public function inventario($id, $c)
    {
    	$producto = ProductosFarmacia::find($id);
    	$producto->cantidad = ($producto->cantidad + $c);
    	$producto->save();
    }


}
