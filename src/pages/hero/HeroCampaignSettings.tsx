import { useState } from "react";

type Props = {
  isActive: boolean;
  setIsActive: (value: boolean) => void;

  startAt: string;
  setStartAt: (value: string) => void;

  endAt: string;
  setEndAt: (value: string) => void;

  sortOrder: number;
  setSortOrder: (value: number) => void;
};

export default function HeroCampaignSettings({
  isActive,
  setIsActive,
  startAt,
  setStartAt,
  endAt,
  setEndAt,
  sortOrder,
  setSortOrder,
}: Props) {
  const [scheduleEnabled, setScheduleEnabled] = useState(
    Boolean(startAt || endAt),
  );
  const now = new Date();
  const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  return (
    <section className="bg-white shadow-sm rounded-2xl border p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Campaign Settings</h2>

        <p className="text-sm text-slate-500 mt-1">
          Control the hero status, schedule, and display order.
        </p>
      </div>

      {/* STATUS */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-900">Status</h3>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
          <div>
            <p className="text-sm font-medium text-slate-800">Hero Status</p>

            <p className="text-xs text-slate-500 mt-1">
              {isActive
                ? "This hero is currently active."
                : "This hero is inactive."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            aria-label={isActive ? "Deactivate hero" : "Activate hero"}
            className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
              isActive ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                isActive ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* SCHEDULE */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Schedule</h3>

          <p className="text-xs text-slate-500 mt-1">
            Choose whether this hero should always be active or run during a
            specific period.
          </p>
        </div>

        {/* SCHEDULE OPTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* ALWAYS ACTIVE */}
          <label
            className={`rounded-xl border p-4 cursor-pointer transition ${
              !scheduleEnabled
                ? "border-slate-900 bg-slate-50"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name="heroSchedule"
              checked={!scheduleEnabled}
              onChange={() => {
                setScheduleEnabled(false);
                setStartAt("");
                setEndAt("");
              }}
              className="sr-only"
            />

            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${
                  !scheduleEnabled ? "border-slate-900" : "border-slate-300"
                }`}
              >
                {!scheduleEnabled && (
                  <span className="h-2 w-2 rounded-full bg-slate-900" />
                )}
              </span>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Always Active
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  No start or end date.
                </p>
              </div>
            </div>
          </label>

          {/* SCHEDULED */}
          <label
            className={`rounded-xl border p-4 cursor-pointer transition ${
              scheduleEnabled
                ? "border-slate-900 bg-slate-50"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name="heroSchedule"
              checked={scheduleEnabled}
              onChange={() => {
                setScheduleEnabled(true);
              }}
              className="sr-only"
            />

            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${
                  scheduleEnabled ? "border-slate-900" : "border-slate-300"
                }`}
              >
                {scheduleEnabled && (
                  <span className="h-2 w-2 rounded-full bg-slate-900" />
                )}
              </span>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Scheduled
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  Set when this hero should run.
                </p>
              </div>
            </div>
          </label>
        </div>

        {/* DATE FIELDS */}
        {scheduleEnabled && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* START DATE */}
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Start Date
              </span>

              <input
                type="datetime-local"
                value={startAt}
                onChange={(e) => setStartAt(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </label>

            {/* END DATE */}
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                End Date
              </span>

              <input
                type="datetime-local"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
                min={localNow}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </label>
          </div>
        )}
      </div>

      {/* DISPLAY ORDER */}
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Display Order
          </h3>

          <p className="text-xs text-slate-500 mt-1">
            Used later when multiple hero banners are supported.
          </p>
        </div>

        <input
          type="number"
          min={1}
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value))}
          className="w-full sm:w-40 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        />
      </div>
    </section>
  );
}
