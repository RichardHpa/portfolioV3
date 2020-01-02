<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-142542205-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-142542205-1');
        </script>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Richard Hpa Design Portfolio</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
        {{-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"> --}}
        <link rel="stylesheet" href="/fontawesome/css/all.css">

        <script>
            var minHeight = 0;
            function backgroundLoaded(element) {
                var url = "url('" + element.src + "')";
                var height = element.height;
                var parent = element.parentNode;
                var bgPosition = element.dataset.position;
                if (bgPosition) {
                    parent.style.backgroundPosition = bgPosition;
                }
                parent.style.backgroundImage = url;
                parent.style.opacity = "1";
                // parent.style.height = height;
                // element.style.display = 'none';
            }
        </script>

        <link href="{{ asset('css/front.css') }}" rel="stylesheet">
    </head>
    <body id="page-top">
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">Richard Hpa Design</a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger" href="#about">About</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger" href="#projects">Projects</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link js-scroll-trigger" href="#contact">Get in Touch</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="{{ asset('files/RichardHpaCV.pdf') }}" target="_blank">Read my CV</a>
                </li>
                @auth
                    <li class="nav-item">
                        <a class="nav-link" href="/admin">Admin Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="{{ route('logout') }}"
                           onclick="event.preventDefault();
                                         document.getElementById('logout-form').submit();">
                            Logout
                        </a>
                    </li>
                @endauth
              </ul>
            </div>
          </div>
        </nav>

        <!-- Header -->
        <header class="masthead">
          <div class="container d-flex h-100 align-items-center">
            <div class="mx-auto text-center">
              <h1 class="mx-auto my-0 text-uppercase">Richard Hpa Design</h1>
              <h2 class="text-white mx-auto mt-2 mb-5">Wellington based Web Developer</h2>
              <a href="#about" class="btn btn-primary js-scroll-trigger">Check me out</a>
            </div>
          </div>
        </header>

        <!-- About Section -->
        @if(isset($info['aboutHtml']))
            <section id="about" class="about-section text-center">
              <div class="container">
                <div class="row">
                  <div class="col-lg-10 mx-auto">
                    <h2 class="text-white mb-4">About Me</h2>
                    <div class="text-white about-content">
                        {!! $info['aboutHtml'] !!}
                    </div>
                  </div>
                </div>
              </div>
            </section>
        @endif


        @if(count($projects) > 0)
            <!-- Projects Section -->
            <section id="projects" class="projects-section bg-light">
                <div class="container">
                    <div class="row text-center">
                        <div class="col">
                            <h2 class="text-black mb-4">Projects</h2>
                            <p>These are just a handful of projects that I have done over my time as a Freelance Web Designer. My github includes more industry and personal projects I have done so feel free to <a href="https://github.com/RichardHpa/" target="_blank">check it out here.</a></p>
                        </div>
                    </div>
                    @foreach($projects as $singleProject)
                        <div class="project_row row justify-content-center no-gutters mb-5 mb-lg-0">
                            <div class="col-lg-6 img-section">
                                <img class="img-fluid" src="images/uploads/thumbnails/{{ $singleProject->project_image }}.jpg" alt="" data-position="50% 50%" onload="backgroundLoaded(this)">
                            </div>
                            <div class="col-lg-6 content-section">
                                <div class="bg-black text-center h-100 project">
                                    <div class="d-flex h-100">
                                        <div class="project-text w-100 my-auto text-center text-lg-left">
                                            <h4 class="text-white">{{ $singleProject->project_name }}</h4>
                                            <div class="bio mb-0 text-white-50">{{ $singleProject->project_bio }}</div>
                                            @if($singleProject->website_url)
                                                <strong>
                                                    <u>
                                                        <a target="_blank" href="{{$singleProject->website_url}}">View the site here.</a>
                                                    </u>
                                                </strong>
                                                <br>
                                            @endif
                                            @if($singleProject->github_link)
                                                <strong>
                                                    <u>
                                                        <a target="_blank" href="{{$singleProject->github_link}}">Read the code on GitHub.</a>
                                                    </u>
                                                </strong>
                                            @endif
                                            <hr class="d-none d-lg-block ml-0">
                                            <br>
                                            <strong>
                                                <u>
                                                    <a target="" href="project/{{$singleProject->clean_url}}">Read More.</a>
                                                </u>
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </section>
        @endif
        <!-- Contact Section -->
        <section id="contact" class="contact-section bg-black">
            <div class="container">

                <div class="row align-items-center no-gutters mb-2 text-center">
                    <div class="col">
                        <h3 class="text-white mb-4">Get in Touch</h3>
                    </div>
                </div>
                <div class="row">

                    <div class="col mb-3 mb-md-0">
                        <div class="card py-4 h-100">
                            <div class="card-body text-center">
                                <i class="fas fa-envelope text-primary mb-2"></i>
                                <h4 class="text-uppercase m-0">Email</h4>
                                <hr class="my-4">
                                <div class="small text-black-50">
                                    <a href="mailto:richard.m.hpa@gmail.com">richard.m.hpa@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @if(count($socials) > 0)
                    <div class="social d-flex justify-content-center">
                        @foreach($socials as $socialPlatform)
                            @if(filter_var($socialPlatform->social_link, FILTER_VALIDATE_EMAIL))
                                <a href="mailto:{{$socialPlatform->social_link}}" class="mx-2">
                                    <i class="{{$socialPlatform->social_icon}}"></i>
                                </a>
                            @else
                                <a href="{{$socialPlatform->social_link}}" class="mx-2" target="_blank">
                                    <i class="{{$socialPlatform->social_icon}}"></i>
                                </a>
                            @endif
                        @endforeach
                    </div>
                @endif
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-black small text-center text-white-50">
            <div class="container">
                <div class="col-12">
                    Copyright &copy; Richard Hpa Design <?php echo date("Y"); ?>
                </div>
                <div class="col-12">
                    Portfolio was created using a <a href="https://laravel.com/" target="_blank">Laravel</a> as a PHP framework, and <a href="https://reactjs.org/" target="_blank">React JS</a> for the backend admin dashboard.<br>
                    You can view the code for my portfolio <a href="https://github.com/RichardHpa/portfolioV3" target="_blank">here on GitHub</a>
                </div>
            </div>
        </footer>

        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>

        <script type="text/javascript" src="{{ asset('js/front.js') }}"></script>

    </body>
</html>
