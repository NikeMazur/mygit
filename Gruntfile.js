/*
 * Steps for setup
 * 1- sudo npm install
 * 3- grunt watch
 *
 * grunt sprite - Sprite generation. See instruction in components/scss/partials/_sprites.scss
 */
module.exports = function(grunt) {

	var CONFIG = {
		scripts: ['./js/**.js', '!./js/**.min.js'],

		/* Minimize */
		uglify: {
			drop_console: false,
			files: {
			  'js/custom.min.js': ['js/custom.js']  // Dest : src
			}
		},

		/* Combine Media Queries */
		cmq: {
			files: {
				'assets/css': ['css/style.css']  // Dest : src
			}
		},

		/* Autoprefixer */
		autoprefixer: {
			browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
			files: {
				expand: true,
				flatten: true,
				src: 'css/style.css',
				dest: 'css'
			}
		},

		/* SASS */
		sass: {
			files: {
				'css/style.css': 'sass/style.scss',
			},
			options: {
				outputStyle: 'compact',
				sourceMapRoot: 'css',
			}
		}

	};

	/**
	* @author Lenlay
	* @version 1.0.5
	*/

	/*Init config*/
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-combine-media-queries');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	var gruntConfig = {
		pkg: grunt.file.readJSON('package.json'),

		/* Stylesheets START */
		sass: {
			clinic: {
				files: CONFIG.sass.files,
				options: CONFIG.sass.options
			}
		},

		autoprefixer: {
			options: {
				browsers: CONFIG.autoprefixer.browsers,
				map: false
			},
			files: CONFIG.autoprefixer.files
		},

		cmq: {
			options: {
				log: true
			},
			clinic: {
				files: CONFIG.cmq.files
			}
		},

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css', '!*.min.css'],
					dest: 'css',
					ext: '.min.css'
				}]
			}
		},
		/* Stylesheets END */

		sprite:{
			all: {
				src: 'img_download/*.png',
				dest: 'img/sprite.png',
				destCss: 'sass/partials/_sprites.scss',
				cssTemplate: 'css/spriteTemplate.css.handlebars',
				imgPath: 'img/sprite.png'
			}
		},

		uglify: {
			options: {
				compress: {
					drop_console: CONFIG.uglify.drop_console
				}
			},
			dist: {
				files: CONFIG.uglify.files
			}
		},

		watch: {
			sass: {
				files: [
					'sass/**/*.scss'
				],
				tasks: ['sass', 'cmq', 'autoprefixer', 'cssmin'],
				options: {
					interrupt: true,
					nospawn: true
				}
			},

			scripts: {
				files: CONFIG.scripts,
				tasks: ['uglify'],
				options: {
					interrupt: true,
					nospawn: true
				}
			}
		}
	};

	// INIT GRUNT
	grunt.initConfig(gruntConfig);

	grunt.registerTask('default', ['watch']);

};