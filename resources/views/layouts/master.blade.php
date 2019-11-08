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

        <title>Richard Hpa Design @yield('title')</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="description" content="@yield('meta-description')">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">

        <script>
            function backgroundLoaded(element) {
                var url = "url('" + element.src + "')";
                var parent = element.parentNode;
                var bgPosition = element.dataset.position;
                if (bgPosition) {
                    parent.style.backgroundPosition = bgPosition;
                }
                parent.style.backgroundImage = url;
                parent.style.opacity = "1";
            }
        </script>

        <link href="{{ asset('css/front.css') }}" rel="stylesheet">
    </head>
    <body id="page-top">
        <nav class="navbar navbar-expand-lg navbar-light fixed-top navbar-shrink" id="mainNav">
            <div class="container">
                <a class="navbar-brand js-scroll-trigger" href="../">Richard Hpa Design</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" href="../#about">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" href="../#projects">Projects</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link js-scroll-trigger" href="../#contact">Get in Touch</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ asset('files/RichardHpaCV.pdf') }}" target="_blank">Read my CV</a>
                        </li>
                        @auth
                        <li class="nav-item">
                            <a class="nav-link" href="../admin">Admin Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                Logout
                            </a>
                        </li>
                        @endauth
                    </ul>
                </div>
            </div>
        </nav>
        @yield('content')
        <!-- Contact Section -->
        <section id="contact" class="contact-section bg-black mt-5">
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
