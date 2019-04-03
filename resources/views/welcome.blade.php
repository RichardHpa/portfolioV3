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
        <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
          <div class="container">
            <a class="navbar-brand js-scroll-trigger" href="#page-top">Richard Hpa Design</a>
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
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
            {{-- <img src="images/ipad.png" class="img-fluid" alt=""> --}}
          </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="projects-section bg-light">
            <div class="container">

                <!-- Featured Project Row -->
                <div class="row align-items-center no-gutters mb-4 mb-lg-5">
                    <div class="col-xl-8 col-lg-7">
                        <img class="img-fluid mb-3 mb-lg-0" src="images/bg-masthead.jpg" alt="">
                    </div>
                    <div class="col-xl-4 col-lg-5">
                        <div class="featured-text text-center text-lg-left">
                            <h4>Shoreline</h4>
                            <p class="text-black-50 mb-0">Grayscale is open source and MIT licensed. This means you can use it for any project - even commercial projects! Download it, customize it, and publish your website!</p>
                        </div>
                    </div>
                </div>

                <!-- Project One Row -->
                <div class="row justify-content-center no-gutters mb-5 mb-lg-0">
                    <div class="col-lg-6">
                        <img class="img-fluid" src="images/demo-image-01.jpg" alt="">
                    </div>
                    <div class="col-lg-6">
                        <div class="bg-black text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-left">
                                    <h4 class="text-white">Misty</h4>
                                    <p class="mb-0 text-white-50">An example of where you can put an image of a project, or anything else, along with a description.</p>
                                    <hr class="d-none d-lg-block mb-0 ml-0">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Project Two Row -->
                <div class="row justify-content-center no-gutters">
                    <div class="col-lg-6">
                        <img class="img-fluid" src="images/demo-image-02.jpg" alt="">
                    </div>
                    <div class="col-lg-6 order-lg-first">
                        <div class="bg-black text-center h-100 project">
                            <div class="d-flex h-100">
                                <div class="project-text w-100 my-auto text-center text-lg-right">
                                    <h4 class="text-white">Mountains</h4>
                                    <p class="mb-0 text-white-50">Another example of a project with its respective description. These sections work well responsively as well, try this theme on a small screen!</p>
                                    <hr class="d-none d-lg-block mb-0 mr-0">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- Contact Section -->
        <section class="contact-section bg-black">
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
                </div>

            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-black small text-center text-white-50">
            <div class="container">
                Copyright &copy; Richard Hpa Design <?php echo date("Y"); ?>
            </div>
        </footer>

        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>

        <script type="text/javascript" src="{{ asset('js/front.js') }}"></script>
    </body>
</html>
