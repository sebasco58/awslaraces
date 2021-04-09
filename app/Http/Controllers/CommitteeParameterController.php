<?php

namespace App\Http\Controllers;

use App\CommitteeParameter;
use Illuminate\Http\Request;
use App\Http\Requests\CommitteeParameterRequest;
use App\CommitteeSession;
use HTMLtoOpenXML\Parser;
use App\ActTemplate;

class CommitteeParameterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', [CommitteeParameter::class]);
        return CommitteeParameter::with('actTemplate')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommitteeParameterRequest $request)
    {
        $this->authorize('create', [CommitteeParameter::class]);
        CommitteeParameter::create([
            'name' => $request->get('name'),
            'content' => $request->get('content'),
            'act_template_id' => $request->get('act_template_id'),
            'slug'=>$request->get('slug')
        ]);
        return response()->json([
            'success'=>true,
            'status'=>201,
            'message'=>'Parámetro de comite agregado exitosamente'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(CommitteeParameter $committeeParameter)
    {
        $this->authorize('view', [CommitteeParameter::class, $committeeParameter]);
        return $committeeParameter;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CommitteeParameterRequest $request, CommitteeParameter $committeeParameter)
    {
        $this->authorize('update', [CommitteeParameter::class, $committeeParameter]);

        $committeeParameter->name = $request->get('name');
        $committeeParameter->content = $request->get('content');
        $committeeParameter->slug = $request->get('slug');
        $committeeParameter->act_template_id = $request->get('act_template_id');
        $committeeParameter->save();
        return response()->json([
            'success'=>true,
            'status'=>200,
            'message'=>'Parámetro de comite actualizado exitosamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(CommitteeParameter $committeeParameter)
    {
        $this->authorize('delete', [CommitteeParameter::class, $committeeParameter]);

        try {
            $committeeParameter->delete();
            return response()->json([
                'success'=>true,
                'status'=>200,
                'message'=>'Parámetro de comite eliminado exitosamente'
            ]);
        } catch (\Throwable $th) {
            $error = $th->errorInfo;
            if($error[1] == "1451"){
                return response()->json([
                    'status'=>500,
                    'success'=>false,
                    'message'=>'No se puede eliminar el registro porque está vinculado a un proceso de comité'
                ]);
            }
        }  
    }

    public function FindParametersGeneral($id)
    {
        $parametersSession = [];
        $committeeSession = CommitteeSession::with('learner', 'committeeSessionParameters')->findOrFail($id);
        $parameters = CommitteeParameter::with('actTemplate')->get();
        array_push($parametersSession,$committeeSession,$parameters);
        return $parametersSession;
    }

    public function saveParametersSession(Request $request, $id)
    {   
        $arrayParameters = [];
        $parametersRequest = [];

        $allparameters = CommitteeParameter::with('actTemplate')->get();

        // Se reciben todos los parametros y se asignan a un array(arrayParameters) para luego poder recorrerlos
        foreach($allparameters as $allparameter){
            array_push($arrayParameters, $allparameter);
        }
        // se reciben datos por medio del request, se descomponen y con estos se crea un nuevo array(parametersRequest)
        $keys = array_keys($request->all());
        foreach ($keys as $key) {
            if (
                $key != '_method' &&
                $key != '_token'
            ){
                $parameter_id = explode(",", $key)[0];
                $slug = explode(",", $key)[1];
                array_push($parametersRequest, [
                    'id' => intval($parameter_id),
                    'slug' => $slug,
                    'description' => $request->get($key)
                ]);
            }
        }
        // Consultar los parametros asociados a un aprendiz
        $committeeSession = CommitteeSession::with('committeeSessionParameters')->findOrFail($id);
        // $committeeSession->committeeSessionParameters()->detach();
        // se recorren los parametros
        foreach($arrayParameters as $arrayparameter){
            // se recorren los parametros que llegan del request, se valida que tenga contenido y en caso de que si se comparan los slgus para precargar informacion
            foreach($parametersRequest as $parameterRequest){
                if($parameterRequest['description']){
                    if(in_array($arrayparameter->slug,$parameterRequest)){
                        $committeeSession->committeeSessionParameters()->detach($arrayparameter->id);
                        $committeeSession->committeeSessionParameters()->attach($arrayparameter->id, ['description' => $parameterRequest['description']]);
                    }
                }
            }
        }

        return response()->json([
            'success' => true,
            'status' => 200,
            'message' => 'Parámetros guardados exitosamente'
        ]);
    }
}
