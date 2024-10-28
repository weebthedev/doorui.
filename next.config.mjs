import nextra from 'nextra'

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'genshin.jmp.blue',
        },
      ],
    },
  }

  const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.jsx'
  })
  
  export default withNextra(nextConfig)