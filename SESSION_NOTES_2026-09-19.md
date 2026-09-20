# Session Notes — September 19, 2026

## Scope

Replaced the placeholder evidence area on the Sama's Sleepytime Stories case study with real production materials from `H:\Jacie and the magic shovel`.

## Changes

- Added a muted looping cover for the published YouTube episode `y6QI_EUX_GE`.
- Kept a finished episode frame visible until YouTube confirms real playback, so the cover never becomes a dead black player when autoplay or embedding is blocked.
- Added six optimized portfolio images showing the production chain:
  - Jacie character direction
  - Sama's recurring host design
  - nighttime cottage world reference
  - magic shovel prop reference
  - Hidden Garden finished frame
  - Whispering Woods finished frame
- Replaced all three "reserved" evidence placeholders with captioned production proof.
- Added responsive proof-gallery and video-cover styles.
- Added a public-safe excerpt of the production system from `JACIES STORY AI TEMPLATE`:
  - 30–40-scene story architecture with 7–10-second narration targets
  - separation of character identity from scene composition
  - separate motion prompts for performance, object movement, and camera behavior
- Kept the full story and prompt library off the public page to protect the working material and avoid overwhelming reviewers.
- Added two new workflow screenshots captured by Terrance:
  - the CapCut timeline as proof of scene assembly, narration, ambience, music, and final editorial work
  - the Claude multi-assistant plan, explicitly labeled as an agent blueprint rather than completed autonomous production
- Added a complete lip-sync quality-control example from `Graphic assets\morphing`:
  - documented the visible character and prop drift across the failed generation
  - showed the corrected isolated Sama layer as a looping video
  - explained the three-part fix: isolate the character, add negative prompts, and composite the cloud afterward

## Verification

- Confirmed the case-study page, updated CSS and JavaScript, and all six media files return HTTP 200 locally.
- Confirmed the updated JavaScript passes Node syntax checking.
- Visually checked the cover fallback and desktop evidence gallery.
- Kept audience claims separate from production proof.

## Source archive

`H:\Jacie and the magic shovel\Graphic assets` and its related project folders remain the source of truth for original production files. The website stores optimized copies only.

## Portfolio card covers and Pocket Spades proof

- Replaced the abstract color panels on all four AI portfolio cards with optimized project imagery:
  - live BuildCast product screen
  - live Pocket Spades mode-selection screen
  - live Eligo story-room screen
  - the Sama's Sleepytime Stories title frame supplied by Terrance
- Preserved the large two-letter project marks over the imagery, including `SS` on the Sama card.
- Replaced the abstract Pocket Spades case-study cover with the live playable build.
- Replaced all Pocket Spades evidence placeholders with labeled proof:
  - playable mode-selection screen
  - directed four-player table concept
  - physical card-and-pocket prototype
  - promotional brand art
- Added three documented quality-control cases:
  - 11 sandbags incorrectly resolving to 4 Pocket Books; clarified as 2 complete books plus 3 remaining sandbags and protected with a regression test
  - Pocket cards remaining hidden at round results; corrected to reveal the full Pocket after play
  - mobile table collisions found through real-device testing; corrected through responsive repositioning and sizing
- Kept the bug screenshots explicitly labeled as observed failures so they demonstrate diagnosis and correction rather than being mistaken for the current product state.

## Verification for this update

- Confirmed the updated homepage and Pocket Spades case study render at desktop and mobile widths.
- Confirmed all seven Pocket Spades images load without broken sources.
- Confirmed the four project-card images are optimized WebP files at 1600 × 900.
- Confirmed the working tree passes the whitespace/error check before deployment.

## Pocket Spades walkthrough

- Added Terrance's published Pocket Spades walkthrough (`LZ-Kdw6gt8Y`) as the lead evidence on the case study.
- Used YouTube's privacy-enhanced embed domain and kept a direct YouTube link beneath the player.
- Positioned the video before the still-image proof so reviewers can see the working experience before reading the production and QA evidence.

## Corrected scoring proof

- Added Terrance's current round-results capture as the explicit “after” state for the privacy fix.
- The new evidence shows all four players' Pocket cards revealed, sandbags converted into groups of four, remaining sandbags identified, Pocket Books combined with table tricks, and the final score summary.
- Kept the older hidden-card results capture beside the explanation as the documented “before” state.

## Corrected phone-layout proof

- Added Terrance's current landscape-phone capture as the explicit “after” state for the mobile collision fix.
- Paired it with the earlier real-device screenshot so reviewers can compare the overlapping layout against the corrected separation of player areas, Pockets, center trick, and hand.

## Eligo live-product evidence

- Navigated the current live Eligo build independently and documented the solo-story flow.
- Added six verified product states to the Eligo case study:
  - Story Room with daily material, Originals, session filter, and genre selection
  - the Originals shelf with premise, duration, Free/CP access, and replay framing
  - generated fantasy opening with chapter and remaining-story indicators
  - voice-interface guide explaining narration and spoken or tapped A/B choices
  - the first branching decision
  - chapter-two consequence after selecting the road, followed by a new decision
- Replaced the abstract Eligo case-study cover with the live branching-choice interface.
- Updated the genre count from 10 to 11 to match the current deployed product.
- Explicitly scoped the captures to solo mode. Party Mode was omitted, and Wildword was not represented because it remained locked in the fresh zero-CP session.
