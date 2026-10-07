import { useNavigate } from "react-router"; // Use react-router-dom for DOM navigations
import StatusSelect from "../StatusSelect/StatusSelect";
import img50D from "../../images/50D.png";
import img200T from "../../images/200T.png";
import img7266 from "../../images/7266.png";
import img100D from "../../images/100D.png";
import img500T from "../../images/500T.png";
// Consider importing a fallback image here if needed

export default function SpoolCard({spool}) {
    const navigate = useNavigate();
    const pastelColor = "#a2d2ff";


    const getStockImage = (filmStock) => {
        if (filmStock?.includes('50D')) return img50D;
        if (filmStock?.includes('200T')) return img200T;
        if (filmStock?.includes('7266')) return img7266;
        if (filmStock?.includes('100D')) return img100D;
        if (filmStock?.includes('500T')) return img500T;

        // Always return a fallback so the <img> tag doesn't break
        return img50D; // or a dedicated default image
    };

    const stockImgSrc = getStockImage(spool.stock);

    return (
        <div
            className="flex flex-col items-center gap-3 p-5 rounded-3xl w-45 h-fit bg-[var(--card-color)]/10 border border-[var(--card-color)]/30 hover:border-[var(--card-color)]/60 transition-colors cursor-pointer"
            onClick={() => navigate(`/spool/${spool.id}`)}
            style={{ '--card-color': pastelColor }}
        >

            <img
                src={stockImgSrc}
                alt={`${spool.stock} film`}
                className="w-32 h-32 rounded-2xl"
            />
            {/* Update to spool.name */}
            <span className="text-white font-medium">{spool.name}</span>

            {/* Wrap the dropdown to stop click bubbling */}
            <div onClick={(e) => e.stopPropagation()}>
                {/* Update to spool.status */}
                <StatusSelect status={spool.status} />
            </div>
        </div>
    )
}