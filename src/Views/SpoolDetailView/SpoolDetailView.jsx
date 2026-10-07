import { useEffect } from "react"
import { useParams } from "react-router";
import SpoolService from "../../services/SpoolService";
import { useState } from "react";
import StatusSelect from "../../components/StatusSelect/StatusSelect";
import img50D from "../../images/50D.png";
import img200T from "../../images/200T.png";
import img7266 from "../../images/7266.png";
import img100D from "../../images/100D.png";
import img500T from "../../images/500T.png";
import SecondaryHeader from "../../components/SecondaryHeader/SecondaryHeader"
import LogShotSheet from "../../components/LogShotSheet/LogShotSheet"

export default function SpoolDetailView() {
    const { id } = useParams();
    const [spool, setSpool] = useState([])
    const [loading, setLoading] = useState(true)

    const getStockImage = (filmStock) => {
        if (filmStock?.includes('50D')) return img50D;
        if (filmStock?.includes('200T')) return img200T;
        if (filmStock?.includes('7266')) return img7266;
        if (filmStock?.includes('100D')) return img100D;
        if (filmStock?.includes('500T')) return img500T;

        return img50D;
    };


    const stockImgSrc = getStockImage(spool.stock);

    useEffect(() => {
        // SpoolService.getspoolById(id)
        // .then((reponse) => )
        setSpool(SpoolService.getspoolById(id));
        setLoading(false)

    }, [id])

    return (
        <>
            {loading ?
                (<div>
                    <SecondaryHeader />
                    <div className="flex align-middle gap-2 justify-center items-center min-h-screen">
                        <span className="loading loading-spinner text-warning"></span>
                        <p className="text-[#ffcc00]"> loading spool </p>
                    </div>
                </div>)
                :
                (<div className="pb-20">
                    {/* HERO */}
                    <SecondaryHeader />
                    <div className="relative flex flex-col items-center justify-center pt-20 pb-10">
                        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                            <img
                                src={stockImgSrc}
                                alt="Film Stock Background"
                                className="w-full h-full object-cover blur-2xl opacity-30"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/60 to-[#0a0a0a]"></div>
                        </div>

                        {/* Primary Info (Foreground) */}
                        <div className="relative z-10 flex flex-col items-center gap-4 mt-4">
                            <h1 className="text-4xl font-black text-white tracking-wide drop-shadow-md">
                                {spool.name}
                            </h1>
                            <StatusSelect status={spool.status} />
                        </div>

                    </div>

                    {/* Core Metadata */}

                    <div className="border bg-neutral-900 border-gray-800 my-4 rounded-2xl p-5 flex flex-col gap-2 mx-4">
                        <div className="text-center">
                            {/* Film Stock */}
                            <p className="text-[#ffcc00]">Stock</p>
                            <p>{spool.stock}</p>
                            {/* Format */}
                            <p className="text-[#ffcc00]">Format</p>
                            <p>{spool.format}</p>
                            {/* process */}
                            <p className="text-[#ffcc00]">Process</p>
                            <p className="text-white font-medium">{spool.stockType}</p>
                            {/* assignedCamera */}
                            <p className="text-[#ffcc00]">Assigned Camera</p>
                            <p>{spool.assignedCamera}</p>
                        </div>
                    </div>



                    {/* Production Notes */}
                    <div className="border bg-neutral-900 border-gray-800 my-4 rounded-2xl p-5 flex flex-col gap-2 mx-4">
                        <div className="text-center">
                            <p className="text-[#ffcc00]">Production Notes</p>
                            <textarea className="textarea rounded-xl bg-[#000] mt-2 resize-none focus:border-[#ffcc00]" rows="5" placeholder="Bio"></textarea>
                            <span className="text-xs text-neutral-500 font-medium mt-1.5 flex justify-end pr-1">Saved just now</span>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="border bg-neutral-900 border-gray-800 my-4 rounded-2xl p-5 flex flex-col gap-2 mx-4">
                        <label className="label pb-2 pt-0 px-0">
                            <span className="text-[10px] text-[#ffcc00] uppercase font-bold tracking-wider">Timeline</span>
                        </label>

                        <ul className="timeline timeline-vertical timeline-compact">
                            {/* Step 1: Loaded / Shooting */}
                            <li>
                                <div className="timeline-middle text-[#ffcc00]">
                                    {/* Checked Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="timeline-end mb-4">
                                    <time className="text-xs text-neutral-500 font-medium">Oct 1, 2026</time>
                                    <div className="text-sm text-white font-medium">Loaded</div>
                                    <div className="text-xs text-neutral-400 mt-0.5">Loaded into {spool.assignedCamera || "camera"}</div>
                                </div>
                                <hr className="bg-[#ffcc00]" />
                            </li>

                            {/* Step 2: Exposed */}
                            <li>
                                <hr className={['exposed', 'at-lab', 'received'].includes(spool.status) ? "bg-[#ffcc00]" : "bg-neutral-700"} />
                                <div className={`timeline-middle ${['exposed', 'at-lab', 'received'].includes(spool.status) ? "text-[#ffcc00]" : "text-neutral-700"}`}>
                                    {['exposed', 'at-lab', 'received'].includes(spool.status) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><circle cx="10" cy="10" r="7" /></svg>
                                    )}
                                </div>
                                <div className="timeline-end mb-4">
                                    <time className="text-xs text-neutral-500 font-medium">{['exposed', 'at-lab', 'received'].includes(spool.status) ? "Oct 4, 2026" : "--"}</time>
                                    <div className="text-sm text-white font-medium">Exposed</div>
                                    <div className="text-xs text-neutral-400 mt-0.5">Ready for lab processing</div>
                                </div>
                                <hr className={['at-lab', 'received'].includes(spool.status) ? "bg-[#ffcc00]" : "bg-neutral-700"} />
                            </li>

                            {/* Step 3: Shipped to Lab */}
                            <li>
                                <hr className={['at-lab', 'received'].includes(spool.status) ? "bg-[#ffcc00]" : "bg-neutral-700"} />
                                <div className={`timeline-middle ${['at-lab', 'received'].includes(spool.status) ? "text-[#ffcc00]" : "text-neutral-700"}`}>
                                    {['at-lab', 'received'].includes(spool.status) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><circle cx="10" cy="10" r="7" /></svg>
                                    )}
                                </div>
                                <div className="timeline-end mb-4">
                                    <time className="text-xs text-neutral-500 font-medium">{['at-lab', 'received'].includes(spool.status) ? "Oct 6, 2026" : "--"}</time>
                                    <div className="text-sm text-white font-medium">Shipped to Lab</div>
                                    <div className="text-xs text-neutral-400 mt-0.5">Sent to your preferred lab</div>
                                    {/* add usps, fedex or ups API for tracking */}
                                </div>
                                <hr className={spool.status === 'received' ? "bg-[#ffcc00]" : "bg-neutral-700"} />
                            </li>

                            {/* Step 4: Received */}
                            <li>
                                <hr className={spool.status === 'received' ? "bg-[#ffcc00]" : "bg-neutral-700"} />
                                <div className={`timeline-middle ${spool.status === 'received' ? "text-[#ffcc00]" : "text-neutral-700"}`}>
                                    {spool.status === 'received' ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><circle cx="10" cy="10" r="7" /></svg>
                                    )}
                                </div>
                                <div className="timeline-end">
                                    <time className="text-xs text-neutral-500 font-medium">{spool.status === 'received' ? "Oct 12, 2026" : "--"}</time>
                                    <div className="text-sm text-white font-medium">Received</div>
                                    <div className="text-xs text-neutral-400 mt-0.5">Scans downloaded</div>
                                </div>
                            </li>
                        </ul>
                    </div>




                    {/* Logged Shots */}
                    <div className="border bg-neutral-900 border-gray-800 my-4 rounded-2xl p-5 flex flex-col gap-2 mx-4">
                        <div className="flex justify-between items-end pb-2">
                            <label className="label p-0">
                                <span className="text-[10px] text-[#ffcc00] uppercase font-bold tracking-wider">Logged Shots</span>
                            </label>
                            <span className="text-xs text-neutral-500 font-medium">3 Shots Total</span>
                        </div>

                        <div className="flex flex-col">
                            {/* Shot Row 1 */}
                            <div className="flex justify-between items-center py-3 border-b border-gray-800 last:border-0">
                                <div className="flex flex-col">
                                    <span className="text-white font-medium text-sm">1. Ext. Beach - Wide</span>
                                    <span className="text-neutral-500 text-xs mt-0.5">Oct 4, 10:42 AM</span>
                                </div>
                                <span className="text-[#ffcc00] font-medium text-sm tabular-nums">00:12</span>
                            </div>

                            {/* Shot Row 2 */}
                            <div className="flex justify-between items-center py-3 border-b border-gray-800 last:border-0">
                                <div className="flex flex-col">
                                    <span className="text-white font-medium text-sm">2. Ext. Beach - Med</span>
                                    <span className="text-neutral-500 text-xs mt-0.5">Oct 4, 11:15 AM</span>
                                </div>
                                <span className="text-[#ffcc00] font-medium text-sm tabular-nums">00:08</span>
                            </div>

                            {/* Shot Row 3 */}
                            <div className="flex justify-between items-center py-3 border-b border-gray-800 last:border-0">
                                <div className="flex flex-col">
                                    <span className="text-white font-medium text-sm">3. Int. Car - Close Up</span>
                                    <span className="text-neutral-500 text-xs mt-0.5">Oct 4, 01:30 PM</span>
                                </div>
                                <span className="text-[#ffcc00] font-medium text-sm tabular-nums">00:15</span>
                            </div>
                        </div>

                        {/* Quick Add Button */}
                        <button className="mt-2 w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2" onClick={() => {
                            document.getElementById('log_shot_modal')?.showModal();
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Log New Shot
                        </button>
                    </div>


                    {/* Action Center */}
                    <div className="border bg-neutral-900 border-gray-800 my-4 rounded-2xl p-5 flex flex-col gap-2 mx-4">
                        {/* Export Log */}
                        <button className="btn btn-md bg-neutral-900 border border-gray-700 hover:border-[#ffcc00] hover:bg-gray-800 text-white hover:text-[#ffcc00] rounded-2xl w-full flex justify-between items-center px-4 transition-all">
                            <span className="font-medium text-base">Export Lab Sheet</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                        </button>

                        {/* TODO: connect to API call to allow users to edit spool details */}
                        <button className="btn btn-md bg-neutral-900 border border-gray-700 hover:border-[#ffcc00] hover:bg-gray-800 text-white hover:text-[#ffcc00] rounded-2xl w-full flex justify-between items-center px-4 transition-all">
                            <span className="font-medium text-base">Edit Details</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                            </svg>
                        </button>


                        {/* Delete / Archive */}
                        {/* TODO: add api call for spool arching, IMPORTANT:  SPOOL CAN ONLY BE DELETED IF IT'S ARCHIVED */}
                        <button className="btn btn-md bg-neutral-900 border border-red-900 hover:border-[#ffcc00] hover:bg-gray-800 text-white hover:text-[#ffcc00] rounded-2xl w-full flex justify-between items-center px-4 transition-all">
                            <span className="font-medium text-base text-red-500">Archive Spool</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>


                    </div>

                    <LogShotSheet preselectedSpoolId={spool.id} preselectedSpoolName={spool.name} preselectedSpoolStock={spool.stock} />

                </div>)}
        </>
    )
}