module.exports = {
    apps:[{ 
        name: 'dandelion-server-dev',
        args: 'one two',
        script:'/data/project/dandelion-server/index.js',
        instances: 1,
        out_file: null,
        error_file: null,
        log_file: null,
        autorestart: true,
        watch: true,
        watch_options: {
            usePolling: true,
        },
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'dev',
        },
    },{ 
        name: 'dandelion-server-pre',
        args: 'one two',
        script: '/data/pre-dir/dandelion-server/index.js',
        instances: 1,
        out_file: null,
        error_file: null,
        log_file: null,
        autorestart: true,
        watch: true,
        watch_options: {
            usePolling: true,
        },
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'pre',
        },
    },{ 
        name: 'dandelion-server-pro',
        args: 'one two',
        script: '/data/pro-dir/dandelion-server/index.js',
        instances: 1,
        out_file: null,
        error_file: null,
        log_file: null,
        autorestart: true,
        watch: true,
        watch_options: {
            usePolling: true,
        },
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'pro',
        },
    }],
}