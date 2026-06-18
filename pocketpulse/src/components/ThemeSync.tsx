import { useEffect } from "react"

import { useSettingsStore } from "../store/settingsStore"

export default function ThemeSync() {
  const themeMode = useSettingsStore((state) => state.themeMode)

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      themeMode === "dark"
    )
  }, [themeMode])

  return null
}
