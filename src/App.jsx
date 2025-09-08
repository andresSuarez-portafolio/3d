import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';

// Datos de proyectos
const PROJECTS = [
  {
    position: [-4, 0, 0],
    name: "Portafolio Web (React)",
    description: "Mi primer portafolio interactivo.",
    link: "https://andressuarez-portafolio.github.io/portafolio/",
    color: "rgb(0, 150, 255)"
  },
  {
    position: [0, 0, -5],
    name: "MANGO MIX",
    description: "Una aplicación que muestra LOS PRODUCTOS DE MANGO MIX.",
    link: "https://mango-mix.vercel.app/",
    color: "rgb(255, 0, 150)"
  },
  {
    position: [4, 0, 0],
    name: "BARF COMIDA PARA PERRO",
    description: "Una pagina de comida para perros.",
    link: "https://barf-comida.vercel.app/",
    color: "rgb(0, 255, 128)"
  }
];

const SKILLS = [
  { name: "React", description: "Desarrollo de interfaces modernas y dinámicas", icon: "⚛️" },
  { name: "HTML & CSS", description: "Diseño responsivo y maquetación semántica", icon: "🎨" },
  { name: "JavaScript", description: "Programación interactiva del lado cliente", icon: "💻" },
  { name: "Git & GitHub", description: "Control de versiones y colaboración", icon: "🔧" }
];

// Componente optimizado para proyectos 3D
function ProjectItem({ position, name, description, link, color }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      position[1] + (clicked ? 0.5 : 0),
      0.1
    );

    ref.current.rotation.x += delta * 0.1;
    ref.current.rotation.z += delta * 0.1;

    if (clicked) ref.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onClick={() => click(!clicked)}
      onPointerOver={(e) => (e.stopPropagation(), hover(true))}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? color : '#3a3a3a'} />

      {(hovered || clicked) && (
        <Html position={[0, clicked ? 2 : 1.2, 0]}>
          <div className="project-card">
            <h3>{name}</h3>
            <p>{description}</p>
            {link !== '#' && (
              <a href={link} target="_blank" rel="noopener noreferrer">
                VER PROYECTO &gt;
              </a>
            )}
          </div>
        </Html>
      )}
    </mesh>
  );
}

// Componente para las habilidades
function Skills() {
  return (
    <div className="section skills-section">
      <h2 className="section-title">MIS HABILIDADES</h2>
      <div className="skills-grid">
        {SKILLS.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-icon">{skill.icon}</div>
            <h3>{skill.name.toUpperCase()}</h3>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para contacto
function Contact() {
  return (
    <div className="section contact-section">
      <h2 className="section-title">CONTÁCTAME</h2>
      <div className="contact-grid">
        <a href="mailto:andresssuarez11@gmail.com" className="contact-item">
          <span className="contact-icon">📧</span>ANDRESSSUAREZ11@GMAIL.COM
        </a>
        <a href="tel:3185251155" className="contact-item">
          <span className="contact-icon">📱</span>3185251155
        </a>
        <a
          href="https://github.com/andresSuarez-portafolio"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-item"
        >
          <span className="contact-icon">🐙</span>GITHUB
        </a>
      </div>
    </div>
  );
}

// Header con navegación
function Header({ onNavigate, activeSection }) {
  return (
    <header className="header">
      <h1>ANDRÉS SUÁREZ</h1>
      <nav>
        {['proyectos', 'habilidades', 'contacto'].map(section => (
          <button
            key={section}
            onClick={() => onNavigate(section)}
            className={`nav-btn ${activeSection === section ? 'active' : ''}`}
          >
            {section.toUpperCase()}
          </button>
        ))}
      </nav>
    </header>
  );
}

// Componente principal
export default function App() {
  const [activeSection, setActiveSection] = useState('proyectos');

  return (
    <div className={`app ${activeSection}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'VT323', monospace;
          background: #0a0a0a;
          color: #fff;
          overflow: hidden;
        }

        .scanlines::after {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(
              rgba(0,0,0,0) 50%,
              rgba(0,0,0,.25) 50%
          );
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 1000;
        }
        
        .app {
          width: 100vw;
          height: 100vh;
          position: relative;
          transition: all 0.5s ease;
        }
        
        .app.habilidades { background: #1a1a1a; }
        .app.contacto { background: #2b2b2b; }
        
        .header {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 100;
          background: rgba(10, 10, 10, 0.9);
          backdrop-filter: blur(5px);
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #333;
        }
        
        .header h1 {
          font-size: 2.5rem;
          color: #f0f0f0;
          letter-spacing: 5px;
          text-shadow: 0 0 5px rgba(255,255,255,0.3);
        }
        
        .header nav { display: flex; gap: 10px; }
        
        .nav-btn {
          background: #1a1a1a;
          border: 2px solid #555;
          color: #ccc;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 8px 16px;
          transition: all 0.2s ease;
          position: relative;
          letter-spacing: 2px;
        }
        .nav-btn:hover {
          color: rgb(0, 255, 128);
          border-color: rgb(0, 255, 128);
          box-shadow: 0 0 10px rgb(0, 255, 128);
        }
        .nav-btn.active {
          color: rgb(0, 150, 255);
          border-color: rgb(0, 150, 255);
          box-shadow: 0 0 10px rgb(0, 150, 255);
        }
        
        .section {
          position: absolute;
          top: 100px;
          left: 0; right: 0; bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          text-align: center;
        }
        .section-title {
          font-size: 2.8rem;
          color: rgb(0, 255, 128);
          margin-bottom: 40px;
          letter-spacing: 4px;
          text-shadow: 0 0 8px rgb(0, 255, 128);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          max-width: 900px;
          width: 100%;
        }
        .skill-card {
          background: #1b1b1b;
          padding: 20px;
          border: 2px solid #444;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          font-size: 1rem;
          text-shadow: 0 0 5px rgba(255,255,255,0.2);
        }
        .skill-card:hover {
          transform: translateY(-4px);
          border-color: rgb(0, 255, 128);
          box-shadow: 0 0 15px rgb(0, 255, 128);
        }
        .skill-icon { font-size: 2.5rem; margin-bottom: 10px; }
        .skill-card h3 { color: rgb(255, 0, 150); margin-bottom: 6px; font-size: 1.4rem; letter-spacing: 2px; }
        .skill-card p { color: #ccc; line-height: 1.2; font-size: 0.9rem; }
        
        .contact-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-size: 1.2rem;
        }
        .contact-item {
          color: rgb(0, 150, 255);
          text-decoration: none;
          padding: 15px 30px;
          border: 2px solid #444;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;
          letter-spacing: 1px;
        }
        .contact-item:hover {
          color: rgb(0, 255, 128);
          border-color: rgb(0, 255, 128);
          box-shadow: 0 0 10px rgb(0, 255, 128);
          transform: scale(1.02);
        }
        .contact-icon {
          font-size: 1.5rem;
        }
        
        .project-card {
          background: #1b1b1b;
          padding: 20px;
          border: 2px solid #444;
          backdrop-filter: blur(5px);
          max-width: 280px;
          text-align: center;
          box-shadow: 0 0 10px #000;
        }
        .project-card h3 { color: rgb(255, 0, 150); margin-bottom: 10px; font-size: 1.4rem; }
        .project-card p { color: #ccc; margin-bottom: 15px; line-height: 1.4; }
        .project-card a {
          color: rgb(0, 150, 255); text-decoration: none; font-weight: 500; transition: color 0.3s ease, text-shadow 0.3s ease;
          text-shadow: 0 0 5px rgba(0, 150, 255, 0.5);
        }
        .project-card a:hover { color: rgb(0, 255, 128); text-shadow: 0 0 10px rgb(0, 255, 128); }
        
        .footer {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: #1a1a1a;
          padding: 10px;
          text-align: center;
          color: #555;
          border-top: 2px solid #333;
          backdrop-filter: blur(5px);
        }
        
        @media (max-width: 1024px) {
          .skills-grid { max-width: 700px; }
        }
        @media (max-width: 768px) {
          .header { flex-direction: column; gap: 15px; padding: 15px 20px; }
          .section { top: 120px; padding: 20px; }
          .section-title { font-size: 1.9rem; margin-bottom: 22px; }
          .skills-grid { grid-template-columns: 1fr 1fr; gap: 15px; max-width: 520px; }
        }
        @media (max-width: 480px) {
          .skills-grid { grid-template-columns: 1fr; max-width: 340px; }
          .skill-card { padding: 16px; }
          .header h1 { font-size: 1.8rem; }
          .nav-btn { font-size: 1rem; }
        }
      `}</style>

      <Header onNavigate={setActiveSection} activeSection={activeSection} />

      {activeSection === 'proyectos' && (
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }} className="scanlines">
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-5, -10, -5]} intensity={0.3} color="rgb(0, 255, 128)" />

          <Environment preset="city" />

          <ContactShadows
            resolution={512}
            frames={1}
            position={[0, -0.9, 0]}
            scale={10}
            blur={2}
            opacity={0.6}
            far={10}
          />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.8} metalness={0.1} />
          </mesh>

          {PROJECTS.map((project, index) => (
            <ProjectItem key={index} {...project} />
          ))}

          <mesh position={[0, 1.5, 0]}>
            <octahedronGeometry args={[0.8]} />
            <meshStandardMaterial color="rgb(255, 0, 150)" emissive="rgb(255, 0, 150)" emissiveIntensity={0.2} />

            <Html position={[0, 1.5, 0]}>
              <div className="project-card">
                <h3>ANDRÉS SUÁREZ</h3>
                <p>DESARROLLADOR WEB FRONTEND</p>
                <p>NEIVA, HUILA 🇨🇴</p>
              </div>
            </Html>
          </mesh>

          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      )}

      {activeSection === 'habilidades' && <Skills />}
      {activeSection === 'contacto' && <Contact />}

      <footer className="footer">
        <p>CONSOLA PORTÁTIL: SONY PSX® • © 2025</p>
      </footer>
    </div>
  );
}
