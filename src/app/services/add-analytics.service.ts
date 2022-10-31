import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AddAnalyticsService{


  constructor(
  ) {
   }

   addTargeting() {
    var scriptHeadTarget = document.createElement("script");
    var noscriptTarget = document.createElement("noscript");


    // Add script content
    scriptHeadTarget.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '528767955250946');
    fbq('track', 'PageView');`

      noscriptTarget.innerHTML = `<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=528767955250946&ev=PageView&noscript=1"
      />`

    document.head.appendChild(scriptHeadTarget);
    document.head.appendChild(noscriptTarget);
   }


   addAnalytics() {
    var scriptHead = document.createElement("script");
    var noscriptBody = document.createElement("noscript");


    // Add script content
    scriptHead.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KPTDX4T');`

      noscriptBody.innerHTML = `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KPTDX4T"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`

    document.head.appendChild(scriptHead);
    document.body.appendChild(noscriptBody);

  }
}