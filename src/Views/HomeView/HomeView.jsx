import SpoolCard from "../../components/SpoolCard/SpoolCard";
import { useEffect, useState } from "react";
import SpoolService from "../../services/SpoolService";
import PullToRefresh from 'react-simple-pull-to-refresh';

export default function HomeView() {

    const [spools, setSpools] = useState([])
    const [refreshKey, setRefreshKey] = useState(0);


    const handleRefresh = async () => {
        console.log("Reloading spools...");

        setSpools(SpoolService.getSpools());
        setRefreshKey(prev => prev + 1);

        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    useEffect(() => {
        setSpools(SpoolService.getActiveSpools());
    }, [])

    return (
        <div className="min-h-screen">

            <header className="sticky top-0 z-50 bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-gray-800/80 shadow-lg shadow-black/50 pt-[max(env(safe-area-inset-top),1rem)] pb-3 px-4 flex items-center justify-between">

                <div className="flex items-center gap-2 max-md:mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffcc00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    {/* title */}
                    <h1 className="text-xl font-black text-white tracking-widest uppercase mt-0.5">
                        Spool<span className="text-[#ffcc00]">Grid</span>
                    </h1>
                </div>

                {/*Search/Filter*/}
                <button className="btn btn-circle btn-ghost btn-sm text-neutral-500 hover:text-white max-md:mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>

            </header>

            <PullToRefresh
                onRefresh={handleRefresh}
                pullingContent={<div className="text-center text-neutral-400 py-4 text-sm font-bold tracking-wider uppercase">Pull to refresh</div>}
                refreshingContent={<div className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner text-warning"></span>
                    <div className="text-center text-[#ffcc00] py-4 text-sm font-bold tracking-wider uppercase">Syncing...</div>
                </div>}
                className="mt-2"
            >

                <div className="flex flex-wrap gap-3 justify-center m-2 pb-40 pt-4 min-h-[calc(100vh-100px)]">
                    {spools.map((spool, index) => (
                        <SpoolCard key={`${spool.id || index}-${refreshKey}`} spool={spool} />
                    ))}
                </div>
            </PullToRefresh>
        </div>
    )
}