import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaLinkedinIn, FaEnvelope, FaGithub } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import "./Contact.css";

export default function Contact() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const recipientEmail = "harigmindia7@gmail.com";

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email service is not configured.", { icon: "⚠️" });
      return;
    }

    setIsSending(true);

    try {
      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedMessage = message.trim();

      const notificationPayload = {
        from_name: trimmedName,
        from_email: trimmedEmail,
        reply_to: trimmedEmail,
        message: trimmedMessage,
        subject: `Portfolio Contact from ${trimmedName || "Website Visitor"}`,
        to_name: "Hari",
      };

      const autoReplyPayload = {
        to_name: trimmedName || "there",
        to_email: trimmedEmail,
        from_name: "Hari GM",
        message: trimmedMessage,
      };

      const sends = [emailjs.send(serviceId, templateId, notificationPayload, { publicKey })];

      if (autoReplyTemplateId) {
        sends.push(emailjs.send(serviceId, autoReplyTemplateId, autoReplyPayload, { publicKey }));
      }

      

      await Promise.all(sends);

      toast.success("Message sent successfully.", { icon: "🚀" });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      const errorMessage =
        typeof error?.text === "string"
          ? error.text
          : "Failed to send message. Please try again.";
      toast.error(errorMessage, { icon: "❌" });
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visible = 1 - rect.top / windowHeight;
      const clamped = Math.min(Math.max(visible, 0), 1);

      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="contact-section" ref={sectionRef} id="contact">

      <div className="light-sweep" />

      <div
        className="contact-content"
        style={{
          transform: `translateY(${80 - progress * 80}px)`,
          opacity: progress
        }}
      >
        <h1 className="cinematic-title">
          Let’s Create <br /> Something Timeless
        </h1>

        <p className="cinematic-sub">
          Every great product starts with a simple conversation.
        </p>

        <div className="contact-panels">
          <div
            className="panel left"
            style={{
              transform: `translateX(${ -120 + progress * 120 }px)`
            }}
          >
            <h3 className="panel-title">Contact</h3>
            <p>harigmindia7@gmail.com</p>
            <p>+91 7812811213</p>

            <div className="social-carousel" aria-label="Social links carousel">
              <div className="social-carousel-track">
                <a href="https://www.instagram.com/hari_gm" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-item instagram" style={{ "--i": 0 }}>
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/in/harigm7/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-item linkedin" style={{ "--i": 1 }}>
                  <FaLinkedinIn />
                </a>
                <a href="mailto:harigmindia7@gmail.com" aria-label="Gmail" className="social-item gmail" style={{ "--i": 2 }}>
                  <FaEnvelope />
                </a>
                <a href="https://github.com/harigm7" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-item github" style={{ "--i": 3 }}>
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>

          <div
            className="panel right"
            style={{
              transform: `translateX(${ 120 - progress * 120 }px)`
            }}
          >
            <h3 className="panel-title">Message</h3>
            <form onSubmit={handleSendMessage}>
              <input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                placeholder="Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
