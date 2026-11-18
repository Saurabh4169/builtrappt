# Builtraa HR Management — Executive Presentation Deck (10 Slides)

An executive, consolidated presentation deck for **Builtraa – HR Management**, optimized to approximately **10 slides** using balanced 2-column layouts that combine related HR modules logically.

Built with **Vite + React + Tailwind CSS + Framer Motion**, featuring a 1920×1080 stage scaled to any screen with CSS letterboxing, dual branding (**Builtraa + UXDlab**), liquid-glass navigation controls, and comprehensive export capabilities (**PptxGenJS** and **Playwright PNG**).

---

## 🌟 Consolidation & Design Highlights

1. **Optimized 10-Slide Deck Structure:**
   - Reduced from 20 slides down to **exactly 10 slides**.
   - Standalone, high-impact Cover Slide (Slide 1).
   - Balanced 2-column layout across all content slides (Slides 2 to 10), combining two related modules per slide.
2. **All 17 HR Modules Preserved:**
   - Every single module, official name, icon, core capability, 4-step workflow, and business benefit is retained without loss of functionality.
3. **Pure Solid White Background (No Gradients):**
   - Strictly solid `#FFFFFF` background with **no gradient overlays, glows, or colored background washes** on PowerPoint and React slides.
4. **Concise, High-Impact Bullet Points:**
   - Replaced lengthy descriptions with structured, bold lead-in bullet points.
   - Removed repetitive explanations, boilerplate intros, and duplicate counters.
5. **Categorical Logical Grouping:**
   - **People & Time:** Slides 2 & 3 (HR Dashboard + Employees, Attendance + Leave)
   - **Money:** Slides 4 & 5 (Payroll + Loan, Salary Increment + Salary Discrepancy)
   - **Money & Governance:** Slide 6 (Payroll Settings + Audit Logs)
   - **Rules & Records:** Slides 7 & 8 (Disciplinary Action + Digital Forms, Clearance Form + Employee Rejoining)
   - **Support & Services:** Slide 9 (Ticket Management + Meeting Arrangements)
   - **Reports & Platform Summary:** Slide 10 (Report + Platform Value & Q&A)
6. **Embedded Speaker Notes:**
   - 2–3 sentence presenter scripts embedded directly into PowerPoint speaker notes (`slide.addNotes(...)`) and accessible in the React app via the **NOTES [N]** presenter drawer.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Live at: http://localhost:5173

# Export PowerPoint presentation (10 slides, 2-column layout, zero gradients on white)
node scripts/export-pptx.mjs
# Generates: exports/Builtraa_HR_Management_v3.pptx

# Export slide PNG screenshots
node scripts/export-png.mjs
# Generates: exports/png/slide-01.png ... slide-10.png
```

---

## 📑 10-Slide Architecture & Module Pairing

| Slide # | Category | Left Column Module | Right Column Module | Focus / Synergy |
|---|---|---|---|---|
| **01** | **Cover** | *Standalone Cover* | — | "One platform for people, time and pay." Hero Laptop & Mobile Mockup, parallax, & 17 module ticker |
| **02** | **People & Time** | **HR Dashboard** | **Employees** | Real-time operational monitoring paired with master workforce profiles |
| **03** | **People & Time** | **Attendance** | **Leave** | Automated daily presence records connected to structured leave approvals |
| **04** | **Money** | **Payroll** | **Loan** | Monthly salary disbursement integrated with automated loan repayments |
| **05** | **Money** | **Salary Increment** | **Salary Discrepancy** | Governing planned pay revisions alongside structured employee claim corrections |
| **06** | **Money & Governance** | **Payroll Settings** | **Audit Logs** | Statutory GOSI/LMRA deduction frameworks supported by an immutable audit ledger |
| **07** | **Rules & Records** | **Disciplinary Action** | **Digital Forms** | Objective workplace policy governance paired with paperless requisitions |
| **08** | **Rules & Records** | **Clearance Form** | **Employee Rejoining** | End-to-end lifecycle transitions: exit checklists & asset handovers to returning workforce |
| **09** | **Support & Services** | **Ticket Management** | **Meeting Arrangements** | Administering travel benefits & ticket costs alongside corporate meeting schedules |
| **10** | **Reports & Summary** | **Report** | **Platform Value & Q&A** | Operational reports & analytics paired with unified platform takeaways and Q&A |
