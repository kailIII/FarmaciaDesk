<?php

class SRequisicionController extends BaseController {

    public function getVer()
    {

        $sucursal_id = Auth::user()->sucursal->id;

        $requisiciones = V_Requisicion::where('sucursal1_id', $sucursal_id)->orderBy('id','dsc')->get();

        return Response::json($requisiciones, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

    public function getEstado($estado)
    {

        $sucursal_id = Auth::user()->sucursal->id;

        $requisiciones = V_Requisicion::where('sucursal2_id', $sucursal_id)->
        								where('estado', $estado)->orderBy('id','dsc')->get();

        return Response::json($requisiciones, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

    public function postEnproceso()
    {
    	$data = Input::all();

    	$requisicion = Requisicion::find($data['id']);
    	$requisicion->estado = 'En Proceso';
    	$requisicion->save();

    	$data['estado'] = 'En Proceso';
        return Response::json($data, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();
        
        $data_requisicion =  $data[0];

        $data_requisicion['sucursal1_id'] = Auth::user()->sucursal->id;
        $data_requisicion['estado'] = 'Enviado';

        $requisicion = new Requisicion;
        
        if($requisicion->guardar($data_requisicion)){
            for ( $i = 1; $i < count($data) ; $i++ ) {

                $detallerequisicion = new DetallesRequisicion;

                $detalle =  $data[$i];
                $detalle['requisicion_id'] = $requisicion->id;
                
                // Guardar Detalle
                if($detallerequisicion->guardar($detalle)){
                }
            }
            $data_requisicion['id'] = $requisicion->id;
            $data_requisicion['detalles'] = (count($data) - 1);
            return Response::json($data_requisicion, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        }

        $errores = "";
        foreach ($requisicion->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function getDetalles($id)
    {
        $detalles = V_RequisicionDetalles::where('requisicion_id', $id)->get();

        return Response::json($detalles, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

}
