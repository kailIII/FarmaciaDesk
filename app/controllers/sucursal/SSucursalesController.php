<?php

class SSucursalesController extends BaseController {

	public function getSucursal()
    {
        $sucursal_id = Auth::user()->sucursal->id;

        $sucursal = V_Sucursal::where('id', $sucursal_id)->get();

        return Response::json($sucursal, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }

    public function postGuardar()
	{
        $data = Input::all();

	    $sucursal = Sucursal::find(Auth::user()->sucursal->id);

        if($sucursal->guardar($data))
          	return Response::json($sucursal, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = "";
        foreach ($sucursal->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}


    public function getSucursales()
    {
        $farmacia_id = Auth::user()->sucursal->farmacia->id;
        $sucursal_id = Auth::user()->sucursal->id;

        $sucursales = Sucursal::where('farmacia_id', $farmacia_id)
        						->where('id','!=', $sucursal_id)->orderBy('id','dsc')->get();

        return Response::json($sucursales, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }

}

