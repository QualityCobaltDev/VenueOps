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
  var resetDelayMs = 15000;

  var resetReloadFlag = function() {
    window.setTimeout(function() {
      window.sessionStorage.removeItem(reloadFlagKey);
    }, resetDelayMs);
  };

  var shouldRecoverChunkError = function(error) {
    if (!error) {
      return false;
    }

    if (typeof error === 'string') {
      return error.includes('ChunkLoadError') || error.includes('Loading chunk');
    }

    if (typeof error.message === 'string') {
      return error.message.includes('ChunkLoadError') || error.message.includes('Loading chunk');
    }

    return false;
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

  resetReloadFlag();
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
