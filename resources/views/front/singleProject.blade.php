@extends('layouts/master')

@section('title', '- '.$project->project_name)
@section('meta-description', $project->project_bio)

@section('content')
    <!-- Header -->
    <header class="singleMasthead image-background">
        <img src="../images/uploads/heroImages/{{ $project->project_image }}.jpg" alt="hero image of {{$project->name}}" data-position="50% 50%" onload="backgroundLoaded(this)">
    </header>
    <section class="mt-4">
        <div class="container">
            <div class="row text-center text-md-left">
                <div class="col-12 col-md-10">
                    <h1 class="my-0 text-uppercase mb-4">{{$project->project_name}}</h1>
                </div>
                @if($project->github_link || $project->website_url)
                <div class="col-12 col-md-2 d-flex justify-content-center justify-content-md-end">
                    @if($project->github_link)
                        <a href="{{$project->github_link}}" class="mx-2" target="_blank">
                            <i class="fab fa-github fa-2x"></i>
                        </a>
                    @endif
                    @if($project->website_url)
                        <a href="{{$project->website_url}}" class="mx-2" target="_blank">
                            <i class="fas fa-desktop fa-2x"></i>
                        </a>
                    @endif
                </div>
                @endif
            </div>
            <div class="row">
                <div class="col">
                    <p>{{$project->project_bio}}</p>
                </div>
            </div>
            <hr>
            <div class="row my-5">
                <div class="col-12 text-center">
                    <?php echo nl2br($project->project_description); ?>
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
