/* ═══════════════════════════════════════════════════════
   main.js — Interactivité jQuery · CV Hajar Douki
═══════════════════════════════════════════════════════ */
console.log("main.js chargé");

$(document).ready(function () {

  /* ─────────────────────────────────────
     1. MENU BURGER (mobile)
  ───────────────────────────────────── */
  $('#burger').on('click', function () {
    $('.nav-links').toggleClass('open');
  });

  // Fermer le menu au clic sur un lien
  $('.nav-links a').on('click', function () {
    $('.nav-links').removeClass('open');
  });


  /* ─────────────────────────────────────
     2. ANIMATION DES BARRES DE COMPÉTENCES
        Déclenchée via IntersectionObserver (scroll)
        Les barres s'animent quand la section est visible
  ───────────────────────────────────── */
  function animateSkillBars() {
    $('#skills .skill-item').each(function () {
      var $item = $(this);
      var pct   = $item.data('pct'); // récupère data-pct de chaque .skill-item
      var $bar  = $item.find('.skill-bar-fill');

      // On anime uniquement si pas encore animée
      if (!$bar.hasClass('animated')) {
        $bar.addClass('animated');
        // jQuery animate sur la largeur CSS
        $bar.css('width', pct + '%');
      }
    });
  }

  // Observer la section #skills
  if ('IntersectionObserver' in window) {
    var skillsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillsObserver.unobserve(entry.target); // on ne déclenche qu'une fois
        }
      });
    }, { threshold: 0.2 });

    var skillsSection = document.querySelector('#skills');
    if (skillsSection) skillsObserver.observe(skillsSection);
  } else {
    // Fallback pour navigateurs sans IntersectionObserver
    animateSkillBars();
  }


  /* ─────────────────────────────────────
     3. ANIMATION AU SURVOL DES TAGS (soft skills)
  ───────────────────────────────────── */
  $('.tag').on('mouseenter', function () {
    $(this).css('transform', 'translateY(-3px)');
  }).on('mouseleave', function () {
    $(this).css('transform', 'translateY(0)');
  });


  /* ─────────────────────────────────────
     4. ACCORDÉON TIMELINE (Formation)
        Clic sur l'en-tête → ouvre/ferme le corps
  ───────────────────────────────────── */
  $('.timeline-header').on('click', function () {
    var $item = $(this).closest('.timeline-item');
    var $body = $item.find('.timeline-body');
    var isOpen = $item.hasClass('open');

    // Fermer tous les items ouverts
    $('.timeline-item').removeClass('open');
    $('.timeline-body').removeClass('open');

    // Si l'item cliqué n'était pas ouvert, on l'ouvre
    if (!isOpen) {
      $item.addClass('open');
      $body.addClass('open');
    }
  });


  /* ─────────────────────────────────────
     5. NAVIGATION ACTIVE au scroll
        Met en évidence le lien de la section visible
  ───────────────────────────────────── */
  $(window).on('scroll', function () {
    var scrollPos = $(this).scrollTop() + 100;

    $('section').each(function () {
      var sectionTop    = $(this).offset().top;
      var sectionBottom = sectionTop + $(this).outerHeight();
      var sectionId     = $(this).attr('id');

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        $('.nav-links a').removeClass('active');
        $('.nav-links a[href="#' + sectionId + '"]').addClass('active');
      }
    });
  });

  // Style du lien actif (ajouté dynamiquement)
  $('<style>')
    .text('.nav-links a.active { color: var(--violet-light) !important; }')
    .appendTo('head');


  /* ─────────────────────────────────────
     6. VALIDATION DU FORMULAIRE DE CONTACT
        Appelée depuis le composant React via window.validateForm()
  ───────────────────────────────────── */
  window.validateContactForm = function (name, email, message) {
    var errors = {};

    // Validation du nom
    if (!name || name.trim() === '') {
      errors.name = 'Le nom est obligatoire.';
    }

    // Validation de l'email (format)
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === '') {
      errors.email = 'L\'email est obligatoire.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Format d\'email invalide.';
    }

    // Validation du message
    if (!message || message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères.';
    }

    return errors; // objet vide = pas d'erreurs
  };


  /* ─────────────────────────────────────
     7. ANIMATION D'ENTRÉE DES ÉLÉMENTS au scroll
        Les éléments avec .fade-in apparaissent progressivement
  ───────────────────────────────────── */
  // Ajouter la classe fade-in aux cartes stat
  $('.stat-card, .project-card').addClass('fade-in-element');

  $('<style>').text(`
    .fade-in-element {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .fade-in-element.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `).appendTo('head');

  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        // Délai progressif pour un effet en cascade
        setTimeout(function () {
          $(entry.target).addClass('visible');
        }, index * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $('.fade-in-element').each(function () {
    fadeObserver.observe(this);
  });


  /* ─────────────────────────────────────
     8. EFFET PARALLAX sur le hero (subtil)
  ───────────────────────────────────── */
  $(window).on('scroll', function () {
    var scrolled = $(this).scrollTop();
    if (scrolled < window.innerHeight) {
      $('.hero-photo-wrap').css('transform', 'translateY(' + scrolled * 0.08 + 'px)');
    }
  });

});