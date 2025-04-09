import { App, Astal, Gtk, Gdk } from "astal/gtk4"
import { Variable } from "astal"
import Workspaces from "./components/bar/workspaces"
import ThemeChanger, { themeVar } from "./components/bar/themeChanger"

const time = Variable("").poll(1000, "date")

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

    return <window
        visible
        cssClasses={themeVar().as(theme => ["Bar", theme])}
        gdkmonitor={gdkmonitor}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={TOP | LEFT | RIGHT}
        application={App}>
        <centerbox cssName="centerbox">
            <box>
                <button
                    onClicked="echo hello"
                    hexpand
                    halign={Gtk.Align.CENTER}
                >
                    Welcome to AGS!
                </button>
                <ThemeChanger/>
            </box>
            <Workspaces/>
            <menubutton
                hexpand
                halign={Gtk.Align.CENTER}
            >
                <label label={time()} />
                <popover>
                    <Gtk.Calendar />
                </popover>
            </menubutton>
        </centerbox>
    </window>
}
