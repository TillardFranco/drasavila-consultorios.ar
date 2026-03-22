import { useState, useEffect, useRef } from 'react'
import s from './App.module.css'

/* ── SVG Icons ── */
const HeartPulse = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M19.5 12.572l-7.5 7.428-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
    <path d="M6 12h3l2-4 2 8 2-4h3" />
  </svg>
)
const Child = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="12" cy="4.5" r="2.5" />
    <path d="M12 9c-2 0-4 1-5 3l-2 4h3l1 5h6l1-5h3l-2-4c-1-2-3-3-5-3z" />
  </svg>
)
const Stethoscope = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4.8 2.3A5 5 0 1 0 8 10H5" /><path d="M2 10h4" /><path d="M8 10a5 5 0 0 0 5 5v3a3 3 0 0 0 6 0v-1" />
    <circle cx="19" cy="13" r="2" />
  </svg>
)
const Chart = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 12h4l3-9 4 18 3-9h4" />
  </svg>
)
const Clipboard = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 14l2 2 4-4" />
  </svg>
)
const Calendar = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    <path d="M9 16l2 2 4-4" />
  </svg>
)
const ArrowRight = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)
const ArrowDown = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
  </svg>
)
const Ticket = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2m0 4v2m0 4v2" />
  </svg>
)
const MapPin = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const Clock = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

/* ── Data ── */
const DOCTORS = [
  { name: 'Dra. Avila María del Carmen', specialty: 'Cardióloga', desc: 'Especialista en cardiología clínica con amplia experiencia en diagnóstico y prevención cardiovascular.', Icon: HeartPulse, color: 'cardio' },
  { name: 'Dra. Avila Mirta Susana', specialty: 'Pediatra', desc: 'Dedicada al cuidado integral de la salud infantil, desde recién nacidos hasta adolescentes.', Icon: Child, color: 'pedi' },
]

const SERVICES = [
  { name: 'Holter', desc: 'Monitoreo cardíaco continuo de 24 horas para detectar arritmias y alteraciones del ritmo.', Icon: Chart, tint: 'sage' },
  { name: 'MAPA', desc: 'Monitoreo ambulatorio de presión arterial durante 24 horas para un diagnóstico preciso.', Icon: Clipboard, tint: 'blush' },
  { name: 'Electrocardiograma', desc: 'Registro de la actividad eléctrica del corazón, rápido e indoloro.', Icon: HeartPulse, tint: 'warm' },
  { name: 'Consulta de seguimiento', desc: 'Control periódico para evaluar la evolución de tu tratamiento y ajustar el plan médico.', Icon: Stethoscope, tint: 'sage' },
  { name: 'Primera consulta', desc: 'Evaluación integral inicial para conocer tu estado de salud y definir un plan personalizado.', Icon: Calendar, tint: 'blush' },
  { name: 'Estudios y resultados', desc: 'Accedé a tus estudios clínicos y resultados con atención profesional y seguimiento dedicado.', Icon: Clipboard, tint: 'warm' },
]

const STEPS = [
  { num: '1', title: 'Elegí turno', desc: 'Hacé clic en el botón y seleccioná día y horario.' },
  { num: '2', title: 'Confirmá datos', desc: 'Completá tus datos personales en el sistema.' },
  { num: '3', title: '¡Listo!', desc: 'Recibís la confirmación y te esperamos en el consultorio.' },
]

const STATS = [
  { num: '+40', label: 'Años de experiencia' },
  { num: '+5000', label: 'Pacientes atendidos' },
  { num: '2', label: 'Especialidades' },
]

const CTA_URL = 'https://consultoriodrasavila.site.agendapro.com/ar'

/* ── Reveal Component ── */
function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(s.visible); obs.unobserve(el) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <Tag ref={ref} className={`${s.reveal} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  )
}

/* ── App ── */
export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <header className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
        <nav className={s.navInner} aria-label="Navegación principal">
          <a href="#hero" className={s.navBrand}>
            <HeartPulse width={22} height={22} className={s.navHeartIcon} />
            <span>Centro Médico</span>
          </a>
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className={s.navCta}>
            <Ticket width={16} height={16} />
            Sacar turno
          </a>
        </nav>
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section id="hero" className={s.hero} aria-labelledby="hero-title">
          <div className={s.heroContent}>
            <p className={s.eyebrow}>Cardiología &amp; Pediatría</p>
            <h1 id="hero-title" className={s.heroTitle}>
              Cuidamos de tu salud<br />
              <span className={s.heroAccent}>con dedicación y experiencia</span>
            </h1>
            <p className={s.heroSub}>
              Las Dras. Avila te reciben con atención personalizada en cardiología
              y pediatría. Sacá tu turno en línea y disfrutá de una experiencia
              de atención ágil y profesional.
            </p>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className={s.ctaBtn}>
              Sacar mi turno ahora
              <ArrowRight width={18} height={18} />
            </a>
            <p className={s.ctaNote}>Serás redirigido al sistema de turnos en línea</p>

            <div className={s.stats}>
              {STATS.map((st, i) => (
                <div key={i} className={s.stat}>
                  <span className={s.statNum}>{st.num}</span>
                  <span className={s.statLabel}>{st.label}</span>
                </div>
              ))}
            </div>

            <a href="#equipo" className={s.heroTeamLink}>
              <span>Conocé nuestro equipo de salud</span>
              <ArrowDown width={16} height={16} className={s.heroTeamArrow} />
            </a>
          </div>

          <div className={s.heroDecor} aria-hidden="true">
            <div className={`${s.blob} ${s.blob1}`} />
            <div className={`${s.blob} ${s.blob2}`} />
            <div className={`${s.blob} ${s.blob3}`} />
            <div className={s.heroCircle}>
              <HeartPulse width={64} height={64} />
            </div>
          </div>
        </section>

        {/* ─── DOCTORS ─── */}
        <section id="equipo" className={s.section} aria-labelledby="doc-title">
          <Reveal className={s.secHeader}>
            <p className={s.eyebrow}>Nuestro Equipo</p>
            <h2 id="doc-title" className={s.secTitle}>Profesionales que cuidan de vos</h2>
            <div className={s.divider} />
          </Reveal>
          <div className={s.docGrid}>
            {DOCTORS.map((d, i) => (
              <Reveal key={d.name} as="article" className={s.docCard} delay={i * 150}>
                <div className={`${s.docBadge} ${s[d.color]}`}>
                  <d.Icon width={28} height={28} />
                </div>
                <span className={`${s.docChip} ${s[d.color]}`}>{d.specialty}</span>
                <h3 className={s.docName}>{d.name}</h3>
                <p className={s.docDesc}>{d.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section id="servicios" className={`${s.section} ${s.sectionAlt}`} aria-labelledby="svc-title">
          <Reveal className={s.secHeader}>
            <p className={s.eyebrow}>Servicios</p>
            <h2 id="svc-title" className={s.secTitle}>Todo lo que necesitás en un solo lugar</h2>
            <div className={s.divider} />
          </Reveal>
          <div className={s.svcGrid}>
            {SERVICES.map((sv, i) => (
              <Reveal key={sv.name} className={s.svcCard} delay={i * 80}>
                <div className={`${s.svcIcon} ${s[sv.tint]}`}>
                  <sv.Icon width={26} height={26} />
                </div>
                <h3 className={s.svcName}>{sv.name}</h3>
                <p className={s.svcDesc}>{sv.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ─── UBICACIÓN ─── */}
        <section id="ubicacion" className={s.section} aria-labelledby="loc-title">
          <Reveal className={s.secHeader}>
            <p className={s.eyebrow}>Ubicación</p>
            <h2 id="loc-title" className={s.secTitle}>Dónde encontrarnos</h2>
            <div className={s.divider} />
          </Reveal>
          <div className={s.locGrid}>
            <Reveal className={s.locInfo}>
              <div className={s.locItem}>
                <div className={`${s.locIcon} ${s.sage}`}>
                  <MapPin width={24} height={24} />
                </div>
                <div>
                  <h3 className={s.locLabel}>Dirección</h3>
                  <p className={s.locText}>Peluffo 200, X6275</p>
                  <p className={s.locText}>Villa Huidobro, Córdoba</p>
                </div>
              </div>
              <div className={s.locItem}>
                <div className={`${s.locIcon} ${s.warm}`}>
                  <Clock width={24} height={24} />
                </div>
                <div>
                  <h3 className={s.locLabel}>Horario de atención</h3>
                  <p className={s.locText}>Lunes a Viernes</p>
                  <p className={s.locText}>Con turno previo</p>
                </div>
              </div>
              <p className={s.locGreeting}>¡Te esperamos pronto!</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Peluffo+200+Villa+Huidobro+Córdoba+Argentina"
                target="_blank"
                rel="noopener noreferrer"
                className={s.locCta}
              >
                Cómo llegar
                <ArrowRight width={16} height={16} />
              </a>
            </Reveal>
            <Reveal className={s.locMap} delay={200}>
              <iframe
                title="Ubicación del consultorio — Peluffo 200, Villa Huidobro, Córdoba"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Peluffo+200,+Villa+Huidobro,+Córdoba,+Argentina&zoom=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section id="como-funciona" className={s.section} aria-labelledby="steps-title">
          <Reveal className={s.secHeader}>
            <p className={s.eyebrow}>Cómo funciona</p>
            <h2 id="steps-title" className={s.secTitle}>Sacar turno es muy fácil</h2>
            <div className={s.divider} />
          </Reveal>
          <div className={s.stepsRow}>
            {STEPS.map((st, i) => (
              <Reveal key={i} className={s.step} delay={i * 150}>
                <div className={s.stepNum}>{st.num}</div>
                <h3 className={s.stepTitle}>{st.title}</h3>
                <p className={s.stepDesc}>{st.desc}</p>
                {i < STEPS.length - 1 && <div className={s.stepLine} aria-hidden="true" />}
              </Reveal>
            ))}
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className={s.ctaSection} aria-labelledby="cta-title">
          <Reveal className={s.ctaInner}>
            <HeartPulse width={44} height={44} className={s.ctaHeart} />
            <h2 id="cta-title" className={s.ctaSectionTitle}>Tu salud no puede esperar</h2>
            <p className={s.ctaSectionSub}>
              Sacá tu turno ahora y recibí la atención que merecés.<br />
              Estamos para cuidarte.
            </p>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className={s.ctaBtnLight}>
              Sacar mi turno ahora
              <ArrowRight width={18} height={18} />
            </a>
            <p className={s.ctaSectionNote}>Serás redirigido al sistema de turnos en línea</p>
          </Reveal>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className={s.footer}>
        <div className={s.footerInner}>
          <div className={s.footerBrand}>
            <HeartPulse width={20} height={20} />
            <span className={s.footerLogo}>Centro Médico</span>
            <p className={s.footerTag}>Cardiología &amp; Pediatría</p>
          </div>
          <div className={s.footerDocs}>
            <h4 className={s.footerHeading}>Profesionales</h4>
            <p>Dra. Avila María del Carmen — Cardiología</p>
            <p>Dra. Avila Mirta Susana — Pediatría</p>
          </div>
          <div className={s.footerAction}>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" className={s.footerCta}>
              Sacar turno <ArrowRight width={14} height={14} />
            </a>
          </div>
        </div>
        <div className={s.footerBottom}>
          <p>Atención personalizada para toda la familia</p>
          <p>&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </>
  )
}
