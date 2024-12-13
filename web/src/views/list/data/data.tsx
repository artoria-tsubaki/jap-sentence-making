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
    value: "1",
    label: "N0",
  },
  {
    value: "2",
    label: "N1",
  },
  {
    value: "3",
    label: "N2",
  },
  {
    value: "4",
    label: "N3",
  },
  {
    value: "5",
    label: "N4",
  },
  {
    value: "6",
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
