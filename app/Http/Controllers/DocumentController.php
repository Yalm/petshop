<?php

namespace App\Http\Controllers;

use App\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:customer');
    }

    public function index()
    {
        $documents = Document::paginate(10);
        return response()->json($documents);
    }

    public function store(Request $request)
    { }

    public function update(Request $request, $id)
    { }

    public function destroy($id)
    { }
}
