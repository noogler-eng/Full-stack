/* =========================================================
   Go Handbook — shared page engine
   - builds sidebar, TOC, prev/next from CHAPTERS
   - decorates code / output blocks (header + copy button)
   - live walkthroughs, quizzes, progress tracking
   ========================================================= */
(function () {
  "use strict";

  const PARTS = [
    { title: "Part I · Foundations", sub: "Install Go, learn the syntax, write real programs." },
    { title: "Part II · Working with Data", sub: "Slices, maps, strings, structs — how Go models the world." },
    { title: "Part III · Abstraction & Robustness", sub: "Interfaces, generics, errors and packages." },
    { title: "Part IV · Concurrency", sub: "Goroutines, channels, sync and context — Go's superpower." },
    { title: "Part V · Production Go", sub: "Testing, stdlib, HTTP services, performance." },
    { title: "Part VI · Senior Engineer Track", sub: "Idioms, architecture, shipping, and a capstone project." },
  ];

  const CHAPTERS = [
    { n: "01", slug: "01-introduction", part: 0, title: "Introduction & Setup", desc: "Why Go exists, installing it, your first program, and the go toolchain." },
    { n: "02", slug: "02-basics", part: 0, title: "Variables, Types & Constants", desc: "var vs :=, zero values, basic types, conversions, const and iota." },
    { n: "03", slug: "03-control-flow", part: 0, title: "Control Flow", desc: "if, for (Go's only loop), switch, labels, and defer." },
    { n: "04", slug: "04-functions", part: 0, title: "Functions & Closures", desc: "Multiple returns, variadics, first-class functions, closures, recursion." },

    { n: "05", slug: "05-arrays-slices-maps", part: 1, title: "Arrays, Slices & Maps", desc: "How slices really work, append & capacity, maps, slices/maps packages." },
    { n: "06", slug: "06-strings-runes", part: 1, title: "Strings, Bytes & Runes", desc: "UTF-8, runes, strings.Builder, fmt verbs and text processing." },
    { n: "07", slug: "07-structs-methods-pointers", part: 1, title: "Structs, Methods & Pointers", desc: "Modelling data, value vs pointer receivers, embedding, struct tags." },

    { n: "08", slug: "08-interfaces", part: 2, title: "Interfaces", desc: "Implicit interfaces, type assertions & switches, small-interface design." },
    { n: "09", slug: "09-generics", part: 2, title: "Generics", desc: "Type parameters, constraints, generic data structures — and when not to." },
    { n: "10", slug: "10-errors", part: 2, title: "Error Handling", desc: "errors as values, wrapping, errors.Is/As, custom errors, panic/recover." },
    { n: "11", slug: "11-packages-modules", part: 2, title: "Packages & Modules", desc: "Visibility, go.mod, versioning, internal/, workspaces, project layout." },

    { n: "12", slug: "12-goroutines-channels", part: 3, title: "Goroutines & Channels", desc: "The Go scheduler, channels, buffering, select, closing and ranging." },
    { n: "13", slug: "13-sync-patterns", part: 3, title: "Sync & Concurrency Patterns", desc: "WaitGroup, Mutex, Once, atomics, worker pools, pipelines, errgroup." },
    { n: "14", slug: "14-context", part: 3, title: "Context", desc: "Cancellation, deadlines, timeouts and request-scoped values." },

    { n: "15", slug: "15-testing", part: 4, title: "Testing & Benchmarking", desc: "Table-driven tests, subtests, mocks, fuzzing, benchmarks, coverage." },
    { n: "16", slug: "16-stdlib-tour", part: 4, title: "Standard Library Tour", desc: "io, files, JSON, time, os, flag, slog — batteries included." },
    { n: "17", slug: "17-http-apis", part: 4, title: "Building HTTP APIs", desc: "net/http, routing, middleware, JSON APIs, databases, graceful shutdown." },
    { n: "18", slug: "18-performance", part: 4, title: "Performance & Memory", desc: "Escape analysis, GC, allocations, pprof, sync.Pool, benchmarks." },

    { n: "19", slug: "19-senior-playbook", part: 5, title: "The Senior Engineer Playbook", desc: "Idioms, gotchas, code review checklist, design principles, tooling." },
    { n: "20", slug: "20-shipping", part: 5, title: "Shipping Go to Production", desc: "Builds, cross-compiling, Docker, config, observability, CI." },
    { n: "21", slug: "21-capstone", part: 5, title: "Capstone: Build a Task API", desc: "An end-to-end service: layered design, storage, tests, concurrency." },
  ];

  const body = document.body;
  const root = body.dataset.root || "";
  const current = body.dataset.chapter || null;
  const STORE_KEY = "go-handbook-done";

  /* ---------- storage (safe) ---------- */
  function loadDone() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || "[]"); } catch (e) { return []; }
  }
  function saveDone(list) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
  }
  let done = loadDone();

  const href = (c) => root + "chapters/" + c.slug + ".html";
  const el = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  };
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const slugify = (s) => s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);

  /* ---------- page shell ---------- */
  function buildShell() {
    const content = document.querySelector(".content");
    if (!content) return;

    const cur = CHAPTERS.find((c) => c.n === current);

    const top = el("header", "topbar");
    top.innerHTML =
      '<button class="menu-btn" aria-label="Toggle navigation">☰</button>' +
      '<a class="brand" href="' + root + 'index.html"><span class="brand-mark">Go</span><span class="brand-name">The Go Handbook</span></a>' +
      '<span class="spacer"></span>' +
      (cur ? '<span class="crumb">Chapter ' + cur.n + " · " + esc(cur.title) + "</span>" : "") +
      '<div class="progress"></div>';

    const layout = el("div", "layout");
    const side = el("nav", "sidebar");
    side.setAttribute("aria-label", "Chapters");
    side.appendChild(buildNav());

    const main = el("main", "main");
    content.parentNode.insertBefore(layout, content);
    main.appendChild(content);
    layout.appendChild(side);
    layout.appendChild(main);

    if (cur) {
      const toc = el("aside", "toc");
      layout.appendChild(toc);
      buildToc(content, toc);
      buildFooter(content, cur);
    }
    body.insertBefore(top, layout);

    top.querySelector(".menu-btn").addEventListener("click", () => body.classList.toggle("nav-open"));
    main.addEventListener("click", () => body.classList.remove("nav-open"));

    const bar = top.querySelector(".progress");
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function buildNav() {
    const frag = document.createDocumentFragment();
    const search = el("input", "search");
    search.type = "search";
    search.placeholder = "Filter chapters…";
    frag.appendChild(search);

    PARTS.forEach((p, i) => {
      const wrap = el("div", "nav-part");
      wrap.appendChild(el("div", "nav-part-title", esc(p.title)));
      CHAPTERS.filter((c) => c.part === i).forEach((c) => {
        const a = el("a", "nav-link" + (c.n === current ? " active" : ""));
        a.href = href(c);
        a.dataset.search = (c.title + " " + c.desc).toLowerCase();
        a.innerHTML = '<span class="nav-num">' + c.n + "</span><span>" + esc(c.title) + "</span>" +
          (done.includes(c.n) ? '<span class="done" title="Completed">✓</span>' : "");
        wrap.appendChild(a);
      });
      frag.appendChild(wrap);
    });

    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      frag.ownerDocument.querySelectorAll(".sidebar .nav-part").forEach((part) => {
        let any = false;
        part.querySelectorAll(".nav-link").forEach((a) => {
          const show = !q || a.dataset.search.includes(q);
          a.style.display = show ? "" : "none";
          any = any || show;
        });
        part.style.display = any ? "" : "none";
      });
    });
    return frag;
  }

  function buildToc(content, toc) {
    const heads = content.querySelectorAll("h2, h3");
    const used = new Set();
    heads.forEach((h) => {
      if (!h.id) {
        let id = slugify(h.textContent) || "section";
        let k = id, i = 2;
        while (used.has(k) || document.getElementById(k)) k = id + "-" + i++;
        h.id = k;
      }
      used.add(h.id);
      const a = el("a", "anchor", "#");
      a.href = "#" + h.id;
      a.setAttribute("aria-hidden", "true");
      h.appendChild(a);
    });

    const h2s = content.querySelectorAll("h2");
    if (!h2s.length) return;
    toc.appendChild(el("div", "toc-title", "On this page"));
    const links = [];
    h2s.forEach((h) => {
      const a = el("a", null, esc(h.firstChild ? h.firstChild.textContent : h.textContent));
      a.href = "#" + h.id;
      toc.appendChild(a);
      links.push([h, a]);
    });

    const spy = () => {
      let active = links[0];
      for (const pair of links) if (pair[0].getBoundingClientRect().top < 120) active = pair;
      links.forEach(([, a]) => a.classList.toggle("active", a === active[1]));
    };
    window.addEventListener("scroll", spy, { passive: true });
    spy();
  }

  function buildFooter(content, cur) {
    const idx = CHAPTERS.indexOf(cur);
    const btn = el("button", "complete-btn");
    const paint = () => {
      const d = done.includes(cur.n);
      btn.classList.toggle("done", d);
      btn.innerHTML = d ? "✓ Chapter completed" : "○ Mark chapter as complete";
    };
    btn.addEventListener("click", () => {
      done = done.includes(cur.n) ? done.filter((x) => x !== cur.n) : done.concat(cur.n);
      saveDone(done);
      paint();
      const link = document.querySelector('.nav-link.active');
      if (link) {
        const mark = link.querySelector(".done");
        if (done.includes(cur.n) && !mark) link.insertAdjacentHTML("beforeend", '<span class="done">✓</span>');
        if (!done.includes(cur.n) && mark) mark.remove();
      }
    });
    paint();
    content.appendChild(btn);

    const pager = el("div", "pager");
    const prev = CHAPTERS[idx - 1], next = CHAPTERS[idx + 1];
    if (prev) pager.insertAdjacentHTML("beforeend", '<a class="prev" href="' + href(prev) + '"><span class="lbl">← Previous</span>' + prev.n + " · " + esc(prev.title) + "</a>");
    if (next) pager.insertAdjacentHTML("beforeend", '<a class="next" href="' + href(next) + '"><span class="lbl">Next →</span>' + next.n + " · " + esc(next.title) + "</a>");
    content.appendChild(pager);
  }

  /* ---------- home page chapter grid ---------- */
  function buildHome() {
    const host = document.getElementById("chapter-grid");
    if (!host) return;
    PARTS.forEach((p, i) => {
      const block = el("section", "part-block");
      block.innerHTML = "<h2>" + esc(p.title) + '</h2><div class="part-sub">' + esc(p.sub) + "</div>";
      const cards = el("div", "cards");
      CHAPTERS.filter((c) => c.part === i).forEach((c) => {
        cards.insertAdjacentHTML("beforeend",
          '<a class="card" href="' + href(c) + '"><div class="num">CHAPTER ' + c.n + '</div><div class="ttl">' + esc(c.title) +
          (done.includes(c.n) ? '<span class="done">✓</span>' : "") + '</div><div class="desc">' + esc(c.desc) + "</div></a>");
      });
      block.appendChild(cards);
      host.appendChild(block);
    });
    const count = document.getElementById("done-count");
    if (count) count.textContent = done.length + " / " + CHAPTERS.length;
    const start = document.getElementById("continue-link");
    if (start) {
      const nextUp = CHAPTERS.find((c) => !done.includes(c.n)) || CHAPTERS[0];
      start.href = href(nextUp);
      if (done.length) start.textContent = "Continue → " + nextUp.n + " · " + nextUp.title;
    }
  }

  /* ---------- copy helper ---------- */
  function copyButton(getText) {
    const b = el("button", "copy-btn", "Copy");
    b.type = "button";
    b.addEventListener("click", async () => {
      const text = getText();
      try {
        await navigator.clipboard.writeText(text);
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (_) {}
        ta.remove();
      }
      b.textContent = "Copied"; b.classList.add("ok");
      setTimeout(() => { b.textContent = "Copy"; b.classList.remove("ok"); }, 1400);
    });
    return b;
  }

  function langOf(code) {
    const m = (code.className || "").match(/language-(\w+)/);
    return m ? m[1] : "";
  }

  /* ---------- code & output decoration ---------- */
  function decorateCode() {
    document.querySelectorAll(".code").forEach((box) => {
      if (box.querySelector(".code-head")) return;
      const code = box.querySelector("code");
      const head = el("div", "code-head");
      const lang = code ? langOf(code) : "";
      const file = box.dataset.file || (lang === "go" ? "main.go" : lang === "bash" ? "terminal" : lang || "code");
      head.innerHTML = '<span class="dots"><i></i><i></i><i></i></span><span class="file">' + esc(file) + "</span>" +
        (lang ? '<span class="lang">' + esc(lang) + "</span>" : '<span class="lang"></span>');
      head.appendChild(copyButton(() => (code ? code.textContent : box.textContent)));
      box.insertBefore(head, box.firstChild);
    });
    document.querySelectorAll(".output").forEach((box) => {
      if (box.querySelector(".output-head")) return;
      const head = el("div", "output-head", esc(box.dataset.label || "Output"));
      box.insertBefore(head, box.firstChild);
    });
    // default callout titles
    const titles = { senior: "Senior engineer tip", warn: "Gotcha", danger: "Danger", tip: "Tip", mental: "Mental model", info: "Note" };
    document.querySelectorAll(".callout").forEach((c) => {
      if (c.querySelector(".callout-title")) return;
      const type = Object.keys(titles).find((k) => c.classList.contains(k)) || "info";
      c.insertBefore(el("div", "callout-title", titles[type]), c.firstChild);
    });
    // wrap bare tables
    document.querySelectorAll(".content table").forEach((t) => {
      if (t.parentElement.classList.contains("table-wrap")) return;
      const w = el("div", "table-wrap");
      t.parentNode.insertBefore(w, t);
      w.appendChild(t);
    });
  }

  /* ---------- live walkthrough ---------- */
  function parseLines(spec) {
    const set = [];
    (spec || "").split(",").forEach((part) => {
      part = part.trim();
      if (!part) return;
      const [a, b] = part.split("-").map((x) => parseInt(x, 10));
      for (let i = a; i <= (b || a); i++) set.push(i);
    });
    return set;
  }
  function parseState(spec) {
    if (!spec) return [];
    return spec.split(";").map((kv) => kv.trim()).filter(Boolean).map((kv) => {
      const i = kv.indexOf("=");
      return i < 0 ? [kv, ""] : [kv.slice(0, i).trim(), kv.slice(i + 1).trim()];
    });
  }

  function buildLive() {
    document.querySelectorAll(".live").forEach((box) => {
      const pre = box.querySelector("pre");
      const stepsEl = box.querySelector(".live-steps");
      if (!pre || !stepsEl) return;
      const steps = Array.from(stepsEl.querySelectorAll(":scope > li"));
      const code = pre.querySelector("code");

      const head = el("div", "live-head",
        '<span class="badge">LIVE</span><span class="title">' + esc(box.dataset.title || "Step-by-step walkthrough") +
        '</span><span class="counter"></span>');
      head.appendChild(copyButton(() => (code ? code.textContent : pre.textContent)));

      const bodyWrap = el("div", "live-body");
      pre.parentNode.insertBefore(bodyWrap, pre);
      bodyWrap.appendChild(pre);
      const bars = [];

      const panel = el("div", "live-panel",
        '<div class="live-explain"></div><div class="live-state"></div><div class="live-out"></div>' +
        '<div class="live-controls"><button type="button" class="prev" title="Previous step (←)">← Back</button>' +
        '<button type="button" class="next primary" title="Next step (→)">Next step →</button>' +
        '<button type="button" class="play" title="Auto-play (space)">▶ Play</button>' +
        '<button type="button" class="reset" title="Back to the first step">Reset</button>' +
        '<div class="live-dots"></div></div>' +
        '<div class="live-hint">Tip: click the box and use <kbd>←</kbd> <kbd>→</kbd> to step, <kbd>space</kbd> to auto-play.</div>');

      box.insertBefore(head, box.firstChild);
      box.appendChild(panel);
      box.tabIndex = 0;

      const explain = panel.querySelector(".live-explain");
      const stateEl = panel.querySelector(".live-state");
      const outEl = panel.querySelector(".live-out");
      const prevB = panel.querySelector(".prev");
      const nextB = panel.querySelector(".next");
      const playB = panel.querySelector(".play");
      const dots = panel.querySelector(".live-dots");
      const counter = head.querySelector(".counter");
      steps.forEach((_, i) => {
        const d = el("i");
        d.title = "Step " + (i + 1);
        d.addEventListener("click", () => { stop(); go(i); });
        dots.appendChild(d);
      });

      let idx = 0;
      let prevState = {};
      let timer = null;

      // group line numbers into contiguous runs -> one highlight bar per run
      function runs(lines) {
        const sorted = Array.from(new Set(lines)).sort((a, b) => a - b);
        const out = [];
        sorted.forEach((n) => {
          const last = out[out.length - 1];
          if (last && n === last[1] + 1) last[1] = n; else out.push([n, n]);
        });
        return out;
      }
      function position(lines) {
        const cs = getComputedStyle(pre);
        const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.65;
        const pt = parseFloat(cs.paddingTop) || 0;
        const groups = runs(lines);
        while (bars.length < groups.length) {
          const b = el("div", "live-hl");
          bodyWrap.insertBefore(b, pre);
          bars.push(b);
        }
        bars.forEach((b, i) => {
          const g = groups[i];
          if (!g) { b.style.opacity = 0; b.style.height = "0px"; return; }
          b.style.opacity = 1;
          b.style.top = pt + (g[0] - 1) * lh + "px";
          b.style.height = (g[1] - g[0] + 1) * lh + "px";
        });
        // keep the highlighted line visible inside tall code blocks
        if (groups.length && bodyWrap.scrollHeight > bodyWrap.clientHeight) {
          const top = pt + (groups[0][0] - 1) * lh;
          if (top < bodyWrap.scrollTop || top > bodyWrap.scrollTop + bodyWrap.clientHeight - 2 * lh)
            bodyWrap.scrollTo({ top: Math.max(0, top - 2 * lh), behavior: "smooth" });
        }
      }
      function go(i) {
        idx = Math.max(0, Math.min(steps.length - 1, i));
        const s = steps[idx];
        position(parseLines(s.dataset.lines));
        explain.innerHTML = s.innerHTML;
        explain.classList.remove("flash"); void explain.offsetWidth; explain.classList.add("flash");

        const st = parseState(s.dataset.state);
        const nextState = {};
        stateEl.innerHTML = "";
        st.forEach(([k, v]) => {
          nextState[k] = v;
          const chip = el("span", "var" + (idx > 0 && prevState[k] !== v ? " changed" : ""),
            esc(k) + (v !== "" ? " = <b>" + esc(v) + "</b>" : ""));
          stateEl.appendChild(chip);
        });
        prevState = nextState;

        // stdout accumulates across steps up to idx
        const out = steps.slice(0, idx + 1).map((x) => x.dataset.out).filter((x) => x != null)
          .map((x) => x.replace(/\\(\\|n)/g, (m, c) => (c === "n" ? "\n" : "\\"))).join("\n");
        outEl.textContent = out;

        prevB.disabled = idx === 0;
        nextB.disabled = idx === steps.length - 1;
        nextB.textContent = idx === steps.length - 1 ? "Done ✓" : "Next step →";
        counter.textContent = "step " + (idx + 1) + " / " + steps.length;
        dots.querySelectorAll("i").forEach((d, j) => {
          d.classList.toggle("on", j === idx);
          d.classList.toggle("seen", j < idx);
        });
        if (idx === steps.length - 1) stop();
      }
      function stop() {
        if (timer) { clearInterval(timer); timer = null; }
        playB.textContent = "▶ Play";
        box.classList.remove("playing");
      }
      function play() {
        if (timer) { stop(); return; }
        if (idx === steps.length - 1) { prevState = {}; go(0); }
        playB.textContent = "❚❚ Pause";
        box.classList.add("playing");
        timer = setInterval(() => go(idx + 1), 2600);
      }
      prevB.addEventListener("click", () => { stop(); go(idx - 1); });
      nextB.addEventListener("click", () => { stop(); go(idx + 1); });
      playB.addEventListener("click", play);
      panel.querySelector(".reset").addEventListener("click", () => { stop(); prevState = {}; go(0); });
      box.addEventListener("keydown", (e) => {
        if (e.target.closest("button") && (e.key === " " || e.key === "Enter")) return;
        if (e.key === "ArrowRight" || e.key === "j") { e.preventDefault(); stop(); go(idx + 1); }
        else if (e.key === "ArrowLeft" || e.key === "k") { e.preventDefault(); stop(); go(idx - 1); }
        else if (e.key === " ") { e.preventDefault(); play(); }
        else if (e.key === "Home") { e.preventDefault(); stop(); prevState = {}; go(0); }
        else if (e.key === "End") { e.preventDefault(); stop(); go(steps.length - 1); }
      });
      window.addEventListener("resize", () => position(parseLines(steps[idx].dataset.lines)));
      go(0);
    });
  }

  /* ---------- quizzes ---------- */
  function buildQuiz() {
    document.querySelectorAll(".quiz").forEach((q) => {
      const answer = parseInt(q.dataset.answer, 10);
      const btns = q.querySelectorAll(".quiz-opts button");
      btns.forEach((b, i) => {
        b.type = "button";
        b.addEventListener("click", () => {
          btns.forEach((x, j) => {
            x.disabled = true;
            if (j === answer) x.classList.add("right");
          });
          if (i !== answer) b.classList.add("wrong");
          q.classList.add("answered");
        });
      });
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    buildShell();
    buildHome();
    decorateCode();
    if (window.Prism) window.Prism.highlightAll();
    buildLive();
    buildQuiz();
    if (location.hash) {
      const t = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (t) setTimeout(() => t.scrollIntoView(), 30);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
