import React, { useEffect } from 'react';

const AdSenseAd = ({ client, slot, format = 'auto', responsive = 'true' }) => {
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
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      ></ins>
    </div>
  );
};

export default AdSenseAd;