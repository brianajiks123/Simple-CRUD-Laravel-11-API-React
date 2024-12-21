<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $students = Student::select('id', 'name', 'age', 'gender')->get();

            if ($students->isEmpty()) {
                return response()->json([
                    "message" => "Data is empty."
                ], 200);
            }

            return response()->json([
                "data" => $students
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "An error occurred while fetching students.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                "name" => "required|string",
                "age" => "required|integer",
                "gender" => "required|string|in:male,female",
            ]);

            $student = Student::create($data);

            return response()->json([
                "data" => $student
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "message" => "Validation error.",
                "errors" => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "An error occurred while creating the student.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $data = $request->validate([
                "name" => "required|string",
                "age" => "required|integer",
                "gender" => "required|string|in:male,female",
            ]);

            $student = Student::findOrFail($id);

            $student->update($data);

            return response()->json([
                "message" => "Student with id $id updated successfully.",
                "data" => $student
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Student not found."
            ], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                "message" => "Validation error.",
                "errors" => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "An error occurred while updating the student.",
                "error" => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $student = Student::findOrFail($id);

            $student->delete();

            return response()->json([
                "message" => "Student with id $id deleted successfully."
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Student not found."
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                "message" => "An error occurred while deleting the student.",
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
