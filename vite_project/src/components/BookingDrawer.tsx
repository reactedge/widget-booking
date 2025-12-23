interface BookingDrawerProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
    open,
    onClose,
    children,
}) => {
    if (!open) return null;

    return (
        <div className="booking-drawer-backdrop" onClick={onClose}>
            <div
                className="booking-drawer"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="booking-drawer-close"
                    onClick={onClose}
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};
