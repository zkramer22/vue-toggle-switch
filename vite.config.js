import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
    const isDev = mode === 'development'
    const isApp = mode === 'app'
    const outDir = isApp ? 'gh-pages-dist' : 'dist'

    return {
        plugins: [vue()],
        root: isDev ? 'dev' : '', // Use 'dev/' as the root directory for development
        build: {
            outDir,
            lib: !isApp 
                ? {
                    entry: path.resolve(__dirname, 'src/main.js'), // Entry point for the library build
                    name: 'VueToggleSwitch',
                    fileName: 'vue-toggle-switch', // Base name for the files
                } 
                : undefined,
            rollupOptions: !isApp 
                ? {
                    external: ['vue'], // Do not bundle Vue
                    output: [
                        {
                            format: 'umd', // UMD format for general compatibility
                            dir: outDir, // Directory for the output files
                            entryFileNames: 'vue-toggle-switch.umd.js',
                            name: 'VueToggleSwitch',
                            globals: {
                                vue: 'Vue',
                            },
                        },
                        {
                            format: 'esm', // ESM format for modern JavaScript users
                            dir: outDir,
                            entryFileNames: 'vue-toggle-switch.esm.js',
                            globals: {
                                vue: 'Vue',
                            },
                        },
                        {
                            format: 'cjs', // CommonJS format for Node.js users
                            dir: outDir,
                            entryFileNames: 'vue-toggle-switch.cjs.js',
                            globals: {
                                vue: 'Vue',
                            },
                        },
                    ],
                }
                : undefined,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, isDev ? 'dev' : 'src'), // Use 'dev' aliases for development
            },
        },
    }
})
