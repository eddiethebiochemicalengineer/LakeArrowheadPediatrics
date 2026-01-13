(function () {
  const cfg = window.SITE_CONFIG;

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "html") node.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    });
    (Array.isArray(children) ? children : [children]).forEach((c) => {
      if (c === null || c === undefined) return;
      if (typeof c === "string") node.appendChild(document.createTextNode(c));
      else node.appendChild(c);
    });
    return node;
  }

  function icon(name) {
    const icons = {
      heart: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s-7-4.6-9.3-9A5.8 5.8 0 0 1 12 5.6 5.8 5.8 0 0 1 21.3 12C19 16.4 12 21 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      cal: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3v3M17 3v3M4 8h16M6 6h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      phone: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 12.9 12.9 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5 12.9 12.9 0 0 0 2.8.7A2 2 0 0 1 22 16.9Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      shield: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      map: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 20 3 17V4l6 3 6-3 6 3v13l-6-3-6 3Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 7v13M15 4v13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      chat: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    };
    return icons[name] || "";
  }

  function buildHeader() {
    const headerMount = document.getElementById("site-header");
    if (!headerMount) return;

    const current = (document.body.getAttribute("data-page") || "").trim();

    const links = [
      { href: "index.html", label: "Home", key: "home" },
      { href: "about.html", label: "About", key: "about" },
      { href: "services.html", label: "Services", key: "services" },
      { href: "new-patients.html", label: "New Patients", key: "new" },
      { href: "insurance.html", label: "Insurance & Billing", key: "insurance" },
      { href: "resources.html", label: "Resources", key: "resources" },
      { href: "contact.html", label: "Contact", key: "contact" }
    ];

    const nav = el("nav", { class: "nav", "aria-label": "Primary navigation" }, [
      ...links.map((l) =>
        el("a", {
          href: l.href,
          ...(l.key === current ? { "aria-current": "page" } : {})
        }, l.label)
      ),
      el("a", { class: "cta", href: "contact.html#appointment" }, ["Request Appointment"])
    ]);

    const header = el("header", { class: "header" }, [
      el("a", { class: "skip-link", href: "#main" }, "Skip to content"),
      el("div", { class: "container" }, [
        el("div", { class: "header-inner" }, [
          el("a", { class: "brand", href: "index.html", "aria-label": cfg.clinicName }, [
            el("div", { class: "brand-mark", "aria-hidden": "true", html: icon("heart") }),
            el("div", {}, [
              el("div", { class: "brand-name", id: "js-clinic-name" }, cfg.clinicName),
              el("div", { class: "brand-sub" }, "Pediatric Care • Lake Arrowhead")
            ])
          ]),
          nav
        ])
      ])
    ]);

    headerMount.appendChild(header);

    // Mobile sticky CTA
    const mobile = el("div", { class: "mobile-cta", "aria-label": "Quick actions" }, [
      el("div", { class: "bar" }, [
        el("a", { class: "btn btn-primary", href: `tel:${cfg.phoneE164}` }, [el("span", { "aria-hidden": "true", html: icon("phone") }), "Call"]),
        el("a", { class: "btn btn-secondary", href: "contact.html#appointment" }, [el("span", { "aria-hidden": "true", html: icon("cal") }), "Request"])
      ])
    ]);
    document.body.appendChild(mobile);
  }

  function buildFooter() {
    const footerMount = document.getElementById("site-footer");
    if (!footerMount) return;

    const footer = el("footer", { class: "footer" }, [
      el("div", { class: "container" }, [
        el("div", { class: "footer-inner" }, [
          el("div", {}, [
            el("div", { style: "font-weight:800; letter-spacing:-0.02em; font-size:16px;" }, cfg.clinicName),
            el("small", {}, "Serving the Lake Arrowhead community for over 20 years."),
            el("div", { style: "margin-top:12px;" }, [
              el("div", { class: "kv-row" }, [el("strong", {}, "Phone"), el("a", { class: "js-phone", href: `tel:${cfg.phoneE164}` }, cfg.phoneDisplay)]),
              el("div", { class: "kv-row" }, [el("strong", {}, "Fax"), el("span", { class: "js-fax" }, cfg.faxDisplay)]),
              el("div", { class: "kv-row" }, [el("strong", {}, "Email"), el("a", { class: "js-email", href: `mailto:${cfg.email}` }, cfg.email)]),
              el("div", { class: "kv-row" }, [el("strong", {}, "Address"), el("span", { class: "js-address" }, cfg.addressLines.join(", "))])
            ])
          ]),
          el("div", {}, [
            el("div", { class: "footer-links" }, [
              el("a", { href: "portal.html" }, "Patient Portal"),
              el("a", { href: "faq.html" }, "FAQs"),
              el("a", { href: "reviews.html" }, "Reviews"),
              el("a", { href: "notice-of-privacy-practices.html" }, "Notice of Privacy Practices"),
              el("a", { href: "privacy.html" }, "Website Privacy"),
              el("a", { href: "terms.html" }, "Terms")
            ]),
            el("div", { style: "margin-top:12px;" }, [
              el("small", {}, `© ${new Date().getFullYear()} ${cfg.clinicName}. All rights reserved.`)
            ])
          ])
        ])
      ])
    ]);

    footerMount.appendChild(footer);
  }

  function fillText() {
    // Fill placeholders anywhere
    document.querySelectorAll(".js-clinic-name").forEach((n) => (n.textContent = cfg.clinicName));
    document.querySelectorAll(".js-phone").forEach((n) => {
      n.textContent = cfg.phoneDisplay;
      if (n.tagName === "A") n.setAttribute("href", `tel:${cfg.phoneE164}`);
    });
    document.querySelectorAll(".js-fax").forEach((n) => (n.textContent = cfg.faxDisplay));
    document.querySelectorAll(".js-email").forEach((n) => {
      n.textContent = cfg.email;
      if (n.tagName === "A") n.setAttribute("href", `mailto:${cfg.email}`);
    });
    document.querySelectorAll(".js-address").forEach((n) => (n.textContent = cfg.addressLines.join(", ")));
    document.querySelectorAll(".js-hours").forEach((n) => (n.innerHTML = cfg.hours.map(h => `<div><strong>${h.days}:</strong> ${h.hours}</div>`).join("")));
    document.querySelectorAll(".js-map-link").forEach((n) => {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.googleMapsQuery)}`;
      if (n.tagName === "A") n.setAttribute("href", url);
    });
  }

  function mountLists() {
    // Services list
    document.querySelectorAll("[data-mount='services']").forEach((mount) => {
      mount.innerHTML = "";
      cfg.services.forEach((s) => {
        mount.appendChild(el("div", { class: "card" }, [
          el("h3", {}, s.title),
          el("p", {}, s.desc)
        ]));
      });
    });

    // Providers list
    document.querySelectorAll("[data-mount='providers']").forEach((mount) => {
      mount.innerHTML = "";
      cfg.providers.forEach((p) => {
        mount.appendChild(el("div", { class: "card" }, [
          el("div", { style: "display:flex; gap:14px; align-items:flex-start;" }, [
            el("img", {
              src: p.image,
              alt: p.name,
              width: "92",
              height: "92",
              loading: "lazy",
              style: "border-radius:16px; border:1px solid rgba(15,23,42,0.10); object-fit:cover;"
            }),
            el("div", {}, [
              el("h3", {}, p.name),
              el("div", { class: "badge", html: `${icon("shield")} ${p.role}` }),
              el("p", {}, p.bio)
            ])
          ])
        ]));
      });
    });

    // Testimonials list
    document.querySelectorAll("[data-mount='testimonials']").forEach((mount) => {
      mount.innerHTML = "";
      const max = parseInt(mount.getAttribute("data-max") || "3", 10);
      cfg.testimonials.slice(0, max).forEach((t) => {
        mount.appendChild(el("div", { class: "quote" }, [
          el("p", {}, `“${t.quote}”`),
          el("div", { class: "by" }, t.name)
        ]));
      });
    });

    // Forms list
    document.querySelectorAll("[data-mount='forms']").forEach((mount) => {
      mount.innerHTML = "";
      cfg.forms.forEach((f) => {
        mount.appendChild(el("div", { class: "card" }, [
          el("h3", {}, f.label),
          el("p", {}, "Download, print, and bring to your first visit (or complete ahead of time if instructed)."),
          el("div", { style: "margin-top:12px;" }, [
            el("a", { class: "btn btn-secondary", href: f.file }, "Download PDF")
          ])
        ]));
      });
    });
  }

  function mountSchema() {
    const mount = document.getElementById("schema-jsonld");
    if (!mount) return;

    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": cfg.clinicName,
      "telephone": cfg.phoneDisplay,
      "email": cfg.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": `${cfg.addressLines[0]}, ${cfg.addressLines[1]}`,
        "addressLocality": "Cedar Glenn",
        "addressRegion": "CA",
        "postalCode": "92352",
        "addressCountry": "US"
      },
      "openingHoursSpecification": cfg.hours
        .filter(h => h.days.includes("Mon") || h.days.includes("Fri"))
        .map(() => ({
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
          "opens": "09:00",
          "closes": "17:00"
        }))
    };

    mount.textContent = JSON.stringify(schema, null, 2);
  }

  function wireForms() {
    document.querySelectorAll("form[data-appointment-form]").forEach((form) => {
      const status = form.querySelector("[data-form-status]");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const honeypot = data.get("company_name");
        if (honeypot) {
          // silently ignore bots
          if (status) status.textContent = "Thanks! We'll be in touch.";
          form.reset();
          return;
        }

        // Minimal PHI note: do not encourage detailed medical info.
        const payload = Object.fromEntries([...data.entries()].filter(([k]) => k !== "company_name"));

        if (!cfg.appointmentRequest.endpointUrl) {
          if (status) status.textContent = "This form is ready to connect to a secure endpoint. For now, please call us to request an appointment.";
          return;
        }

        try {
          if (status) status.textContent = "Sending…";
          const res = await fetch(cfg.appointmentRequest.endpointUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          if (status) status.textContent = cfg.appointmentRequest.successMessage;
          form.reset();
        } catch (err) {
          if (status) status.textContent = "Sorry—something went wrong. Please call the office to request an appointment.";
        }
      });
    });
  }

  function init() {
    buildHeader();
    buildFooter();
    fillText();
    mountLists();
    mountSchema();
    wireForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
