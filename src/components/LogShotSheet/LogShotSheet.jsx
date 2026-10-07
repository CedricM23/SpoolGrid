import { useEffect, useState } from 'react';
import SpoolService from '../../services/SpoolService';

export default function LogShotSheet({ preselectedSpoolId, preselectedSpoolName, preselectedSpoolStock }) {
    const [fps, setFps] = useState('18');
    const [framing, setFraming] = useState('Med');
    const [lighting, setLighting] = useState('sun');
    const [duration, setDuration] = useState('5s');
    const [spools, setSpools] = useState([])

    const [shotData, setShotData] = useState({
        spoolId: preselectedSpoolId || '',
    });

    useEffect(() => {
        setSpools(SpoolService.getSpools());
    }, [])

    const activeBtn = "bg-[#ffcc00] text-black hover:bg-yellow-300 border-[#ffcc00] z-10";
    const inactiveBtn = "bg-black text-neutral-400 border-gray-800 hover:bg-gray-800";

    return (
        <dialog id="log_shot_modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-[#0a0a0a] border-t border-gray-800 rounded-3xl p-4 text-white pb-8">

                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-[#ffcc00]">Log New Shot</h3>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost text-neutral-400">✕</button>
                    </form>
                </div>

                <div className="flex flex-col gap-3">

                    {/* Shot Name */}
                    <div className="form-control w-full">
                        <label className="label pb-1 pt-0">
                            <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Shot Name</span>
                        </label>
                        <input type="text" className="input input-sm h-10 w-full text-base bg-black border-gray-800 focus:border-[#ffcc00]" placeholder="e.g. Shot 1A" />
                    </div>

                    {/* ROW 1: Aperture & Filter */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="form-control w-full">
                            <label className="label pb-1 pt-0">
                                <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Aperture</span>
                            </label>
                            <input type="text" placeholder="e.g. f/5.6" className="input input-sm input-bordered border-gray-800 bg-black focus:border-[#ffcc00] w-full text-base" />
                        </div>
                        <div className="form-control w-full">
                            <label className="label pb-1 pt-0">
                                <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Filter</span>
                            </label>
                            <select className="select select-sm select-bordered border-gray-800 bg-black focus:border-[#ffcc00] w-full text-white text-base">
                                <option>None (Daylight)</option>
                                <option>85B (Tungsten)</option>
                                <option>ND4</option>
                            </select>
                        </div>
                    </div>

                    {/* ROW 2: FPS & Framing */}
                    <div className="grid grid-cols-2 gap-3 mt-1">
                        <div className="form-control w-full">
                            <label className="label pb-1 pt-0">
                                <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">FPS</span>
                            </label>
                            <div className="join w-full">
                                <button type="button" onClick={() => setFps('18')} className={`btn btn-sm join-item flex-1 text-xs ${fps === '18' ? activeBtn : inactiveBtn}`}>18</button>
                                <button type="button" onClick={() => setFps('24')} className={`btn btn-sm join-item flex-1 text-xs ${fps === '24' ? activeBtn : inactiveBtn}`}>24</button>
                                <button type="button" onClick={() => setFps('1')} className={`btn btn-sm join-item flex-1 text-xs ${fps === '1' ? activeBtn : inactiveBtn}`}>1</button>
                            </div>
                        </div>
                        <div className="form-control w-full">
                            <label className="label pb-1 pt-0">
                                <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Framing</span>
                            </label>
                            <div className="join w-full">
                                <button type="button" onClick={() => setFraming('Wide')} className={`btn btn-sm join-item flex-1 text-xs ${framing === 'Wide' ? activeBtn : inactiveBtn}`}>Wide</button>
                                <button type="button" onClick={() => setFraming('Med')} className={`btn btn-sm join-item flex-1 text-xs ${framing === 'Med' ? activeBtn : inactiveBtn}`}>Med</button>
                                <button type="button" onClick={() => setFraming('Tight')} className={`btn btn-sm join-item flex-1 text-xs ${framing === 'Tight' ? activeBtn : inactiveBtn}`}>Tight</button>
                            </div>
                        </div>
                    </div>

                    {/* Lighting & Duration */}
                    <div className="grid grid-cols-5 gap-4 mt-1">
                        {/* Lighting */}
                        <div className="form-control col-span-3 w-full">
                            <label className="label pb-1 pt-0">
                                <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Lighting</span>
                            </label>
                            <div className="join w-full">
                                <button type="button" onClick={() => setLighting('sun')} className={`btn btn-sm join-item flex-1 text-base ${lighting === 'sun' ? activeBtn : inactiveBtn}`}>☀️</button>
                                <button type="button" onClick={() => setLighting('shade')} className={`btn btn-sm join-item flex-1 text-base ${lighting === 'shade' ? activeBtn : inactiveBtn}`}>⛅</button>
                                <button type="button" onClick={() => setLighting('cloud')} className={`btn btn-sm join-item flex-1 text-base ${lighting === 'cloud' ? activeBtn : inactiveBtn}`}>☁️</button>
                                <button type="button" onClick={() => setLighting('bulb')} className={`btn btn-sm join-item flex-1 text-base ${lighting === 'bulb' ? activeBtn : inactiveBtn}`}>💡</button>
                            </div>
                        </div>
                        {/* Length */}
                        <div className="form-control col-span-2 w-full">
                            <label className="label pb-1 pt-0">
                                <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider ">Length in seconds</span>
                            </label>
                            <input
                                type="number"
                                className="input bg-black h-8 focus:border-[#ffcc00] text-base"
                                required
                                placeholder='e.g. 59'
                            />
                        </div>
                    </div>

                    {/* Subject / Notes */}
                    <div className="form-control w-full mt-1">
                        <label className="label pb-1 pt-0">
                            <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Subject / Notes</span>
                        </label>
                        <textarea className="textarea textarea-sm textarea-bordered border-gray-800 bg-black focus:border-[#ffcc00] h-16 text-base leading-tight w-full" placeholder="What are you shooting?"></textarea>
                    </div>

                    {/* Spool Assignment */}
                    <div className="form-control w-full mt-2 p-3 border border-gray-800 rounded-2xl bg-black">
                        <label className="label pb-1 pt-0">
                            <span className="text-[10px] text-[#ffcc00] uppercase font-bold tracking-wider">Assign to Spool</span>
                        </label>
                        <select className="select select-bordered bg-neutral-900 text-white w-full">

                            {preselectedSpoolName ? (
                                /* Show only the locked, preselected spool */
                                <option value={preselectedSpoolId}>
                                    {preselectedSpoolName} ({preselectedSpoolStock})
                                </option>
                            ) : (
                                /* Wrap multiple sibling elements in a React Fragment */
                                <>
                                    <option disabled value="">Select a spool...</option>

                                    {
                                        spools.map((spool) => (
                                            <option key={spool.id} value={spool.id}>
                                                {spool.name} ({spool.stock})
                                            </option>
                                        ))}
                                </>
                            )}
                        </select>

                    </div>

                    {/* Submit */}
                    <button type="button" className="btn btn-sm h-10 w-full mt-2 bg-[#ffcc00] hover:bg-yellow-300 text-black border-none font-bold text-base">
                        Save Shot
                    </button>

                </div>
            </div>

            <form method="dialog" className="modal-backdrop bg-black/80">
                <button>close</button>
            </form>
        </dialog>
    );
}