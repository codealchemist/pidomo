var settings = {
    appDir: 'build/',
    srcDir: 'src/'
};

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    bower: {
      install: {
        options: {
           targetDir: 'src/vendor',
           copy: true,
           layout: 'byComponent',
           install: true
         }
      }
    },
    requirejs: {
      compile: {
        options: {
          paths : {
            requireLib : settings.srcDir + '../../vendor/requirejs/require'
          },
          include : ['requireLib'],
          baseUrl: settings.srcDir + 'js',
          mainConfigFile: settings.srcDir + 'js/main.js',
          optimize: 'uglify2',
          optimizeCss: 'none',
          out: settings.appDir + 'js/build.js',
          name: 'main',
          skipDirOptimize: true
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            cwd: settings.srcDir,
            expand: true,
            src: ['img/**', 'data/*'],
            dest: settings.appDir
          },
          {
            cwd: settings.srcDir + 'vendor/bootstrap/',
            expand: true,
            src: ['*.eot', '*.svg', '*.ttf', '*.woff'],
            dest: settings.appDir + 'fonts/'
          },
          {
            cwd: settings.srcDir + 'vendor/bootstrap/',
            expand: true,
            src: ['bootstrap.css'],
            dest: settings.appDir + 'css/'
          }
        ]
      }
    },
    clean: {
      build: {
        src: [settings.appDir]
      },
      css: {
          src: [
            settings.appDir + 'css/*.css',
            '!' + settings.appDir + 'css/build.css'
          ]
      }
    },
    cssmin: {
        build: {
            src: [settings.appDir + 'css/*.css'],
            dest: settings.appDir + 'css/build.css',
        }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    }
  });

  // These plugins provide necessary tasks.

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('default', ['jshint', 'clean:build', 'bower', 'requirejs', 'copy', 'cssmin', 'clean:css']);

};
