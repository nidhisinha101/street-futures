import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { supabase } from "../lib/supabase";

export function SubmitPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Plant something first — the field is empty.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("submissions").insert({
        content: content.trim(),
      });

      if (error) {
        toast.error("Failed to submit: " + error.message);
        return;
      }

      toast.success("Your vision has been planted in the archive.");
      setContent("");

      setTimeout(() => {
        navigate("/view all");
      }, 1500);
    } catch (err) {
      toast.error("An error occurred while submitting.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20 px-6 sm:px-12 lg:px-8 pb-36">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-sans text-xs tracking-widest uppercase mb-6" style={{ color: "var(--signal, #5a8a6a)", opacity: 0.65 }}>
            Submit
          </p>
          <h1 className="font-serif text-5xl italic font-light text-foreground mb-4" style={{ color: "var(--kiln)", opacity: 0.9 }}>
            What does your future street look like?
          </h1>
          <p className="font-serif text-foreground/50 text-lg mb-14">
            Imagine a world where you are walking around your neighborhood and feeling safe, connected, and happy. Use the following reflection prompts to describe what your streets could look like. 
          </p>

          <div className="mb-12 pl-5" style={{ borderLeft: "2px solid var(--kiln, #c4824a)" }}>
            <p className="font-sans text-xs tracking-widest uppercase mb-3" style={{ color: "var(--foreground)", opacity: 0.4 }}>Prompts for Reflection</p>
            <ul className="font-serif italic text-foreground/55 space-y-2 text-md list-none">
              <li>Describe a day on your safe street. What do you see, hear, smell, or feel? </li>
              <li>How would you build trust with your neighbors? Who is included in your vision of community?</li>
              <li>How have you seen your neighborhood change over time? How do you want to see it evolve over the next 5 years?</li>
              <li>What technology could you imagine making your city a more fun place to live, a safer place to be? What technology would not exist in this vision?</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label htmlFor="content" className="font-sans text-xs tracking-widest uppercase" style={{ color: "var(--foreground)", opacity: 0.5 }}>
                The Vision
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share the future you wish to see..."
                className="w-full font-serif text-base leading-relaxed bg-transparent resize-none rounded-2xl p-5 outline-none"
                style={{
                  border: "1px solid color-mix(in srgb, var(--foreground) 12%, transparent)",
                  color: "var(--foreground)",
                  opacity: 0.8,
                  minHeight: "280px",
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 font-sans text-sm tracking-wide rounded-full cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "var(--foreground)",
                  color: "var(--background)",
                  padding: "0.875rem 1.5rem",
                  border: "none",
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit to Archive"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                disabled={isSubmitting}
                className="flex-1 font-sans text-sm tracking-wide rounded-full cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "transparent",
                  color: "var(--foreground)",
                  opacity: 0.5,
                  padding: "0.875rem 1.5rem",
                  border: "1px solid color-mix(in srgb, var(--foreground) 15%, transparent)",
                }}
              >
                Return to Home
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}