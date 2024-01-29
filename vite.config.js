import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    optimizeDeps: {
      exclude: ['@mui/icons-material/Close'],
    },
  },
};



