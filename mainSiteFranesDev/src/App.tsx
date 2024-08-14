import { useState } from 'react';
import './App.css';

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
      'Full Stack Developer | .NET | MAUI | React | Ecuadorian, passionate about what I do, and sharing the journey of programming and software development.',
    aboutTitle: 'About Me',
    aboutText:
      'With over 9 years of experience as a full-stack engineer, I am passionate about solving complex problems and delivering high-quality solutions. My expertise spans both front-end and back-end development, enabling me to build robust websites, applications, and mobile platforms. I provide comprehensive services, including database management and the creation of user-centric websites. My technical skills include proficiency in programming languages such as C# and Java, and I have hands-on experience with technologies like React, Xamarin Forms, and .NET Core. Additionally, I am skilled in mobile development using .NET MAUI. I am also open to relocating to new cities to further my personal and professional growth.',
    contactTitle: 'Contact Us',
    contactText: 'Get in touch with us!',
  },
  es: {
    heroTitle: 'Soy Frankln Paute Machuca',
    heroSubtitle: 'Hola',
    heroText:
      'Desarrollador Full Stack | .NET | MAUI | React | Ecuatoriano, apasionado por lo que hago y compartiendo el viaje de la programación y el desarrollo de software.',

    aboutTitle: 'Sobre Mí',
    aboutText:
      'Con más de 9 años de experiencia como ingeniero full-stack, me apasiona resolver problemas complejos y ofrecer soluciones de alta calidad. Mi experiencia abarca el desarrollo tanto de front-end como de back-end, lo que me permite construir sitios web, aplicaciones y plataformas móviles robustas. Ofrezco servicios integrales, incluyendo la gestión de bases de datos y la creación de sitios web centrados en el usuario. Mis habilidades técnicas incluyen la programación en lenguajes como C# y Java, y tengo experiencia práctica con tecnologías como React, Xamarin Forms y .NET Core. Además, tengo experiencia en el desarrollo móvil utilizando .NET MAUI. También estoy abierto a reubicarme en nuevas ciudades para potenciar mi crecimiento personal y profesional.',
    contactTitle: 'Contáctanos',
    contactText: '¡Ponte en contacto con nosotros!',
  },
};

function App() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const {
    heroTitle,
    heroSubtitle,
    heroText,
    aboutTitle,
    aboutText,
    contactTitle,
    contactText,
  } = translations[language];

  return (
    <>
      <div className='App'>
        <header>
          <nav>
            <a
              href='#'
              onClick={() => setLanguage('en')}
              className={language === 'en' ? 'active' : ''}
            >
              EN
            </a>
            <a
              href='#'
              onClick={() => setLanguage('es')}
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
          </div>
        </section>
        <section className='about'>
          <div className='about-content'>
            <h2>{aboutTitle}</h2>
            <p>{aboutText}</p>
          </div>
        </section>
        {/* <section className='contact'>
          <h2>{contactTitle}</h2>
          <p>{contactText}</p>
        </section> */}
      </div>
    </>
  );
}

export default App;
