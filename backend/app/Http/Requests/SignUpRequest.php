<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignUpRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'firstname' => ['required', 'string', 'max:20'],
      'middlename' => ['required', 'string', 'max:20'],
      'lastname' => ['required', 'string', 'max:20'],
      'username' => ['required', 'string', 'max:20', 'unique:users'],
      'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
      'password' => ['required', 'string', 'min:8', 'confirmed'],
      'password_confirmation' => ['required', 'string', 'min:8'],
    ];
  }
}
