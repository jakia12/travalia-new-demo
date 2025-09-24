// app/_components/ClientEffects.jsx
"use client";

import lightGallery from "lightgallery";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useEffect } from "react";

export default function ClientEffects() {
  useEffect(() => {
    // 1) Preloader
    const preloader = () => {
      document.querySelectorAll(".cs_preloader").forEach((el) => {
        el.style.display = "none";
      });
      document.querySelectorAll(".cs_preloader_in").forEach((el) => {
        el.style.transition = "opacity .3s";
        el.style.opacity = "0";
        setTimeout(() => (el.style.display = "none"), 150);
      });
    };
    if (document.readyState === "complete") preloader();
    else window.addEventListener("load", preloader);

    // 2) Mobile Menu
    const addMobileBits = () => {
      document.querySelectorAll(".cs_nav").forEach((nav) => {
        if (!nav.querySelector(".cs_menu_toggle")) {
          const btn = document.createElement("span");
          btn.className = "cs_menu_toggle";
          btn.innerHTML = "<span></span>";
          nav.appendChild(btn);
        }
      });
      document.querySelectorAll(".menu-item-has-children").forEach((li) => {
        if (!li.querySelector(".cs_munu_dropdown_toggle")) {
          const t = document.createElement("span");
          t.className = "cs_munu_dropdown_toggle";
          t.innerHTML = "<span></span>";
          li.appendChild(t);
        }
      });
    };
    addMobileBits();

    const onMenuClick = (e) => {
      const tgt = e.target;
      if (tgt.closest(".cs_menu_toggle")) {
        const btn = tgt.closest(".cs_menu_toggle");
        btn.classList.toggle("cs_toggle_active");
        const list = btn.parentElement?.querySelector(".cs_nav_list");
        list?.classList.toggle("cs_active");
      }
      if (tgt.closest(".cs_munu_dropdown_toggle")) {
        const dd = tgt.closest(".cs_munu_dropdown_toggle");
        dd.classList.toggle("active");
        const ul = dd.parentElement?.querySelector(":scope > ul");
        if (ul)
          ul.style.display = ul.style.display === "none" ? "block" : "none";
        dd.parentElement?.classList.toggle("active");
      }
      if (tgt.closest(".cs_search_btn")) {
        document.querySelector(".cs_header_search")?.classList.add("active");
      }
      if (tgt.closest(".cs_close") || tgt.closest(".cs_sidenav_overlay")) {
        document.querySelector(".cs_sidenav")?.classList.remove("active");
        document.querySelector(".cs_header_search")?.classList.remove("active");
      }
    };
    document.addEventListener("click", onMenuClick);

    // 3) Sticky Header
    const header = document.querySelector(".cs_sticky_header");
    let lastTop = 0;
    const sticky = () => {
      if (!header) return;
      const top = window.scrollY;
      const threshold = (header.offsetHeight || 0) + 30;
      if (top >= threshold) header.classList.add("cs_gescout_sticky");
      else header.classList.remove("cs_gescout_sticky", "cs_gescout_show");

      if (header.classList.contains("cs_gescout_sticky")) {
        if (top < lastTop) header.classList.add("cs_gescout_show");
        else header.classList.remove("cs_gescout_show");
      }
      lastTop = top;
    };
    window.addEventListener("scroll", sticky);
    sticky();

    // 4) Dynamic Background: [data-src] → background-image
    const dynBg = () => {
      document.querySelectorAll("[data-src]").forEach((el) => {
        const src = el.getAttribute("data-src");
        if (src) el.style.backgroundImage = `url(${src})`;
      });
    };
    dynBg();

    // 5) Modal Video
    const closeVideo = () => {
      document.querySelector(".cs_video_popup")?.classList.remove("active");
      const iframe = document.querySelector(".cs_video_popup iframe");
      if (iframe) iframe.src = "about:blank";
    };
    const openVideo = (src) => {
      let root = document.querySelector(".cs_video_popup");
      if (!root) {
        document.body.insertAdjacentHTML(
          "beforeend",
          `
          <div class="cs_video_popup">
            <div class="cs_video_popup-overlay"></div>
            <div class="cs_video_popup-content">
              <div class="cs_video_popup-layer"></div>
              <div class="cs_video_popup-container">
                <div class="cs_video_popup-align">
                  <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="about:blank" allowfullscreen></iframe>
                  </div>
                </div>
                <div class="cs_video_popup-close"></div>
              </div>
            </div>
          </div>`
        );
        document
          .querySelector(".cs_video_popup-close")
          ?.addEventListener("click", closeVideo);
        document
          .querySelector(".cs_video_popup-layer")
          ?.addEventListener("click", closeVideo);
        document
          .querySelector(".cs_video_popup-overlay")
          ?.addEventListener("click", closeVideo);
      }
      const iframe = document.querySelector(".cs_video_popup iframe");
      if (iframe) iframe.src = src;
      document.querySelector(".cs_video_popup")?.classList.add("active");
    };
    const onVideoClick = (e) => {
      const a = e.target.closest(".cs_video_open");
      if (!a) return;
      e.preventDefault();
      openVideo(a.href);
    };
    document.addEventListener("click", onVideoClick);

    // 6) Parallax
    const parallax = () => {
      document.querySelectorAll(".cs_parallax").forEach((root) => {
        const winTop = document.documentElement.scrollTop;
        const winH = window.innerHeight;
        const offTop = root.offsetTop;
        const h = root.offsetHeight;
        const scDown = offTop + h >= winTop;
        const scUp = offTop <= winTop + winH;
        if (scDown && scUp) {
          const calcH = winTop + winH - offTop;
          const mini = calcH / 10;
          const mini2 = calcH / 3;
          const mini3 = calcH / 6;
          const mini4 = (winTop - offTop + winH) / 5;
          root
            .querySelectorAll(".cs_to_left")
            .forEach((el) => (el.style.transform = `translateX(-${mini}px)`));
          root
            .querySelectorAll(".cs_to_right")
            .forEach((el) => (el.style.transform = `translateX(${mini}px)`));
          root
            .querySelectorAll(".cs_to_up")
            .forEach((el) => (el.style.transform = `translateY(-${mini}px)`));
          root
            .querySelectorAll(".cs_to_up_2")
            .forEach((el) => (el.style.transform = `translateY(-${mini2}px)`));
          root
            .querySelectorAll(".cs_to_up_3")
            .forEach((el) => (el.style.transform = `translateY(-${mini3}px)`));
          root
            .querySelectorAll(".cs_to_up_4")
            .forEach((el) => (el.style.transform = `translateY(-${mini4}px)`));
          root
            .querySelectorAll(".cs_to_down")
            .forEach((el) => (el.style.transform = `translateY(${mini}px)`));
          root
            .querySelectorAll(".cs_to_down_4")
            .forEach((el) => (el.style.transform = `translateY(${mini4}px)`));
          root
            .querySelectorAll(".cs_to_rotate")
            .forEach((el) => (el.style.transform = `rotate(${mini}deg)`));
        }
      });
    };
    window.addEventListener("scroll", parallax);
    parallax();

    // 7) Contact form (#cs_form)
    const form = document.getElementById("cs_form");
    const result = document.getElementById("cs_result");
    const onSubmit = async (e) => {
      e.preventDefault();
      if (!form || !result) return;
      const formData = new FormData(form);
      const obj = {};
      formData.forEach((v, k) => (obj[k] = v));
      result.innerHTML = "Please wait...";
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(obj),
        });
        const json = await res.json();
        result.innerHTML = json.message;
      } catch {
        result.innerHTML = "Something went wrong!";
      } finally {
        form.reset();
        setTimeout(() => (result.style.display = "none"), 5000);
      }
    };
    form?.addEventListener("submit", onSubmit);

    // 8) Counter (odometer-like)
    const counters = document.querySelectorAll(".odometer[data-count-to]");
    if (counters.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const to = Number(el.dataset.countTo || "0");
              el.textContent = String(to);
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((el) => io.observe(el));
    }

    // 9) Accordion
    document.querySelectorAll(".cs_accordian").forEach((acc) => {
      const body = acc.querySelector(".cs_accordian_body");
      if (body)
        body.style.display = acc.classList.contains("active")
          ? "block"
          : "none";
    });
    const onAccClick = (e) => {
      const head = e.target.closest(".cs_accordian_head");
      if (!head) return;
      const acc = head.closest(".cs_accordian");
      const body = acc?.querySelector(".cs_accordian_body");
      document.querySelectorAll(".cs_accordian_body").forEach((el) => {
        if (el !== body) el.style.display = "none";
      });
      document
        .querySelectorAll(".cs_accordian")
        .forEach((el) => el.classList.remove("active"));
      if (body) {
        body.style.display = "block";
        acc?.classList.add("active");
      }
    };
    document.addEventListener("click", onAccClick);

    // 10) Tabs
    const onTab = (e) => {
      const a = e.target.closest(".cs_tabs .cs_tab_links a");
      if (!a) return;
      e.preventDefault();
      const target = a.getAttribute("href");
      const wrapper = a.closest(".cs_tabs");
      wrapper
        .querySelectorAll(".cs_tab_content > *")
        .forEach((el) => (el.style.display = "none"));
      wrapper.querySelector(`.cs_tab_content ${target}`).style.display =
        "block";
      a.closest("li")?.classList.add("active");
      a.closest("ul")
        ?.querySelectorAll("li")
        .forEach((li) => {
          if (li !== a.closest("li")) li.classList.remove("active");
        });
    };
    document.addEventListener("click", onTab);

    // 11) LightGallery
    document.querySelectorAll(".cs_gallery_list").forEach((el) => {
      if (!el._lgInited) {
        lightGallery(el, {
          selector: ".cs_gallery_item",
          plugins: [lgZoom, lgThumbnail],
        });
        el._lgInited = true; // mark as inited
      }
    });

    // 12) Hover to Active
    document.querySelectorAll(".cs_hover_active").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        el.classList.add("active");
        el.parentElement
          ?.querySelectorAll(".cs_hover_active")
          .forEach((sib) => {
            if (sib !== el) sib.classList.remove("active");
          });
      });
    });

    // 13) Reviews width
    document.querySelectorAll(".cs_rating").forEach((wrap) => {
      const rating = Number(wrap.dataset.rating || "0");
      const pct = Math.max(0, Math.min(5, rating)) * 20;
      wrap
        .querySelector(".cs_rating_percentage")
        ?.style.setProperty("width", pct + "%");
    });

    // 14) FAQ numbering
    document.querySelectorAll(".cs_list_item span").forEach((span, idx) => {
      span.textContent = String(idx + 1);
    });

    // cleanup
    return () => {
      window.removeEventListener("load", preloader);
      document.removeEventListener("click", onMenuClick);
      window.removeEventListener("scroll", sticky);
      window.removeEventListener("scroll", parallax);
      form?.removeEventListener("submit", onSubmit);
      document.removeEventListener("click", onAccClick);
      document.removeEventListener("click", onTab);
      document.removeEventListener("click", onVideoClick);
    };
  }, []);

  return null;
}
