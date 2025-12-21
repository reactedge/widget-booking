import type {PreferenceProps} from "../types/domain/preference.types.ts";
import {Spinner} from "./global/Spinner.tsx";
import {useConfigState} from "../state/Config/useConfigState.ts";

export function EventTypeGroupPreference({
     value,
     onSelect
 }: PreferenceProps) {
    const { config } = useConfigState()

    if (config.eventTypeGroups === undefined) return <Spinner />;

    return (
        <div className="booking-options booking-options--group">
            {config.eventTypeGroups.map((option) => (
                <button
                    key={option.id}
                    type="button"
                    className={`booking-option ${value === option.id ? 'is-active' : ''}`}
                    onClick={() => onSelect(option.id)}
                >
                    <span className="booking-option-label">{option.label}</span>
                    {option.description && (
                        <span className="booking-option-desc">{option.description}</span>
                    )}
                </button>
            ))}
        </div>
    )
}
