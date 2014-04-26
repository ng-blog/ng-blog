module.exports=function(grunt){

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-ngmin');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-html2js');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-html-snapshot');
//grunt.loadNpmTasks('grunt-recess');
grunt.loadNpmTasks('grunt-contrib-jshint');

grunt.registerTask('build', ['clean:reset','less:build', 'cssmin', 'html2js', 'copy','jshint:beforeconcat', 'concat:js', 'jshint:afterconcat', 'index:build','clean:assets']);
grunt.registerTask('compile', ['clean:reset','less:build', 'cssmin', 'html2js', 'concat:vendor', 'concat:js', 'uglify', 'index:compile', 'clean:assets']);
grunt.registerTask('snapshotdev', ['htmlSnapshot:dev']);
grunt.registerTask('snapshotprod', ['htmlSnapshot:prod']);
/**
   * A utility function to get all app JavaScript sources.
   */
  function filterForJS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.js$/ );
    });
  }

  /**
   * A utility function to get all app CSS sources.
   */
  function filterForCSS ( files ) {
    return files.filter( function ( file ) {
      return file.match( /\.css$/ );
    });
  }

  /** 
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask( 'index', 'Process index.html template', function () {
    var dirRE = new RegExp( '^('+grunt.config('build_dir')+'|'+grunt.config('compile_dir')+')\/', 'g' );
    var jsFiles = filterForJS( this.filesSrc ).map( function ( file ) {
      return file.replace( 'dist/public/', '' );
    });

    var cssFiles = filterForCSS( this.filesSrc ).map( function ( file ) {
      return file.replace( dirRE, '' );
    });
    var dev = this.target === 'build';

    grunt.file.copy('src/index.html', 'dist/public' + '/index.html', { 
      process: function ( contents, path ) {
        return grunt.template.process( contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config( 'pkg.version' ),
            dev: dev
          }
        });
      }
    });
  });


grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  
  htmlSnapshot:{
    dev:{
      options:{
        snapshotPath:'dist/public/snapshots/',
        sitePath: 'http://localhost:2403',
        msWaitForPages:1000,
        fileNamePrefix: '',

        urls:[
        '',
        '#!/home',

        '#!/posts',
        '#!/post/tests',
        '#!/post-dang',

        '#!/page/new-page',
        '#!/page/about-lbs',

        '#!/users/login'

        ],
         sanitize: function(requestUri) {
          return requestUri.replace(/\//g, '/');
        },
         removeScripts: true,
         removeMetaTags:true,

      }
    },

    prod:{
      options:{
       snapshotPath:'dist/public/snapshots/',
        sitePath: 'http://localhost:5000',
        msWaitForPages:1000,
        fileNamePrefix: '',

        urls:[
        '#!/home',

        '#!/posts',
        '#!/post/harry-potter-review',
        '#!/post/the-hunger-games',
        '#!/post/brandon-mull-book-signing',
        '#!/post/special-offer-25-off-all-childrens-books',

        '#!/page/contact',
        '#!/page/about-the-creator',

        '#!/users/login'

        ],
        sanitize: function(requestUri) {
          return requestUri.replace(/\//g, '/');
        },
         removeScripts: true,
         removeMetaTags:true,


      }
    }
  },


  less:{

    build:{
      options:{
        banner: '/* Just testing some stuff. */'
      },
      files:{
        'dist/public/build_files/app.css':'src/less/app.less',
        

      }
    }
    
  },


  cssmin: {
   
     minify:{
      expand: true,
      cwd: 'dist/public/build_files/',
      src: ['*.css'],
      dest: 'dist/public/css',
      ext: '.min.css'
    }
  
    
},

prodindex:{
  prod:{

  }
},

  index: {

      /**
       * During development, we don't want to have wait for compilation,
       * concatenation, minification, etc. So to avoid these steps, we simply
       * add all script files directly to the `<head>` of `index.html`. The
       * `src` property contains the list of included files.
       */
      build: {
        dir: 'dist/public',
        src: [
          'dist/public/js/jquery.min.js',
          'dist/public/js/angular.js',
          'dist/public/js/angular-ui-router.js',
          'dist/public/js/angular-sanitize.min.js',
          'dist/public/js/angular-app.js',
          //'dist/public/js/bootstrap.min.js',
          'dist/public/js/ui-bootstrap-tpls.min.js'
          
        ]
      },

      /**
       * When it is time to have a completely compiled application, we can
       * alter the above to include only a single JavaScript and a single CSS
       * file. Now we're back!
       */
      compile: {
        dir: 'dist/public',
        src: [
          'dist/public/js/angular-app.js',
        ]
      }
    },
  jshint:{

    beforeconcat:{
      options:{
        '-W099':true,
        '-W097':true,
        globals:{
          angular:true,
          $:true,
        },
      },
      
      src:['gruntFile.js','src/app/**/*.js', 'src/common/*.js']
    },
    afterconcat:{
      options:{
        '-W099':true,
        '-W097':true,
        globals:{
          angular:true,
          $: true,
        },

      },
      src:['dist/public/js/angular-app.js']
    }

    

  },

  ngmin: {
      compile: {
        files: [
          {
            src: [ 'dist/public/build_files/ngmin.js' ],
            dest: 'dist/public/build_files/ngmin.js',
            
          }
        ]
      }
    },


  html2js:{
    options:{
      base: 'src/app'
    },
    build:{
      src: ['src/app/**/*.tpl.html'],
      dest: 'dist/public/build_files/templates.js',
      module: 'templates.app'
    }
  },

  concat: {
    vendor:{
      files:{
        'dist/public/build_files/vendor.js':['vendor/jquery/dist/jquery.min.js',
        'vendor/angular/angular.min.js', 
        'vendor/angular-ui-router/release/angular-ui-router.js', 
        //'vendor/bootstrap/dist/js/bootstrap.min.js',
        'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'vendor/angular-sanitize/angular-sanitize.min.js'
        ]
      }
    },

    js: {
      files:{
        'dist/public/js/angular-app.js': [
        'dist/public/build_files/vendor.js',
        'src/app/app.js', 
        'src/app/**/*.js', 
        'src/common/**/*.js',
        'dist/public/build_files/templates.js']
      }
      
    },

    /*The app files need to be concatenated for ngmin and saved to placeholder file*/
    ngmin:{
      files:{
        'dist/public/build_files/ngmin.js':[
        'src/app/app.js', 
        'src/app/**/*.js', 
        'src/common/*.js',
        'dist/public/build_files/templates.js']
      }
    },

    build: {
      files:{
        'dist/public/js/angular-app.js': [
        'dist/public/build_files/vendor.js',
        'src/app/app.js', 
        'src/app/**/*.js', 
        'src/common/*.js',
        'dist/public/build_files/templates.js']
      }
      
    }
   
  },

  uglify: {
    my_target: {
      options:{
        mangle:false
      },
      files: {
        'dist/public/js/angular-app.js': ['dist/public/js/angular-app.js']
      }
    }
  },
  
  copy:{

    build:{
      files:[
       //{expand:true, flatten:true, src:['src/index.html'], dest: 'dist/public', filter: 'isFile'},
        {expand:true, flatten:true, src:['vendor/jquery/dist/jquery.min.js'], dest:'dist/public/js'},
        {expand:true, flatten:true, src:['vendor/angular/angular.js'], dest:'dist/public/js'},
        {expand:true, flatten:true, src:['vendor/angular-ui-router/release/angular-ui-router.js'], dest:'dist/public/js'},
        {expand:true, flatten:true, src:['vendor/angular-sanitize/angular-sanitize.min.js'], dest:'dist/public/js'},
        //{expand:true, flatten:true, src:['vendor/bootstrap/dist/js/bootstrap.min.js'], dest:'dist/public/js'},
        {expand:true, flatten:true, src:['vendor/angular-bootstrap/ui-bootstrap-tpls.min.js'], dest:'dist/public/js'},
        {expand:true, flatten:true, src:['src/assets/img/**'], dest:'dist/public/img/', filter: 'isFile'}

      ]
    }
  },
  clean:{
    reset:{
      src:['dist/public/css', 'dist/public/js', 'dist/public/index.html']
    },
    //since dist is outside of grunt project the force option must be true else error is thrown
    assets:{
      src:['dist/public/build_files']
    },
    
  }
    

});


};
