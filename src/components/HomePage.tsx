import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase, Submission } from "../lib/supabase";
import { useParams } from "react-router-dom";

export interface HomePageRef {
  shuffle: () => void;
}

export const HomePage = forwardRef<HomePageRef>((props, ref) => {
  const { slug } = useParams<{ slug?: string }>();
  const [currentSubmission, setCurrentSubmission] = useState<Submission | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const loadRandomSubmission = async () => {
    setIsShuffling(true);
    const { data, error } = await supabase.from("submissions").select("*");

    if (error) {
      console.error("Error fetching submissions:", error);
      setIsShuffling(false);
      return;
    }

    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setCurrentSubmission(data[randomIndex]);
    }

    setIsShuffling(false);
  };

  const loadSubmissionBySlug = async (slugValue: string) => {
    setIsShuffling(true);
    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .eq("token_id", slugValue)
      .maybeSingle();

    if (error) {
      console.error("Error fetching submission by slug:", error);
      setIsShuffling(false);
      return false;
    }

    if (data) {
      setCurrentSubmission(data);
      setIsShuffling(false);
      return true;
    }

    setIsShuffling(false);
    return false;
  };

  const loadInitialSubmission = async () => {
    if (slug) {
      const found = await loadSubmissionBySlug(slug);
      if (found) {
        return;
      }
    }

    await loadRandomSubmission();
  };

  useImperativeHandle(ref, () => ({
    shuffle: loadRandomSubmission,
  }));

  useEffect(() => {
    loadInitialSubmission();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 sm:px-12 pb-32 relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div
        className="absolute top-0 right-0 w-[55vw] h-[55vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(90,138,106,0.07) 0%, transparent 70%)",
          transform: "translate(20%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[45vw] h-[45vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(196,130,74,0.06) 0%, transparent 70%)",
          transform: "translate(-20%, 30%)",
        }}
      />

      <div className="max-w-2xl w-full relative z-10">
        <AnimatePresence mode="wait">
          {currentSubmission ? (
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

              <div className="mt-12 flex items-center gap-3" style={{ opacity: 0.3 }}>
                <span className="text-xs font-sans tracking-widest uppercase text-foreground">✦</span>
                <span className="h-px flex-1" style={{ background: "currentColor", opacity: 0.2 }} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="font-serif leading-relaxed text-foreground" style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.45rem)", lineHeight: 1.85, opacity: 0.88 }}>
                Loading stories from the archive...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
