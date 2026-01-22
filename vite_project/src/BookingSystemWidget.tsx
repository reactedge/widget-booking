import {BookingSystemWrapper} from "./components/BookingSystemWrapper.tsx";
import {useWidgetConfig} from "./hooks/useWidgetConfig.ts";
import {SystemStateProvider} from "./state/System/SystemStateProvider.tsx";

type Props = {
    host: HTMLElement;
};

export function BookingSystemWidget({ host }: Props) {
    const config = useWidgetConfig(host);

    if (!config) {
        console.warn('[ContactUs] Widget is not correctly configured');
        return null;
    }

    return (
        <SystemStateProvider config={config}>
            <BookingSystemWrapper venueId={config.venueId} />
        </SystemStateProvider>
    );
}
