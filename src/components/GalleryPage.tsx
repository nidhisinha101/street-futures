import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { supabase, Submission } from "../lib/supabase";

// Cycle through variations in font size and style
const VARIATIONS = [
  { fontSize: "1.6rem",  opacity: 0.90, fontStyle: "italic"  as const },
  { fontSize: "1.2rem", opacity: 0.40, fontStyle: "normal"  as const },
  { fontSize: "1.15rem", opacity: 0.70, fontStyle: "normal"  as const },
  { fontSize: "2.1rem",  opacity: 0.85, fontStyle: "italic"  as const },
  { fontSize: "1.2rem", opacity: 0.32, fontStyle: "normal"  as const },
  { fontSize: "1.35rem", opacity: 0.65, fontStyle: "italic"  as const },
  { fontSize: "1.15rem",  opacity: 0.50, fontStyle: "normal"  as const },
  { fontSize: "1.8rem",  opacity: 0.80, fontStyle: "italic"  as const },
];

// Default submissions for demo/fallback
const DEFAULT_SUBMISSIONS: Submission[] = [
  { id: "1", content: "Null", created_at: new Date(Date.now() - 86400000 * 2).toISOString() },]

export function GalleryPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data, error } = await supabase
          .from("submissions")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching submissions:", error);
          setSubmissions(DEFAULT_SUBMISSIONS);
          return;
        }

        // If no submissions from database, use defaults
        setSubmissions(data && data.length > 0 ? data : DEFAULT_SUBMISSIONS);
      } catch (err) {
        console.error("Error fetching submissions:", err);
        setSubmissions(DEFAULT_SUBMISSIONS);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen bg-background py-20 px-6 sm:px-12 lg:px-20 pb-36">
      <div className="max-w-5xl mx-auto">

        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="font-sans text-xs tracking-widest uppercase mb-3" style={{ color: "var(--clay-signal, #5a8a6a)", opacity: 0.7 }}>
            {submissions.length} visions
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl italic font-light text-foreground" style={{color: "var(--kiln)", opacity: 0.85 }}>
            Our Future Streets
          </h1>
        </motion.header>

        {submissions.length > 0 ? (
          <div className="columns-1 sm:columns-2 gap-x-16">
            {submissions.map((submission, index) => {
              const v = VARIATIONS[index % VARIATIONS.length];
              return (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  className="break-inside-avoid mb-12"
                >
                  <p
                    className="font-serif text-foreground leading-relaxed"
                    style={{
                      fontSize: v.fontSize,
                      opacity: v.opacity,
                      fontStyle: v.fontStyle,
                      lineHeight: 1.8,
                    }}
                  >
                    {submission.content}
                  </p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="font-serif italic text-foreground text-xl" style={{ opacity: 0.4 }}>
            The soil is ready, but no seeds have been planted yet.
          </p>
        )}

      </div>
    </div>
  );
}
