// src/hooks/useVenueTranslation.ts

import {useConfigState} from "../../state/Config/useConfigState.ts";
import {tr} from "../../lib/translate.ts";

export function useVenueTranslation() {
    const { config } = useConfigState();
    const venueId = config.venue?.id;

    return (key: string) => tr(key, venueId);
}
