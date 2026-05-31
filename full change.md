  - Added src/App.css import in src/main.jsx so the custom fonts and global UI polish actually load.
  - Changed favicon in index.html to use src/assets/logo.ico as requested.
  - Fixed the login font issue in src/pages/Login.jsx by replacing the Rubik inline font on Persian login text with
    Vazir.
  - Improved global frontend visuals in src/App.css: better RTL font defaults, softer BMI-themed gradients, glassy
    cards, improved shadows, rounded panels, table hover polish, input focus states, and mobile height fixes.
  - Fixed src/index.css Tailwind import syntax with a semicolon.

  changed files : 
    - index.html
    - src/main.jsx
    - src/index.css
    - src/App.css
    - src/pages/Login.jsx