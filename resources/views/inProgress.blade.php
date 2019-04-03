<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Richard Hpa Design Portfolio</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">


        <link href="{{ asset('css/front.css') }}" rel="stylesheet">
    </head>
    <body id="page-top">

        <!-- Header -->
        <header class="masthead">
          <div class="container d-flex h-100 align-items-center">
            <div class="mx-auto text-center">
              <h1 class="mx-auto my-0 text-uppercase">Richard Hpa Design</h1>
              <h2 class="text-white-50 mx-auto mt-2 mb-5">Wellington based Web and User Experience Designer.</h2>
              <h2 class="text-white-50 mx-auto mt-2 mb-5">Portfolio in Progress</h2>
              <a href="https://github.com/RichardHpa" class="btn btn-primary" target="blank">Check me out in Github in the meantime <i class="fab fa-github fa-3x"></i></a>
            </div>
          </div>
        </header>

        <script type="text/javascript" src="{{ asset('js/front.js') }}"></script>
    </body>
</html>
