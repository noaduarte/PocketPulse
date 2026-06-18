import SettingsPanel from "../components/SettingsPanel"
import {
  pageSubtitleClass,
  pageTitleClass,
} from "../components/formStyles"

export default function SettingsPage() {
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <div>
        <h2 className={pageTitleClass}>Settings</h2>
        <p className={pageSubtitleClass}>
          Customize appearance, currency, and app preferences.
        </p>
      </div>

      <SettingsPanel />
    </div>
  )
}
