import React, { useEffect } from 'react';

const AdSenseAd = () => {
  useEffect(() => {
    // Ensure the ads are reloaded when the component is mounted
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-70+f1-x-58+cs"
        data-ad-client="ca-pub-2288604683034868"
        data-ad-slot="2390777502"
      ></ins>
    </div>
  );
};

export default AdSenseAd;
