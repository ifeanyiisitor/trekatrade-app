import { cn } from '@/lib/utils'
import { Props } from '@/lib/types'
import { useCallback, useMemo, useState } from 'react'

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from '../components/ui/sheet'

type DrawerHookProps = {
  onClose?: () => void
  onOpen?: () => void
}

/**
 * `useDrawer` provides a stateful api as well as a set of drawers components pre-configured
 * to work together around the same shared state. It's an exploration of the non-standard
 * (but at times useful) pattern of returning components from hooks in order to yield a more
 * expressive and less verbose component usage
 *
 * Example Usage:
 *
 * ```typescript
 * const { Drawer, closeDrawer } = useDrawer();
 *
 * return (
 *   <Drawer>
 *     <Drawer.Trigger>
 *       <Button>Add Contact</Button>
 *     </Drawer.Trigger>
 *     <Drawer.Content forForm>
 *       <Drawer.Heading>
 *         <Drawer.Title>Add Contact</Drawer.Title>
 *         <Drawer.Description>Add the details of a new contact</Drawer.Description>
 *       </Drawer.Heading>
 *       <ContactForm onSuccess={closeDrawer} />
 *     </Drawer.Content>
 *   </Drawer>
 * )
 * ```
 */
export function useDrawer({ onOpen, onClose }: DrawerHookProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const openDrawer = useCallback(() => setIsOpen(true), [])
  const closeDrawer = useCallback(() => setIsOpen(false), [])

  function handleOpenChange(open: boolean) {
    setIsOpen(open)
    if (!open && onClose) onClose()
    if (open && onOpen) onOpen()
  }

  const api = { isOpen, setIsOpen, handleOpenChange }

  const DrawerTrigger = useMemo(() => {
    function DrawerTrigger({ children }: Props) {
      // Accessing the hook's context like this allows us to bypass the traditional React reactivity
      // and provides a way to use the most current state & logic without re-creating the component.
      const { setIsOpen } = DrawerTrigger.api
      return (
        <SheetTrigger asChild>
          <div onClick={() => setIsOpen(true)}>{children}</div>
        </SheetTrigger>
      )
    }

    DrawerTrigger.api = api
    return DrawerTrigger
    // We are intentionally not specifying dependencies here because `api` is a stable object
    // that doesn't need to be watched for changes. This way, we avoid unnecessary re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const Drawer = useMemo(() => {
    function Drawer({ children }: Props) {
      const { isOpen, handleOpenChange } = Drawer.api
      return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
          {children}
        </Sheet>
      )
    }

    // This is done to allow the `Drawer` component access to the current state & logic.
    // This pattern lets us bypass React's traditional reactivity mechanisms.
    Drawer.api = api
    Drawer.Trigger = DrawerTrigger
    Drawer.Content = DrawerContentImpl
    Drawer.Header = SheetHeader
    Drawer.Title = SheetTitle
    Drawer.Description = SheetDescription

    return Drawer
    // Similar to the above, we don't specify dependencies here because `api` is stable,
    // ensuring that we avoid unnecessary re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // The redundancy here is needed as it allows for the components to have the
  // latest version of the api (seeing that it could change between renders). The reason why
  // we are also setting these within the `useMemo` blocks is to prevent typescript from complaining
  // that the props being set doesn't exist
  Drawer.api = api
  Drawer.Trigger = DrawerTrigger
  DrawerTrigger.api = api

  return { isOpen, Drawer, closeDrawer, openDrawer }
}

type DrawerContentProps = Props & {
  forForm?: boolean
}

// We aren't creating this component within the hook because it's a straightforward, stateless
// rendering component. By keeping it outside, we avoid unnecessary recreations during re-renders.
function DrawerContentImpl({ children, className, forForm }: DrawerContentProps) {
  return (
    <SheetContent className={cn({ 'flex flex-col gap-8': forForm }, className)}>
      {children}
    </SheetContent>
  )
}
