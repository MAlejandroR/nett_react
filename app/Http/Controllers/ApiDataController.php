<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class ApiDataController extends Controller
{
    public function index(){
        $langs= config("languages");

        return Inertia::render ("Api/Opciones", compact("langs"));
    }
    //
    public function get_films()
    {
        info ("ApiDataController En get_films");

        $client = new Client();
        $api_key = "0104ce154d195cabb2535d5811bb8c90";
//                https://api.themoviedb.org/3/movie/157336?api_key=0104ce154d195cabb2535d5811bb8c90
        $url = "https://api.themoviedb.org/3/movie/157336?api_key=$api_key";
        $url = "https://api.themoviedb.org/3/trending/all/day?language=es-ES&api_key=$api_key";

//        $response = $client->request('GET',$url);


        $response = Http::get($url);
        info($response);
        $datos= response()->json(json_decode($response->getBody(), true));
        info ($datos);
        return $datos;

        try {
            $response = $client->request('GET', $url);

//            $data = json_decode($response->getBody()->getContents(), true); // Convertimos el JSON en array
//            return response()->json($data); // Devuelve los datos como JSON
            $films = json_decode($response->getBody()->getContents(), true);
            info($films);
            return $films;
//            return Inertia::render('Api/Opciones', ['imagesServer' => $images]);


//            $response = $client->request('GET', $url);
////            $contentType = $response->getHeader('Content-Type')[0];
//            return response($response->json(), 200);
        } catch
        (\Exception $e) {
            return response()->json(['error' => 'No se pudo recuperar películas'], 404);
        }

    }

}
