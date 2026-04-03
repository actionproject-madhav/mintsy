import { motion as Motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export function FadeUp({ children, className = '', delay = 0 }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease }}
      className={className}
    >
      {children}
    </Motion.div>
  );
}

export function FadeInView({ children, className = '', delay = 0 }) {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay, ease }}
      className={className}
    >
      {children}
    </Motion.div>
  );
}

export function Stagger({ children, className = '', stagger = 0.08 }) {
  return (
    <Motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger },
        },
      }}
      className={className}
    >
      {children}
    </Motion.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  return (
    <Motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
      }}
      className={className}
    >
      {children}
    </Motion.div>
  );
}
