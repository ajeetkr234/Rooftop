# Premium Roofing Contractor Platform

A complete, production-ready enterprise web application for an architectural roofing contractor providing comprehensive residential and commercial roofing solutions:

1. **Roof Installation** (new construction and architectural framing)
2. **Roof Replacement** (100% clean tear-off, decking remediation, and manufacturer lifetime warranties)
3. **Roof Repair** (systematic leak diagnosis, storm damage, flashing rebuilds)
4. **Roof Leak Repair & Emergency Tarping** (immediate priority water intrusion triage)
5. **Roof Inspection & 4K Drone Scan** (21-point forensic envelope audit and insurance reports)
6. **Roof Maintenance** (preventive multi-point seasonal care and CAM facility agreements)
7. **Residential Roofing** (architectural dimensional shingles, standing seam metal, tile, and slate)
8. **Commercial Flat Roofing** (TPO single-ply cool roofs, EPDM rubber, and restorative silicone coatings)

Designed with **industrial craftsmanship combined with modern architectural editorial design**. Built with React 18, TypeScript, Tailwind CSS, Three.js, React Router v6, Lucide React, and a Node.js/Express backend for lead, inspection, callback, and review management.

---

## 🌟 Advanced Customer & Conversion Features

1. **📷 Real Roof Damage Photo Upload**:
   - Integrated directly into the Free Estimate form with multi-image support (up to 4 images).
   - Drag-and-drop file uploader with client-side instant image thumbnails, file size guards (<5MB), and removal controls.
   - Transmitted securely to the backend for contractor pre-inspection review.

2. **📅 Certified 21-Point Roof Inspection Booking (`/book-inspection`)**:
   - Comprehensive appointment scheduler with calendar date selection (preventing past dates) and time slots (Morning, Afternoon, Late Afternoon).
   - Option to include 4K high-resolution aerial drone scanning for steep or delicate pitches.
   - Direct persistence to backend `/api/leads/appointment` with instant booking confirmation ID.

3. **📞 30-Second Rapid Callback Dispatch Modal**:
   - Accessible site-wide via top emergency banner, navigation bar, and floating widget.
   - Collects customer phone, preferred contact window (Immediate, Morning, Afternoon, Evening), and project issue for immediate phone dispatch.
   - Persists to backend `/api/leads/callback` with offline localStorage fallback.

4. **💬 WhatsApp 1-Tap Direct Chat & Floating Action Widget**:
   - Floating speed-dial widget in the bottom corner providing instant WhatsApp chat with pre-filled inquiry text, click-to-call, callback trigger, and AI Assistant launch.

5. **🤖 AI Roofing Assistant**:
   - Smart interactive roofing guide providing NRCA-standard technical answers regarding:
     - Repair vs. replacement guidelines
     - Active water leak emergency triage protocols
     - Material comparisons (Shingles vs. Metal vs. Tile vs. TPO)
     - Average price per sq ft ranges
     - Insurance storm claim documentation
   - Features quick-prompt chips and clear disclaimers prioritizing physical on-site inspections.

6. **🗺️ Interactive Territory ZIP Code Dispatch Finder**:
   - Customers type their 5-digit ZIP or municipality to instantly verify local crew coverage, emergency dispatch response speeds, and wind-load building code standards.

7. **🛡️ Multi-Tier Warranty Comparison Matrix**:
   - Side-by-side transparent breakdown comparing Standard Minimums vs. Architectural Craftsmanship Guarantee vs. Factory-Certified Lifetime Non-Prorated Guarantees.

8. **🧮 Interactive Roof Cost & Financing Calculator**:
   - Dynamic real-time calculation based on roof footprint (1,000 to 5,000 sq ft), pitch multiplier, tear-off layers, and system choice.
   - Monthly financing breakdown (from $168/mo with 0% APR options).

9. **↔️ Interactive Before & After Transformation Slider**:
   - Split-view comparison where visitors drag a handle to inspect deteriorated roofs vs completed architectural standing-seam and dimensional shingle transformations.

10. **📐 Interactive Roof Envelope Anatomy (3D Exploded View)**:
    - 6-layer technical cross-section (CDX Decking, ASTM D1970 Ice & Water Shield, Synthetic Underlayment, Valley Armor, Class 4 Shingles, Continuous Ridge Exhaust) with contractor shortcut educational breakdowns.

11. **🔒 Operations & Lead Moderation Portal (`/admin`)**:
    - Passcode-protected contractor dashboard (Default Demo PIN: `roof2026`).
    - Dedicated tabs for:
      - **Estimates**: Includes visual thumbnail previews of uploaded damage photos; clicking any photo opens the full-screen photo lightbox modal.
      - **Inspections**: Appointment bookings with target dates, time windows, and drone scan badges.
      - **Callbacks**: Priority triage list with requested contact windows and issue scopes.
      - **Contacts**: General inquiries.
      - **Reviews**: Customer review moderation.
    - Status progression dropdowns (New, Contacted, Scheduled, Completed) and Delete actions.
    - One-click **Export to CSV** across all lead categories.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Three.js
- **Backend API**: Node.js & Express (`server/index.js`)
- **Data Persistence**: JSON-based file storage (`server/data/leads.json`)
- **Design Aesthetic**: Premium Industrial Architectural Craftsmanship (Dark Slate `#101C2C`, Warm Copper Accent `#D97736`, Warm Gray Background `#F8F7F4`)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Mode
Run both frontend and backend concurrently:
```bash
npm run dev:all
# Or run frontend only:
npm run dev
# Or run backend only:
npm run server
```

### 3. Run Tests & Linting
```bash
npm run test    # Runs 28 Vitest unit tests
npm run lint    # Runs TypeScript type-checking
npm run build   # Compiles production distribution bundle
```

### 4. Admin Portal Access
- Navigate to: `http://localhost:3000/admin`
- Enter Passcode: `roof2026` (configurable via `ADMIN_KEY` environment variable in production)

- **Routing**: React Router v6 with 14 routes and scroll restoration
- **Backend API**: Node.js & Express with rate-limiting, input sanitization, spam honeypots, and filesystem/MongoDB persistence
- **Testing**: Vitest for unit, brand integrity, and calculation testing (18/18 tests passed)

---

## 🚀 Getting Started

### 1. Installation
```bash
cd d:\Rooftop
npm install
```

### 2. Running in Development
```bash
# Run both Vite frontend and Express server concurrently
npm run dev:all
```
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Portal**: [http://localhost:3000/admin](http://localhost:3000/admin) (PIN: `roof2026`)
- **API Server**: [http://localhost:5000](http://localhost:5000)

### 3. Running Tests & Quality Checks
```bash
npm run test    # Vitest unit test suite
npm run lint    # TypeScript type check
npm run build   # Production bundle build
```
