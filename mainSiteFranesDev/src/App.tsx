import { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GenerateTest from './GenerateTest'; // Importa el nuevo componente
import './App.css';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from 'react-icons/fa';
import emailjs from 'emailjs-com';
import image1 from '../public/logocircular.png';
import image2 from '../public/logonombre.png';
import YouTubePlayer from 'react-player/youtube';

interface Translations {
  [key: string]: {
    heroTitle: string;
    heroSubtitle: string;
    heroText: string;
    aboutTitle: string;
    aboutText: string;
    contactTitle: string;
    contactText: string;
  };
}

const translations: Translations = {
  en: {
    heroTitle: "I'm Franklin Paute Machuca",
    heroSubtitle: 'Imagine | Code | Create',
    heroText:
      'Full Stack Developer | .NET | MAUI | React | 🇪🇨 Ecuadorian, passionate about what I do. I love tackling technical challenges and building innovative solutions. Sharing the journey of programming and software development.',
    aboutTitle: 'Who is behind the keyboard?',
    aboutText:
      "With over 10 years of experience as a full-stack engineer, I\'m passionate about tackling complex challenges and delivering innovative solutions. I take a holistic approach, covering both front-end and back-end development, which allows me to build high-quality web and mobile applications. My technical skills include C#, Java, React, Xamarin Forms, .NET Core, and mobile development with .NET MAUI. I also have experience in database management and creating user-centered platforms. Always seeking new challenges, I\'m open to relocating for personal and professional growth.",
    contactTitle: 'Are you looking for developing talent?',
    contactText: 'I\'m here for new challenges.!',
  },
  es: {
    heroTitle: 'Soy Franklin Paute Machuca',
    heroSubtitle: 'Imagina | Programa | Crea',
    heroText:
      'Desarrollador Full Stack | .NET | MAUI | React | 🇪🇨 Ecuatoriano, apasionado por lo que hago. Me encanta enfrentar desafíos técnicos y crear soluciones innovadoras. Compartinedo el viaje de la programación y el desarrollo de software.',
    aboutTitle: '¿Quién está detrás del teclado?',
    aboutText:
      'Con más de 10 años de experiencia como ingeniero full-stack, me apasiona enfrentar retos complejos y ofrecer soluciones innovadoras. Tengo un enfoque integral que abarca tanto el desarrollo de front-end como back-end, permitiéndome crear aplicaciones web y móviles de alta calidad. Mis habilidades técnicas incluyen C#, Java, React, Xamarin Forms, .NET Core y el desarrollo móvil con .NET MAUI. Además, tengo experiencia en la gestión de bases de datos y en la creación de plataformas centradas en el usuario. Siempre en busca de nuevos desafíos, estoy abierto a reubicarme para seguir creciendo personal y profesionalmente.',
    contactTitle: '¿Buscas talento en desarrollo?',
    contactText: 'Estoy aquí para nuevos retos.',
  },
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate-test" element={<GenerateTest />} />
      </Routes>
    </Router>
  );
}

function Home() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const form = useRef(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm(
          'service_2626zss',
          'emailcontactportafolio',
          form.current,
          'u6wrgff2uwwCpj5hr'
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );

      e.currentTarget.reset();
    } else {
      console.error('Form reference is null.');
    }
  };

  const {
    heroTitle,
    heroSubtitle,
    heroText,
    aboutTitle,
    aboutText,
    contactTitle,
    contactText,
  } = translations[language];

  const changeLanguage = (lang: 'en' | 'es') => {
    const currentScrollY = window.scrollY; // Guarda la posición actual del scroll
    setLanguage(lang); // Cambia el idioma
    setTimeout(() => {
      window.scrollTo(0, currentScrollY); // Restaura la posición del scroll
    }, 0);
  };

  return (
    <>
      <div className='App'>
        <header>
          <nav>
            <a
              href='#'
              onClick={() => changeLanguage('en')}
              className={language === 'en' ? 'active' : ''}
            >
              EN
            </a>
            <a
              href='#'
              onClick={() => changeLanguage('es')}
              className={language === 'es' ? 'active' : ''}
            >
              ES
            </a>
          </nav>
        </header>
        <section className='hero'>
          <div className='hero-content'>
            <h2>{heroSubtitle}</h2>
            <h1>{heroTitle}</h1>
            <p>{heroText}</p>
            <div className='image-container'>
              <img src={image1} alt='Image 1' className='image-1' />
              <img src={image2} alt='Image 2' className='image-2' />
            </div>

            <div className='video-container'>
              <YouTubePlayer
                url='https://www.youtube.com/watch?v=n12-Btx-ABA'
                controls
                loop
              />
            </div>
          </div>
        </section>
        <section className='about'>
          <div className='about-content'>
            <h2>{aboutTitle}</h2>
            <p>{aboutText}</p>
          </div>
        </section>
        <section className='contact'>
          <h2>{contactTitle}</h2>
          <p>{contactText}</p>
          <form ref={form} onSubmit={sendEmail} className='contact-form'>
            <input
              type='text'
              name='user_name'
              placeholder='Your Name'
              required
            />
            <input
              type='email'
              name='user_email'
              placeholder='Your Email'
              required
            />
            <textarea name='message' placeholder='Your Message' required />
            <button type='submit'>Send</button>
          </form>
          <div className='social-icons'>
            <a
              href='https://facebook.com/franesdev'
              target='_blank'
              rel='noreferrer'
            >
              <FaFacebook />
            </a>
            <a
              href='https://twitter.com/franesdev'
              target='_blank'
              rel='noreferrer'
            >
              <FaTwitter />
            </a>
            <a
              href='https://linkedin.com/in/franesdev'
              target='_blank'
              rel='noreferrer'
            >
              <FaLinkedin />
            </a>
            <a
              href='https://instagram.com/franesdev'
              target='_blank'
              rel='noreferrer'
            >
              <FaInstagram />
            </a>
            <a
              href='https://youtube.com/@franesdev'
              target='_blank'
              rel='noreferrer'
            >
              <FaYoutube />
            </a>
            <a
              href='https://tiktok.com/@franesdev'
              target='_blank'
              rel='noreferrer'
            >
              <FaTiktok />
            </a>
          </div>
        </section>
        <footer className='footer'>
          <p>© 2022-2024 FranesDev. All rights reserved.</p>
          <a href='https://bio.link/franesdev' target='_blank' rel='noreferrer'>
            Mas por aquí
          </a>
        </footer>
      </div>
    </>
  );
}

export default App;
