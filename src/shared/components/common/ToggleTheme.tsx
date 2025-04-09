import { Button } from "../index"
import { useTheme } from '@/shared/hooks/useTheme';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../index"
import { Moon, Sun } from "lucide-react"

export default function ToggleTheme() {

  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondaryOutline" size="icon">
          <Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" strokeWidth={2} size={16}/>
          <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" strokeWidth={2} size={16} />
          <span className="sr-only">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {setTheme('light')}}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {setTheme('dark')}}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {setTheme('system')}}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
