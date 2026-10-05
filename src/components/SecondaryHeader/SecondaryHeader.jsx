import { useNavigate } from "react-router";

export default function SecondaryHeader({ title }) {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-gray-800/80 shadow-lg shadow-black/50 pt-[max(env(safe-area-inset-top),1rem)] pb-3 px-4 flex items-center justify-between">
            
           
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-1 text-[#ffcc00] active:opacity-60 transition-opacity max-md:mt-6 z-10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 -ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span className="font-semibold text-[17px] -mt-0.5 tracking-tight">Back</span>
            </button>
            
            <h1 className="text-white font-bold max-md:mt-5 absolute left-1/2 -translate-x-1/2 z-0">
                {title}
            </h1>

            <div className="w-16 max-md:mt-5"></div>
            
        </header>
    );
}