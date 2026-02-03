(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...args)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(args)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="RoSh63TiToXPRk-L_12eT";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();

(function tweakChatbase(){
    const observer = new MutationObserver((mutations) => {
        const btn = document.querySelector('#chatbase-bubble-button, .chatbase-bubble-button, [data-testid="bubble-button"]');
        if (btn && !btn.classList.contains('cb-pulse')) {
            btn.classList.add('cb-pulse');
            observer.disconnect();
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Fallback if MutationObserver doesn't catch it
    setTimeout(() => {
        const btn = document.querySelector('#chatbase-bubble-button, .chatbase-bubble-button, [data-testid="bubble-button"]');
        if (btn) btn.classList.add('cb-pulse');
    }, 2000);
})();