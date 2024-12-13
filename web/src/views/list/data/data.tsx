import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  HelpCircle,
  Timer,
} from "lucide-react"

export const labels = [
  {
    value: "N0",
    label: "N0",
  },
  {
    value: "N1",
    label: "N1",
  },
  {
    value: "N2",
    label: "N2",
  },
  {
    value: "N3",
    label: "N3",
  },
  {
    value: "N4",
    label: "N4",
  },
  {
    value: "N5",
    label: "N5",
  },
]

export const statuses = [
  {
    value: "0",
    label: "未测试",
    icon: HelpCircle,
  },
  {
    value: "1",
    label: "简单",
    icon: Circle,
  },
  {
    value: "2",
    label: "良好",
    icon: Timer,
  },
  {
    value: "3",
    label: "困难",
    icon: CheckCircle,
  },
  {
    value: "4",
    label: "搁置",
    icon: CircleOff,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "0",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "1",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "2",
    icon: ArrowUp,
  },
]
