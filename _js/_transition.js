import Highway from '@dogstudio/highway';
import Timeline from 'gsap';

class PageTrans extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0);
    from.remove();
    Timeline.fromTo(to, 0.33,
      { 
        opacity: 0,
        transform: 'translateY(-2rem)',
        ease: 'back'
      },
      {
        opacity: 1,
        transform: 'translateY(0)',
        ease: 'back',
        onComplete: done
      }
    );
  }

  out({ from, done }) {
    Timeline.fromTo(from, .33,
      {
        opacity: 1,
        transform: 'translateY(0)',
        ease: 'back'
      },
      {
        opacity: 0,
        transform: 'translateY(-2rem)',
        ease: 'back',
        onComplete: done
      }
    );
  }
}

export default PageTrans;