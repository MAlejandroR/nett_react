<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ApiDataController extends Controller
{

    public function index()
    {
        $langs = config("lenguajes_programacion");
        return Inertia::render('Api/Opciones', compact("langs"));
    }

    public function get_imagenes()
    {
        $client = new Client();
        $accessKey = 'EMi4yUpe5MzEVryUwiwUA4JHiX46lByLXuMvQD1ONA8'; // Tu clave real de API
        $count = 10; // Número de imágenes que quieres recuperar
        $url = "https://api.unsplash.com/photos/random?client_id={$accessKey}&count={$count}";

        try {
            $response = $client->request('GET', $url);
            $images = json_decode($response->getBody()->getContents(), true);

            // Preparar un array de URLs de imágenes para enviarlo al cliente
            $imageUrls = array_map(function ($image) {
                return $image['urls']['regular']; // Asumiendo que quieres la versión 'regular' de cada imagen
            }, $images);

            return response()->json($imageUrls); // Devuelve solo las URLs de las imágenes como JSON
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo recuperar la imagen'], 404);
        }
    }

    public function get_imagenes2()
    {
        $client = new Client();
        $accessKey = 'EMi4yUpe5MzEVryUwiwUA4JHiX46lByLXuMvQD1ONA8'; // Reemplaza 'TU_CLAVE_API' con tu clave de API real
        $count = 10; //número de imágenes
        $url = "https://api.unsplash.com/photos/random?client_id=$accessKey&count=$count";
        try {
            $response = $client->request('GET', $url);
//            $data = json_decode($response->getBody()->getContents(), true); // Convertimos el JSON en array
//            return response()->json($data); // Devuelve los datos como JSON
            $images = json_decode($response->getBody()->getContents(), true);
            return $images;
//            return Inertia::render('Api/Opciones', ['imagesServer' => $images]);


//            $response = $client->request('GET', $url);
////            $contentType = $response->getHeader('Content-Type')[0];
//            return response($response->json(), 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo recuperar la imagen'], 404);
        }
    }

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


