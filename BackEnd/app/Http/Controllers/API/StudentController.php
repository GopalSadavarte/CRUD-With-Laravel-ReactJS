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

    public function show()
    {
        $info = Student::all();
        return response()->json([
            'status' => true,
            'data' => $info,
        ]);
    }

    public function edit(string $id)
    {
        $student = Student::find($id);

        if ($student->count() == 1) {
            return response()->json([
                'status' => true,
                'data' => $student,
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Data Not Found!',
            ]);
        }
    }

    public function update(Request $request, string $id)
    {
        $data = Validator::make($request->all(),
            [
                'student_name' => 'required|regex:/[a-zA-Z\s]/',
                'address' => 'required',
                'phone_number' => 'required|size:10',
                'email' => 'required|email|exclude|unique:students,email',
                'birth_date' => ['required', new DateValidation],
            ]);
        if ($data->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Invalid student data",
                'errors' => $data->errors()->all(),
            ], 401);
        } else {
            $student = Student::find($id);
            $student->student_name = $request->student_name;
            $student->email = $request->email;
            $student->address = $request->address;
            $student->phone_number = $request->phone_number;
            $student->birth_date = $request->birth_date;
            $res = $student->save();
            if ($res) {
                return response()->json([
                    'status' => true,
                    'message' => 'Student Updated Successful',
                    'details' => $request->all(),
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Student Update Failed!',
                ], 401);
            }
        }

    }

    public function delete(string $id)
    {
        $user = Student::where('id', $id)->get();
        $res = Student::where('id', $id)->delete();
        if ($res) {
            return response()->json([
                'status' => true,
                'removed-data' => $user,
                'message' => 'Student Removed Successfully!',
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Student Remove Failed!',
            ]);
        }
    }
}
