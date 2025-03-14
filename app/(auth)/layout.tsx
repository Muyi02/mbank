export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
        {children}
        <div className="auth-asset">
          <div dangerouslySetInnerHTML={{ __html: `
            <style>
              @keyframes draw {
                to {
                  stroke-dashoffset: 0;
                }
              }

              svg line {
                stroke-dasharray: 300;
                stroke-dashoffset: 300;
                animation: draw 2s ease forwards;
              }

              svg line:nth-child(2) { animation-delay: 0.2s; }
              svg line:nth-child(3) { animation-delay: 0.4s; }
              svg line:nth-child(4) { animation-delay: 0.6s; }
              svg line:nth-child(5) { animation-delay: 0.8s; }
              svg line:nth-child(6) { animation-delay: 1s; }
              svg line:nth-child(7) { animation-delay: 1.2s; }
              svg line:nth-child(8) { animation-delay: 1.4s; }
            </style>

            <svg width="566" height="420" viewBox="0 0 566 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="566" height="420" fill="none"/>
              <rect x="4.69658" y="169.47" width="487.251" height="254.844" transform="rotate(-15 4.69658 169.47)" fill="#FFFCFC" stroke="#0C0C0C" stroke-width="7"/>
              <rect x="24.6966" y="130.523" width="487.251" height="254.844" transform="rotate(-15 24.6966 130.523)" fill="#FFFCFC" stroke="#0C0C0C" stroke-width="7"/>
              <line x1="209.86" y1="138.952" x2="250.86" y2="289.952" stroke="black" stroke-width="8"/>
              <line x1="208.548" y1="136.917" x2="306.548" y2="217.917" stroke="black" stroke-width="8"/>
              <line x1="341.839" y1="106.125" x2="307.839" y2="222.125" stroke="black" stroke-width="8"/>
              <line x1="341.86" y1="103.952" x2="382.86" y2="254.952" stroke="black" stroke-width="8"/>
              <line x1="276.869" y1="95.983" x2="327.869" y2="289.983" stroke="black" stroke-width="8"/>
              <line x1="168.409" y1="240.571" x2="205.409" y2="231.571" stroke="black" stroke-width="5"/>
              <line x1="404.409" y1="178.571" x2="441.409" y2="169.571" stroke="black" stroke-width="5"/>
            </svg>
          `}} />
        </div>
    </main>
  );
}
