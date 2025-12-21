import {useConfigState} from "../../../../state/Config/useConfigState.ts";
import {tr} from "../../../../lib/translate.ts";

export const NoDayEventList: React.FC = () => {
    const {config} = useConfigState()

    return (
        <div>
            <>{tr('Not a working day', config.venue.id)}</>
        </div>
    )
}