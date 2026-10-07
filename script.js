// script.js: character art, navigation, species / background / class / ability pages
const ch = (o, vb = "0 0 300 340") => {
  const v = {
      skin: "#f1c9a5",
      hair: "#5a3a22",
      eye: "#4a7a3a",
      robe: "#6b4a8a",
      ears: 0,
      horns: 0,
      hs: 0,
      horn: "#3a2a2a",
      ...o,
    },
    sk = v.skin;
  let s = `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg"><path d="M66 340Q70 230 150 222Q230 230 234 340Z" fill="${v.robe}"/><path d="M118 224Q150 266 182 224Z" fill="#0004"/><path d="M150 226V340" stroke="#0002" stroke-width="3"/>`;
  if (v.hs == 1)
    s += `<path d="M60 150Q58 36 150 36Q242 36 240 150L252 268Q222 286 206 240H94Q78 286 48 268Z" fill="${v.hair}"/>`;
  if (v.hs == 3)
    for (let a = 0; a < 9; a++)
      s += `<circle cx="${150 + 86 * Math.cos(Math.PI * (1 + a / 8))}" cy="${140 + 80 * Math.sin(Math.PI * (1 + a / 8))}" r="24" fill="${v.hair}"/>`;
  if (v.horns == 2)
    s += `<path d="M96 94Q60 60 70 20Q104 44 118 86Z M204 94Q240 60 230 20Q196 44 182 86Z" fill="${v.horn}"/>`;
  if (v.horns == 3)
    s += `<path d="M84 104Q22 96 36 48Q74 40 74 78Q54 80 62 96Q80 100 100 90Z M216 104Q278 96 264 48Q226 40 226 78Q246 80 238 96Q220 100 200 90Z" fill="${v.horn}"/>`;
  if (v.horns == 1)
    s += `<path d="M104 86Q96 58 112 48Q116 70 128 82Z M196 86Q204 58 188 48Q184 70 172 82Z" fill="${v.horn}"/>`;
  if (v.ears)
    s += `<path d="M76 146L${v.ears == 2 ? 14 : 38} 120L80 186Z M224 146L${v.ears == 2 ? 286 : 262} 120L220 186Z" fill="${sk}"/>`;
  else
    s += `<circle cx="72" cy="162" r="13" fill="${sk}"/><circle cx="228" cy="162" r="13" fill="${sk}"/>`;
  s += `<ellipse cx="150" cy="152" rx="80" ry="74" fill="${sk}"/>`;
  if (v.scales)
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 7; c++)
        s += `<circle cx="${96 + c * 18 + (r % 2) * 9}" cy="${96 + r * 18}" r="7" fill="none" stroke="#0003" stroke-width="2"/>`;
  if (v.beard)
    s += `<path d="M76 168Q76 276 150 296Q224 276 224 168Q204 224 150 226Q96 224 76 168Z" fill="${v.beard}"/>`;
  if (v.snout)
    s += `<ellipse cx="150" cy="196" rx="44" ry="28" fill="${v.snout}"/><circle cx="138" cy="190" r="3.5" fill="#0006"/><circle cx="162" cy="190" r="3.5" fill="#0006"/>`;
  if (v.mark)
    s += `<path d="M92 180Q104 196 96 208M208 180Q196 196 204 208M150 82V104" stroke="${v.mark}" stroke-width="5" stroke-linecap="round" fill="none"/>`;
  for (const x of [114, 186])
    s += `<ellipse cx="${x}" cy="150" rx="15" ry="19" fill="#231510"/><ellipse cx="${x}" cy="152" rx="11" ry="15" fill="${v.eye}"/><circle cx="${x - 4}" cy="144" r="5" fill="#fff"/><circle cx="${x + 4}" cy="158" r="2.5" fill="#fff"/>`;
  if (!v.snout)
    s += `<ellipse cx="94" cy="184" rx="13" ry="8" fill="#ff7a8a" opacity=".35"/><ellipse cx="206" cy="184" rx="13" ry="8" fill="#ff7a8a" opacity=".35"/><path d="M140 198Q150 208 160 198" stroke="#3a1a14" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  if (v.tusk)
    s += `<path d="M128 200L124 184L136 198ZM172 200L176 184L164 198Z" fill="#fff"/>`;
  if (v.hs != 2 && !v.hat)
    s += `<path d="M70 142Q76 58 150 58Q224 58 230 142Q204 100 170 104Q150 80 128 106Q96 100 70 142Z" fill="${v.hair}"/>`;
  if (v.hat)
    s += `<path d="M82 108Q150 -40 218 108Q150 84 82 108Z" fill="${v.hat}"/><circle cx="150" cy="-4" r="10" fill="#fff"/>`;
  return s + "</svg>";
};
const AB = ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
  S = {
    t: 1,
    s: 0,
    c: 4,
    b: 0,
    lv: 1,
    sel: {},
    sk: 0,
    sf: "all",
    ab: {
      s: { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 },
      m: 21,
      p2: null,
      p1: null,
    },
    l: {},
    p: {},
  },
  $ = (i) => document.getElementById(i);
const look = (i = S.s, rb) => {
  const x = SP[i],
    l = x.L[S.l[i] || 0];
  return { ...x.v, ...(l ? l.v : {}), ...(rb ? { robe: rb } : {}) };
};
const box = (b, l, c) =>
  `<div class="bx" style="--c:${c}"><b>${b}</b><span>${l}</span></div>`;
function sp() {
  const x = SP[S.s],
    li = S.l[S.s] || 0,
    l = x.L[li],
    dv = l && l.dv !== undefined ? l.dv : x.dv,
    spd = (l && l.sp) || x.sp,
    res = (l && l.r) || x.r || "—";
  const tr = [...x.tr, ...((l && l.x) || [])];
  $("v").innerHTML =
    `<div class="stage"><div class="col">${steps()}<div class="p" style="flex:1"><div class="k">Heritage</div><h2>${x.n}</h2><p>${x.s}</p>${l && l.d ? `<p><b style="color:var(--g)">${l.n}.</b> ${l.d}</p>` : ""}<div class="note">${x.L.length ? x.lh + ": choose one lineage →" : "No lineages. Every " + x.n + " shares the same traits."}</div></div></div>
<div class="hero">${ch(look())}</div>
<div class="col"><div class="p"><div class="k">At a glance</div><div class="boxes">${box(spd + " ft", "Speed", "#f3c26b")}${box(x.z.replace(" or ", " / "), "Size", "#e0793a")}${box(dv ? dv + " ft" : "—", "Darkvision", "#9fe0d0")}${box(res, "Resist", "#e58fb6")}</div></div>
<div class="p" style="flex:1">${x.L.length ? `<div class="k">${x.lh}</div><div class="chips">${x.L.map((q, i) => `<button class="chip ${i == li ? "on" : ""}" data-l="${i}">${q.n}</button>`).join("")}</div>` : ""}<div class="k">Traits</div><ul class="tr">${tr.map((t) => `<li><b>${t[0]}</b>${t[1] ? " · " + t[1] : ""}</li>`).join("")}</ul><button class="cta" id="pk">Choose ${l ? l.n.replace(/ Giant$/, "") : x.n}</button></div></div></div>
<div class="rail"><button class="nav" id="pv">◀ Prev</button><div class="strip">${SP.map((q, i) => `<div class="th ${i == S.s ? "on" : ""}" data-i="${i}">${ch(look(i), "40 30 220 220")}<em>${q.n}</em></div>`).join("")}</div><button class="nav" id="nx">Next ▶</button><button class="nav" id="al">▦ View all</button></div>`;
  document.querySelectorAll("[data-l]").forEach(
    (b) =>
      (b.onclick = () => {
        S.l[S.s] = +b.dataset.l;
        sp();
      }),
  );
  document.querySelectorAll(".th").forEach(
    (b) =>
      (b.onclick = () => {
        S.s = +b.dataset.i;
        sp();
      }),
  );
  $("pv").onclick = () => go(-1);
  $("nx").onclick = () => go(1);
  $("al").onclick = all;
  $("pk").onclick = () => {
    S.p.sp = (
      l && !/Giant|Standard/.test(l.n) && x.n !== "Dragonborn"
        ? l.n
        : (l ? l.n.split(" ")[0] + " " : "") + x.n
    ).replace(/^(High|Wood) Elf Elf/, "$1 Elf");
    S.p.sp = l ? l.n + (/Elf|Gnome|Giant/.test(l.n) ? "" : " " + x.n) : x.n;
    S.t = 2;
    rd();
    sm();
  };
  const o = document.querySelector(".th.on");
  o && o.scrollIntoView({ inline: "center", block: "nearest" });
}
const rg = (a, c) => {
  const k = c[3].indexOf(a);
  return `<div class="ring ${k == 0 ? "a" : k == 1 ? "b" : ""}" style="--p:${k == 0 ? 100 : k == 1 ? 72 : 20}"><i>${a}<small>${k == 0 ? "Primary" : k == 1 ? "Support" : ""}</small></i></div>`;
};
const hasSp = () =>
  CAS.includes(CL[S.c][0]) ||
  (SP[S.s].L[S.l[S.s] || 0] || {}).n === "High Elf" ||
  BG[S.b][4].startsWith("Magic Initiate");
function steps() {
  return `<div class="p"><div class="k">Character creation</div><div class="bar"><i style="width:${(S.t / 5) * 100}%"></i></div><div class="st">${ST.map(
    (n, i) => {
      const k = i + 1,
        off = k == 4 && !hasSp();
      return `<button class="s ${k == S.t ? "on" : k < S.t ? "dn" : ""} ${off ? "off" : ""}" data-st="${k}" ${off ? "disabled" : ""} title="${off ? "No spell choices for this combination" : n}"><b>${off ? "–" : k}</b>${n}</button>`;
    },
  ).join("")}</div></div>`;
}
function keep() {
  const n = document.querySelector(".cl");
  return n ? n.scrollTop : 0;
}
function bg() {
  const b = BG[S.b],
    y = keep();
  $("v").innerHTML =
    `<div class="stage"><div class="col" style="align-items:center">${steps()}<div class="cl">${BG.map((q, i) => `<div class="ci ${i == S.b ? "on" : ""}" data-i="${i}" title="${q[0]}">${q[1]}</div>`).join("")}</div></div>
<div class="hero">${ch(look())}<div class="badge">${b[1]}</div></div>
<div class="col"><div class="p"><div class="k">Background</div><h2>${b[0]}</h2><p>${b[2]}</p><div class="k">Ability scores · +2/+1 or +1/+1/+1</div><div class="boxes" style="grid-template-columns:repeat(3,1fr)">${b[3].map((a) => box(a, "Ability", "#f3c26b")).join("")}</div>
<ul class="tr" style="max-height:none"><li><b>Origin Feat</b> · ${b[4]}</li><li><b>Skills</b> · ${b[5].join(", ")}</li><li><b>Tool</b> · ${b[6]}</li></ul><button class="cta" id="pk">Choose ${b[0]}</button></div></div></div>
<div class="rail"><button class="nav" id="pv">◀ Prev</button><button class="nav" id="nx">Next ▶</button></div>`;
  document.querySelector(".cl").scrollTop = y;
  document.querySelectorAll(".ci").forEach(
    (q) =>
      (q.onclick = () => {
        S.b = +q.dataset.i;
        bg();
      }),
  );
  $("pv").onclick = () => go(-1);
  $("nx").onclick = () => go(1);
  $("pk").onclick = () => {
    S.p.bg = b[0];
    S.t = 3;
    rd();
    sm();
  };
}
function cl() {
  const c = CL[S.c],
    f = F[c[0]],
    y = keep(),
    [die, role] = c[4].split(" · ");
  $("v").innerHTML =
    `<div class="stage"><div class="col" style="align-items:center">${steps()}<div class="cl">${CL.map((q, i) => `<div class="ci ${i == S.c ? "on" : ""}" data-i="${i}" title="${q[0]}">${q[1]}</div>`).join("")}</div></div>
<div class="hero">${ch(look(S.s, c[5]))}<div class="badge">${c[1]}</div></div>
<div class="col"><div class="p"><div class="k">${role}</div><h2>${c[0]}</h2><div class="pill">Hit Point Die: ${die.toUpperCase()}</div><p>${c[2]}</p>
<div class="k">Class features</div><div class="ft">${f.map((t) => `<div class="fi ${t[0] > S.lv ? "lk" : ""}" tabindex="0"><span>${t[1]}</span><div class="tip"><b>${t[2]}</b><em>Level ${t[0]}</em>${t[3]}</div></div>`).join("")}</div>
<div class="k">Recommended stat distribution</div><div class="rings">${AB.map((a) => rg(a, c)).join("")}</div>
<div class="row"><div class="lvl"><button id="lm">−</button><span>Level ${S.lv}</span><button id="lp">+</button></div><button class="nav" id="lu">View level up traits</button></div>
<button class="cta" id="pk">Choose ${c[0]}</button></div></div></div>
<div class="rail"><button class="nav" id="pv">◀ Prev</button><button class="nav" id="nx">Next ▶</button></div>`;
  document.querySelector(".cl").scrollTop = y;
  document.querySelectorAll(".ci").forEach(
    (q) =>
      (q.onclick = () => {
        S.c = +q.dataset.i;
        cl();
      }),
  );
  $("lm").onclick = () => {
    S.lv = Math.max(1, S.lv - 1);
    cl();
  };
  $("lp").onclick = () => {
    S.lv = Math.min(12, S.lv + 1);
    cl();
  };
  $("lu").onclick = () => {
    $("m2t").textContent = c[0] + " · Level-up traits";
    $("m2b").innerHTML = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      .map((l) => {
        const g = f
          .filter((t) => t[0] == l)
          .map((t) => `<li>${t[1]} <b>${t[2]}</b> · ${t[3]}</li>`);
        if ([4, 8, 12].includes(l))
          g.push(
            "<li>📈 <b>Ability Score Improvement</b> · +2 to one score, +1 to two, or take a feat.</li>",
          );
        if (l == 5 || l == 9)
          g.push(`<li>🎓 <b>Proficiency Bonus +${l == 5 ? 3 : 4}</b></li>`);
        return `<div class="lr ${l <= S.lv ? "on" : ""}"><b>Level ${l}</b><ul>${g.join("")}</ul></div>`;
      })
      .join("");
    $("m2").classList.add("on");
  };
  $("pv").onclick = () => go(-1);
  $("nx").onclick = () => go(1);
  $("pk").onclick = () => {
    S.p.cl = c[0];
    sm();
    S.t = hasSp() ? 4 : 5;
    rd();
  };
}
function go(d) {
  if (S.t > 3) return;
  if (S.t == 1) {
    S.s = (S.s + d + SP.length) % SP.length;
    sp();
  } else if (S.t == 2) {
    S.b = (S.b + d + BG.length) % BG.length;
    bg();
  } else {
    S.c = (S.c + d + CL.length) % CL.length;
    cl();
  }
}
function all() {
  $("gr").innerHTML = SP.map(
    (q, i) =>
      `<button class="tile ${i == S.s ? "on" : ""}" data-i="${i}">${ch(look(i), "40 30 220 220")}${q.n}</button>`,
  ).join("");
  document.querySelectorAll(".tile").forEach(
    (t) =>
      (t.onclick = () => {
        S.s = +t.dataset.i;
        $("m").classList.remove("on");
        sp();
      }),
  );
  $("m").classList.add("on");
}
function sm() {
  $("sum").innerHTML =
    `Your hero: <b>${S.p.sp || "…"}</b> · <b>${S.p.bg || "…"}</b> · <b>${S.p.cl || "…"}</b>${((n) => (n ? ` · <b>${n} spells</b>` : ""))(Object.values(S.sel).flat().length)}`;
}
function rd() {
  S.t == 1
    ? sp()
    : S.t == 2
      ? bg()
      : S.t == 4
        ? spl()
        : S.t == 5
          ? abl()
          : cl();
}
$("x2").onclick = () => $("m2").classList.remove("on");
$("v").addEventListener("click", (e) => {
  const b = e.target.closest("[data-st]");
  if (b && !b.disabled) {
    S.t = +b.dataset.st;
    rd();
  }
});
$("x").onclick = () => $("m").classList.remove("on");
const AN2 = {
    STR: ["Strength", "Athletics · melee power"],
    DEX: ["Dexterity", "Acrobatics, Stealth · AC"],
    CON: ["Constitution", "Hit points · concentration"],
    INT: ["Intelligence", "Arcana, History · lore"],
    WIS: ["Wisdom", "Perception, Insight"],
    CHA: ["Charisma", "Persuasion, Deception"],
  },
  COST = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
const spent = () => AB.reduce((t, a) => t + COST[S.ab.s[a]], 0);
function bon() {
  const o = S.ab,
    L = BG[S.b][3];
  if (!L.includes(o.p2)) o.p2 = L[0];
  if (!L.includes(o.p1) || o.p1 == o.p2) o.p1 = L.find((a) => a != o.p2);
  return (a) =>
    o.m == 111 ? +L.includes(a) : a == o.p2 ? 2 : a == o.p1 ? 1 : 0;
}
const pri = () => {
  const r = [...CL[S.c][3], "CON", "DEX", "WIS", "CHA", "INT", "STR"];
  return r.filter((a, i) => r.indexOf(a) == i);
};
function abl() {
  const o = S.ab,
    y = scrollY,
    b = bon(),
    L = BG[S.b][3],
    left = 27 - spent(),
    c = CL[S.c],
    fin = (a) => o.s[a] + b(a),
    md = (a) => Math.floor((fin(a) - 10) / 2),
    sg = (n) => (n >= 0 ? "+" : "") + n,
    hp = +c[4].split(" · ")[0].slice(1) + md("CON");
  const row = (a) => {
    const k = c[3].indexOf(a);
    return `<div class="ar ${k >= 0 ? "rec" : ""}"><div><b>${AN2[a][0]}</b><small>${AN2[a][1]}</small>${k >= 0 ? `<em>${k ? "Recommended · Support" : "Recommended · Primary"}</em>` : ""}</div><div class="sp"><button data-a="${a}" data-d="-1" ${o.s[a] <= 8 ? "disabled" : ""}>−</button><span>${o.s[a]}</span><button data-a="${a}" data-d="1" ${o.s[a] >= 15 || COST[o.s[a] + 1] - COST[o.s[a]] > left ? "disabled" : ""}>+</button></div><div class="bn">${b(a) ? "+" + b(a) : ""}</div><div class="fv"><b>${fin(a)}</b><small>${sg(md(a))}</small></div></div>`;
  };
  const ch2 = (k, a) =>
    `<button class="chip ${o["p" + k] == a ? "on" : ""}" data-p="${k}:${a}">${a}</button>`;
  $("v").innerHTML = `<div class="stage"><div class="col">${steps()}
<div class="p"><div class="k">Points remaining</div><div class="pips">${Array.from({ length: 27 }, (_, i) => `<i class="${i < 27 - left ? "u" : ""}"></i>`).join("")}</div><div class="note"><b style="color:var(--g)">${left}</b> of 27 · scores range 8–15 before bonuses</div></div>
<div class="p"><div class="k">${BG[S.b][0]} bonus</div><div class="chips"><button class="chip ${o.m == 21 ? "on" : ""}" data-m="21">+2 / +1</button><button class="chip ${o.m == 111 ? "on" : ""}" data-m="111">+1 / +1 / +1</button></div>${o.m == 21 ? `<div class="note">+2 to</div><div class="chips">${L.map((a) => ch2(2, a)).join("")}</div><div class="note">+1 to</div><div class="chips">${L.map((a) => ch2(1, a)).join("")}</div>` : `<div class="note">+1 to ${L.join(", ")}</div>`}</div></div>
<div class="hero">${ch(look(S.s, c[5]))}<div class="badge">${c[1]}</div></div>
<div class="col"><div class="p"><div class="k">Step 5 · Ability scores</div><div class="boxes" style="grid-template-columns:repeat(3,1fr)">${box(hp, "Hit points", "#e58fb6")}${box(10 + md("DEX"), "Armor class", "#f3c26b")}${box(sg(md("DEX")), "Initiative", "#9fe0d0")}</div></div>
<div class="p"><div class="row" style="margin:0 0 6px"><button class="nav" id="rc">★ Recommended for ${c[0]}</button><button class="nav" id="rs">Reset</button></div>${AB.map(row).join("")}<button class="cta" id="pk">${S.p.ab ? "✔ Scores saved" : "Confirm ability scores"}</button></div></div></div>`;
  document.querySelectorAll("[data-d]").forEach(
    (e) =>
      (e.onclick = () => {
        o.s[e.dataset.a] += +e.dataset.d;
        S.p.ab = 0;
        abl();
      }),
  );
  document.querySelectorAll("[data-m]").forEach(
    (e) =>
      (e.onclick = () => {
        o.m = +e.dataset.m;
        S.p.ab = 0;
        abl();
      }),
  );
  document.querySelectorAll("[data-p]").forEach(
    (e) =>
      (e.onclick = () => {
        const [k, a] = e.dataset.p.split(":");
        if (k == 2) o.p2 = a;
        else {
          if (a == o.p2) o.p2 = o.p1;
          o.p1 = a;
        }
        S.p.ab = 0;
        abl();
      }),
  );
  $("rc").onclick = () => {
    const T = [15, 14, 13, 12, 10, 8],
      P = pri(),
      best = P.filter((a) => L.includes(a));
    P.forEach((a, i) => (o.s[a] = T[i]));
    o.m = 21;
    o.p2 = best[0];
    o.p1 = best[1];
    S.p.ab = 0;
    abl();
  };
  $("rs").onclick = () => {
    AB.forEach((a) => (o.s[a] = 8));
    S.p.ab = 0;
    abl();
  };
  $("pk").onclick = () => {
    S.p.ab = 1;
    abl();
  };
  scrollTo(0, y);
}
let lk = 0;
addEventListener(
  "wheel",
  (e) => {
    if (lk || !e.target.closest(".hero,.strip")) return;
    if (Math.abs(e.deltaY) > 40) {
      lk = 1;
      go(e.deltaY > 0 ? 1 : -1);
      setTimeout(() => (lk = 0), 300);
    }
  },
  { passive: true },
);
addEventListener("keydown", (e) => {
  if (e.key == "ArrowRight") go(1);
  if (e.key == "ArrowLeft") go(-1);
});
rd();
