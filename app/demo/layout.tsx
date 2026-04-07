// Demo has its own isolated layout — no global LanguageProvider
// The demo manages its own language state internally
export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
