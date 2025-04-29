import { bind } from "astal";
import { LevelBar } from "astal/gtk4/widget";
import Battery from "gi://AstalBattery";

export default function BatteryStatus() {
    const battery = Battery.get_default();
    return (
        <box vexpand cssClasses={["battery"]} spacing={2} valign={CENTER}>
            <LevelBar setup={self => self.add_offset_value("danger", 0.20)}
                value={bind(battery, "percentage")}>
            </LevelBar>
            <image iconName={bind(battery, "iconName")} />
        </box>
    );
}