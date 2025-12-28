import {useVisitIntentState} from "../../../state/Intent/useVisitIntentState.ts";
import {useConfigState} from "../../../state/Config/useConfigState.ts";
import {FilterSection} from "../FilterSection.tsx";
import {PresenterOptions} from "./HostFilter/PresenterOptions.tsx";

export function HostFilter() {
    const { visitIntent, setEventHost } = useVisitIntentState();
    const { config } = useConfigState();

    if (!config.eventHosts || config.eventHosts.length <= 1) {
        return null;
    }

    const hasPresenter = visitIntent.hostId !== '';

    function formatSelectedPresenter(hostId: string): string {
        if (!hostId) return '';

        return (
            config.eventHosts.find((host) => host.id === hostId)?.name ?? ''
        );
    }

    const summary =
        visitIntent.hostId === ''
            ? 'Any'
            : formatSelectedPresenter(visitIntent.hostId);

    return (
        <FilterSection
            title="Presenter"
            isResolved={hasPresenter}
            summary={summary}
            onEdit={() => setEventHost('')}
        >
            <PresenterOptions
                hosts={config.eventHosts}
                selectedId={visitIntent.hostId}
                onSelect={setEventHost}
            />
        </FilterSection>
    );

    /*return (
        <div className="booking-row booking-filter--host">
            <h3>Presenter</h3>

            <div
                className="booking-options booking-options--host"
                role="group"
                aria-label="Preferred host"
            >
                <button
                    key=""
                    type="button"
                    className="booking-option"
                    aria-pressed="false"
                    onClick={() => setEventHost('')}
                >
                    <span className="booking-option-label">
                        Any
                    </span>
                </button>
                {config.eventHosts.map((host) => {
                    const isActive = visitIntent.hostId === host.id;

                    return (
                        <button
                            key={host.id}
                            type="button"
                            className={`booking-option ${isActive ? "is-active" : ""}`}
                            aria-pressed={isActive}
                            onClick={() => setEventHost(host.id)}
                        >
                            <span className="booking-option-label">
                                {host.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );*/
}
