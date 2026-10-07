import SecondaryHeader from "../../components/SecondaryHeader/SecondaryHeader";
import SpoolService from "../../services/SpoolService";
import SpoolCard from "../../components/SpoolCard/SpoolCard";
import { useEffect, useState } from "react";
import PullToRefresh from 'react-simple-pull-to-refresh';

export default function ArchivedView() {

    const [spools, setSpools] = useState([])
    const [refreshKey, setRefreshKey] = useState(0);


    const handleRefresh = async () => {
        console.log("Reloading spools...");

        setSpools(SpoolService.getSpools());
        setRefreshKey(prev => prev + 1);

        await new Promise(resolve => setTimeout(resolve, 1000));
    };


    useEffect(() => {
        setSpools(SpoolService.getArchivedSpools());
    }, [])

    return (
        <>
            <SecondaryHeader title="Archived" />

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
        </>
    )
}