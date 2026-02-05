import {BookingSystemWrapper} from "./components/BookingSystemWrapper.tsx";
import {useWidgetConfig} from "./hooks/useWidgetConfig.ts";
import {SystemStateProvider} from "./state/System/SystemStateProvider.tsx";
import {activity} from "../activity";
import {UserStateProvider} from "./state/User/UserStateProvider.tsx";

type Props = {
    host: HTMLElement;
};

export function BookingSystemWidget({ host }: Props) {
    const { booking, user } = useWidgetConfig(host);

    if (!booking) {
        activity('bootstrap', '[ContactUs] Widget is not correctly configured', null, 'warn');
        return null;
    }

    return (
            <SystemStateProvider config={booking}>
                <UserStateProvider config={user}>
                    <BookingSystemWrapper venueId={booking.venueId} />
                </UserStateProvider>
            </SystemStateProvider>
    );
}
