<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Rules\DateValidation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function register(Request $request)
    {
        $data = Validator::make($request->all(),
            [
                'name' => 'required|regex:/[a-zA-Z\s]/',
                'addr' => 'required',
                'phone' => 'required|size:10',
                'email' => 'required|email|unique:students,email',
                'birthDate' => ['required', new DateValidation],
            ]);

        if ($data->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Invalid student data",
                'errors' => $data->errors()->all(),
            ], 401);
        } else {
            $student = new Student();
            $student->student_name = $request->name;
            $student->email = $request->email;
            $student->address = $request->addr;
            $student->phone_number = $request->phone;
            $student->birth_date = $request->birthDate;
            $res = $student->save();
            if ($res) {
                return response()->json([
                    'status' => true,
                    'message' => 'Student Registration Successful',
                    'details' => $request->all(),
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Student Registration Failed!',
                ], 401);
            }
        }
    }

    public function getStudentInfo()
    {
        $info = Student::all();
        return response()->json([
            'status' => true,
            'data' => $info,
        ]);
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function delete(string $id)
    {
        //
    }
}
