<?php

namespace App\Http\Controllers;

use App\Committee;
use Illuminate\Http\Request;
use App\Http\Requests\CommitteeRequest;

class CommitteeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('viewAny', [Committee::class]);
        return Committee::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommitteeRequest $request)
    {
        $this->authorize('create', [Committee::class]);

        Committee::create([
            'record_number' => $request->get('record_number'),
            'date' => $request->get('date'),
            'start_hour' => $request->get('start_hour'),
            'end_hour' => $request->get('end_hour'),
            'place' => $request->get('place'),
            'formation_center' => $request->get('formation_center'),
            'subdirector_name' => $request->get('subdirector_name'),
            'coordinador_name' => $request->get('coordinador_name')
        ]);

        return response()->json([
            'status'=>201,
            'success'=>true,
            'message'=>'Comité agregado con exito'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Committee $committee)
    {   
        $this->authorize('view', [Committee::class, $committee]);
        // $aprendiz = $committee->load(['committeeSessions.learner']);
        $committee->load(['committeeSessions.learner', 'committeeSessions.committeeSessionState']);
        return $committee;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CommitteeRequest $request, Committee $committee)
    {
        $this->authorize('update', [Committee::class, $committee]);

        $committee->record_number = $request->get('record_number');
        $committee->date = $request->get('date');
        $committee->start_hour = $request->get('start_hour');
        $committee->end_hour = $request->get('end_hour');
        $committee->place = $request->get('place');
        $committee->formation_center = $request->get('formation_center');
        $committee->subdirector_name = $request->get('subdirector_name');
        $committee->coordinador_name = $request->get('coordinador_name');
        $committee->save();
        return response()->json([
            'status'=>200,
            'success'=>true,
            'message'=>'Comité actualizado correctamente'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Committee $committee)
    {
        $this->authorize('delete', [Committee::class, $committee]);

        try {
            $committee->delete();
            return response()->json([
                'status'=>201,
                'success'=>true,
                'message'=>'Comité eliminado con exito'
            ]);
        } catch (\Throwable $th) {
            $error = $th->errorInfo;
            if($error[1] == "1451"){
                return response()->json([
                    'status'=>500,
                    'success'=>false,
                    'message'=>'No se puede eliminar porque tiene aprendices asociados'
                ]);
            }
        }
    }
}
