/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api-gateway-proxy/:path*',
            destination: 'https://api-gateway-specialitystore.up.railway.app/:path*' // Proxy ke produk eksternal
          }
        ]
      }
};

export default  nextConfig
  
