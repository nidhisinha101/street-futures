import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Submission {
  id: string;
  content: string;
  timestamp: number;
}

export interface HomePageRef {
  shuffle: () => void;
}

export const HomePage = forwardRef<HomePageRef>((props, ref) => {
  const [currentSubmission, setCurrentSubmission] = useState<Submission | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const loadRandomSubmission = () => {
    if (isShuffling) return;
    setIsShuffling(true);

    const storedSubmissions = localStorage.getItem("submissions");
    const submissions: Submission[] = storedSubmissions ? JSON.parse(storedSubmissions) : [];

    setTimeout(() => {
      if (submissions.length > 0) {
        const randomIndex = Math.floor(Math.random() * submissions.length);
        setCurrentSubmission(submissions[randomIndex]);
      } else {
        const mockSubmissions: Submission[] = [
          {
            id: "1",
            content: "In our neighborhood, the old central grid was replaced by 'The Communitree'—a massive, biomechanically engineered banyan that filters the air while serving as a hub for decentralized solar storage. Its glowing bio-luminescent moss gently illuminates the plaza at night. We gather under its sweeping branches not just to charge our devices, but to reconnect. Technology isn't cold anymore; it breathes with us.",
            timestamp: Date.now() - 86400000 * 2,
          },
          {
            id: "2",
            content: "We stopped relying on external supply chains five years ago. Now, our emergency response system is modeled after mycelial networks. When one block experiences a power dip or a resource shortage, the neighboring blocks automatically redirect surplus energy and supplies. The response isn't managed by a corporation, but by an open-source, community-governed AI that prioritizes human well-being above all.",
            timestamp: Date.now() - 86400000 * 5,
          },
          {
            id: "3",
            content: "Children learn to tend soil before they learn to code. Both are languages of care. The elders teach the seeds, and the seeds teach the algorithms. We stopped asking what the machine could do for us, and started asking what we could do together.",
            timestamp: Date.now() - 86400000 * 8,
          },
        ];
        const randomIndex = Math.floor(Math.random() * mockSubmissions.length);
        setCurrentSubmission(mockSubmissions[randomIndex]);
      }
      setIsShuffling(false);
    }, 350);
  };

  useImperativeHandle(ref, () => ({
    shuffle: loadRandomSubmission,
  }));

  useEffect(() => {
    loadRandomSubmission();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 sm:px-12 pb-32 relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-0 right-0 w-[55vw] h-[55vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(90,138,106,0.07) 0%, transparent 70%)", transform: "translate(20%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,130,74,0.06) 0%, transparent 70%)", transform: "translate(-20%, 30%)" }} />

      <div className="max-w-2xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {currentSubmission && (
            <motion.div
              key={currentSubmission.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <p
                className="font-serif leading-relaxed text-foreground"
                style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.45rem)", lineHeight: 1.85, opacity: 0.88 }}
              >
                {currentSubmission.content}
              </p>

              {/* Subtle shuffle hint */}
              <div className="mt-12 flex items-center gap-3" style={{ opacity: 0.3 }}>
                <span className="text-xs font-sans tracking-widest uppercase text-foreground">✦</span>
                <span className="h-px flex-1" style={{ background: "currentColor", opacity: 0.2 }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
