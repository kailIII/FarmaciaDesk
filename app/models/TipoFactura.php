<?php
class TipoFactura extends Eloquent {
    use SoftDeletingTrait;

    protected $table = "tipos_factura";
	public $errores;
    protected $softDelete = true;
	protected $fillable = array(
		'nombre',
		'inicio',
		'fin',
		'actual',
		'farmacia_id'
		);


	/* Guardar */

        public function guardar($datos) 
        {
            if($this->validar($datos)) 
            {
                $this->fill($datos);
                $this->save();
                return true;
            }

            return false;
        }


    /* Validaciones */

        public function validar($datos) 
        {        
            $reglas = array(
                'nombre' => 'required|max:100',
                'inicio' => 'required|numeric',
                'fin' => 'required|numeric',
                'actual' => 'required|numeric',
                'farmacia_id' => 'required|numeric'
            );

            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }
}