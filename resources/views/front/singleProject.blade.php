@extends('layouts/master')

@section('title', '- '.$project->project_name)
@section('meta-description', $project->project_bio)

@section('content')
    <!-- Header -->
    <header class="singleMasthead image-background">
        <img src="../images/uploads/heroImages/{{ $project->project_image }}.jpg" alt="" data-position="50% 50%" onload="backgroundLoaded(this)">
    </header>
    <section class="mt-5">
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    <h1 class="mx-auto my-0 text-uppercase">{{$project->project_name}}</h1>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col text-center">
                    {{$project->project_description}}
                </div>
            </div>
        </div>
    </section>

@endsection
