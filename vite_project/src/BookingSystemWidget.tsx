import {BookingSystemWrapper} from "./components/BookingSystemWrapper.tsx";
import {useWidgetConfig} from "./hooks/useWidgetConfig.ts";
import {SystemStateProvider} from "./state/System/SystemStateProvider.tsx";
import {activity} from "../activity";

type Props = {
    host: HTMLElement;
};

export function BookingSystemWidget({ host }: Props) {
    const widgetConfig = useWidgetConfig(host);

    if (!widgetConfig) {
        activity('bootstrap', '[ContactUs] Widget is not correctly configured', null, 'warn');
        return null;
    }

    return (
        <SystemStateProvider config={widgetConfig}>
            <BookingSystemWrapper venueId={widgetConfig.venueId} />
        </SystemStateProvider>
    );
}
