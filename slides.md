<!-- .slide: class="title-slide" data-session="none" -->

# Notes from the Energy Innovation Summit 2026

<p class="subtitle">Daniel Hjertholm</p>

---

<!-- .slide: class="content-slide intro-slide" data-session="none" -->

<div class="cols cols-media cols-media-portrait">
<div>

<p class="eyebrow">General</p>

## Energy Innovation Summit 2026

- Organized by Gurobi and Empa (The Swiss Federal Laboratories for Materials Science and Technology)
- Focus on optimization utilized on energy systems
- 222 attendees (TSOs, utilities, BSPs, traders)
- Framing: Volatility requires optimization. Opportunity, not just something to manage / tame.
- Why? Need for fast decisions (e.g. dispatch).
- Day 1: Energy first. Day 2: Optimization first.

</div>
<div>

<img class="slide-image" src="assets/img/img-0706.jpg" alt="Photograph of a banner in the auditorium.">

</div>
</div>

---

<!-- .slide: class="talk-title-slide" data-session="d1-welcome" -->

<p class="eyebrow">Welcome</p>

# Welcome: Context Setting, Housekeeping, and Gurobi and Empa Team Presentation

<p class="speakers">
Tim Reintgen, Gurobi, Account Manager Power &amp; Utilities EME<br>
Georgios Mavromatidis, Empa, Head of Urban Energy Systems Laboratory
</p>

---

<!-- .slide: class="content-slide" -->

- Need to adapt to changes.
- Interdisciplinary.

---

<!-- .slide: class="talk-title-slide" data-session="d1-tso-dso" -->

<div class="cols cols-media">
<div>

<p class="eyebrow">Keynote</p>

# TSO-DSO Coordination: Unlocking Grid and System Value from Distributed Flexibility

<p class="speakers">
Raphael Wu, Swissgrid, Principal Specialist Market Strategy
</p>

</div>
<div>

<img class="slide-image" src="assets/img/img-0708.jpg" alt="Photograph of the keynote title in the auditorium.">

</div>
</div>

---

<!-- .slide: class="content-slide" -->

Flexibility increasingly comes from the distribution grid.

---

<!-- .slide: class="content-slide" -->

<div class="cols cols-media cols-media-portrait">
<div>

How to optimise across these use cases?

</div>
<div>

<img class="slide-image" src="assets/img/image-18.jpg" alt="Photograph of a slide projected during the talk.">

</div>
</div>

---

<!-- .slide: class="content-slide" -->

<div class="cols cols-media">
<div>

- Project where DSO, TSO and BSPs look for opportunities to cooperate.
- Solution takes constraints both from DSO and TSO into account.
- DSO main buyers of flexibility in Switzerland.

</div>
<div>

<img class="slide-image" src="assets/img/image-20.jpg" alt="Photograph of a slide projected during the talk.">

</div>
</div>

---

<!-- .slide: class="content-slide" -->

- DSOs provide sensitivities at the transformer where they connect to the transmission grid.
- Quite classical optimisation, but with a little extra aggregation of local flexibility.
- 2 stage. What is not used locally goes on to a larger market where Swissgrid trades.

---

<!-- .slide: class="content-slide" -->

<div class="cols cols-media">
<div>

Have working groups!

<p class="eyebrow">Questions</p>

- Do DSOs have access to mFRR EAM in Norway? Do they use other, more local markets?
- Is this mFRR, aFRR or something else? → Just like tertiary, but something slightly different.
- Are DSOs already making use of flexibility?
- Talks about Statnett's variant. More one-way.

</div>
<div>

<img class="slide-image" src="assets/img/img-0710.jpg" alt="Photograph of a slide projected during the talk.">

</div>
</div>

---

<!-- .slide: class="content-slide" -->

<div class="cols cols-media">
<div>

<p class="eyebrow">A completely different project</p>

### Questions

- Tertiary reserves?
- Said "control energy". For congestion management purposes or balance.

</div>
<div>

<img class="slide-image" src="assets/img/image-21.jpg" alt="Photograph of a slide projected during the talk.">

</div>
</div>

---


<!-- .slide: class="content-slide surrogate-slide" data-session="d1-surrogate-models" -->

<div class="cols cols-media">
<div>

<p class="eyebrow">Technology Layer</p>

## Embedded Surrogate Models for Real-Time Optimization of Industrial Energy Systems

<div class="info-box">

### Problem

- Optimize a larger plant / industrial site combining energy sources (CHP)
- Complex relationships: steam, heat, power generation, fuel constraints, emission limits, etc.
- Continuous optimal setpoints (fuel cost, electricity cost, steam demand, CO2 costs)
- All modeled in a thermodynamic simulator
- But: simulation too slow (a few seconds) for an optimization loop

</div>

</div>
<div>

<img class="slide-image" src="assets/img/image-27.jpg" alt="Photograph of a slide projected during the talk.">

</div>
</div>

---

<!-- .slide: class="content-slide surrogate-slide" -->

<div class="cols cols-media">
<div>

<p class="eyebrow">Technology Layer</p>

<div class="info-box">

### Solution

- Train neural nets on each modeled component, from simulator-generated synthetic data (surrogate model)
- With ReLU, the NN is piecewise linear
- Turn model into constraints in an optimization model
- Plant setpoints (CHP load, boiler operation, grid import / export) → decision variables
- Add business constraints (CO2 emissions, etc.)
- Add objective (maximize electricity revenue, minimize CO2 costs, etc.)
- Solve!

Free side effects:

- Other uses. Seconds → milliseconds. As accurate as the simulation
- Can be tweaked when real equipment drifts
- Anomaly detection

</div>

</div>
<div>

<img class="slide-image" src="assets/img/image-27.jpg" alt="Photograph of a slide projected during the talk.">

</div>
</div>

---

<!-- .slide: class="content-slide takeaways-slide" data-session="summary-takeaways" -->

<p class="eyebrow">Summary</p>

## My takeaways

### What I saw at the summit

- Many have similar challenges to Statnett => get inspiration
- "Everything" can be seen as optimization. Not from the marketing people, but from the technical people, who were almost tripping over each other to say "but you can solve that more simply with optimization".
- Insatiable demand for optimization. As the tools get better, actors find new ways to fill the extra capacity.
- Lots of focus on portfolio management.
- Variability in solve time is very often just due to randomness. Compare data variability against seed variability before concluding that the data is the cause.

---

<!-- .slide: class="content-slide takeaways-slide" -->

<p class="eyebrow">Summary</p>

## My takeaways

### For Statnett

- Several people asked me how transparent Statnett is. Strong wish from market participants for more info about the state of the power system, incl. bottlenecks and capacities.
- Go to more conferences with other TSOs or other actors in the power industry.
