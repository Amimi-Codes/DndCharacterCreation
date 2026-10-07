// spellManager.js: spell selection page logic
function srcs() {
  const c = CL[S.c][0],
    a = [],
    m = /Magic Initiate \((\w+)\)/.exec(BG[S.b][4]);
  if (SC[c])
    a.push({ k: c, t: c + " spells", w: SC[c][0], c: SC[c][1], s: SC[c][2] });
  if (m)
    a.push({
      k: "MI",
      t: "Magic Initiate · " + m[1],
      w: { Cleric: "C", Druid: "D", Wizard: "W" }[m[1]],
      c: 2,
      s: 1,
    });
  if ((SP[S.s].L[S.l[S.s] || 0] || {}).n === "High Elf")
    a.push({ k: "HE", t: "High Elf cantrip", w: "W", c: 1, s: 0 });
  return a;
}
function spl() {
  const A = srcs(),
    a = A[Math.min(S.sk, A.length - 1)],
    y = scrollY,
    lim = [a.c, a.s],
    sel = (S.sel[a.k] || []).filter((n) =>
      SPL.some((x) => x[0] == n && x[2].includes(a.w)),
    );
  S.sel[a.k] = sel;
  const lv = (n) => SPL.find((x) => x[0] == n)[1],
    cnt = (l) => sel.filter((n) => lv(n) == l).length,
    ic = (i, t, c = "") => `<span class="ic ${c}" data-t="${t}">${i}</span>`;
  const list = SPL.filter(
    (x) =>
      x[2].includes(a.w) && lim[x[1]] > 0 && (S.sf == "all" || x[6] == S.sf),
  );
  const card = (x) => {
    const on = sel.includes(x[0]),
      r =
        x[3] == "Self"
          ? ["🧍", "Self"]
          : x[3] == "Touch"
            ? ["🤜", "Melee · Touch"]
            : ["🏹", "Ranged · " + x[3]];
    return `<div class="sc ${on ? "on" : ""} ${!on && cnt(x[1]) >= lim[x[1]] ? "full" : ""}" data-n="${x[0]}"><div class="sh"><b>${x[0]}</b><em>${x[1] ? "Level 1" : "Cantrip"}</em></div><div class="ics">${ic(r[0], r[1])}${x[4] ? ic(EL[x[4]], cap(x[4]) + " element") : ""}${x[5] ? ic("🎲 " + x[5], x[6] == "heal" ? "Healing dice" : "Damage / effect dice", "d") : ""}${ic(TY[x[6]], cap(x[6]))}${x[7] ? ic("🌀", "Concentration") : ""}</div><p>${x[11]}</p><div class="inf">⏱ ${x[8]} · 🎯 ${x[9]} · ⌛ ${x[10]}</div></div>`;
  };
  $("v").innerHTML =
    `<div class="spw"><div class="col">${steps()}<div class="p" style="text-align:center"><div style="width:170px;margin:0 auto">${ch(look(S.s, CL[S.c][5]), "40 30 220 220")}</div><div class="k">${a.t}</div><p style="margin-top:8px">${sel.length ? sel.join(" · ") : "Pick your spells →"}</p></div></div>
<div class="p"><div class="chips">${A.map((q, i) => `<button class="chip ${q === a ? "on" : ""}" data-sk="${i}">${q.t}</button>`).join("")}</div><div class="row" style="margin:0"><span class="pill">Cantrips ${cnt(0)}/${a.c}</span><span class="pill">Level 1 spells ${cnt(1)}/${a.s}</span></div>
<div class="chips">${["all", "attack", "heal", "support", "defense", "control", "utility"].map((t) => `<button class="chip ${S.sf == t ? "on" : ""}" data-sf="${t}">${t == "all" ? "All" : TY[t] + " " + cap(t)}</button>`).join("")}</div><div class="sg">${list.map(card).join("")}</div><button class="cta" id="go5">Continue to ability scores ▶</button></div></div>`;
  document.querySelectorAll(".sc").forEach(
    (e) =>
      (e.onclick = () => {
        const n = e.dataset.n,
          i = sel.indexOf(n);
        if (i >= 0) sel.splice(i, 1);
        else if (cnt(lv(n)) < lim[lv(n)]) sel.push(n);
        spl();
        sm();
      }),
  );
  document.querySelectorAll("[data-sk]").forEach(
    (b) =>
      (b.onclick = () => {
        S.sk = +b.dataset.sk;
        spl();
      }),
  );
  document.querySelectorAll("[data-sf]").forEach(
    (b) =>
      (b.onclick = () => {
        S.sf = b.dataset.sf;
        spl();
      }),
  );
  $("go5").onclick = () => {
    S.t = 5;
    rd();
  };
  scrollTo(0, y);
}
