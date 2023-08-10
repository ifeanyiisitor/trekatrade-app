import { SideMenu } from './SideMenu'
import { PersonIcon } from '@radix-ui/react-icons'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid'

export function UserSideMenu() {
  return (
    <SideMenu>
      <SideMenu.Item href="/">
        <PersonIcon className="mr-1 w-4 h-4" />
        Ifeanyi Isitor
      </SideMenu.Item>
      <SideMenu.Item href="/">
        <ArrowLeftOnRectangleIcon className="mr-1 w-5 h-5" />
        Logout
      </SideMenu.Item>
    </SideMenu>
  )
}
