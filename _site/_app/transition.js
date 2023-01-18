import Highway from '@dogstudio/highway';
import Timeline from 'gsap';

class PageTrans extends Highway.Transition {
  in({ from, to, done }) {
    window.scrollTo(0, 0);
    from.remove();
    Timeline.fromTo(to, 0.3,
      { 
        opacity: 0,
        transform: 'translateY(-1.5rem)',
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
    Timeline.fromTo(from, .3,
      {
        opacity: 1,
        transform: 'translateY(0)',
        ease: 'back'
      },
      {
        opacity: 0,
        transform: 'translateY(-1.5rem)',
        ease: 'back',
        onComplete: done
      }
    );
  }
}

export default PageTrans;