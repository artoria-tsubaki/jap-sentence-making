import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Frown,
  HandMetal,
  CircleOff,
  HelpCircle,
  BadgeCheck,
  Smile,
  Annoyed,
  Angry
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
    icon: HandMetal,
  },
  {
    value: "2",
    label: "良好",
    icon: BadgeCheck,
  },
  {
    value: "3",
    label: "困难",
    icon: Frown,
  },
  {
    value: "4",
    label: "搁置",
    icon: CircleOff,
  },
]

export const priorities = [
  {
    label: "低",
    value: "0",
    icon: ArrowDown,
  },
  {
    label: "普通",
    value: "1",
    icon: ArrowRight,
  },
  {
    label: "高",
    value: "2",
    icon: ArrowUp,
  },
]

export const proficiencies = [
  {
    label: "会认会写",
    value: "0",
    icon: Smile,
  },
  {
    label: "会认不会写",
    value: "1",
    icon: Annoyed,
  },
  {
    label: "不会认",
    value: "2",
    icon: Angry,
  },
]
