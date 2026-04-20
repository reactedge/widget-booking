import {BookingSystemWrapper} from "./components/BookingSystemWrapper.tsx";
import {useWidgetConfig} from "./hooks/useWidgetConfig.ts";
import {SystemStateProvider} from "./state/System/SystemStateProvider.tsx";
import {activity} from "./activity";
import {UserStateProvider} from "./state/User/UserStateProvider.tsx";
import {ErrorState} from "./components/global/ErrorState.tsx";

type Props = {
    host: HTMLElement;
};

export function BookingSystemWidget({ host }: Props) {
    const {config, error} = useWidgetConfig(host);

    if (!config) return null;
    if (error) return <ErrorState />

    if (!config.booking) {
        activity('bootstrap', 'Widget is not correctly configured', null, 'warn');
        return null;
    }

    return (
            <SystemStateProvider config={config.booking}>
                <UserStateProvider config={config.user}>
                    <BookingSystemWrapper venueId={config.booking.venueId} />
                </UserStateProvider>
            </SystemStateProvider>
    );
}
