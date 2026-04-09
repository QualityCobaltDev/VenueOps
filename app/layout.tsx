import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Venue Ops',
  description: 'Operational management SaaS for hospitality venues.',
};

const chunkRecoveryScript = `
(function() {
  if (typeof window === 'undefined') {
    return;
  }

  var reloadFlagKey = 'venueops_chunk_reload_attempted';

  var shouldRecoverChunkError = function(error) {
    if (!error) {
      return false;
    }

    var message = '';

    if (typeof error === 'string') {
      message = error;
    } else if (typeof error.message === 'string') {
      message = error.message;
    }

    if (!message) {
      return false;
    }

    return message.includes('ChunkLoadError') || /Loading chunk\s+\d+/i.test(message);
  };

  var recoverFromChunkError = function(error) {
    if (!shouldRecoverChunkError(error)) {
      return;
    }

    var hasReloaded = window.sessionStorage.getItem(reloadFlagKey) === 'true';

    if (hasReloaded) {
      return;
    }

    window.sessionStorage.setItem(reloadFlagKey, 'true');
    window.location.reload();
  };

  window.addEventListener('error', function(event) {
    recoverFromChunkError(event.error || event.message);
  });

  window.addEventListener('unhandledrejection', function(event) {
    recoverFromChunkError(event.reason);
  });
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script id="chunk-error-recovery" strategy="beforeInteractive">
          {chunkRecoveryScript}
        </Script>
        {children}
      </body>
    </html>
  );
}
