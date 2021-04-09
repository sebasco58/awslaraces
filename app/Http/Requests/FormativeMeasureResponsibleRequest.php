<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Http\FormRequest;

class FormativeMeasureResponsibleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'username' => ['required', 'string', 'min:6'],
            'misena_email' => ['required', 'string', 'unique:formative_measure_responsibles'],
            'institutional_email' => ['string','unique:formative_measure_responsibles'],
            'document_type' => ['required', 'string', 'max:3'],
            'document' => ['required', 'string', 'unique:formative_measure_responsibles'],
            'birthdate' => ['date'],
            'phone' => ['string','unique:formative_measure_responsibles'],
            'phone_ip' => ['string'],
            'gender' => ['required', 'string'],
            'position_id' => ['required', 'integer','exists:positions,id'],
            'contract_type_id' => ['required', 'integer','exists:contract_types,id'],
            'type' => ['required', 'string'],
            'state' => ['required', 'string'],
            'photo' => ['file', 'max:5000']
        ];

        if(in_array($this->method(), ['PUT', 'PATCH'])) {
            $formative_measure_responsible = $this->route()->parameter('formative_measure_responsible');
            $rules['misena_email'] = [
                'required',
                'string',
                Rule::unique('formative_measure_responsibles')->ignore($formative_measure_responsible)
            ];
            $rules['institutional_email'] = [
                'nullable',
                'string',
                Rule::unique('formative_measure_responsibles')->ignore($formative_measure_responsible)
            ];
            $rules['document'] = [
                'nullable',
                'string',
                Rule::unique('formative_measure_responsibles')->ignore($formative_measure_responsible)
            ];
            $rules['phone'] = [
                'nullable',
                'string',
                Rule::unique('formative_measure_responsibles')->ignore($formative_measure_responsible)
            ];
            $rules['phone_ip'] = [
                'nullable',
                'string',
            ];
        }
        return $rules;
    }

    public function attributes()
    {
        return [
           'username' => 'nombre de usuario',
            'misena_email' => 'correo mi sena',
            'institutional_email' => 'correo institucional',
            'document_type' => 'tipo de documento',
            'document' => 'documento',
            'birthdate' => 'fecha de nacimiento',
            'phone' => 'celular',
            'phone_ip' => 'telefono',
            'gender' => 'genero',
            'position_id' => 'cargo',
            'contract_type_id' => 'tipo de contrato',
            'type' => 'tipo',
            'state' => 'estado',
            'photo' => 'foto'
        ];
    }

    public function response(array $errors)
    {
        if ($this->expectsJson()) {
            return new JsonResponse($errors, 422);
        }
    }
}
