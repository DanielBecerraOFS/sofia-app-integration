import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleArrowDown,
  CircleArrowLeft,
  CircleArrowRight,
  CircleArrowUp,
  CircleOff,
  HelpCircle,
} from "lucide-react"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const status_inv = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "open",
    label: "Open",
    icon: Circle,
  },
  {
    value: "close",
    label: "Close",
    icon: CheckCircle,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleOff,
  },
]

export const confidence = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
]

export const pattern = [
  {
    label: "Similar Value",
    value: "similar value",
  },
  {
    label: "Similar Reference",
    value: "similar reference",
  },
  {
    label: "Extra Match",
    value: "extra match",
  },
]

export const region = [
  {
    label: "North",
    value: "north",
    icon: CircleArrowUp,
  },
  {
    label: "South",
    value: "south",
    icon: CircleArrowDown,
  },
  {
    label: "East",
    value: "east",
    icon: CircleArrowRight,
  },
  {
    label: "West",
    value: "west",
    icon: CircleArrowLeft,
  },
]