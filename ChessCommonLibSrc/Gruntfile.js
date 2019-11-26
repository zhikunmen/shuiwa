module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 任务名称，需依据插件的说明来写
        clean: ["tmp", "litetmp"],
        concat: {
            // 子任务名称，这名称随你起
            dev: {
                // 可选的配置參数
                options: {
                    banner: '/*!\n * <%= pkg.name %> - JS for Debug\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * qq:93749937 | Licence: helojo\n */\n'
                },
                // 源文件路径
                src: [
                    'tmp/**/*.js'
                    // "3party/protoandtable.d.ts"
                    //'../mergeLibs/*.js'
                ],
                // 执行任务后生成的目标文件
                dest: '../chessCommonLib/bin/chessCommonLib/chessCommonLib.js'
            },
            // 子任务名称，这名称随你起
            dev5: {
                // 可选的配置參数
                options: {
                    banner: '/*!\n * <%= pkg.name %> - JS for Debug\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * qq:93749937 | Licence: helojo\n */\n'
                },
                // 源文件路径
                src: [
                    'tmp/**/*.js'
                    //   '3party/libs/script/zlib/zlib.js',
                    //   '3party/libs/script/zlib/bitstream.js',
                    //   '3party/libs/script/zlib/heap.js',
                    //   '3party/libs/script/zlib/huffman.js',
                    //   '3party/libs/script/zlib/rawinflate.js',
                    //   '3party/libs/script/zlib/rawdeflate.js'

                    //'../mergeLibs/*.js'
                ],
                // 执行任务后生成的目标文件
                dest: '../chessCommonLib/bin/chessCommonLib/chessCommonLib.js'
            },
            dev2: {
                // 可选的配置參数
                options: {
                    banner: '/*!\n * <%= pkg.name %> - d.ts for Description\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n * qq:93749937 | Licence: helojo\n */\n'
                },
                // 源文件路径
                src: [
                    'tmp/**/*.d.ts'
                ],
                // 执行任务后生成的目标文件
                dest: '../chessCommonLib/bin/chessCommonLib/chessCommonLib.d.ts'
            }
        },
        uglify: {
            prod: {
                options: {
                    banner: '/*!\n * <%= pkg.name %> - compressed JS\n * @licence <%= pkg.name %> - v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n *  qq:93749937 | Licence: helojo\n */\n'
                },
                files: {
                    '../chessCommonLib/bin/chessCommonLib/chessCommonLib.min.js': ['<%= concat.dev.dest %>']
                }
            }
        },
        watch: {
            files: ['src/**/*.ts'],
            tasks: ['ts']
        },
        ts: {
            base: {
                src: ['libs/**/*.ts', 'common/**/*.ts', 'src/**/*.ts'],
                dest: 'tmp',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    base_path: 'common',
                    comments: true, //生成注释
                    sourceMap: false,
                    declaration: true,
                    lib: [
                        "es5",
                        "dom",
                        "es2015.promise"
                    ]
                }
            }
        },
        jsObfuscate: {
            base: {
                options: {
                    concurrency: 2,
                    keepLinefeeds: false,
                    keepIndentations: false,
                    encodeStrings: true,
                    encodeNumbers: true,
                    moveStrings: true,
                    replaceNames: true,
                    variableExclusions: ['^_get_', '^_set_', '^_mtd_']
                },
                files: {
                    '../chessCommonLib/bin/chessCommonLib/chessCommonLib.js': [
                        '../chessCommonLib/bin/chessCommonLib/chessCommonLib.js'
                    ]
                }
            }
        }
    });

    // 加载要使用的插件
    grunt.loadNpmTasks('grunt-ts');
    // grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('js-obfuscator');
    // 注冊任务
    //grunt.registerTask('default', ['typescript:base', 'concat:dev', 'concat:dev2', /*"jsObfuscate:base",*/ "uglify:prod", "clean"]);
    grunt.registerTask('default', ['ts:base', 'concat:dev', 'concat:dev2', 'concat:dev5', /*"jsObfuscate:base",*/ "uglify:prod", "clean"]);

};