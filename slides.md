<!-- .slide: class="title-slide" data-session="none" -->

# Notes from the 2026 Energy Innovation Summit

<p class="subtitle">Daniel Hjertholm</p>

---

<!-- .slide: class="content-slide intro-slide" data-session="none" -->

<div class="cols cols-media cols-media-portrait">
<div>

<!-- <p class="eyebrow">General</p> -->

## Energy Innovation Summit 2026

- Organized by Gurobi (optimization software company) and Empa (The Swiss Federal Laboratories for Materials Science and Technology)
- 7th Gurobi summit (some of these have been TSO-specific and/or grid-focused)
- Focus on optimization utilized on energy systems
- Presentations from both industry and academia
- Day 1: Energy first. Day 2: Optimization first.
- 222 attendees (TSOs, utilities, BSPs, traders)
- Framing: Volatility requires optimization. Opportunity, not just something to manage / tame.

</div>
<div>

<img class="slide-image" src="assets/img/img-0706.jpg" alt="Photograph of a banner in the auditorium.">

</div>
</div>

---

<!-- .slide: class="content-slide intro-slide" data-session="none" -->

<div class="cols cols-media cols-media-portrait">
<div>

<!-- <p class="eyebrow">General</p> -->

## Optimization?

- ~Gradient methods~
- ~Dynamic programming~
- ~Bayesian optimization~
- Mathematical programming / mathematical optimization


</div>
<div>

<img class="slide-image" src="assets/img/optimization.jpg" alt="Optimization venn diagram">

</div>
</div>

---

<!-- .slide: class="content-slide intro-slide" data-session="none" -->

<div class="cols cols-media cols-media-portrait">
<div>

<!-- <p class="eyebrow">General</p> -->

## Optimization?

- ~Gradient methods~
- ~Dynamic programming~
- ~Bayesian optimization~
- Mathematical programming / mathematical optimization


</div>
<div>

<img class="slide-image" src="assets/img/MILP-example.png" alt="MILP example">


</div>
</div>

---

<!-- .slide: class="talk-title-slide" data-session="d1-welcome" -->

<!-- <p class="eyebrow">Welcome</p> -->

# Welcome: Context Setting, Housekeeping, and Gurobi and Empa Team Presentation

<p class="speakers">
Tim Reintgen, Gurobi, Account Manager Power &amp; Utilities EME<br>
Georgios Mavromatidis, Empa, Head of Urban Energy Systems Laboratory
</p>

- Need to adapt to changes.
- Interdisciplinary.

---

<!-- .slide: class="content-slide tso-dso-slide" data-session="d1-tso-dso" -->

<div class="cols cols-media">
<div>

<p class="eyebrow">Keynote</p>

## TSO-DSO Coordination: Unlocking Grid and System Value from Distributed Flexibility

- Pilot project to show how TSO and DSOs can cooperate on utilizing decentralized flexibility.
- Motivation:
  - Flexibility increasingly comes from decentralized energy resources. Batteries, PV, heat pumps, EVs.
  - Shared market

</div>
<div>

<img class="slide-image" src="assets/img/image-20.jpg" alt="Photograph of a projected slide showing TSO-DSO coordination at a glance.">

</div>
</div>

---

<!-- .slide: class="content-slide tso-dso-slide" data-session="d1-tso-dso" -->

<p class="eyebrow">Keynote</p>

## Refresher on how Norway does this (👌🧂)

- DSOs purchase flexibility through EuroFlex on NODES platform. Only for congestions / voltage, not balance.
- Leftovers can be (automatically?) offered on the mFRR EAM market.
- Nordic Libra uses mFRR only, not EuroFlex products
- Statnett manages congestion in transmission and regional grid only (ABOT ignores constraints on components below a certain voltage level).

---

<!-- .slide: class="content-slide tso-dso-slide" data-session="d1-tso-dso" -->

<div class="cols cols-media">
<div>

<p class="eyebrow">Keynote</p>

## Market

- One joint TSO-DSO flexibility market
- Pay-as-bid preferred
- Two products
  - Power increase / decrease (completely new, mFRR-like)
  - Power limitation (e.g. limit an EV bus charger to 10 kW even though it was pre-qualified as flex up to 25 kW)
- Both products have activation and reservation markets (🤯)
- Products can be linked (mutually exclusive)
- DSOs define local market areas with: registered resources; interface node (transformer to transmission); neighbouring local areas; load flow sensitivities (LFS).


</div>

</div>
<div>

<img class="slide-image" src="assets/img/TSO-DSO-products.jpg" alt="">

</div>
</div>

---

<!-- .slide: class="content-slide" -->

<p class="eyebrow">Keynote</p>

## Clearing and optimization

2-stage clearing:

- Stage 1:
  - A DSO submits a limitation request at a specific connection point
  - Matched with limitation bids at that point
- Stage 2:
  - Increase/decrease requests from all SOs (TSO and DSOs) are matched with increase/decrease bids
  - Respects mutual exclusivity
  - net position limits and the  between a resource's limitation bid and its opposite-direction increase/decrease bid.

Settlement: It's complicated …

---

<!-- .slide: class="content-slide" -->

<p class="eyebrow">Keynote</p>

## Takeaways

- Talk together! Create working groups (direct encouragement from the presenter)
- Keep it simple

---

<!-- .slide: class="content-slide surrogate-slide" data-session="d1-surrogate-models" -->

<div class="cols cols-media">
<div>

<p class="eyebrow">Technology Layer</p>

## Embedded Surrogate Models for Real-Time Optimization of Industrial Energy Systems

<div>

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

<div>

### Solution

- Train neural nets on each modeled component, from simulator-generated synthetic data (surrogate model)
- With ReLU, the NN is piecewise linear
- Turn model into constraints in an optimization model
- Plant setpoints (CHP load, boiler operation, grid import / export) → decision variables
- Add business constraints (CO2 emissions, etc.)
- Add objective (maximize electricity revenue, minimize CO2 costs, etc.)
- Solve!

</div>

```plaintext
                                                             Business constraints
                                                                       v
Simulation ---> Neural nets ---> Physical constraints ---> optimization of setpoints
                                                                       ^
                                                              Business objectives
```

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

### Free side effects

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
