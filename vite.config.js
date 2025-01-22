import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.js'),  // Entry point for the component
            name: 'VueToggleSwitch', // Name of your library
            fileName: (format) => `vue-toggle-switch.${format}.js`, // Output file format
        },
        rollupOptions: {
            // Externalize dependencies like Vue to avoid bundling them
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
});
