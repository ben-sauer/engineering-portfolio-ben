---
title: "Rail suspension dynamics"
summary: "A seven-degree-of-freedom railcar model for investigating vibration response and skyhook semi-active suspension control."
discipline: "Dynamics / Simulation / Controls"
period: "December 2025–March 2026"
role: "Model development, simulation, and control design"
tools: ["Python", "State-space modeling", "Modal analysis", "Skyhook control"]
order: 2
featured: true
cover: "images/projects/rail/all3_labeled.png"
coverAlt: "Simulated response of multibody railcar system. Displaying carbody bounce, pitch, and roll."
coverFit: "contain"
media:
  - src: "images/projects/rail/half_car_view.png"
    alt: "Hand-drawn sketch of lumped-element model from half-car perspective"
    caption: "Hand-drawn sketch of lumped-element model from half-car perspective"
  - src: "images/projects/rail/lateral_view.png"
    alt: "Hand-drawn sketch of lumped-element model from lateral perspective"
    caption: "Hand-drawn sketch of lumped-element model from lateral perspective"
  - src: "images/projects/rail/carbody_accel.png"
    alt: "Original railcar response plot without skyhook control. Notice chaotic and high frequency oscillation"
    caption: "Railcar response without skyhook control. Notice the irregularity and chaotic nature of oscillation. This is for a stochastic input based on realistic rail roughness patterns."
  - src: "images/projects/rail/skyhook_carbody_accel.png"
    alt: "Carbody bounce response plot with skyhook control"
    caption: "Skyhook-controlled carbody response. Notice reduction in frequency of oscillation."
downloads:
  - label: "Model diagrams, equations of motion, and matrices (PDF)"
    href: "documents/rail-model-derivations.pdf"
  - label: "Full model and matrix assembly source (Python)"
    href: "code/rail-model.py"
---
## Engineering problem

With the emergence of high-speed rail projects on the US West Coast, this project develops a reduced-order framework for analyzing railcar suspension dynamics and ride comfort. Railcars tend to experience more vibrational disturbances from their track and environment the faster they move, hence the importance of defining smarter suspension systems.

The model focuses on vertical motion, roll, and pitch. Track disturbances act as inputs rather than as a separate dynamic system.

## My contribution

- Derived multi-degree-of-freedom equations of motion and a state-space representation.
- Developed a Python simulation for step disturbances and stochastic track inputs.
- Analyzed mode shapes and transient response.
- Designed skyhook semi-active suspension control.

## Model and assumptions

The seven degrees of freedom describe carbody bounce, roll, and pitch, plus bounce and roll for each of the two bogies. The mass, stiffness, and damping matrices connect these motions in the lumped-parameter model. State-space representation is used to solve for motion in Python.

The geometry and mass assumptions were based on a published simplified description of the AVE S-103 / ICE3 Velaro E. These are model inputs, rather than measurements of an actual train.

The model treats the carbody as rigid and excludes explicit wheel–rail contact dynamics, structural flexibility, lateral translation, and yaw.

## State-space formulation

The Python model assembles the system around the following coordinate order:

```text
q = [z_c, φ_c, θ_c, z_b1, φ_b1, z_b2, φ_b2]ᵀ
```

Here, `z` denotes vertical displacement, `φ` roll, and `θ` pitch. The subscripts identify the carbody (`c`), front bogie (`b1`), and rear bogie (`b2`).

Stacking the seven coordinates and their velocities gives the **14-state vector** `x = [qᵀ, q̇ᵀ]ᵀ`. The **eight-input vector** `u = [z_gᵀ, ż_gᵀ]ᵀ` contains track displacements and velocities, ordered front-left, front-right, rear-left, and rear-right within each group.

<div class="state-space-equations">
  <math display="block" aria-label="State derivative equals A times the state vector plus B times the input vector"><mrow><mover><mi>x</mi><mo>˙</mo></mover><mo>=</mo><mi>A</mi><mi>x</mi><mo>+</mo><mi>B</mi><mi>u</mi></mrow></math>
  <div class="state-matrix-row">
    <math display="block" aria-label="A equals the block matrix: zero, identity; negative inverse mass times stiffness, negative inverse mass times damping"><mrow><mi>A</mi><mo>=</mo><mo>[</mo><mtable rowspacing="0.7em" columnspacing="1em"><mtr><mtd><mn>0</mn></mtd><mtd><mi>I</mi></mtd></mtr><mtr><mtd><mo>−</mo><msup><mi>M</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>K</mi></mtd><mtd><mo>−</mo><msup><mi>M</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><mi>C</mi></mtd></mtr></mtable><mo>]</mo></mrow></math>
    <math display="block" aria-label="B equals the block matrix: zero, zero; inverse mass times track displacement input matrix, inverse mass times track velocity input matrix"><mrow><mi>B</mi><mo>=</mo><mo>[</mo><mtable rowspacing="0.7em" columnspacing="1em"><mtr><mtd><mn>0</mn></mtd><mtd><mn>0</mn></mtd></mtr><mtr><mtd><msup><mi>M</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><msub><mi>G</mi><mi>z</mi></msub></mtd><mtd><msup><mi>M</mi><mrow><mo>−</mo><mn>1</mn></mrow></msup><msub><mi>G</mi><mover><mi>z</mi><mo>˙</mo></mover></msub></mtd></mtr></mtable><mo>]</mo></mrow></math>
  </div>
</div>

`M`, `C`, and `K` are the 7 × 7 mass, damping, and stiffness matrices. The 7 × 4 matrices `G_z` and `G_z_dot` map track displacement and velocity into the generalized forces through the primary suspension. This produces a **14 × 14 state matrix A** and a **14 × 8 input matrix B**.

The damping assembly accepts the four secondary-suspension damping coefficients as arguments, allowing the damping matrix—and consequently the state matrix—to be rebuilt with different damping values.

### From matrices to Python

These excerpts from the model show how NumPy stacks the physical matrices into the state-space system:

```python
# Inside assemble_A_matrix():
Z = np.zeros_like(M_inv)
I = np.eye(M_inv.shape[0])

A_top = np.hstack((Z, I))
A_bottom = np.hstack((-M_inv @ K, -M_inv @ C))
A = np.vstack((A_top, A_bottom))

# Inside assemble_B_matrix():
G = np.hstack((G_z, G_z_dot))
Z = np.zeros((7, 8))
B_bottom = M_inv @ G
B = np.vstack((Z, B_bottom))
```

The full model source is available under **Resources**, including the parameters and individual entries of the mass, damping, stiffness, and track-input matrices.

## Analysis and control

Modal analysis identified a carbody bounce mode near 0.75 Hz. The simulation examined transient behavior and the response to rough-track input, with RMS carbody acceleration used as a measure of vibration response.

Skyhook control was applied to the secondary suspension damping element. The aim was to reduce carbody motion by varying the damping behavior rather than replacing the suspension with a purely actuator-driven system.

## Results

The project achieved a **17.4% reduction in RMS carbody acceleration** with skyhook semi-active control, as reported in my project summary.

The original response plots appear in the gallery below. They retain the plotting conventions used during development, including the general displacement/angular-displacement axis label.

## Limitations and next steps

The result applies to this simplified simulation. It does not constitute physical testing or certification of a rail suspension system.

Further documentation can expand the comparison conditions, frequency-weighted acceleration analysis, and suspension-travel tradeoffs. CAD-based refinement of the geometric assumptions was identified in the project scope as a future step.
