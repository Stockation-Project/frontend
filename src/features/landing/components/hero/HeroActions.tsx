import { useNavigate } from "react-router-dom";

const HeroActions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center gap-3 mb-10 md:mb-14">
      <button
        onClick={() => navigate("/register")}
        className="bg-brand hover:bg-brand-950 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-md hover:-translate-y-0.5 cursor-pointer"
      >
        Daftar Sekarang
      </button>
      <button
        onClick={() => document.getElementById("fitur")?.scrollIntoView({ behavior: "smooth" })}
        className="bg-background-primary border border-border-primary hover:border-brand-200 text-text-secondary text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer"
      >
        Lihat Fitur
      </button>
    </div>
  );
};

export default HeroActions;