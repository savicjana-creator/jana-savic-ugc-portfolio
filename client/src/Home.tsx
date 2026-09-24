import { useMemo, useState, type CSSProperties } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Instagram,
  Mail,
  Menu,
  Plus,
  X,
} from "lucide-react";
import {
  addons,
  aiWorks,
  archiveFilters,
  assets,
  photoPackages,
  processSteps,
  profile,
  projects,
  services,
  type ArchiveKey,
} from "./content";

const navItems = [
  ["Studio", "studio"],
  ["Archive", "archive"],
  ["AI Lab", "ai-lab"],
  ["Offers", "offers"],
  ["Process", "process"],
] as const;

const curatedArchiveOrder = ["01", "05", "09", "14", "19", "18", "02", "11", "12", "21", "03", "17", "04", "10", "15", "06", "13", "16", "07", "08", "20", "22"] as const;

function SectionMark({ number, label }: { number: string; label: string }) {
  return <div className="section-mark"><span>{number}</span><i /><span>{label}</span></div>;
}

function mediaRatio(aspect: string) {
  if (aspect === "tall") return "9 / 16";
  if (aspect === "wide") return "16 / 9";
  return "1 / 1";
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<ArchiveKey>("All");
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = useMemo(
    () => {
      const matchingProjects = activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter);
      if (activeFilter !== "All") return matchingProjects;
      const ranking = new Map<string, number>(curatedArchiveOrder.map((id, index) => [id, index]));
      return [...matchingProjects].sort((a, b) => (ranking.get(a.id) ?? 99) - (ranking.get(b.id) ?? 99));
    },
    [activeFilter],
  );
  const selectedProject = visibleProjects.find((project) => project.id === selectedId) ?? visibleProjects[0] ?? projects[0];
  const selectedProjectNumber = Math.max(visibleProjects.findIndex((project) => project.id === selectedProject.id) + 1, 1).toString().padStart(2, "0");

  const setArchiveFilter = (filter: ArchiveKey) => {
    setActiveFilter(filter);
    const firstProject = filter === "All" ? projects[0] : projects.find((project) => project.category === filter);
    if (firstProject) setSelectedId(firstProject.id);
  };

  const selectProject = (id: string) => {
    setSelectedId(id);
    window.setTimeout(() => document.querySelector(".project-panel")?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 30);
  };

  return (
    <main className="nocturne-shell">
      <header className="nocturne-nav">
        <a className="wordmark" href="#top" aria-label="Jana Savić, home">
          <span className="monogram">JS</span>
          <span>Jana Savić</span>
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map(([label, target]) => <a key={target} href={`#${target}`}>{label}</a>)}
        </nav>
        <a className="nav-email" href={profile.emailHref}>Enquire <ArrowUpRight size={15} /></a>
        <button className="menu-trigger" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <aside className={`mobile-drawer ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        {navItems.map(([label, target]) => <a key={target} href={`#${target}`} onClick={() => setMenuOpen(false)}>{label}<ArrowDownRight size={16} /></a>)}
        <a href={profile.instagram} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}><span><Instagram size={17} /> {profile.instagramHandle}</span><ArrowUpRight size={16} /></a>
        <a href={profile.emailHref} onClick={() => setMenuOpen(false)}>Start a project <ArrowUpRight size={16} /></a>
      </aside>

      <section className="hero-nocturne" id="top">
        <div className="hero-orbit hero-orbit-a" />
        <div className="hero-orbit hero-orbit-b" />
        <div className="hero-meta top-left">INDEPENDENT UGC CREATOR<br />DUBAI / AVAILABLE WORLDWIDE</div>
        <div className="hero-meta top-right">EDITION 02<br />2026</div>
        <a className="hero-instagram" href={profile.instagram} target="_blank" rel="noreferrer"><Instagram size={14} /><span>Follow the work</span><strong>{profile.instagramHandle}</strong><ArrowUpRight size={13} /></a>
        <div className="hero-image-frame">
          <img src={assets.hero} alt="Jana Savić" />
          <div className="hero-image-halo" />
          <div className="image-coordinate">JANA SAVIĆ / DUBAI</div>
        </div>
        <div className="hero-type">
          <p className="hero-overline">SOCIAL-FIRST / HUMAN-LED / CONVERSION-AWARE</p>
          <h1><span>MAKE</span><em>them</em><span>LOOK.</span></h1>
          <div className="hero-foot">
            <p>Authentic short-form content with a strong visual point of view, made for brands worth noticing.</p>
            <a href="#archive" className="circle-link" aria-label="Explore selected work"><ArrowDownRight size={24} /></a>
          </div>
        </div>
        <div className="hero-vertical">FOOD — TRAVEL — BEAUTY — LIFESTYLE — AI</div>
      </section>

      <section className="scope-strip" aria-label="What Jana creates">
        <p>What I create</p>
        <div className="scope-list">
          <span>UGC Video</span><i>01</i>
          <span>Product Photography</span><i>02</i>
          <span>AI Visuals</span><i>03</i>
          <span>Social Strategy</span><i>04</i>
        </div>
        <a href="#archive">View selected work <ArrowDownRight size={15} /></a>
      </section>

      <section className="manifesto section-dark" id="studio">
        <SectionMark number="01" label="The studio" />
        <div className="manifesto-lead">
          <p className="label-copper">BEAUTY WITH A JOB TO DO</p>
          <h2>Good content is not decoration.<br /><em>It is an invitation to care.</em></h2>
        </div>
        <div className="manifesto-detail">
          <div className="portrait-stamp"><img src={assets.portrait} alt="Jana Savić" /><span>J.S.<br />Dubai</span></div>
          <div>
            <p>I’m Jana — a Dubai-based UGC creator and marketing strategist with 9+ years of experience in content, social media and brand communication. I make work that is composed enough to feel elevated and human enough to stop the scroll.</p>
            <div className="capability-list"><span>Strong hooks</span><span>Story psychology</span><span>Social strategy</span><span>Paid-ready edits</span></div>
            <div className="language-note"><span>LANGUAGES</span> Serbian / English</div>
          </div>
        </div>
      </section>

      <section className="archive-section" id="archive">
        <div className="archive-head">
          <SectionMark number="02" label="Selected archive" />
          <div><p className="label-copper">PRESS PLAY ON A POINT OF VIEW</p><h2>Real work.<br /><em>Distinct worlds.</em></h2></div>
          <p className="archive-intro">Original UGC video, product photography, travel and lifestyle work. Select a frame to see the format in more detail.</p>
        </div>

        <div className="filter-row" role="tablist" aria-label="Filter selected work">
          {archiveFilters.map((filter) => <button key={filter} role="tab" aria-selected={activeFilter === filter} type="button" className={activeFilter === filter ? "is-active" : ""} onClick={() => setArchiveFilter(filter)}>{filter}</button>)}
        </div>

        <div className="archive-grid">
          {visibleProjects.map((project, index) => (
            <article key={project.id} className={`archive-tile ${project.aspect}`} style={{ "--media-ratio": mediaRatio(project.aspect) } as CSSProperties}>
              <button type="button" onClick={() => selectProject(project.id)} aria-label={`Open ${project.title}`}>
                <img src={project.image} alt={project.title} />
                <span className="tile-shade" />
                <span className="tile-id">{(index + 1).toString().padStart(2, "0")}</span>
                <span className="tile-kind">{project.kind}</span>
                <span className="tile-open"><Plus size={18} /></span>
                <strong>{project.title}</strong>
              </button>
            </article>
          ))}
        </div>

        <article className={`project-panel ${selectedProject.aspect}`} style={{ "--project-ratio": mediaRatio(selectedProject.aspect) } as CSSProperties} aria-live="polite">
          <div className="project-panel-image">
            {selectedProject.video ? <video src={selectedProject.video} controls playsInline preload="metadata" poster={selectedProject.image} aria-label={`Play ${selectedProject.title}`} /> : <img src={selectedProject.image} alt={selectedProject.title} />}
          </div>
          <div className="project-panel-copy">
            <span>{selectedProjectNumber} / {selectedProject.kind}</span>
            <h3>{selectedProject.title}</h3>
            <p>{selectedProject.line}</p>
            <div className="project-panel-actions">
              {selectedProject.instagram && <a href={selectedProject.instagram} target="_blank" rel="noreferrer">Open original post <ArrowUpRight size={15} /></a>}
              <button type="button" onClick={() => selectProject(visibleProjects[(visibleProjects.findIndex((project) => project.id === selectedProject.id) + 1) % visibleProjects.length]?.id ?? projects[0].id)}>Next frame <ArrowDownRight size={15} /></button>
            </div>
          </div>
          <div className="project-panel-side">{selectedProject.category.toUpperCase()}<br />/ 2026</div>
        </article>
      </section>

      <section className="proof-section">
        <div className="proof-image"><img src={assets.nescafeBottle} alt="Original Nescafé product photography" /><span>THE SUBJECT IS NEVER JUST THE PRODUCT.</span></div>
        <div className="proof-copy">
          <p className="label-copper">WHY BRANDS WORK WITH ME</p>
          <h2>Aesthetic draws the eye.<br /><em>Strategy gives it a reason to stay.</em></h2>
          <p>Every deliverable starts with the audience, the hook and the business objective. The result is creator-made content that feels native in-feed without losing a refined brand presence.</p>
          <a href="#offers" className="text-link">Explore offers <ArrowDownRight size={15} /></a>
        </div>
      </section>

      <section className="ai-lab-section" id="ai-lab">
        <div className="ai-lab-head">
          <SectionMark number="03" label="AI Visual Lab" />
          <div>
            <p className="label-copper">EXPERIMENTAL, EDITORIAL, MADE TO BE REMEMBERED</p>
            <h2>AI is a creative<br /><em>direction, not a filter.</em></h2>
          </div>
          <p>Original AI visual concepts for carousel posts, campaign mood, creator content and social-first brand worlds. Each image is clearly presented as an AI visual.</p>
        </div>
        <div className="ai-lab-grid">
          {aiWorks.map((work) => <article key={work.id} className={`ai-work ${work.className}`}>
            <img src={work.image} alt={work.title} />
            <span className="ai-work-shade" />
            <div><span>{work.id} / AI VISUAL</span><h3>{work.title}</h3><p>{work.note}</p></div>
          </article>)}
        </div>
        <div className="ai-lab-foot"><span>AI image creation</span><p>One custom, final AI visual designed around your campaign or content angle.</p><strong>100 AED / image</strong><a href={profile.emailHref}>Ask about AI visuals <ArrowUpRight size={14} /></a></div>
      </section>

      <section className="offers-section" id="offers">
        <SectionMark number="04" label="Ways to work" />
        <div className="offers-title"><p className="label-copper">A CLEAR SCOPE. A STRONGER FEED.</p><h2>Content, curated<br /><em>to the brief.</em></h2></div>
        <div className="service-list">
          {services.map((service, index) => <article key={service.name} className={`service-card ${index === 1 ? "featured" : ""}`}>
            <div><span>{service.index}</span><span>{service.note}</span></div>
            <h3>{service.name}</h3>
            <strong>{service.price}<small>{service.eurPrice}</small></strong>
            <ul>{service.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            <a href={profile.emailHref}>Start an enquiry <ArrowUpRight size={14} /></a>
          </article>)}
        </div>
        <div className="addon-list">
          {addons.map((addon) => <div className="addon-line" key={addon.label}><span>ADD-ON</span><div><b>{addon.label}</b><small>{addon.description}</small></div><strong>{addon.price}<small>{addon.eurPrice}</small></strong></div>)}
        </div>
        <p className="pricing-note">EUR figures are indicative. Final pricing is confirmed in AED or the agreed project currency.</p>
      </section>

      <section className="photo-section">
        <div className="photo-section-top"><p className="label-copper">UGC PHOTOGRAPHY</p><h2>Still life.<br /><em>Real life.</em></h2><p>Image-making for campaigns, menus, launches and the everyday visual library your brand needs between videos.</p></div>
        <div className="photo-scroll">
          {photoPackages.map((pack) => <article key={pack.title} className="photo-offer"><img src={pack.image} alt={pack.title} /><span>{pack.index}</span><div><h3>{pack.title}</h3><p>{pack.description}</p><a href={profile.emailHref}>Enquire <ArrowUpRight size={14} /></a></div></article>)}
        </div>
      </section>

      <section className="process-nocturne" id="process">
        <div className="process-title"><SectionMark number="05" label="The process" /><h2>From first line<br />to <em>final frame.</em></h2></div>
        <div className="process-timeline">
          {processSteps.map(([number, title, description]) => <article key={number}><span>{number}</span><i /><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="contact-nocturne" id="contact">
        <div className="contact-monogram">JS</div>
        <p className="label-copper">LET’S MAKE THE NEXT THING UNMISSABLE</p>
        <h2>Have a brief?<br /><em>Let’s give it a pulse.</em></h2>
        <a href={profile.emailHref} className="contact-button"><Mail size={18} /> Start a conversation <ArrowUpRight size={18} /></a>
        <div className="contact-details">
          <a href={profile.emailHref}>{profile.email}</a>
          <a href={profile.instagram} target="_blank" rel="noreferrer"><Instagram size={14} /> {profile.instagramHandle}</a>
          <span>Dubai, UAE</span>
        </div>
      </section>

      <footer className="nocturne-footer"><span>© {new Date().getFullYear()} Jana Savić</span><span>UGC CREATOR / DUBAI</span><a href={profile.linkedIn} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a></footer>
    </main>
  );
}
