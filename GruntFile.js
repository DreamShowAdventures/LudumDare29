module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './deploy'
                }
            }
        },
        concat: {
            dist: {
                src: [  "src/lib/phaser.js",
						"src/game/*.js"
                     ],
                dest: 'src/bin/<%= pkg.name %>.js'
            }
        },
        watch: {
            files: 'src/**/*.js',
            tasks: ['concat']
        },
        open: {
            dev: {
                path: 'http://localhost:8080/index.html'
            }
        },
		uglify: {
			options: {
				compress: {
					drop_console: true
				}
			},
			my_target: {
				files: {
					'deploy/js/<%= pkg.name %>.min.js' : ['src/bin/<%= pkg.name %>.js']
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, src: ['assets/*'], dest: 'deploy/'},
					{expand: true, flatten: true, src: ['src/index.html'], dest: 'deploy/'}
				]
			}
		}
    });

    grunt.registerTask('default', ['concat', 'uglify', 'copy']);
    grunt.registerTask('open-watch', ['concat', 'connect', 'open', 'watch']);

}