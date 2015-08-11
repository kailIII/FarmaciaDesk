<?php

class SProductoController extends BaseController {

    public function getVer()
    {
        $sucursal_id = Auth::user()->sucursal->id;

        $productos = V_ProductosSucursal::where('sucursal_id', $sucursal_id)->orderBy('id','dsc')->get();


        return Response::json($productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();

		$data['producto_farmacia_id'] = $data['id'];
        $data['cantidad'] = 0;
        $data['ubicacion'] = "";

        $data['sucursal_id'] = Auth::user()->sucursal->id;
    	$producto = new ProductosSucursal;

        if($producto->guardar($data))
            return Response::json($data, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = "";
        foreach ($producto->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

    public function getProductosf()
    {

		$productos = V_ProductosFarmacia::all();

		return Response::json($productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	public function getProducto($codigo){

		$sucursal = Auth::user()->sucursal->id;

		$producto = V_ProductosSucursal::where('sucursal_id', $sucursal)
									  ->where('codigo', $codigo)->get();
		if(!is_null($producto)) 
			return Response::json($producto, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

		return Response::json("Codigo no Existe", 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

}
