export default function Icon({ children, item }) {
    const handleInfo = (e) => {
        const pos = e.target.getBoundingClientRect();

        item.style.top = `${pos.top}px`;
        item.style.bottom = `${pos.bottom}px`;
    }
    return (
        <div className="conteiner-icon" onMouseOver={(e) => handleInfo(e)}>
            {children}
        </div>
    );
}