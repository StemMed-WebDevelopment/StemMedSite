# StemMedSite
The website for StemMed Initiatives, Stories and Research

## Publishing a STEM-med Story

1. Copy `stories/_TEMPLATE.html` and rename it (lowercase, dashes), e.g. `stories/interview-with-jane-doe.html`.
2. Fill in everything in `[BRACKETS]`.
3. Open `stories.html`, copy an existing `<article class="story-item">` block, paste it at the top of the list, and update the title, date, summary, and link.
4. Commit and push.

## Member sign-ups

The Become a Member form (`member.html`) saves sign-ups to a Google Sheet.
One-time setup steps are at the top of `tools/member-signup.gs`. After deploying,
paste the web app URL into `SIGNUP_ENDPOINT` in `member.js`.
