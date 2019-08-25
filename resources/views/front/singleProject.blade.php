@extends('layouts/master')

@section('title', '- '.$project->project_name)
@section('meta-description', $project->project_bio)

@section('content')
    <!-- Header -->
    <header class="singleMasthead image-background">
        <img src="../images/uploads/heroImages/{{ $project->project_image }}.jpg" alt="hero image of {{$project->name}}" data-position="50% 50%" onload="backgroundLoaded(this)">
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
            @if (count($sections) > 0)
                <div id="sectionRows" class="mt-4">
                    @foreach($sections as $section)
                        <div class="row mt-2">
                            <div class="col-12 col-md-6 imgContainer">
                                <img src="../images/uploads/thumbnails/{{$section->image}}.jpg" alt="sub image of {{$project->name}}" class="img-fluid">
                            </div>
                            <div class="col-12 col-md-6 contentContainer">
                                <?php echo html_entity_decode($section->section_content); ?>
                            </div>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>
    </section>

@endsection
