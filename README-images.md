# Builtraa HR Management — Image Workflow Guide

This guide explains how to add or update module screenshots in the deck.

---

### Step 1: Save the Original Screenshot
Save your screenshot into `public/assets/originals/` using the exact module slug:

- `hr-dashboard.png`
- `employees.png`
- `leave.png`
- `payroll.png`
- `attendance.png`
- `loan.png`
- `salary-increment.png`
- `salary-discrepancy.png`
- `disciplinary-action.png`
- `ticket-management.png`
- `digital-forms.png`
- `clearance-form.png`
- `employee-rejoining.png`
- `report.png`
- `meeting-arrangements.png`
- `audit-logs.png`
- `payroll-settings.png`

---

### Step 2: Define the 16:10 Crop in `src/data/crops.json`
Add or update the entry in `src/data/crops.json` with the crop coordinates in original pixels (aspect ratio **16:10**, e.g. `1024 × 640` or `1600 × 1000`):

```json
{
  "disciplinary-action": {
    "source": "public/assets/originals/disciplinary-action.png",
    "x": 0,
    "y": 0,
    "w": 1024,
    "h": 640
  }
}
```

---

### Step 3: Run the Crop Script
Execute:
```bash
npm run crops
```

This automatically:
1. Generates the lossless 16:10 crop at `public/assets/crops/<slug>.png`.
2. Generates the `@2x` retina version at `public/assets/crops/<slug>@2x.png`.
3. The slide automatically displays the new screenshot filling the 16:10 frame edge-to-edge, replacing the placeholder frame.

---

### Step 4: Re-export PowerPoint & PNGs (Optional)
To update the downloadable PowerPoint deck and PNG screenshots:
```bash
npm run export:pptx
node scripts/export-png.mjs
```
