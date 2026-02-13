declare module 'virtual:config' {
  const Config: import('astro-pure/types').ConfigOutput
  export default Config
}

declare global {
  interface Window {
    dataLayer: Record<string, any>[]
    gtag: (...args: any[]) => void
  }
}
