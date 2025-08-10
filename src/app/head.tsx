export default function Head() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Scroll to top immediately when the page loads
            window.addEventListener('load', function() {
              window.scrollTo(0, 0);
            });
            
            // Also handle page visibility changes
            document.addEventListener('visibilitychange', function() {
              if (document.visibilityState === 'visible') {
                window.scrollTo(0, 0);
              }
            });
          `,
        }}
      />
    </>
  );
} 