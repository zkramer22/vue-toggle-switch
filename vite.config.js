import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.js'),  // Entry point for the component
            name: 'VueToggleSwitch',
            fileName: 'vue-toggle-switch',  // Base name for the files
        },
        rollupOptions: {
            external: ['vue'],  // Do not bundle Vue
            output: [
                {
                    format: 'umd',  // UMD format for general compatibility
                    dir: 'dist',  // Directory for the output files
                    entryFileNames: 'vue-toggle-switch.umd.js',
                    name: 'VueToggleSwitch',
                    globals: {
                        vue: 'Vue',
                    },
                },
                {
                    format: 'esm',  // ESM format for modern JavaScript users
                    dir: 'dist',
                    entryFileNames: 'vue-toggle-switch.esm.js',
                    globals: {
                        vue: 'Vue',
                    },
                },
                {
                    format: 'cjs',  // CommonJS format for Node.js users
                    dir: 'dist',
                    entryFileNames: 'vue-toggle-switch.cjs.js',
                    globals: {
                        vue: 'Vue',
                    },
                },
            ],
        },
    },
});
