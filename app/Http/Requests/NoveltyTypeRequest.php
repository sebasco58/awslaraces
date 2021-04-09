<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class NoveltyTypeRequest extends FormRequest
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
            'name' => ['required','string','min:5','unique:novelty_types']
        ];

        if (in_array($this->method(), ['PUT','PATCH'])) {
            $novelty_type = $this->route()->parameter('novelty_type');
            $rules['name'] = [
                'required',
                'string',
                'min:5',
                Rule::unique('novelty_types')->ignore($novelty_type)
            ];
        }

        return $rules;
    }
    
    public function attributes()
    {
        return [
            'name' => 'nombre'
        ];
    }

    public function response(array $errors)
    {
        if ($this->expectsJson()) {
            return new JsonResponse($errors, 422);
        }
    }
}
