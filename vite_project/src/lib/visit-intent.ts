import type {VisitIntentInfoState} from "../state/Intent/type.ts";
import type {BookingStep} from "../types/domain/bookingsystem.types.ts";

export const getVisitIntentStep = (
    visitIntent: VisitIntentInfoState
): BookingStep => {
    if (!visitIntent.eventTypeGroupId) {
        return 'EventTypeGroup';
    }

    if (!visitIntent.eventTypeId) {
        return 'EventType';
    }

    if (!visitIntent.weekIntent) {
        return 'Week';
    }

    return 'Ready';
};
