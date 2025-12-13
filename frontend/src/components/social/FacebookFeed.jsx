import React from 'react';

const FacebookFeed = () => {
  return (
    <div className="my-8">
      <div 
        className="fb-page" 
        data-href="https://www.facebook.com/paroquiafatimaosascosp" 
        data-tabs="timeline" 
        data-width="500" 
        data-height="600" 
        data-small-header="false" 
        data-adapt-container-width="true" 
        data-hide-cover="false" 
        data-show-facepile="true"
      >
        <blockquote 
          cite="https://www.facebook.com/paroquiafatimaosascosp" 
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/paroquiafatimaosascosp">
            Santuário Nossa Senhora de Fátima
          </a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookFeed;
