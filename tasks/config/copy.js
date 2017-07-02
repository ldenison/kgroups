module.exports = {
    target: {
        files: [
            {expand: true, cwd: 'app/client/app', src: ['**/*.html','!index.html'], dest:'app/public/app'}
        ]
    }
};