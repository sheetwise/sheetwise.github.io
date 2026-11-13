MathSheet website (Sheetwise Engineering LLC) - https://sheetwise.github.io
=========================================================================

Plain HTML + style.css + js/site.js + images/. Hosted on GitHub Pages (public repository sheetwise/sheetwise.github.io).
NEVER put MathSheet program files, code, version zips, keys or passwords in this folder.

The pages are made by ../mathsheet-website-tools/build-site.js (node build-site.js) - edit the text there, not in the .html files.
That tools folder is NOT uploaded. check-site.js there tests every page (desktop + phone).

SWITCHING ON SALES - only one file to change: js/site.js, the SHOP block at the top
  checkoutUrl : the Lemon Squeezy checkout link for MathSheet ("" = Buy buttons say "coming soon")
  downloadUrl : the link to the signed installer ("" = Download buttons say "coming soon")
Then upload js/site.js again. No page needs changing.
Once checkoutUrl is filled in, the "coming soon" strip, the launch-news box and the "Get the launch news" button go away by themselves.

COMING SOON (2026-11-13) - the same file, js/site.js, NEWS block at the top
  NEWS.formUrl            : "" = the launch-news box shows an "E-mail us" link. Once e-mail sign-ups work in Lemon Squeezy, put
                            https://sheetwiseeng.lemonsqueezy.com/email-subscribe/external  -> the box becomes a sign-up form
                            (sign-ups land in Lemon Squeezy > Email > Subscribers).
  privacy.html#news describes the list. No visitor counter (David skipped it 2026-11-13); adding one later means a
  privacy.html change too.

Price on the pages: $99 one-time (build-site.js PRICE). Version shown: 1.35 (build-site.js VERSION and site.js).
Support e-mail: sheetwiseengllc@gmail.com. Refunds: 30 days.

Pictures in images/ are real screenshots of MathSheet v1.35 example sheets; xl-*.png were made by Microsoft Excel
from a workbook MathSheet saved.

Upload to GitHub: https://github.com/sheetwise/sheetwise.github.io/upload -> Ctrl+A in this folder -> drag -> Commit changes.
Old pictures no longer used on GitHub (delete them there if you like): images/bode-plots.png, symbolic-answers.png, x-y-plots.png.
