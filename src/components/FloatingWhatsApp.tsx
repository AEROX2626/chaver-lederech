import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/972500000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שיחה בוואטסאפ"
      className="fixed bottom-5 left-5 z-40 grid h-13 w-13 place-items-center rounded-full bg-slate-900 text-white shadow-xl transition hover:scale-105 hover:bg-slate-800 sm:hidden"
      style={{ height: "52px", width: "52px" }}
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
