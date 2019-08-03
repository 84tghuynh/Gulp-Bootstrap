# Gulp-Bootstrap


A. HOW TO RUN
1. Create main.css in ./css folder
gulp class

2. Create scripts.js and scripts.min.js
gulp scripts

3. Run the application
gulp

OR

gulp default

B. STEPS AND EXPLANATION

1. Folder Structure

--------------------------

  ++css
  
  ++js

  ++src
  
      ++js
        --main.js
        --other.js
      ++scss
        ++partials
          --_global.scss
          --_index.scss
        ++utils
          --_index.scss
          --_variables.scss
        ++vendor
          ++bootstrap
          --_index.scss
        --main.scss
  --gulpfile.js
  
  --index.html
  
  --package.json

------------------------

Note:

  "++" : Folder

  "--" : file

  node_modules : is created automatically when running "npm install"


2. Dependencies modules installation

IF dependencies section in package.json already lists modules,
you just use command:

    npm install *

OR YOU can manually install each module in the list of dependencies in package.json:

    npm install bootstrap
    npm install browser-sync
    npm install gulp           /*gulp-4.0.2*/

Note: Uninstall gulp-4.0.2 before gulp-3.9.1 installation.
    npm uninstall gulp
    npm install gulp@3.9.1

    npm install gulp-sass
    npm install gulp-cli gulp-concat gulp-minify-css gulp-notify gulp-plumber gulp-rename  gulp-uglify  gulp-uglify-es

3. COPY ALL content (folders & files) of node_modules/bootstrap/scss/*  TO src/scss/vendor/bootstrap

4. Create a _index.scss file in src\scss\vendor\bootstrap\

Copy content of bootstrap-grid.scss & IMPORT the essential bootstrap modules for PROJECT to src\scss\vendor\bootstrap\_index.scss
