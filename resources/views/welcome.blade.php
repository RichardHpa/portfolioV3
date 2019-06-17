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
              <h2 class="text-white-50 mx-auto mt-2 mb-5">Wellington based Web and User Experience Designer.</h2>
              <a href="#about" class="btn btn-primary js-scroll-trigger">Check me out</a>
            </div>
          </div>
        </header>

        <!-- About Section -->
        <section id="about" class="about-section text-center">
          <div class="container">
            <div class="row">
              <div class="col-lg-10 mx-auto">
                <h2 class="text-white mb-4">About Me</h2>
                <p class="text-white-50">
                    I am a Wellington based Web and User Experienced Designer.<br>
                    Currently I am working as a Web and UX Design at Yoobee School of Design.
                    In this role I teach adult students how to use the UX process to create a user friendly product, and then develop it using industry standards programming langauges.
                    <br><br>
                    Outside of Yoobee I am also a freelance designer.
                    I have worked with a wide range of clients, all asking for different types of websites as well as different types of programming langauges and software.
                    I have worked as a Design Intern and Contract Developer for <strong><u><a href="http://www.littleyellowbird.co.nz" target="_blank">Little Yellow Bird</a></u></strong>. They are a company which manufactures ethically made work attire. I was taked with creating their online store using a custom Shopify Theme as well as adding in additional functionality to their site.<br>
			     <strong><u><a href="https://www.mrinz.ac.nz/" target="_blank">The Medicial Research Institute of New Zealand</a></u></strong> is another client of mine, having redesigned their website by creating them a custom Wordpress Theme, helps them show off the work which they are doing as well as keeping people up to date with new medical research tests which they recruiting for.<br>
			    Other companies I have done some work for include, Creative HQ, Grow Wellington, <strong><u><a href="http://www.bgi.org.nz/" target="_blank">The Wellington Boys and Girls Institute</a></u></strong>, Breadcrumbs and I am currently working with the Wellington Health Tech Network in developing a website to help show their networking events which they are holding.
                </p>
              </div>
            </div>
          </div>
        </section>

        @if(count($projects) > 0)
            <!-- Projects Section -->
            <section id="projects" class="projects-section bg-light">
                <div class="container">
                    <div class="row text-center">
                        <div class="col">
                            <h2 class="text-black mb-4">Projects</h2>
                            <p>This Portfolio is a work in progress and only holds a handfull of the projects which I have created. I will be adding more projects as I go on but have a look at my <a href="https://github.com/RichardHpa/portfolioV3" target="_blank">here on GitHub</a> for more of my work.</p>
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
                                            <hr class="d-none d-lg-block mb-0 ml-0">
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

                <div class="social d-flex justify-content-center">
                    <a href="https://github.com/RichardHpa" class="mx-2" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href="mailto:richard.m.hpa@gmail.com" class="mx-2">
                        <i class="fas fa-envelope"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/richardhpa/" class="mx-2" target="_blank">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                </div>

            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-black small text-center text-white-50">
            <div class="container">
                <div class="col12">
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
