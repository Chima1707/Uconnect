module.exports = function(grunt) {

  // Project configuration.
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
   nodemon: {
  dev: {
    script: 'server.js',
    options: {
      args: ['dev'],
      nodeArgs: ['--debug'],
      callback: function (nodemon) {
        nodemon.on('log', function (event) {
          console.log(event.colour);
        });
      },
      env: {
        PORT: '8181'
      },
      cwd: __dirname,
      ignore: ['node_modules/**'],
      ext: 'js,coffee',
      watch: ['.'],
      delay: 1000,
      legacyWatch: true
    }
  }
}
});
grunt.loadNpmTasks('grunt-nodemon');
grunt.registerTask('default', ['nodemon:dev'])
};