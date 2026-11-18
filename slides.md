<!-- .slide: class="title-slide" -->

<p class="eyebrow">Welcome</p>

# Finding value in volatility

<p class="subtitle">Empa welcome note</p>

<p class="meta">Day 1 · Tue 17 Nov</p>

Note:
Placeholder deck only — scaffolding, theme, and hosting. Speaker notes open with the S key.

---

<!-- .slide: class="content-slide" data-session="d1-tso-dso" -->

<p class="eyebrow">Agenda</p>

## Finding value in volatility

- Energy systems are more volatile than they used to be <!-- .element: class="fragment" -->
- That volatility is a planning problem, and an opportunity <!-- .element: class="fragment" -->
- Optimisation helps turn uncertainty into decisions <!-- .element: class="fragment" -->
- Today: models, methods, and a few open questions <!-- .element: class="fragment" -->

---

<!-- .slide: class="content-slide" -->

<p class="eyebrow">Context</p>

## Two lenses on the same problem

<div class="cols">
<div>

### The system

- Variable renewable supply
- Flexible demand and storage
- Networks that couple heat, power, and mobility

</div>
<div>

### The decisions

- When to generate, store, or shift
- How to value flexibility under uncertainty
- Where operational constraints bind

</div>
</div>

---

<!-- .slide: class="content-slide" data-session="d1-surrogate-models" -->

<p class="eyebrow">Methods</p>

## A compact formulation

A simple economic-dispatch sketch, with a power-balance constraint:

$$
\min_{g,s} \quad c^\top g
\quad \text{s.t.} \quad
\sum_i g_i + s^{\text{out}} - s^{\text{in}} = d,
\quad g^{\min} \le g \le g^{\max}
$$

```python
# Placeholder: economic dispatch with storage
model.addConstr(
    g.sum() + s_out - s_in == demand,
    name="power_balance",
)
```

---

<!-- .slide: class="title-slide closing-slide" -->

<p class="eyebrow">Thank you</p>

# Let's continue the conversation

<p class="subtitle">Gurobi × Empa · Energy Innovation Summit 2026</p>
