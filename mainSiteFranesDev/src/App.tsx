import { useState, useRef } from 'react';
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
    heroSubtitle: 'HEY THERE!',
    heroText:
      '🇪🇨 Ecuadorian | Full Stack Developer | .NET | MAUI | React | 🇪🇨 Ecuadorian, passionate about what I do, and sharing the journey of programming and software development.',
    aboutTitle: 'About Me',
    aboutText:
      'With over 9 years of experience as a full-stack engineer, I am passionate about solving complex problems and delivering high-quality solutions. My expertise spans both front-end and back-end development, enabling me to build robust websites, applications, and mobile platforms. I provide comprehensive services, including database management and the creation of user-centric websites. My technical skills include proficiency in programming languages such as C# and Java, and I have hands-on experience with technologies like React, Xamarin Forms, and .NET Core. Additionally, I am skilled in mobile development using .NET MAUI. I am also open to relocating to new cities to further my personal and professional growth.',
    contactTitle: 'Contact Us',
    contactText: 'Get in touch with us!',
  },
  es: {
    heroTitle: 'Soy Franklin Paute Machuca',
    heroSubtitle: 'Hola',
    heroText:
      '🇪🇨 Ecuatoriano | Desarrollador Full Stack | .NET | MAUI | React | 🇪🇨 Ecuatoriano, apasionado por lo que hago y compartiendo el viaje de la programación y el desarrollo de software.',
    aboutTitle: 'Sobre Mí',
    aboutText:
      'Con más de 9 años de experiencia como ingeniero full-stack, me apasiona resolver problemas complejos y ofrecer soluciones de alta calidad. Mi experiencia abarca el desarrollo tanto de front-end como de back-end, lo que me permite construir sitios web, aplicaciones y plataformas móviles robustas. Ofrezco servicios integrales, incluyendo la gestión de bases de datos y la creación de sitios web centrados en el usuario. Mis habilidades técnicas incluyen la programación en lenguajes como C# y Java, y tengo experiencia práctica con tecnologías como React, Xamarin Forms y .NET Core. Además, tengo experiencia en el desarrollo móvil utilizando .NET MAUI. También estoy abierto a reubicarme en nuevas ciudades para potenciar mi crecimiento personal y profesional.',
    contactTitle: 'Contáctanos',
    contactText: '¡Ponte en contacto conmigo si lo necesitas!',
  },
};

function App() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const form = useRef(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      emailjs
        .sendForm(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          form.current,
          'YOUR_USER_ID'
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
