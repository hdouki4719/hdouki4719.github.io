// components.jsx - Composants React 

var PROJECTS_DATA = [
  {
    title: "CV Interactif Hajar Douki",
    description: "CV personnel en ligne developpe avec HTML, CSS natif, jQuery et ReactJS. Design elegant avec animations au scroll, accordeon interactif et composants React reutilisables.",
    techs: ["HTML5", "CSS3", "jQuery", "React"],
    github: "https://github.com/hdouki4719",
    demo: "https://hajardouki.github.io"
  },
  {
    title: "SminiProjet - Jeu 2D C++",
    description: "Jeu 2D en C++ developpe avec SFML. Le joueur doit eviter des obstacles generes aleatoirement et atteindre un abri avant la fin du temps. Applique les concepts de la POO avec plusieurs actions : courir, sauter, se baisser.",
    techs: ["C++", "SFML", "POO"],
    github: "https://github.com/hdouki4719/SminiProjet",
    demo: null
  },
  {
    title: "MonCampusDocs",
    description: "MonCampusDocs est un site web de documentation académique pour les étudiants, hébergé sur GitHub Pages, qui regroupe des ressources et informations utiles liées aux études.",
    techs: ["Html", "css", "js"],
    github: "https://northernblade1.github.io/moncampusdocs/",
    demo: null
  }
];

// -------------------------------------------
// COMPOSANT 1 : ProjectCard
// -------------------------------------------
function ProjectCard(props) {
  var project = props.project;
  var index   = props.index;
  var num     = (index + 1 < 10) ? "0" + (index + 1) : "" + (index + 1);

  return (
    <div className="project-card">
      <div className="project-number">{num}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      <div className="project-techs">
        {project.techs.map(function(tech, i) {
          return <span key={i} className="project-tech">{tech}</span>;
        })}
      </div>

      <div className="project-links">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          <i className="fa-brands fa-github"></i> Code
        </a>
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            <i className="fa-solid fa-arrow-up-right-from-square"></i> Demo
          </a>
        ) : null}
      </div>
    </div>
  );
}

// -------------------------------------------
// COMPOSANT 2 : ProjectsGrid
// -------------------------------------------
function ProjectsGrid() {
  return (
    <div>
      {PROJECTS_DATA.map(function(project, index) {
        return <ProjectCard key={index} project={project} index={index} />;
      })}
    </div>
  );
}

// -------------------------------------------
// COMPOSANT 3 : ContactForm
// -------------------------------------------
function ContactForm() {
  var stateValues  = React.useState({ name: "", email: "", message: "" });
  var values       = stateValues[0];
  var setValues    = stateValues[1];

  var stateErrors  = React.useState({});
  var errors       = stateErrors[0];
  var setErrors    = stateErrors[1];

  var stateSuccess = React.useState(false);
  var success      = stateSuccess[0];
  var setSuccess   = stateSuccess[1];

  var stateLoading = React.useState(false);
  var loading      = stateLoading[0];
  var setLoading   = stateLoading[1];

  function handleChange(e) {
    var name  = e.target.name;
    var value = e.target.value;
    setValues(function(prev) {
      var next = Object.assign({}, prev);
      next[name] = value;
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    var newErrors = {};
    if (typeof window.validateContactForm === "function") {
      newErrors = window.validateContactForm(values.name, values.email, values.message);
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(function() {
      setLoading(false);
      setSuccess(true);
      setValues({ name: "", email: "", message: "" });
    }, 1200);
  }

  return (
    <div className="contact-wrapper">
      <div className="contact-info">
        <p>
          Vous souhaitez collaborer sur un projet, proposer un stage ou simplement
          echanger ? Contactez-moi et je vous repondrai rapidement.
        </p>
        <div className="contact-socials">
          <a href="mailto:hajar.douki@email.com" className="contact-social">
            <i className="fa-solid fa-envelope"></i>
            hajar.douki@email.com
          </a>
          <a href="https://linkedin.com/in/hajardouki" target="_blank" className="contact-social">
            <i className="fa-brands fa-linkedin"></i>
            linkedin.com/in/hajardouki
          </a>
          <a href="https://github.com/hdouki4719" target="_blank" className="contact-social">
            <i className="fa-brands fa-github"></i>
            github.com/hdouki4719
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        {success ? (
          <div className="form-success">
            Message envoye avec succes ! Je vous repondrai rapidement.
          </div>
        ) : null}

        <div className="form-group">
          <label htmlFor="contact-name">Nom complet</label>
          <input
            type="text"
            id="contact-name"
            name="name"
            placeholder="Votre nom"
            value={values.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name ? <span className="form-error">{errors.name}</span> : null}
        </div>

        <div className="form-group">
          <label htmlFor="contact-email">Adresse email</label>
          <input
            type="text"
            id="contact-email"
            name="email"
            placeholder="votre@email.com"
            value={values.email}
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email ? <span className="form-error">{errors.email}</span> : null}
        </div>

        <div className="form-group">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows="5"
            placeholder="Votre message..."
            value={values.message}
            onChange={handleChange}
            className={errors.message ? "error" : ""}
          ></textarea>
          {errors.message ? <span className="form-error">{errors.message}</span> : null}
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Envoi en cours..." : "Envoyer le message"}
        </button>
      </form>
    </div>
  );
}

// -------------------------------------------
// MONTAGE REACT dans le DOM
// -------------------------------------------
var projectsEl = document.getElementById("react-projects");
if (projectsEl) {
  var projectsRoot = ReactDOM.createRoot(projectsEl);
  projectsRoot.render(<ProjectsGrid />);
  console.log("React ProjectsGrid monte avec succes");
} else {
  console.error("Element #react-projects introuvable dans index.html");
}

var contactEl = document.getElementById("react-contact");
if (contactEl) {
  var contactRoot = ReactDOM.createRoot(contactEl);
  contactRoot.render(<ContactForm />);
  console.log("React ContactForm monte avec succes");
} else {
  console.error("Element #react-contact introuvable dans index.html");
}