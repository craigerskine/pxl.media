import Highway from '@dogstudio/highway';
import Tween from 'gsap';

class PageTrans extends Highway.Transition {
  in({ from, to, done }) {
    from.remove();
    Tween.fromTo(to, 0.33,
      { 
        opacity: 0,
        transform: 'translateY(-2rem)'
      },
      {
        opacity: 1,
        transform: 'translateY(0)',
        onComplete: done
      }
    );
  }

  out({ from, done }) {
    Tween.fromTo(from, .33,
      {
        opacity: 1,
        transform: 'translateY(0)'
      },
      {
        opacity: 0,
        transform: 'translateY(-2rem)',
        onComplete: done
      }
    );
  }
}

export default PageTrans;