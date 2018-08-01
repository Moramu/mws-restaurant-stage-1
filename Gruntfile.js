module.exports = function (grunt) {
    grunt.initConfig({
        responsive_images_extender: {
            options: {
                sizes: [{
                    selector: '.restaurant-img',
                    sizeList: [{
                        cond: 'max-width: 30em',
                        size: '100vw'
                        },{
                        cond: 'max-width: 50em',
                        size: '50vw'
                        },{
                        cond: 'default',
                        size: 'calc(33vw - 100px)'
                      }]
                }],
                files: [{
                    expand: true,
                    src: ['/img/*.jpg'],
                    cwd: 'src/',
                    dest: 'build/'
                }]
            },
    }});
    // load npm tasks
    grunt.loadNpmTasks('grunt-responsive-images-extender');
};