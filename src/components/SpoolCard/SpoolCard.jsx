import StatusSelect from "../StatusSelect/StatusSelect";

export default function SpoolCard({ name, status, stock }) {

    const pastelColor = "#a2d2ff";

    const getStockImage = (filmStock) => {
        if (filmStock?.includes('50D')) return '/images/50D.png';
        if (filmStock?.includes('200T')) return '/images/200T.png';
        if (filmStock?.includes('7266')) return '/images/7266.png';
        if (filmStock?.includes('100D')) return '/images/100D.png';
        if (filmStock?.includes('500T')) return '/images/500T.png';

        // A fallback image if the stock doesn't match
        return '/images/default-cartridge.jpg';
    };

    const stockImgSrc = getStockImage(stock);

    return (
        <div className="flex flex-col items-center gap-3 p-5 rounded-3xl w-45 h-fit bg-[var(--card-color)]/10 border border-[var(--card-color)]/30 hover:border-[var(--card-color)]/60 transition-colors"
            style={{ '--card-color': pastelColor }}>
            <img src={stockImgSrc}
                alt={`${stock} film`}
                className="w-35 h-35 rounded-2xl" />
            <span className="text-white font-medium">{name}</span>
            <StatusSelect status={status} />
        </div>
    )
}