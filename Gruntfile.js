module.exports = function (grunt) {
    
    'use strict';

    grunt.template.addDelimiters('handlebars-like-delimiters', '{{', '}}')

    var gruntConfig = {

        srcPath             : 'content/web_resources/',
        destPath            : 'content/',

        dirFolder           : '<%= !grunt.task.current.args[1] ? grunt.task.current.args[0] : grunt.task.current.args[0] + \"/\" + grunt.task.current.args[1] %>',

        folder              : '<%= grunt.task.current.args[0] %>',
        subFolder           : '<%= grunt.task.current.args[1] %>',

        selectedFolder      : '<%= !grunt.task.current.args[1] ? grunt.task.current.args[0] : grunt.task.current.args[1] %>',
        fileName            : '<%= !grunt.task.current.args[1] ? \"general\" : grunt.task.current.args[1] %>',
        
        watchFolder         : '<%= grunt.task.current.args[1] %>',
        watchSubFolder      : '<%= grunt.task.current.args[2] %>',

        watchSelectedFolder : '<%= !grunt.task.current.args[2] ? grunt.task.current.args[1] : grunt.task.current.args[2] %>',

        sass            : {
            folder : {
                options : {
                    sourcemap   : 'none',
                    noCache     : true,
                    //style       : 'compressed'
                },
                files : {
                    '<%= destPath + folder %>/arquivos/td-general.min.css' : '<%= srcPath + folder %>/sass/dest/*.scss'
                }
            },
            subFolder : {
                options : {
                    sourcemap   : 'none',
                    noCache     : true,
                    //style       : 'compressed'
                },
                files : {
                    '<%= destPath + folder %>/arquivos/td-<%= subFolder %>.min.css' : '<%= srcPath + subFolder %>/sass/dest/*.scss'
                }
            }
        },
        concat          : {
            jsFolder    : {
                src     : [
                    '<%= srcPath + folder %>/js/0.PLUGIN.*.js',
                    '<%= srcPath + folder %>/js/1.*.js',
                    '<%= srcPath + folder %>/js/*.js'
                ],
                dest    : '<%= destPath + folder %>/arquivos/td-general.min.js',
            },
            jsSubFolder : {
                src     : [
                    '<%= srcPath + subFolder %>/js/*.js'
                ],
                dest    : '<%= destPath + folder %>/arquivos/td-<%= fileName %>.min.js',
            },
            folder      : {
                src     : [
                    '<%= srcPath + folder %>/sass/src/*.scss'
                ],
                dest    : '<%= srcPath + folder %>/sass/dest/td-general.min.scss',
            },
            subFolder   : {
                src     : [
                    '<%= srcPath + subFolder %>/sass/src/*.scss'
                ],
                dest    : '<%= srcPath + subFolder %>/sass/dest/td-<%= subFolder %>.min.scss',
            }
        },
        uglify          : {
            dist: {
                files: {
                    '<%= destPath + folder %>/arquivos/td-<%= fileName %>.min.js' : [
                        '<%= srcPath + folder %>/js/0.PLUGIN.*.js',
                        '<%= srcPath + folder %>/js/1.*.js',
                        '<%= srcPath + selectedFolder %>/js/*.js'
                    ]
                }
            }
        },
        jshint          : {
            files: [
                '<%= srcPath + selectedFolder %>/js/*.js',
                '<%= srcPath + folder %>/js/1.*.js',
                '!<%= srcPath + folder %>/js/0.*.js'
            ],
            options: {
                curly   : true,
                eqeqeq  : true,
                eqnull  : true,
                browser : true,
                globals : {
                    jQuery: true
                }
            }
        },
        includes        : {
            vtexInclude : {
                options : {
                    debug : true
                },
                files: [{
                    cwd  : '<%= srcPath + selectedFolder %>/templates/',
                    src  : '*.html',
                    dest : '<%= destPath + dirFolder %>'
                }]
            },
            vtexTemplate : {
                options : {
                    filenameSuffix : '.html',
                    includePath    : '<%= srcPath + folder %>/templates/template',
                    includeRegexp  : /\<*vtex\:*template\s+id\=\"([^\"]*)\"\s*\/>/,
                    duplicates     : true,
                    debug          : false
                },
                files: [{
                    cwd  : '<%= destPath + dirFolder %>/',
                    src  : '*.html',
                    dest : '<%= destPath + dirFolder %>'
                }]
            },
            vtexController : {
                options : {
                    filenameSuffix : '.html',
                    includePath    : '<%= srcPath + folder %>/templates/controller',
                    includeRegexp  : /\<*vtex\.cmc\:*([^\s]*)[^\/]*?\/\>/,
                    duplicates     : true,
                    debug          : false
                },
                files: [{
                    cwd  : '<%= destPath + dirFolder %>/',
                    src  : '*.html',
                    dest : '<%= destPath + dirFolder %>',
                }]
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            project : [
                'watch:sass:<%= (grunt.task.current.args.join(":")) %>', 
                'watch:html:<%= (grunt.task.current.args.join(":")) %>', 
                'watch:debug:<%= (grunt.task.current.args.join(":")) %>'
            ]
        },
        watch           : {
            sass : {
                files: [

                    /*
                    ** SASS
                    *******/
                    '<%= srcPath + watchFolder %>/sass/src/0.*.scss',
                    '<%= srcPath + watchFolder %>/sass/src/1.*.scss',
                    '<%= srcPath + watchSelectedFolder %>/sass/src/*.scss'
                ],
                tasks: [

                    /*
                    ** SASS
                    *******/
                    'css:<%= watchFolder + (watchSubFolder ? \":\" + watchSubFolder : \"\") %>'
                ]
            },
            html : {
                files: [

                    /*
                    ** HTML
                    *******/
                    '<%= srcPath + watchSelectedFolder %>/templates/*.html',
                    '<%= srcPath + watchFolder %>/templates/template/*.html',
                    '<%= srcPath + watchFolder %>/templates/controller/*.html'
                ],
                tasks: [
                    
                    /*
                    ** HTML
                    *******/
                    'html:<%= watchFolder + (watchSubFolder ? \":\" + watchSubFolder : \"\") %>'
                ]
            },
            debug : {
                files: [

                    /*
                    ** DEBUG
                    *******/
                    '<%= srcPath + watchFolder %>/js/0.PLUGIN.*.js',
                    '<%= srcPath + watchFolder %>/js/1.*.js',
                    '<%= srcPath + watchSelectedFolder %>/js/*.js'
                ],
                tasks: [

                    /*
                    ** DEBUG
                    *******/
                    'debug:<%= watchFolder + (watchSubFolder ? \":\" + watchSubFolder : \"\") %>'
                ],
            }
        }
    };

    grunt.initConfig(gruntConfig);

    /*
    ** CARREGANDO MODULOS
    *******/
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-yui-compressor');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-includes');

    /*
    ** CSS TASK
    *******/
    grunt.registerTask('css', 'Minificando CSS', function (folder, subFolder) {

        var srcFolder   = !subFolder ? folder : subFolder,
            destFolder  = !subFolder ? folder : folder + '/' + subFolder,

            srcPath     = grunt.file.exists(gruntConfig.srcPath + srcFolder),
            destPath    = grunt.file.exists(gruntConfig.destPath + destFolder),

            params      = folder + (subFolder !== undefined ? ':' + subFolder : '');

        if (srcPath && destPath) {

            grunt.task.run([
                'concat:folder:' + params,
                'sass:folder:' + params
            ]);

            if (subFolder) {

                grunt.task.run([
                    'concat:subFolder:' + params,
                    'sass:subFolder:' + params
                ]);
            }
        } else {

            grunt.log.error('Invalid Command!');
        }
    });

    /*
    ** JS TASK
    *******/
    grunt.registerTask('js', 'Minificando JS', function (folder, subFolder) {

        var srcFolder   = !subFolder ? folder : subFolder,
            destFolder  = !subFolder ? folder : folder + '/' + subFolder,

            srcPath     = grunt.file.exists(gruntConfig.srcPath + srcFolder),
            destPath    = grunt.file.exists(gruntConfig.destPath + destFolder),

            params      = folder + (subFolder !== undefined ? ':' + subFolder : '');

        if (srcPath && destPath) {

            grunt.task.run([
                'jshint:files:' + params, 
                'uglify:dist:' + params
            ]);
            //grunt.task.run(['jshint:files:' + params, 'uglify:dist:' + params]);
        } else {

            grunt.log.error('Invalid Command!');
        }
    });

    /*
    ** HTML TASK
    *******/
    grunt.registerTask('html', 'Minificando HTML', function (folder, subFolder) {

        var srcFolder   = !subFolder ? folder : subFolder,
            destFolder  = !subFolder ? folder : folder + '/' + subFolder,

            srcPath     = grunt.file.exists(gruntConfig.srcPath + srcFolder),
            destPath    = grunt.file.exists(gruntConfig.destPath + destFolder),

            params      = folder + (subFolder !== undefined ? ':' + subFolder : '');

        if (srcPath && destPath) {

            grunt.task.run([
                'includes:vtexInclude:'     + params, 
                'includes:vtexTemplate:'    + params,
                'includes:vtexController:'  + params
            ]);
        } else {

            grunt.log.error('Invalid Command!');
        }
    });

    /*
    ** DEBUG TASK
    *******/
    grunt.registerTask('debug', 'Debugando JS', function (folder, subFolder) {

        var srcFolder   = !subFolder ? folder : subFolder,
            destFolder  = !subFolder ? folder : folder + '/' + subFolder,

            srcPath     = grunt.file.exists(gruntConfig.srcPath + srcFolder),
            destPath    = grunt.file.exists(gruntConfig.destPath + destFolder),

            params      = folder + (subFolder !== undefined ? ':' + subFolder : '');

        if (srcPath && destPath) {

            grunt.task.run([
                'concat:jsFolder:' + params
            ]);

            if (subFolder) {

                grunt.task.run([
                    'concat:jsSubFolder:' + params
                ]);
            }
        } else {

            grunt.log.error('Invalid Command!');
        }
    });

    /*
    ** WATCH TASK
    *******/
    grunt.registerTask('watching', 'Escutando Projeto', function (folder, subFolder) {

        var srcFolder   = !subFolder ? folder : subFolder,
            destFolder  = !subFolder ? folder : folder + '/' + subFolder,

            srcPath     = grunt.file.exists(gruntConfig.srcPath + srcFolder),
            destPath    = grunt.file.exists(gruntConfig.destPath + destFolder),

            params      = folder + (subFolder !== undefined ? ':' + subFolder : '');

        if (srcPath && destPath) {

            grunt.task.run([
                'concurrent:project:' + params
            ]);
        } else {

            grunt.log.error('Invalid Command!');
        }
    });
};