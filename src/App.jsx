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
    color: "#64ffda"
  },
  {
    position: [0, 0, -5],
    name: "App de Clima (React)",
    description: "Una aplicación que muestra el clima de Neiva.",
    link: "#",
    color: "#8984d7"
  },
  {
    position: [4, 0, 0],
    name: "Juego Simple 3D",
    description: "Un pequeño juego hecho con Three.js.",
    link: "#",
    color: "#ff6b6b"
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
      <meshStandardMaterial color={hovered ? color : '#2a3f5f'} />

      {(hovered || clicked) && (
        <Html position={[0, clicked ? 2 : 1.2, 0]}>
          <div className="project-card">
            <h3>{name}</h3>
            <p>{description}</p>
            {link !== '#' && (
              <a href={link} target="_blank" rel="noopener noreferrer">
                Ver Proyecto →
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
      <h2 className="section-title">Mis Habilidades</h2>
      <div className="skills-grid">
        {SKILLS.map((skill, index) => (
          <div key={index} className="skill-card">
            <div className="skill-icon">{skill.icon}</div>
            <h3>{skill.name}</h3>
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
      <h2 className="section-title">Contáctame</h2>
      <div className="contact-grid">
        <a href="mailto:andresssuarez11@gmail.com" className="contact-item">
          📧 andresssuarez11@gmail.com
        </a>
        <a href="tel:3185251155" className="contact-item">
          📱 3185251155
        </a>
        <a
          href="https://github.com/andresSuarez-portafolio"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-item"
        >
          🐙 GitHub
        </a>
      </div>
    </div>
  );
}

// Header con navegación
function Header({ onNavigate, activeSection }) {
  return (
    <header className="header">
      <h1>Andrés Suárez</h1>
      <nav>
        {['proyectos', 'habilidades', 'contacto'].map(section => (
          <button
            key={section}
            onClick={() => onNavigate(section)}
            className={`nav-btn ${activeSection === section ? 'active' : ''}`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
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
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'Inter', -apple-system, sans-serif;
          background: #0a192f;
          color: #ccd6f6;
          overflow: hidden;
        }
        
        .app {
          width: 100vw;
          height: 100vh;
          position: relative;
          transition: all 0.5s ease;
        }
        
        .app.habilidades { background: #112240; }
        .app.contacto { background: #1d3557; }
        
        .header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(10, 25, 47, 0.95);
          backdrop-filter: blur(10px);
          padding: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .header h1 {
          font-size: 2rem;
          color: #64ffda;
          font-weight: 700;
        }
        
        .header nav { display: flex; gap: 20px; }
        
        .nav-btn {
          background: none;
          border: none;
          color: #8892b0;
          font-size: 1rem;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 6px;
          transition: all 0.3s ease;
          position: relative;
        }
        .nav-btn:hover, .nav-btn.active {
          color: #64ffda;
          background: rgba(100, 255, 218, 0.1);
        }
        
        .section {
          position: absolute;
          top: 100px;
          left: 0;
          right: 0;
          bottom: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px;
          text-align: center;
        }
        .section-title {
          font-size: 2.2rem;
          color: #64ffda;
          margin-bottom: 30px;
          font-weight: 700;
        }

        /* ====== HABILIDADES (compacto + 4 en fila) ====== */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          max-width: 900px;   /* Fuerza 4 columnas centradas en desktop */
          width: 100%;
        }
        .skill-card {
          background: rgba(30, 50, 70, 0.8);
          padding: 20px;
          border-radius: 10px;
          border: 1px solid rgba(100, 255, 218, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
          font-size: 0.9rem;
          opacity: 0;
          transform: translateY(10px) scale(0.98);
          animation: fadeUp 0.5s ease forwards;
        }
        /* Efecto escalonado */
        .skill-card:nth-child(1) { animation-delay: 0.05s; }
        .skill-card:nth-child(2) { animation-delay: 0.12s; }
        .skill-card:nth-child(3) { animation-delay: 0.19s; }
        .skill-card:nth-child(4) { animation-delay: 0.26s; }

        .skill-card:hover {
          transform: translateY(-4px) scale(1.01);
          border-color: #64ffda;
          box-shadow: 0 8px 22px rgba(100, 255, 218, 0.18);
        }
        .skill-icon { font-size: 2.2rem; margin-bottom: 10px; }
        .skill-card h3 { color: #ccd6f6; margin-bottom: 6px; font-size: 1rem; }
        .skill-card p { color: #8892b0; line-height: 1.4; font-size: 0.85rem; }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        /* ================================================ */
        
        .contact-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-size: 1.2rem;
        }
        .contact-item {
          color: #ccd6f6;
          text-decoration: none;
          padding: 15px 30px;
          border: 1px solid rgba(100, 255, 218, 0.3);
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .contact-item:hover {
          color: #64ffda;
          border-color: #64ffda;
          background: rgba(100, 255, 218, 0.1);
          transform: translateY(-2px);
        }
        
        .project-card {
          background: rgba(10, 25, 47, 0.95);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(100, 255, 218, 0.3);
          backdrop-filter: blur(10px);
          max-width: 280px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }
        .project-card h3 { color: #64ffda; margin-bottom: 10px; font-size: 1.1rem; }
        .project-card p { color: #8892b0; margin-bottom: 15px; line-height: 1.5; }
        .project-card a {
          color: #64ffda; text-decoration: none; font-weight: 500; transition: color 0.3s ease;
        }
        .project-card a:hover { color: #ffffff; }
        
        .footer {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: rgba(10, 25, 47, 0.95);
          padding: 15px;
          text-align: center;
          color: #8892b0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
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
        }
      `}</style>

      <Header onNavigate={setActiveSection} activeSection={activeSection} />

      {activeSection === 'proyectos' && (
        <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-5, -10, -5]} intensity={0.3} color="#64ffda" />

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
            <meshStandardMaterial color="#0a192f" roughness={0.8} metalness={0.1} />
          </mesh>

          {PROJECTS.map((project, index) => (
            <ProjectItem key={index} {...project} />
          ))}

          <mesh position={[0, 1.5, 0]}>
            <octahedronGeometry args={[0.8]} />
            <meshStandardMaterial color="#64ffda" emissive="#64ffda" emissiveIntensity={0.2} />

            <Html position={[0, 1.5, 0]}>
              <div className="project-card">
                <h3>Andrés Suárez</h3>
                <p>Desarrollador Web Frontend</p>
                <p>Neiva, Huila 🇨🇴</p>
              </div>
            </Html>
          </mesh>

          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      )}

      {activeSection === 'habilidades' && <Skills />}
      {activeSection === 'contacto' && <Contact />}

      <footer className="footer">
        <p>© 2025 Andrés Suárez • Creado con React & Three.js</p>
      </footer>
    </div>
  );
}
