export const PEEK_MIN_WAIT=120_000;
export const PEEK_MAX_WAIT=180_000;
export const PEEK_DURATION=6_000;

type PeekClock={
  now:()=>number;
  random:()=>number;
  setTimer:(callback:()=>void,delay:number)=>number;
  clearTimer:(timer:number)=>void;
  canShow:()=>boolean;
};

// One clock belongs to the shared site shell, so lesson navigation does not
// restart the countdown. Only time spent in a visible tab counts toward it.
export function createPeekSchedule(show:()=>void,hide:()=>void,clock:PeekClock){
  let timer:number|undefined;
  let deadline=0;
  let remaining=nextWait();
  let paused=true;
  let showing=false;
  let disposed=false;

  function nextWait(){return PEEK_MIN_WAIT+Math.floor(clock.random()*(PEEK_MAX_WAIT-PEEK_MIN_WAIT));}
  function clear(){if(timer!==undefined){clock.clearTimer(timer);timer=undefined;}}
  function arm(delay:number,callback:()=>void){
    clear();
    deadline=clock.now()+delay;
    timer=clock.setTimer(()=>{timer=undefined;callback();},delay);
  }
  function wait(){
    remaining=nextWait();
    if(!paused&&!disposed)arm(remaining,appear);
  }
  function disappear(){showing=false;hide();wait();}
  function appear(){
    if(paused||disposed)return;
    // A quiz, menu, or text field can finish before this decorative visit.
    if(!clock.canShow()){arm(10_000,appear);return;}
    showing=true;
    show();
    arm(PEEK_DURATION,disappear);
  }
  return {
    pause(){
      if(paused||disposed)return;
      paused=true;
      remaining=Math.max(0,deadline-clock.now());
      clear();
      if(showing){showing=false;hide();remaining=nextWait();}
    },
    resume(){
      if(!paused||disposed)return;
      paused=false;
      arm(remaining,appear);
    },
    dispose(){disposed=true;clear();hide();}
  };
}
