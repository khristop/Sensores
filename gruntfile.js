/**
 * Created by khris on 11-13-16.
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),

        cssmin: { //tarea para comprimir css
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public/stylesheets/styles.css': [
                        'node_modules/bootstrap/dist/css/bootstrap.css',
                        'resources/css/style.css']
                }
            }
        },
        uglify:{ // tarea para comprimir js
            options:{
                manage:false
            },
            my_target:{
                files:{
                    'public/javascripts/scripts.js':[
                        'node_modules/angular/angular.js',

                        'node_modules/chart.js/dist/Chart.js',
                        'node_modules/angular-chart.js/dist/angular-chart.js',
                        'node_modules/angular-timer/dist/assets/js/angular-timer-all.min.js'

                        ]
                }
            }
        },

        watch:{ //tarea para actualizar en tiempo real los cambios en los archivos
            cssmin:{
                files:'resources/css/*.css',
                tasks:'cssmin'
            },
            uglify:{
                files:'resources/js/*.js',
                tasks:'uglify'
            }
        },
        express:{ //tarea para ejecutar livereload
            all:{
                options:{
                    port:3000,
                    hostname:'localhost',
                    bases:['.'],
                    livereload:true
                }
            }
        },
        coffee:{
            compile:{
                files:{
                }
            }
        },
        less:{
            compile:{
                files:{
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-coffee');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask('server', ['watch']);
}